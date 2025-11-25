const HomeWork = require('../models/Hw');

const HwCtrl = {
  // Create a new homework
  createHw: async (req, res) => {
    try {
      const { title, classe, description, category } = req.body;

      const newHw = new HomeWork({
        title,
        classe,
        description,
        category,
        pdfFile: req.file ? req.file.path : ''
      });

      await newHw.save();
      res.status(201).json({ msg: 'Homework created successfully', homeWork: newHw });
    } catch (err) {
      console.error('Error creating homework:', err);
      return res.status(500).json({ msg: err.message });
    }
  },

  // Get all homeworks
  getAllHw: async (req, res) => {
    try {
      const homeworks = await HomeWork.find();
      res.json(homeworks);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  // Get homework by ID
  getHwById: async (req, res) => {
    try {
      const homework = await HomeWork.findById(req.params.id);
      if (!homework) {
        return res.status(404).json({ msg: 'Homework not found' });
      }
      res.json(homework);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  // Update homework
  updateHw: async (req, res) => {
    try {
      const { title, classe, description, category } = req.body;

      const updatedHw = { title, classe, description, category };
      if (req.file) updatedHw.pdfFile = req.file.path;

      const homework = await HomeWork.findByIdAndUpdate(req.params.id, updatedHw, { new: true });
      if (!homework) return res.status(404).json({ msg: 'Homework not found' });

      res.json({ msg: 'Homework updated successfully', homeWork: homework });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  // Delete homework
  deleteHw: async (req, res) => {
    try {
      const homework = await HomeWork.findByIdAndDelete(req.params.id);
      if (!homework) return res.status(404).json({ msg: 'Homework not found' });

      res.json({ msg: 'Homework deleted successfully' });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  // ✅ Get homeworks by class number
  getHwByClass: async (classNumber) => {
    try {
      const homeworks = await HomeWork.find({ classe: classNumber });
      return homeworks;
    } catch (error) {
      throw new Error(error.message);
    }
  }
};

module.exports = HwCtrl;
