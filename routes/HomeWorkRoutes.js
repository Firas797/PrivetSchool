const express = require('express');
const router = express.Router();
const upload = require('../middleware/multer'); // Update the path to your middleware
const HwCtrl = require('../controllers/HwCtrl')
// Set up multer for file upload

// Create a new course
router.post('/createHw', upload.single('pdfFile'), HwCtrl.createHw);

// Get all courses
router.get('/', HwCtrl.getAllHw);

// Get a specific course by ID
router.get('/:id', HwCtrl.getHwById);

// Update a course by ID
router.put('/:id', upload.single('pdfFile'), HwCtrl.updateHw);

// Delete a course by ID
router.delete('/:id', HwCtrl.deleteHw);

module.exports = router;
