const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register Controller
exports.register = async (req, res) => {
  const { emailOrPhone, username, password, referralCode } = req.body;

  // Validate input fields
  if (!emailOrPhone || !username || !password) {
    return res
      .status(400)
      .json({ message: "All required fields must be filled" });
  }

  try {
    // Check if user already exists (by email/phone or username)
    const [existingUser] = await db.execute(
      "SELECT * FROM users WHERE email_or_phone = ? OR username = ?",
      [emailOrPhone, username],
    );

    if (existingUser.length > 0) {
      return res
        .status(400)
        .json({ message: "Email or Username already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert into database
    await db.execute(
      "INSERT INTO users (email_or_phone, username, password, referral_code) VALUES (?, ?, ?, ?)",
      [emailOrPhone, username, hashedPassword, referralCode || null],
    );

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error during registration" });
  }
};

// Login Controller
exports.login = async (req, res) => {
  const { username, password } = req.body;

  // Validate input fields
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Please provide both username and password" });
  }

  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress || "";
  const cleanIp = Array.isArray(ip) ? ip[0] : ip.split(",")[0].trim();

  try {
    // 1. Check for existing lockout
    const [lockouts] = await db.execute(
      "SELECT attempts, lockout_until FROM login_attempts WHERE (ip_address = ? OR username = ?) AND lockout_until > NOW()",
      [cleanIp, username]
    );

    if (lockouts.length > 0) {
      const remainingTime = Math.ceil((new Date(lockouts[0].lockout_until).getTime() - Date.now()) / 60000);
      return res.status(429).json({ 
        message: `Too many failed attempts. Try again in ${remainingTime} minutes.` 
      });
    }

    // Find user by email or username
    const [users] = await db.execute(
      "SELECT * FROM users WHERE email_or_phone = ? OR username = ?",
      [username, username],
    );

    if (users.length === 0) {
      // Record failed attempt
      await recordFailedAttempt(cleanIp, username);
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = users[0];

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      await recordFailedAttempt(cleanIp, username);
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Success: Reset attempts
    await resetAttempts(cleanIp, username);

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "24h" },
    );

    // Update last login and IP address
    const ipAddress = req.headers["x-forwarded-for"] || req.socket.remoteAddress || "";
    const deviceInfo = req.headers["user-agent"] || "unknown";
    try {
      await db.execute(
        "UPDATE users SET last_login = NOW(), last_ip_address = ? WHERE id = ?",
        [ipAddress, user.id]
      );
      // Also log to history
      await db.execute(
        "INSERT INTO user_login_history (user_id, ip_address, device_info) VALUES (?, ?, ?)",
        [user.id, ipAddress, deviceInfo]
      );
    } catch (updateError) {
      console.error("Failed to update user login info:", updateError);
      // We don't block the login if this fails
    }

    // Return token and user info (excluding password)
    res.status(200).json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email_or_phone: user.email_or_phone,
        referral_code: user.referral_code,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error during login" });
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
        // Lock for 15 minutes
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

