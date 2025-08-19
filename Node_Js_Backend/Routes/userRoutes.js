import express from "express" 
import verifyFirebaseToken from "../MiddleWares/Verify_Token.js";
import users from "../Modals/User.js"
const router = express.Router();

router.get("/user",verifyFirebaseToken ,async (req, res) => {
  // Perform login logic here 
const {name , email} = req.user;
  let result = await users.findOne({ email });
  if (!result) {
//inserting user in db; 
result = await users.create({
      name,
      email,
      skills: [],
      profileSummary: "",
      experience: [],
      education: [],
      contactInfo: {
        phone: "",
        address: "",
        linkedin: "",
        portfolio: "",
        github: ""
      }
    });
    console.log("User Created:", { name, email });
  }

  console.log("User result :", result);
  res.json({ message: "Login successful" , user: { name, email } });
});

export default router;
