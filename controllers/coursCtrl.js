const Courses = require('../models/coursModel');

const courseCtrl = {
  // ✅ Create course (PDF optional, YouTube URL optional)
  createCourse: async (req, res) => {
    try {
      const { Title, classe, urlVid, description, category } = req.body;

      const newCourse = new Courses({
        Title,
        classe,
        urlVid: urlVid || '', // optional
        description,
        category,
        pdfFile: req.file
          ? { data: req.file.buffer, contentType: req.file.mimetype }
          : undefined, // optional
      });

      await newCourse.save();
      res.status(201).json({ msg: 'Course created successfully', course: newCourse });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },

  getAllCourses: async (req, res) => {
    try {
      const courses = await Courses.find();
      res.json(courses);
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },

  getCourseById: async (req, res) => {
    try {
      const course = await Courses.findById(req.params.id);
      if (!course) return res.status(404).json({ msg: 'Course not found' });
      res.json(course);
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },

  updateCourse: async (req, res) => {
    try {
      const { Title, classe, urlVid, description, category } = req.body;
      const updateData = { Title, classe, urlVid, description, category };

      if (req.file) {
        updateData.pdfFile = {
          data: req.file.buffer,
          contentType: req.file.mimetype,
        };
      }

      const updatedCourse = await Courses.findByIdAndUpdate(req.params.id, updateData, { new: true });
      if (!updatedCourse) return res.status(404).json({ msg: 'Course not found' });

      res.json({ msg: 'Course updated successfully', course: updatedCourse });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },

  deleteCourse: async (req, res) => {
    try {
      const course = await Courses.findByIdAndDelete(req.params.id);
      if (!course) return res.status(404).json({ msg: 'Course not found' });
      res.json({ msg: 'Course deleted successfully' });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = courseCtrl;
