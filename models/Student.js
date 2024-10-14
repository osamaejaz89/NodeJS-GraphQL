const mongoose = require("mongoose");
const studentCornerSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: { type: String, required: true },
  description: String,
  resourceLink: String,
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("StudentCorner", studentCornerSchema);
