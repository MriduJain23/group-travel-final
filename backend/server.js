import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.send("Backend running");
});

// 🔥 MAIN API: frontend will call this
app.post("/api/hotels", async (req, res) => {
  try {
    const response = await axios.post(
      process.env.TBO_API_URL,
      req.body,
      {
        auth: {
          username: process.env.TBO_USERNAME,
          password: process.env.TBO_PASSWORD
        },
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "TBO API failed" });
  }
});

app.listen(5000, () => {
  console.log("Backend running at http://localhost:5000");
});
