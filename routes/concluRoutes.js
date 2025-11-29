// routes/concluRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const concluCtrl = require('../controllers/concluCtrl');

// Configure multer for memory storage (storing file in buffer)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Routes
router.post('/', upload.single('pdfFile'), concluCtrl.createConclusion); 
router.get('/', concluCtrl.getAllConclusions);

// FIXED ✔
router.get('/details/:id', concluCtrl.getConclusionById); 

// Put this LAST ❗
router.get('/:classe', concluCtrl.getConclusionsByClass);

router.delete('/:id', concluCtrl.deleteConclusion);
module.exports = router;
