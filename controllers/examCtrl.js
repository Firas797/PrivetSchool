const Exam = require('../models/examModel');

const examCtrl = {
  // ✅ Create Exam
  createExam: async (req, res) => {
    try {
      const { Title, description, classe, category } = req.body;

      const newExam = new Exam({
        Title,
        description,
        classe,
        category,
        file: req.file
          ? { data: req.file.buffer, contentType: req.file.mimetype }
          : undefined,
      });

      await newExam.save();
      res.status(201).json({ msg: 'Exam created successfully', exam: newExam });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },

  // ✅ Get All Exams
  getAllExams: async (req, res) => {
    try {
      const exams = await Exam.find().sort({ createdAt: -1 }); // Added sorting
      res.json(exams);
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },

  // ✅ NEW: Get Exams By Class
  getExamsByClass: async (req, res) => {
    try {
      const { classe } = req.params;
      const exams = await Exam.find({ classe }).sort({ createdAt: -1 });
      res.status(200).json(exams);
    } catch (err) {
      res.status(500).json({ msg: 'Error fetching class exams', error: err.message });
    }
  },

  // ✅ Get Exam By ID
  getExamById: async (req, res) => {
    try {
      const exam = await Exam.findById(req.params.id);
      if (!exam) return res.status(404).json({ msg: 'Exam not found' });
      res.json(exam);
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },

  // ✅ Update Exam
  updateExam: async (req, res) => {
    try {
      const { Title, description, classe, category } = req.body;
      const updateData = { Title, description, classe, category };

      if (req.file) {
        updateData.file = {
          data: req.file.buffer,
          contentType: req.file.mimetype,
        };
      }

      const updatedExam = await Exam.findByIdAndUpdate(req.params.id, updateData, { new: true });
      if (!updatedExam) return res.status(404).json({ msg: 'Exam not found' });

      res.json({ msg: 'Exam updated successfully', exam: updatedExam });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },

  // ✅ Delete Exam
  deleteExam: async (req, res) => {
    try {
      const exam = await Exam.findByIdAndDelete(req.params.id);
      if (!exam) return res.status(404).json({ msg: 'Exam not found' });
      res.json({ msg: 'Exam deleted successfully' });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = examCtrl;