import dotenv from "dotenv/config";
import express from "express";
import cors from "cors";
import userRoutes from "./Routes/userRoutes.js";
import { connectDB } from "./config/mongoDB.mjs";


const port = process.env.PORT || 3000;
const app = express();
setTimeout(()=>{
  console.log("Server is starting..." , port);
},3000)
// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api", userRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Connect DB first, then start server
connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  });
