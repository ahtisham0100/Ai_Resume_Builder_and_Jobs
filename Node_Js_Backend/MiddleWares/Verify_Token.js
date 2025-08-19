import admin from "../config/firebaseAdmin.js";

const verifyFirebaseToken =  async(req, res, next) => {
  console.log(req.body, req.headers);
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    console.log("Decoded Token: ", decodedToken);
   // Attach user info safely
    req.user = {
      email: decodedToken.email,
      name: decodedToken.name || "name not found",
      uid: decodedToken.uid,
    };
    
    console.log(req.user)

    next();
  } catch (error) {
    console.error("Error verifying Firebase token:", error);
    return res.status(403).json({ message: "Forbidden" });
  }
};  

export default verifyFirebaseToken;
