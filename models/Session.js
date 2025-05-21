const mongoose = require("mongoose");

const SessionSchema = new mongoose.Schema({
  name: String,
  tabs: [
    {
      title: String,
      url: String,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Session", SessionSchema);
