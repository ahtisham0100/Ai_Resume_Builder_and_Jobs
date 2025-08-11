import User from "../Modals/User";
import bcrypt from "bcrypt"
import admin from "../config/firebaseAdmin";

 //signup controller 

export const signup = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      email,
      password: hashedPassword,
    });
    await newUser.save();

    // Generate Firebase token
    const token = await admin.auth().createCustomToken(email);

    res.status(201).json({ user: newUser, token });
  } catch (error) {
    console.error("Error signing up:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
