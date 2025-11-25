// routes/concluRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const concluCtrl = require('../controllers/concluCtrl');

// Configure multer for memory storage (storing file in buffer)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Routes
router.post('/', upload.single('pdfFile'), concluCtrl.createConclusion); // Add new conclusion
router.get('/', concluCtrl.getAllConclusions); // Get all conclusions
router.get('/:classe', concluCtrl.getConclusionsByClass); // Get by class
router.get('/details/:id', concluCtrl.getConclusionById); // Get single conclusion
router.delete('/:id', concluCtrl.deleteConclusion); // Delete conclusion

module.exports = router;
