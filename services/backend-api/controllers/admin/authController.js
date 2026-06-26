const speakEasy = require("speakeasy");
const QRCode = require("qrcode");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../../config/db");

// Admin Login
exports.login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: "Please provide both username and password",
    });
  }

  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress || "";
  const cleanIp = Array.isArray(ip) ? ip[0] : ip.split(",")[0].trim();

  try {
    // Check for existing lockout
    const [lockouts] = await db.execute(
      "SELECT attempts, lockout_until FROM login_attempts WHERE (ip_address = ? OR username = ?) AND lockout_until > NOW()",
      [cleanIp, username]
    );

    if (lockouts.length > 0) {
      const remainingTime = Math.ceil((new Date(lockouts[0].lockout_until).getTime() - Date.now()) / 60000);
      return res.status(429).json({ 
        success: false,
        message: `Too many failed attempts. Try again in ${remainingTime} minutes.` 
      });
    }

    const [users] = await db.execute(
      "SELECT * FROM users WHERE (email_or_phone = ? OR username = ?) AND (role = 'admin' OR role = 'super_admin')",
      [username, username],
    );

    if (users.length === 0) {
      await recordFailedAttempt(cleanIp, username);
      return res.status(401).json({ success: false, message: "Invalid admin credentials" });
    }

    const user = users[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      await recordFailedAttempt(cleanIp, username);
      return res.status(401).json({ success: false, message: "Invalid admin credentials" });
    }

    // Success: Reset attempts
    await resetAttempts(cleanIp, username);

    // Check if MFA is enabled
    if (user.two_factor_enabled) {
      return res.status(200).json({
        success: true,
        mfaRequired: true,
        userId: user.id,
      });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "24h" },
    );

    res.status(200).json({
      success: true,
      data: {
        token,
        user: {
          id: user.id,
          username: user.username,
          role: user.role,
        },
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error during admin login" });
  }
};

// Verify MFA Token during Login
exports.verifyMfaLogin = async (req, res) => {
  const { userId, code } = req.body;

  try {
    const [users] = await db.execute("SELECT * FROM users WHERE id = ?", [userId]);
    if (users.length === 0) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const user = users[0];
    const verified = speakEasy.totp.verify({
      secret: user.two_factor_secret,
      encoding: "base32",
      token: code,
    });

    if (!verified) {
      return res.status(401).json({ success: false, message: "Invalid MFA code" });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "24h" },
    );

    res.status(200).json({
      success: true,
      data: {
        token,
        user: {
          id: user.id,
          username: user.username,
          role: user.role,
        },
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Setup MFA: Generate Secret & QR Code
exports.setupMfa = async (req, res) => {
  try {
    const secret = speakEasy.generateSecret({ name: `BC-Game Admin (${req.user.username})` });
    const qrCodeUrl = await QRCode.toDataURL(secret.otpauth_url);

    // Temporarily store secret in user record (encrypted or plain if we trust the session)
    // We will only enable it once the user verifies their first code.
    await db.execute("UPDATE users SET two_factor_secret = ? WHERE id = ?", [
      secret.base32,
      req.user.id,
    ]);

    res.status(200).json({
      success: true,
      data: {
        qrCodeUrl,
        secret: secret.base32,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Confirm and Enable MFA
exports.enableMfa = async (req, res) => {
  const { code } = req.body;

  try {
    const [users] = await db.execute("SELECT * FROM users WHERE id = ?", [req.user.id]);
    const user = users[0];

    const verified = speakEasy.totp.verify({
      secret: user.two_factor_secret,
      encoding: "base32",
      token: code,
    });

    if (verified) {
      await db.execute("UPDATE users SET two_factor_enabled = TRUE WHERE id = ?", [req.user.id]);
      res.status(200).json({ success: true, message: "MFA enabled successfully" });
    } else {
      res.status(400).json({ success: false, message: "Invalid verification code" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Disable MFA
exports.disableMfa = async (req, res) => {
  try {
    await db.execute(
      "UPDATE users SET two_factor_enabled = FALSE, two_factor_secret = NULL WHERE id = ?",
      [req.user.id],
    );
    res.status(200).json({ success: true, message: "MFA disabled successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


exports.getMyPermissions = async (req, res) => {
  try {
    const isSuperAdmin = req.user.role === "super_admin";

    res.status(200).json({
      success: true,
      data: {
        role: req.user.role,
        permissions: {
          users: { read: true, create: true, update: true, delete: true },
          transactions: { read: true, approve: true, reject: true },
          promotions: { read: true, create: true, update: true, delete: true },
          quests: { read: true, create: true, update: true, delete: true },
          games: { read: true, update: true, delete: true },
          trading: { read: true },
          lottery: { read: true, trigger: true },
          sports: { read: true },
          referral: { read: true },
          vip: { read: true, update: true },
          bonuses: { read: true, create: true, delete: true },
          sponsorships: { read: true, update: true },
          notifications: { read: true, create: true, delete: true },
          admins: {
            read: isSuperAdmin,
            updateRole: isSuperAdmin,
          },
        },
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ── Helper Functions ─────────────────────────────────────────

async function recordFailedAttempt(ip, username) {
  try {
    const [rows] = await db.execute(
      "SELECT attempts FROM login_attempts WHERE ip_address = ? AND username = ?",
      [ip, username]
    );

    if (rows.length === 0) {
      await db.execute(
        "INSERT INTO login_attempts (ip_address, username, attempts) VALUES (?, ?, 1)",
        [ip, username]
      );
    } else {
      const newAttempts = rows[0].attempts + 1;
      let lockoutUntil = null;
      
      if (newAttempts >= 5) {
        lockoutUntil = new Date(Date.now() + 15 * 60000);
      }

      await db.execute(
        "UPDATE login_attempts SET attempts = ?, lockout_until = ? WHERE ip_address = ? AND username = ?",
        [newAttempts, lockoutUntil, ip, username]
      );
    }
  } catch (error) {
    console.error("Error recording failed login attempt:", error);
  }
}

async function resetAttempts(ip, username) {
  try {
    await db.execute(
      "DELETE FROM login_attempts WHERE ip_address = ? OR username = ?",
      [ip, username]
    );
  } catch (error) {
    console.error("Error resetting login attempts:", error);
  }
}

