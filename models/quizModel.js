const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  // For "multiple-choice" type
  options: { type: [String] },
  // For both types (string or number accepted)
  correctAnswer: { type: String, required: true },
});

const quizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true }, // Subject (Math, French, etc.)
  classLevel: { type: Number, required: true, min: 1, max: 6 },
  type: {
    type: String,
    enum: ['multiple-choice', 'calculation'],
    required: true,
  },
  questions: [questionSchema],
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: 'easy',
  },
  // ✅ CHANGED: Now accepts both ObjectId and String
  createdBy: { 
    type: mongoose.Schema.Types.Mixed, // Allows both String and ObjectId
    required: true 
  },
  // ✅ ADDED: Store teacher name separately for easy display
  teacherName: { 
    type: String,
    required: false // Optional, for backward compatibility
  }
}, { timestamps: true });

// ✅ Auto-delete quizzes 48 hours after creation
quizSchema.index({ createdAt: 1 }, { expireAfterSeconds: 172800 }); // 172800 = 48h

const Quiz = mongoose.model('Quiz', quizSchema);
module.exports = Quiz;