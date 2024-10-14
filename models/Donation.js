const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema({
  donor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  type: {
    type: String,
    enum: ["Zakat", "Student Adoption", "Family Support"],
    required: true,
  },
  amount: { type: Number, required: true },
  isRecurring: { type: Boolean, default: false },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Donation", donationSchema);
