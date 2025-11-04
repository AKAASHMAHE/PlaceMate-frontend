// server.js
import express from "express";
import cors from "cors";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Chatbot route (must match frontend)
app.post("/api/chat/chat", (req, res) => {
  const { message } = req.body;

  // Dummy response (to test connection)
  const reply = `🤖 Bot: You said "${message}"`;
  res.json({ reply });
});

// Server running on port 5000
app.listen(5000, () => console.log("✅ Backend running on http://localhost:5000"));
     