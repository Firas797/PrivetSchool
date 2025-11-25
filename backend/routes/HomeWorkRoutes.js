const express = require('express');
const router = express.Router();
const upload = require('../middleware/multer');
const HwCtrl = require('../controllers/HwCtrl');

// // ✅ Get homeworks by class number (move it up here)
// Get homeworks by class
router.get('/by-class/:classNumber', async (req, res) => {
  try {
    const { classNumber } = req.params;
    const homeworks = await HwCtrl.getHwByClass(classNumber);
    res.json(homeworks);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Create a new homework
router.post('/createHw', upload.single('pdfFile'), HwCtrl.createHw);

// Get all homeworks
router.get('/', HwCtrl.getAllHw);

// Get a specific homework by ID
router.get('/:id', HwCtrl.getHwById);

// Update a homework by ID
router.put('/:id', upload.single('pdfFile'), HwCtrl.updateHw);

// Delete a homework by ID
router.delete('/:id', HwCtrl.deleteHw);

module.exports = router;
