const db = require("../config/db");

/**
 * Helper to manually log an admin action
 */
const logAdminAction = async ({ adminId, action, targetType, targetId, details, ipAddress }) => {
  try {
    await db.execute(
      "INSERT INTO admin_audit_logs (admin_id, action, target_type, target_id, details, ip_address) VALUES (?, ?, ?, ?, ?, ?)",
      [adminId, action, targetType, targetId, JSON.stringify(details || {}), ipAddress]
    );
  } catch (error) {
    console.error("Failed to log admin action:", error.message);
  }
};

/**
 * Middleware to intercept administrative changes and log them
 */
const auditMiddleware = (actionType) => {
  return async (req, res, next) => {
    // We only log successful operations usually, but we want to know what happened.
    // We'll wrap the original res.json/res.send or just log before next() if we assume success.
    // Better: Intercept the response to ensure we only log on success (2xx).
    
    const originalJson = res.json;
    res.json = function (data) {
      if (res.statusCode >= 200 && res.statusCode < 300) {
        const adminId = req.user ? req.user.id : null;
        if (adminId) {
          const action = actionType || `${req.method}_${req.baseUrl}${req.path}`.replace(/\/+/g, '_').toUpperCase();
          const targetType = req.path.split('/')[1] || 'general';
          const targetId = req.params.id || null;
          const ipAddress = req.ip || req.connection.remoteAddress;

          // Don't log passwords or sensitive data
          const details = { ...req.body };
          if (details.password) details.password = "********";

          logAdminAction({
            adminId,
            action,
            targetType,
            targetId,
            details,
            ipAddress
          });
        }
      }
      return originalJson.call(this, data);
    };

    next();
  };
};

module.exports = { auditMiddleware, logAdminAction };
