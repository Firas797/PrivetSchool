const express = require('express');
const Quiz = require('../models/quizModel');
const User = require('../models/userModel');
const router = express.Router();

// ✅ Get all quizzes or filter by classLevel and/or type
router.get('/', async (req, res) => {
  try {
    const { classLevel, type, category } = req.query;
    const filter = {};
    if (classLevel) filter.classLevel = classLevel;
    if (type) filter.type = type;
    if (category) filter.category = category;

    const quizzes = await Quiz.find(filter).populate('createdBy', 'name email');
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch quizzes" });
  }
});

// ✅ UPDATED Backend Route - /routes/quizRoutes.js
router.post('/createQuiz', async (req, res) => {
  try {
    console.log('📥 Received quiz creation request:', req.body);
    
    const { title, category, classLevel, type, questions, difficulty, createdBy } = req.body;

    // Log each field for debugging
    console.log('🔍 Field check:', {
      title: !!title,
      category: !!category,
      classLevel: !!classLevel,
      type: !!type,
      questions: questions?.length,
      createdBy: !!createdBy
    });

    // Simple validation
    if (!title || !category || !classLevel || !type || !questions?.length || !createdBy) {
      console.log('❌ Validation failed - missing fields');
      return res.status(400).json({ 
        error: "Please fill all required fields",
        missing: {
          title: !title,
          category: !category,
          classLevel: !classLevel,
          type: !type,
          questions: !questions?.length,
          createdBy: !createdBy
        }
      });
    }

    console.log('✅ Validation passed, creating quiz...');

    // ✅ Handle both ObjectId and String for createdBy
    const quizData = {
      title, 
      category, 
      classLevel, 
      type, 
      questions, 
      difficulty, 
      createdBy, // Can be ObjectId or String
      teacherName: typeof createdBy === 'string' ? createdBy : undefined // Store name if string
    };

    console.log('📝 Final quiz data:', quizData);

    const newQuiz = new Quiz(quizData);
    
    console.log('💾 Saving quiz to database...');
    await newQuiz.save();
    console.log('✅ Quiz saved successfully:', newQuiz._id);
    
    res.status(201).json({ 
      message: "Quiz created successfully", 
      quiz: newQuiz 
    });

  } catch (error) {
    console.error('❌ Quiz creation error:', error);
    console.error('❌ Error details:', error.message);
    console.error('❌ Error stack:', error.stack);
    res.status(500).json({ 
      error: "Failed to create quiz",
      details: error.message 
    });
  }
});
// ✅ Submit quiz attempt
router.post('/:quizId/attempt', async (req, res) => {
  try {
    const { userId, answers } = req.body;
    const { quizId } = req.params;

    const quiz = await Quiz.findById(quizId);
    if (!quiz) return res.status(404).json({ error: "Quiz not found" });

    let score = 0;
    quiz.questions.forEach((q, i) => {
      if (String(q.correctAnswer).trim() === String(answers[i]).trim()) score++;
    });

    const percentageScore = (score / quiz.questions.length) * 100;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    let quizScore = user.quizScores.find(s => s.quizId?.toString() === quizId);
    if (!quizScore) {
      quizScore = { quizId, category: quiz.category, firstScore: percentageScore, bestScore: percentageScore };
      user.quizScores.push(quizScore);
    } else {
      if (quizScore.firstScore === 0) quizScore.firstScore = percentageScore;
      if (percentageScore > quizScore.bestScore) quizScore.bestScore = percentageScore;
    }

    await user.save();

    res.json({
      message: percentageScore === 100 
        ? "Quiz passed! You can proceed to the next quiz."
        : "You need to score 100% to proceed.",
      score: percentageScore,
      firstScore: quizScore.firstScore,
      bestScore: quizScore.bestScore
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to process quiz attempt" });
  }
});

module.exports = router;
