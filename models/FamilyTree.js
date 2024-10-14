const mongoose = require("mongoose");
const familyTreeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  familyMembers: [
    {
      name: { type: String, required: true },
      relation: { type: String, required: true },
      age: Number,
      contact: String,
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("FamilyTree", familyTreeSchema);
