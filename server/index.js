const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const Session = require("./models/Session");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

app.get("/", (req, res) => {
  res.send("TabGroupie Backend is Running 🚀");
});

app.post("/api/sessions", async (req, res) => {
  try {
    const { name, tabs } = req.body;
    const newSession = new Session({ name, tabs });
    await newSession.save();
    res.json({ message: "Session saved", id: newSession._id });
  } catch (err) {
    res.status(500).json({ message: "Failed to save session" });
  }
});

app.get("/api/sessions", async (req, res) => {
  const sessions = await Session.find();
  res.json(sessions);
});

app.get("/api/sessions/:id", async (req, res) => {
  const session = await Session.findById(req.params.id);
  if (!session) return res.status(404).json({ message: "Not found" });
  res.json(session);
});

app.put("/api/sessions/:id", async (req, res) => {
  const { name } = req.body;
  await Session.findByIdAndUpdate(req.params.id, { name });
  res.json({ message: "Session renamed" });
});

app.delete("/api/sessions/:id", async (req, res) => {
  await Session.findByIdAndDelete(req.params.id);
  res.json({ message: "Session deleted" });
});

app.listen(5000, () => console.log("Server running on port 5000"));
