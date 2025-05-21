const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  name: String,
  tabs: [
    {
      title: String,
      url: String,
    },
  ],
});

module.exports = mongoose.model("Session", sessionSchema);
