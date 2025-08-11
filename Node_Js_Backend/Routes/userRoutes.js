import express from "express" 
import { verifyFirebaseToken } from "../MiddleWares/Verify_Token";

const router = express.Router();

router.post("/login",verifyFirebaseToken ,(req, res) => {
  const { email, password } = req.body.user;
  // Perform login logic here 

  res.json({ message: "Login successful" });
});

export default router;
