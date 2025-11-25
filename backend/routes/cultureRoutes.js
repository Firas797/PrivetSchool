// routes/cultureRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Culture = require('../models/cultureModel');

// ✅ Setup multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = 'uploads/culture';
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// ✅ Create culture
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { title, description, createdBy } = req.body;
    const image = req.file ? `/uploads/culture/${req.file.filename}` : null;

    const culture = new Culture({ title, description, image, createdBy });
    await culture.save();

    res.status(201).json(culture);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating culture item' });
  }
});

// ✅ Get all cultures
router.get('/', async (req, res) => {
  try {
    const cultures = await Culture.find().sort({ createdAt: -1 });
    res.json(cultures);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching culture items' });
  }
});

// ✅ Get single culture
router.get('/:id', async (req, res) => {
  try {
    const culture = await Culture.findById(req.params.id);
    if (!culture) return res.status(404).json({ message: 'Culture not found' });
    res.json(culture);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching culture item' });
  }
});

// ✅ Delete culture
router.delete('/:id', async (req, res) => {
  try {
    const culture = await Culture.findById(req.params.id);
    if (!culture) return res.status(404).json({ message: 'Culture not found' });

    // ✅ Delete image file if it exists
    if (culture.image) {
      const filePath = path.join(__dirname, '..', culture.image);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await culture.deleteOne();
    res.json({ message: 'Culture deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting culture item' });
  }
});

module.exports = router;
