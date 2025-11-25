const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Event title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Event description is required'],
    trim: true,
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  date: {
    type: Date,
    required: [true, 'Event date is required']
  },
  time: {
    type: String,
    required: [true, 'Event time is required']
  },
  location: {
    type: String,
    required: [true, 'Event location is required'],
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Event category is required'],
    enum: ['workshop', 'seminar', 'social', 'academic', 'sports', 'other']
  },
  targetAudience: {
    type: [String],
    default: ['all'],
    enum: ['all', 'freshmen', 'sophomores', 'juniors', 'seniors', 'graduates']
  },
  maxParticipants: {
    type: Number,
    min: 1
  },
  currentParticipants: {
    type: Number,
    default: 0
  },
  organizer: {
    type: String,
    required: [true, 'Organizer is required'],
    trim: true
  },
  contactEmail: {
    type: String,
    required: [true, 'Contact email is required'],
    trim: true
  },
  imageUrl: {
    type: String,
    default: ''
  },
  isActive: {
    type: Boolean,
    default: true
  },
  registrationDeadline: {
    type: Date
  }
}, {
  timestamps: true
});

// Index for better query performance
eventSchema.index({ date: 1, isActive: 1 });
eventSchema.index({ category: 1 });

module.exports = mongoose.model('Event', eventSchema);