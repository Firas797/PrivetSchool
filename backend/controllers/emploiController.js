const Emploi = require("../models/emploiModel");

// Create or Update emploi for a class
const createOrUpdateEmploi = async (req, res) => {
  try {
    const { class: className } = req.body;
    const emploiImage = req.file ? `/uploads/emplois/${req.file.filename}` : null;

    if (!className || !emploiImage)
      return res.status(400).json({ message: "Class and image are required" });

    let emploi = await Emploi.findOne({ className });

    if (!emploi) {
      emploi = new Emploi({ className, emploiImage });
    } else {
      emploi.emploiImage = emploiImage;
    }

    await emploi.save();
    res.status(200).json(emploi);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};


// Get emploi by class
const getEmploiByClass = async (req, res) => {
  try {
    const emploi = await Emploi.findOne({ className: req.params.className });
    if (!emploi) return res.status(404).json({ message: "Emploi not found" });
    res.status(200).json(emploi);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete emploi for a specific day
const deleteEmploiDay = async (req, res) => {
  try {
    const { className, dayNumber } = req.params;
    const emploi = await Emploi.findOne({ className });
    if (!emploi) return res.status(404).json({ message: "Emploi not found" });

    emploi.days = emploi.days.filter((d) => d.dayNumber !== Number(dayNumber));
    await emploi.save();
    res.status(200).json({ message: "Day deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createOrUpdateEmploi,
  getEmploiByClass,
  deleteEmploiDay,
};
