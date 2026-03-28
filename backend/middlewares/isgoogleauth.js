const admin = require("../config/firebase");
const Response = require("../utils/responsehandler");

const IsGoogleAuth = async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return Response(res, 401, "Unauthorized or invalid token");
  }
  try {
    const token = authHeader.split(" ")[1];
    const decoded = await admin.auth().verifyIdToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    console.log("error in isGoogleAuth middleware", error);
    return Response(res, 401, "Unauthorized: Invalid or expired firebase token",)
  }
};

module.exports = IsGoogleAuth;
