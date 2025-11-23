const Culture = require('../models/cultureModel');
const path = require('path');
const fs = require('fs');

exports.createCulture = async (req, res) => {
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
};

exports.getCultures = async (req, res) => {
  try {
    const cultures = await Culture.find().populate('createdBy', 'name');
    res.json(cultures);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching culture items' });
  }
};

exports.getCultureById = async (req, res) => {
  try {
    const culture = await Culture.findById(req.params.id);
    if (!culture) return res.status(404).json({ message: 'Culture not found' });
    res.json(culture);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching culture item' });
  }
};

exports.deleteCulture = async (req, res) => {
  try {
    const culture = await Culture.findById(req.params.id);
    if (!culture) return res.status(404).json({ message: 'Culture not found' });

    if (culture.image) {
      const filePath = path.join(__dirname, '..', culture.image);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    await culture.deleteOne();
    res.json({ message: 'Culture deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting culture item' });
  }
};
