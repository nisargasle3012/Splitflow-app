import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || req.headers["x-access-token"] || "";
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : authHeader;

    if (!token) {
      return res.status(401).json({ message: "No token provided. Use header: Authorization: Bearer <token>" });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Token expired" });
      }
      return res.status(401).json({ message: "Invalid token" });
    }
    req.user = { id: decoded.id, email: decoded.email };

    return next();
  } catch (err) {
    console.error("Auth middleware error:", err);
    return res.status(500).json({ message: "Auth error" });
  }
};
