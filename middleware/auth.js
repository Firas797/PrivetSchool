const auth = (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    
    // 🟨 EXTENDED DEBUGGING
    console.log("=== AUTH MIDDLEWARE DEBUG ===");
    console.log("🟨 Full URL:", req.method, req.url);
    console.log("🟨 Received Authorization header:", authHeader);
    console.log("🟨 All headers:", req.headers);
    console.log("🟨 Cookies:", req.cookies);

    // ✅ Check if the Authorization header exists and starts with "Bearer "
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.log("❌ No Bearer token found in header");
      return res.status(401).json({ 
        msg: "Authentication required. Token missing or invalid format.",
        debug: {
          receivedHeader: authHeader,
          expectedFormat: "Bearer <token>"
        }
      });
    }

    // ✅ Extract the token
    const token = authHeader.split(" ")[1]?.trim();
    console.log("🟨 Extracted token:", token ? `${token.substring(0, 10)}...` : 'NO TOKEN');

    if (!token) {
      return res.status(401).json({ msg: "Token missing after Bearer prefix." });
    }

    // ✅ Verify the token
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

      // ✅ Token is valid
      console.log("✅ Token verified successfully. User ID:", decoded.id);
      req.user = decoded;
      next();
    });
  } catch (err) {
    console.error("🔥 Auth middleware error:", err.message);
    return res.status(500).json({ msg: "Internal server error during authentication." });
  }
};