const express = require('express');
const router = express.Router();
const courseCtrl = require('../controllers/coursCtrl');
const upload = require('../middleware/multer');

// ✅ Create a new course (PDF optional)
router.post('/createCourse', upload.single('pdfFile'), courseCtrl.createCourse);

// ✅ Get all courses
router.get('/', courseCtrl.getAllCourses);

// ✅ Get one course by ID
router.get('/:id', courseCtrl.getCourseById);

// ✅ Update course (PDF optional)
router.put('/:id', upload.single('pdfFile'), courseCtrl.updateCourse);

// ✅ Delete course
router.delete('/:id', courseCtrl.deleteCourse);

module.exports = router;
