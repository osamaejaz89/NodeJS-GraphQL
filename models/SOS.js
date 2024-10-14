const mongoose = require("mongoose");
const sosRequestSchema = new mongoose.Schema({
  requester: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  type: { type: String, required: true },
  description: String,
  location: String,
  status: { type: String, enum: ["Pending", "Resolved"], default: "Pending" },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("SOSRequest", sosRequestSchema);
