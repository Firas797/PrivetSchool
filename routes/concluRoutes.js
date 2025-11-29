const express = require('express');
const router = express.Router();
const concluCtrl = require('../controllers/concluCtrl');
const multer = require('multer');

// Configure multer
const storage = multer.memoryStorage();
const upload = multer({ storage });

// ✅ Routes
router.post('/', upload.single('pdfFile'), concluCtrl.createConclusion); // Create
router.get('/', concluCtrl.getAllConclusions); // Get all

router.get('/class/:classe', concluCtrl.getConclusionsByClass); // Get by class
router.get('/details/:id', concluCtrl.getConclusionById); // Get single
router.delete('/:id', concluCtrl.deleteConclusion); // Delete

module.exports = router;
