const mongoose = require('mongoose');

const cultureSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String, // store image path (e.g. /uploads/culture/image.jpg)
    required: false,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher', // or 'User' depending on your auth system
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Culture', cultureSchema);
