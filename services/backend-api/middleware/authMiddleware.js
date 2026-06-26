const jwt = require("jsonwebtoken");
require("dotenv").config();

const authMiddleware = (req, res, next) => {
  // 1. Try to get token from Authorization header
  const authHeader = req.headers.authorization;
  let token = null;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  } else if (req.headers.cookie) {
    // Manually parse cookie since cookie-parser is not used
    const cookies = req.headers.cookie.split(";").reduce((acc, cookie) => {
      const [name, ...value] = cookie.trim().split("=");
      acc[name] = value.join("=");
      return acc;
    }, {});
    token = cookies.token;
  }

  // Check if no token
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Add user from payload
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = authMiddleware;
