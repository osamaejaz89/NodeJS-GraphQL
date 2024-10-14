const mongoose = require("mongoose");
const marriageProfileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  age: Number,
  height: String,
  weight: String,
  maritalStatus: String,
  familyBackground: String,
  isActive: { type: Boolean, default: true },
});

module.exports = mongoose.model("MarriageProfile", marriageProfileSchema);
