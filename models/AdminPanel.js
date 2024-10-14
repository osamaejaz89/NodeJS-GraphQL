const mongoose = require("mongoose");
const adminActivitySchema = new mongoose.Schema({
  admin: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  action: { type: String, required: true },
  target: String,
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("AdminActivity", adminActivitySchema);
