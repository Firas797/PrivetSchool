const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");

    // 🟨 Debug: show what the backend received
    console.log("🟨 Received header:", authHeader);

    // ✅ 1. Check if the Authorization header exists and starts with "Bearer "
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ msg: "Authentication required. Token missing or invalid format." });
    }

    // ✅ 2. Extract the token (remove the "Bearer " prefix)
    const token = authHeader.split(" ")[1].trim();

    if (!token) {
      return res.status(401).json({ msg: "Token missing after Bearer prefix." });
    }

    // ✅ 3. Verify the token
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        console.error("❌ JWT verification error:", err.message);

        // Handle specific token errors
        if (err.name === "TokenExpiredError") {
          return res.status(401).json({ msg: "Token expired. Please log in again." });
        } else if (err.name === "JsonWebTokenError") {
          return res.status(401).json({ msg: "Invalid token. Please log in again." });
        }

        return res.status(403).json({ msg: "Authentication failed." });
      }

      // ✅ 4. Token is valid — attach user data to the request
      console.log("✅ Token verified successfully:", decoded);
      req.user = decoded;
      next();
    });
  } catch (err) {
    console.error("🔥 Auth middleware error:", err.message);
    return res.status(500).json({ msg: "Internal server error during authentication." });
  }
};

module.exports = auth;
