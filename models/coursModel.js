const mongoose = require('mongoose');

const coursSchema = new mongoose.Schema({
  Title: { type: String, required: true },
  classe: { type: String, required: true },
  urlVid: { type: String, required: false }, // ✅ optional now
  description: { type: String, required: true },
  category: { type: String, required: true },
  pdfFile: {
    data: Buffer,
    contentType: String,
  }, // ✅ optional now
}, {
  timestamps: true
});

// optional TTL if you want auto delete after 48h
// coursSchema.index({ createdAt: 1 }, { expireAfterSeconds: 172800 });

module.exports = mongoose.model('Courses', coursSchema);
