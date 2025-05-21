const express = require("express");
const router = express.Router();
const Session = require("../../models/Session");

router.post("/", async (req, res) => {
  const session = new Session(req.body);
  await session.save();
  res.json(session);
});

router.get("/", async (req, res) => {
  const sessions = await Session.find();
  res.json(sessions);
});

router.get("/:id", async (req, res) => {
  const session = await Session.findById(req.params.id);
  res.json(session);
});

router.delete("/:id", async (req, res) => {
  await Session.findByIdAndDelete(req.params.id);
  res.json({ message: "Session deleted" });
});

module.exports = router;
