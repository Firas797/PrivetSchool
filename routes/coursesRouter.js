const express = require('express');
const router = express.Router();
const courseCtrl = require('../controllers/coursCtrl'); // Update the path to your controller
const upload = require('../middleware/multer'); // Update the path to your middleware

// Set up multer for file upload

// Create a new course
router.post('/createCourse', upload.single('pdfFile'), courseCtrl.createCourse);

// Get all courses
router.get('/', courseCtrl.getAllCourses);

// Get a specific course by ID
router.get('/:id', courseCtrl.getCourseById);

// Update a course by ID
router.put('/:id', upload.single('pdfFile'), courseCtrl.updateCourse);

// Delete a course by ID
router.delete('/:id', courseCtrl.deleteCourse);

module.exports = router;
