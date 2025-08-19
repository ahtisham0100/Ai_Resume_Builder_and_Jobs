import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  skills: { type: [String] },
  profileSummary: { type: String },
  experience: { type: [Object] },
  education: { type: [Object] },
  contactInfo: {
    phone: { type: String },
    address: { type: String },
    linkedin: { type: String },
    portfolio: { type: String },
    github: { type: String }
  },

  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("users", userSchema);

export default User;
