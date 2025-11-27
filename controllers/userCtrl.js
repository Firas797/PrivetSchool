const Users = require("../models/userModel");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs')
const path = require('path')

const userCtrl = {

updateProfilePicture: async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ msg: "No file uploaded" });
    }

    const user = await Users.findById(req.user._id);
    if (!user) return res.status(404).json({ msg: "User not found" });

    // Delete old profile picture if exists
    if (user.profilePicture) {
      const oldImagePath = path.join(__dirname, '..', user.profilePicture);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    // Update user with new profile picture path
    user.profilePicture = req.file.path;
    await user.save();

    res.json({
      msg: "Profile picture updated successfully",
      profilePicture: user.profilePicture
    });

  } catch (err) {
    console.error('Error updating profile picture:', err);
    return res.status(500).json({ msg: "Server error" });
  }
},

updateChildProfilePicture: async (req, res) => {
  try {
    const { childId } = req.params;
    
    if (!req.file) {
      return res.status(400).json({ msg: "No file uploaded" });
    }

    // Check authentication
    // if (!req.user || !req.user.id) {
    //   return res.status(401).json({ msg: "User not authenticated" });
    // }

    // Find user and update in one operation
    const user = await Users.findOne({ _id: req.user.id });
    if (!user) return res.status(404).json({ msg: "User not found" });

    // Find the child
    const child = user.children.id(childId); // Use Mongoose's id() method
    if (!child) {
      // Fallback: try with find
      const childAlt = user.children.find(c => c._id.toString() === childId);
      if (!childAlt) return res.status(404).json({ msg: "Child not found" });
      
      // Delete old picture if exists
      if (childAlt.profilePicture) {
        const oldImagePath = path.join(__dirname, '..', childAlt.profilePicture);
        if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath);
      }
      
      // Update the child
      childAlt.profilePicture = req.file.path;
      await user.save();
      
      return res.json({
        msg: "Child profile picture updated successfully",
        profilePicture: req.file.path,
        childId: childId
      });
    }

    // Delete old profile picture if exists
    if (child.profilePicture) {
      const oldImagePath = path.join(__dirname, '..', child.profilePicture);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    // Update the child
    child.profilePicture = req.file.path;
    await user.save();

    res.json({
      msg: "Child profile picture updated successfully",
      profilePicture: req.file.path,
      childId: childId
    });

  } catch (err) {
    console.error('Error updating child profile picture:', err);
    return res.status(500).json({ msg: "Server error" });
  }
},
register: async (req, res) => {
  try {
    const { parentName, email, password, phoneNumber, address, children } = req.body;

    // Validation des données
    if (!parentName || !email || !password || !phoneNumber || !address || !children) {
      return res.status(400).json({ msg: "Tous les champs sont obligatoires" });
    }

    if (children.length === 0) {
      return res.status(400).json({ msg: "Au moins un enfant doit être enregistré" });
    }

    const user = await Users.findOne({ email });
    if (user) return res.status(400).json({ msg: "Cet email est déjà utilisé." });

    if (password.length < 6) {
      return res.status(400).json({ msg: "Le mot de passe doit contenir au moins 6 caractères." });
    }

    // Exemple d'utilisation de la classe du premier enfant :
    const firstChildClass = children[0].class;
    console.log(`Classe du premier enfant: ${firstChildClass}`);

    // Création du nouvel utilisateur
    const newUser = new Users({
      parentName,
      email,
      password,
      phoneNumber,
      address,
      children,
        isNewUser: true

    });

    // Sauvegarde en base de données
    await newUser.save();

    // Génération des tokens
    const accessToken = createAccessToken({ id: newUser._id, role: newUser.role });
    const refreshToken = createRefreshToken({ id: newUser._id, role: newUser.role });

    // Stockage du refresh token en base
    await Users.findByIdAndUpdate(newUser._id, { refreshToken });

    // Configuration du cookie
    res.cookie("refreshtoken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: "/user/refresh_token",
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 jours
    });

    // Réponse avec les données utilisateur (sans mot de passe)
    const userResponse = {
      _id: newUser._id,
      parentName: newUser.parentName,
      email: newUser.email,
      phoneNumber: newUser.phoneNumber,
      address: newUser.address,
      children: newUser.children,
      role: newUser.role,
      createdAt: newUser.createdAt
    };

    res.status(201).json({
      msg: "Inscription réussie",
      token: accessToken,
      user: userResponse
    });

  } catch (err) {
    console.error('Erreur lors de l\'inscription:', err);
    return res.status(500).json({ 
      msg: err.message,
      ...(err.errors && { errors: Object.values(err.errors).map(e => e.message) })
    });
  }
},

 login: async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) return res.status(400).json({ msg: "Email et mot de passe requis" });

      const user = await Users.findOne({ email });
      if (!user) return res.status(400).json({ msg: "Utilisateur non trouvé." });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ msg: "Mot de passe incorrect." });

      const accessToken = createAccessToken({ id: user._id, role: user.role });
      const refreshToken = createRefreshToken({ id: user._id, role: user.role });
      await Users.findByIdAndUpdate(user._id, { refreshToken });

      res.cookie('refreshtoken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/user/refresh_token',
        maxAge: 7 * 24 * 60 * 60 * 1000
      });

      const userResponse = {
        _id: user._id,
        parentName: user.parentName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        address: user.address,
        plan: user.plan,
        children: user.children,
        role: user.role
      };

      res.json({ msg: "Connexion réussie", token: accessToken, user: userResponse });
    } catch (err) {
      console.error('Erreur login:', err);
      return res.status(500).json({ msg: "Erreur serveur" });
    }
  },

   logout: async (req, res) => {
    try {
      const refreshToken = req.cookies.refreshtoken;
      if (!refreshToken) return res.status(400).json({ msg: "Pas de token trouvé" });

      const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
      await Users.findByIdAndUpdate(decoded.id, { $unset: { refreshToken: 1 } });

      res.clearCookie('refreshtoken', { 
        path: '/user/refresh_token',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
      });

      return res.json({ msg: "Déconnexion réussie" });
    } catch (err) {
      console.error('Erreur logout:', err);
      return res.status(500).json({ msg: err.message });
    }
  },

    refreshToken: async (req, res) => {
    try {
      const refreshToken = req.cookies.refreshtoken;
      if (!refreshToken) return res.status(401).json({ msg: "Non authentifié" });

      const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
      const user = await Users.findOne({ _id: decoded.id, refreshToken });
      if (!user) return res.status(403).json({ msg: "Token invalide" });

      const newAccessToken = createAccessToken({ id: user._id, role: user.role });
      res.json({ token: newAccessToken });
    } catch (err) {
      console.error('Erreur refreshToken:', err);
      return res.status(500).json({ msg: "Erreur d'authentification" });
    }
  },

 getUser: async (req, res) => {
    try {
      const user = await Users.findById(req.user.id).select('-password -refreshToken');
      if (!user) return res.status(404).json({ msg: "Utilisateur non trouvé." });
      res.json(user);
    } catch (err) {
      console.error('Erreur lors de la récupération du user:', err);
      return res.status(500).json({ msg: "Erreur serveur" });
    }
  },
   getNewUsers: async (req, res) => {
    try {
      // if (req.user.role !== 'admin') {
      //   return res.status(403).json({ msg: "Accès non autorisé" });
      // }

      const newUsers = await Users.find({ isNewUser: true })
        .select('-password -refreshToken')
        .sort({ createdAt: -1 });

      res.json(newUsers);
    } catch (err) {
      console.error('Erreur lors de la récupération des nouveaux users:', err);
      return res.status(500).json({ msg: "Erreur serveur" });
    }
  },

    getAllUsers: async (req, res) => {
        try {
            // Vérification du rôle admin
            // if (req.user.role !== 'admin') {
            //     return res.status(403).json({ msg: "Accès non autorisé" });
            // }

            const users = await Users.find()
                .select('-password -refreshToken');
                
            res.json(users);
        } catch (err) {
            console.error('Erreur lors de la récupération des users:', err);
            return res.status(500).json({ msg: "Erreur serveur" });
        }
    },

    updateUser: async (req, res) => {
        try {
            const { id } = req.params;
            const updateData = req.body;

            // Vérification des permissions
            if (req.user.id !== id && req.user.role !== 'admin') {
                return res.status(403).json({ msg: "Non autorisé" });
            }

            // Exclusion des champs sensibles
            delete updateData.password;
            delete updateData.role;
            delete updateData.refreshToken;

            // Mise à jour
            const updatedUser = await Users.findByIdAndUpdate(
                id, 
                updateData, 
                { new: true, runValidators: true }
            ).select('-password -refreshToken');

            if (!updatedUser) {
                return res.status(404).json({ msg: "Utilisateur non trouvé" });
            }

            res.json({
                msg: "Mise à jour réussie",
                user: updatedUser
            });

        } catch (err) {
            console.error('Erreur lors de la mise à jour:', err);
            return res.status(500).json({ 
                msg: err.message,
                ...(err.errors && { errors: Object.values(err.errors).map(e => e.message) })
            });
        }
    },
     markUserAsSeen: async (req, res) => {
    try {
      // if (req.user.role !== 'admin') {
      //   return res.status(403).json({ msg: "Accès non autorisé" });
      // }

      const { id } = req.params;
      const updatedUser = await Users.findByIdAndUpdate(id, { isNewUser: false }, { new: true });
      if (!updatedUser) return res.status(404).json({ msg: "Utilisateur non trouvé" });

      res.json({ msg: "Utilisateur marqué comme vu", user: updatedUser });
    } catch (err) {
      console.error('Erreur lors du marquage:', err);
      return res.status(500).json({ msg: "Erreur serveur" });
    }
  },

    updateQuizScore: async (req, res) => {
        try {
            const { userId, category, score } = req.body;

            // Vérification des permissions
            if (req.user.id !== userId && req.user.role !== 'admin') {
                return res.status(403).json({ msg: "Non autorisé" });
            }

            // Mise à jour du score
            const user = await Users.findById(userId);
            if (!user) return res.status(404).json({ msg: "Utilisateur non trouvé." });

            let quizScore = user.quizScores.find(s => s.category === category);
            if (!quizScore) {
                quizScore = { category, firstScore: score, bestScore: score };
                user.quizScores.push(quizScore);
            } else {
                if (quizScore.firstScore === 0) {
                    quizScore.firstScore = score;
                }
                if (score > quizScore.bestScore) {
                    quizScore.bestScore = score;
                }
            }

            await user.save();

            res.json({
                msg: "Score mis à jour",
                quizScores: user.quizScores
            });

        } catch (err) {
            console.error('Erreur lors de la mise à jour du score:', err);
            return res.status(500).json({ msg: "Erreur serveur" });
        }
    }
};


// Helper functions
const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '7d' });
};

const createRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
};

module.exports = userCtrl;