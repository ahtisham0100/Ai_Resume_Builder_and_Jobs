import admin from "../config/firebaseAdmin";

const verifyFirebaseToken =  async(req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error("Error verifying Firebase token:", error);
    return res.status(403).json({ message: "Forbidden" });
  }
};  

export { verifyFirebaseToken };
