const bcrypt = require("bcryptjs");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const MarriageProfile = require("../models/marriage");
const Alert = require("../models/alert");
const SOSRequest = require("../models/sos");
const Donation = require("../models/donation");
const Notification = require("../models/notification");

module.exports = {
  createUser: async ({ userInput }) => {
    console.log("UserInput", userInput)
    const errors = [];
    if (!validator.isEmail(userInput.email))
      errors.push({ message: "Invalid email." });
    if (!validator.isLength(userInput.password, { min: 6 }))
      errors.push({ message: "Password too short." });

    if (errors.length > 0) throw createError(422, errors);

    const existingUser = await User.findOne({ email: userInput.email });
    if (existingUser) throw new Error("User already exists.");

    const hashedPassword = await bcrypt.hash(userInput.password, 12);
    const user = new User({ ...userInput, password: hashedPassword });
    const createdUser = await user.save();
    return { ...createdUser._doc, _id: createdUser._id.toString() };
  },

  login: async ({ email, password }) => {
    const user = await User.findOne({ email });
    if (!user) throw createError(401, "User not found.");

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) throw createError(401, "Incorrect password.");

    const token = jwt.sign(
      { userId: user._id.toString(), email: user.email },
      "supersecretkey",
      { expiresIn: "1h" }
    );
    return { token, userId: user._id.toString() };
  },

  createDonation: async ({ donationInput }) => {
    const donation = new Donation({ ...donationInput });
    const createdDonation = await donation.save();
    return { ...createdDonation._doc, _id: createdDonation._id.toString() };
  },

  createMarriageProfile: async ({ input }) => {
    const profile = new MarriageProfile({ ...input });
    const createdProfile = await profile.save();
    return { ...createdProfile._doc, _id: createdProfile._id.toString() };
  },

  createAlert: async ({ input }) => {
    const alert = new Alert({ ...input });
    const createdAlert = await alert.save();
    return { ...createdAlert._doc, _id: createdAlert._id.toString() };
  },

  createSOSRequest: async ({ input }) => {
    const sosRequest = new SOSRequest({ ...input });
    const createdRequest = await sosRequest.save();
    return { ...createdRequest._doc, _id: createdRequest._id.toString() };
  },

  getSOSRequests: async () => {
    const sosRequests = await SOSRequest.find();
    return sosRequests.map((req) => ({ ...req._doc, _id: req._id.toString() }));
  },

  getUser: async ({ id }) => {
    const user = await User.findById(id);
    if (!user) throw new Error("User not found.");
    return { ...user._doc, _id: user._id.toString() };
  },

  getNotifications: async ({ userId }) => {
    const notifications = await Notification.find({ user: userId });
    return notifications.map((n) => ({ ...n._doc, _id: n._id.toString() }));
  },
};

function createError(code, message) {
  const error = new Error(message);
  error.code = code;
  throw error;
}
