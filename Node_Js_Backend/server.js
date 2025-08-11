import express from 'express';
import cors from "cors";
import dotenv from "dotenv"
import { connectDB } from './config/mongoDB.mjs';
dotenv.config();

const port = process.env.port || 3000;
const app = express();
app.use(express.json());
app.use(cors());

connectDB()
  .then(
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    })
  )
  .catch((error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  });

app.get("/", (req, res) => {
  res.send("Hello World!");
}); 

