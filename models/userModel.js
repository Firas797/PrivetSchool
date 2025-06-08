const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  parentName: {
    type: String,
    required: [true, "Le nom du parent est requis"]
  },
  email: {
    type: String,
    required: [true, "L'email est requis"],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Veuillez entrer un email valide']
  },
  password: {
    type: String,
    required: [true, "Le mot de passe est requis"],
    minlength: [6, "Le mot de passe doit contenir au moins 6 caractères"]
  },
  phoneNumber: {
    type: String,
    required: [true, "Le numéro de téléphone est requis"],
    match: [/^[0-9]{10,15}$/, "Veuillez entrer un numéro de téléphone valide"]
  },
  address: {
    type: String,
    required: [true, "L'adresse est requise"]
  },
  plan: {
    type: String,
    required: [true, "Le programme est requis"],
    enum: {
      values: ["☀️ Bootcamp d'été", "📚 Programme Annuel", "🎨 Ateliers Créatifs", "🧠 Soutien Scolaire"],
      message: "Programme non valide"
    }
  },
  children: [{
    name: {
      type: String,
      required: [true, "Le nom de l'enfant est requis"]
    },
    age: {
      type: Number,
      required: [true, "L'âge de l'enfant est requis"],
      min: [4, "L'âge minimum est 4 ans"],
      max: [18, "L'âge maximum est 18 ans"]
    },
    schoolLevel: {
      type: String,
      required: [true, "Le niveau scolaire est requis"]
    }
  }],
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  quizScores: [{
    category: String,
    firstScore: Number,
    bestScore: Number
  }],
  refreshToken: String
});

// Hash du mot de passe avant sauvegarde
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Méthode pour comparer les mots de passe
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);