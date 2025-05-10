const admin = require("../firebase/config").auth;

const verifyToken = async (req, res, next) => {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Missing or invalid token" });
  }

  const idToken = header.split("Bearer ")[1];

  try {
    const decodedToken = await admin.verifyIdToken(idToken);
    req.user = decodedToken; // contains uid, email, etc.
    next();
  } catch (error) {
    return res.status(403).json({ error: "Unauthorized" });
  }
};

module.exports = verifyToken;
