const express = require('express');
const Quiz = require('../models/quizModel');
const User = require('../models/userModel'); // Import the User model
const router = express.Router();

// Get all quizzes
router.get('/', async (req, res) => {
    try {
        const quizzes = await Quiz.find();
        res.json(quizzes);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch quizzes" });
    }
});

// Get quizzes by category (HTML, CSS, etc.)
router.get('/:category', async (req, res) => {
    try {
        const quizzes = await Quiz.find({ category: req.params.category });
        res.json(quizzes);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch quizzes by category" });
    }
});

// Create a new quiz
router.post('/', async (req, res) => {
    try {
        const { title, category, questions, difficulty } = req.body;

        // Validate request data
        if (!title || !category || !questions || !Array.isArray(questions) || questions.length === 0) {
            return res.status(400).json({ error: "Invalid quiz data" });
        }

        const newQuiz = new Quiz({ title, category, questions, difficulty });
        await newQuiz.save();
        res.status(201).json({ message: "Quiz Added Successfully", quiz: newQuiz });

    } catch (error) {
        res.status(500).json({ error: "Failed to create quiz" });
    }
});

// Submit quiz attempt
router.post('/:category/attempt', async (req, res) => {
    try {
        const { userId, answers } = req.body;
        const category = req.params.category;

        // Fetch the quiz for the given category
        const quiz = await Quiz.findOne({ category });
        if (!quiz) {
            return res.status(404).json({ error: "Quiz not found" });
        }

        // Calculate the score
        let score = 0;
        quiz.questions.forEach((question, index) => {
            if (question.correctAnswer === answers[index]) {
                score++;
            }
        });

        const percentageScore = (score / quiz.questions.length) * 100;

        // Fetch the user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Find or create the quiz score entry for the category
        let quizScore = user.quizScores.find(score => score.category === category);
        if (!quizScore) {
            quizScore = { category, firstScore: percentageScore, bestScore: percentageScore };
            user.quizScores.push(quizScore);
        } else {
            if (quizScore.firstScore === 0) {
                quizScore.firstScore = percentageScore;
            }
            if (percentageScore > quizScore.bestScore) {
                quizScore.bestScore = percentageScore;
            }
        }

        // Save the user with updated scores
        await user.save();

        // Check if the user can proceed to the next quiz
        if (percentageScore === 100) {
            res.json({ 
                message: "Quiz passed! You can proceed to the next quiz.", 
                score: percentageScore, 
                firstScore: quizScore.firstScore, 
                bestScore: quizScore.bestScore 
            });
        } else {
            res.status(403).json({ 
                message: "You need to score 100% to proceed to the next quiz.", 
                score: percentageScore, 
                firstScore: quizScore.firstScore, 
                bestScore: quizScore.bestScore 
            });
        }

    } catch (error) {
        res.status(500).json({ error: "Failed to process quiz attempt" });
    }
});

module.exports = router;