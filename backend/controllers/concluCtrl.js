// controllers/concluCtrl.js
const Conclusion = require('../models/conclusionModel');

// Create a new conclusion
exports.createConclusion = async (req, res) => {
  try {
    const { Title, classe, conclusion, category } = req.body;
    let pdfFile = null;

    if (req.file) {
      pdfFile = {
        data: req.file.buffer,
        contentType: req.file.mimetype
      };
    }

    const newConclusion = new Conclusion({
      Title,
      classe,
      conclusion,
      category,
      pdfFile
    });

    await newConclusion.save();
    res.status(201).json({ message: 'Conclusion created successfully', data: newConclusion });
  } catch (error) {
    res.status(500).json({ message: 'Error creating conclusion', error: error.message });
  }
};

// Get all conclusions
exports.getAllConclusions = async (req, res) => {
  try {
    const conclusions = await Conclusion.find().sort({ createdAt: -1 });
    res.status(200).json(conclusions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching conclusions', error: error.message });
  }
};

// Get conclusions by class
exports.getConclusionsByClass = async (req, res) => {
  try {
    const { classe } = req.params;
    const conclusions = await Conclusion.find({ classe }).sort({ createdAt: -1 });
    res.status(200).json(conclusions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching class conclusions', error: error.message });
  }
};

// Get a single conclusion by ID
exports.getConclusionById = async (req, res) => {
  try {
    const conclusion = await Conclusion.findById(req.params.id);
    if (!conclusion) return res.status(404).json({ message: 'Conclusion not found' });
    res.status(200).json(conclusion);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching conclusion', error: error.message });
  }
};

// Delete conclusion
exports.deleteConclusion = async (req, res) => {
  try {
    await Conclusion.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Conclusion deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting conclusion', error: error.message });
  }
};
