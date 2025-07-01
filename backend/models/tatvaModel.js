const mongoose = require("mongoose");

const tatvaSchema = new mongoose.Schema({
  title: String,
  description: String,
  tatvaUrl: {
    type: String,
  },
  cloudinary_id: {
    type: String, // Store the public ID from Cloudinary
  },
});

module.exports = mongoose.model("Tatva", tatvaSchema);
