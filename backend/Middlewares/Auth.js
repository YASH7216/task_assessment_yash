// Middlewares/Auth.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

const ensureAuthenticated = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  console.log("Received Token:", token);

  if (token == null) {
    console.log("Token is null");
    return res.status(401).json({ message: "Unauthorized, JWT token is required" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.log("Token verification failed:", err);
      return res.status(403).json({ message: "Forbidden, Invalid token" });
    }

    console.log("Token verified, user:", user);
    req.user = user;
    next();
  });
};

module.exports = ensureAuthenticated;
