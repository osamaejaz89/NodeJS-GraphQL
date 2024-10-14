const mongoose = require("mongoose");
const alertSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: {
    type: String,
    enum: ["News", "Job", "Donation Request", "SOS"],
    required: true,
  },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Alert", alertSchema);
