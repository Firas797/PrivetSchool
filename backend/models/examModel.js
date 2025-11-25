const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
  Title: { type: String, required: true },
  description: { type: String, required: true },
  classe: { type: String, required: true },
  category: { type: String, required: true },
  file: {
    data: Buffer,
    contentType: String,
  }, // can be PDF or image
}, {
  timestamps: true,
});

module.exports = mongoose.model('Exam', examSchema);
