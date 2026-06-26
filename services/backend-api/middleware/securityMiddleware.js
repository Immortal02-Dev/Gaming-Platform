const db = require("../config/db");

const securityMiddleware = async (req, res, next) => {
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress || "";
  const cleanIp = Array.isArray(ip) ? ip[0] : ip.split(",")[0].trim();

  try {
    // 1. Check IP Blacklist
    const [blocked] = await db.execute(
      "SELECT REASON, expires_at FROM ip_blacklist WHERE ip_address = ? AND (expires_at IS NULL OR expires_at > NOW())",
      [cleanIp]
    );

    if (blocked.length > 0) {
      return res.status(403).json({
        success: false,
        message: "Access Denied: Your IP has been blacklisted.",
        reason: blocked[0].reason,
      });
    }

    // 2. Geo-Restriction (Check platform_settings for blocked_countries)
    const [settings] = await db.execute(
      "SELECT setting_value FROM platform_settings WHERE setting_key = 'blocked_countries'"
    );

    if (settings.length > 0) {
      const blockedCountries = JSON.parse(settings[0].setting_value || "[]");
      const clientCountry = req.headers["cf-ipcountry"] || req.headers["x-country-code"];
      
      if (clientCountry && blockedCountries.includes(clientCountry.toUpperCase())) {
        return res.status(403).json({
          success: false,
          message: `Access Denied: Our services are currently unavailable in ${clientCountry}.`,
        });
      }
    }

    next();
  } catch (error) {
    console.error("Security Middleware Error:", error);
    // Don't block access if DB is down, just continue
    next();
  }
};

module.exports = securityMiddleware;
