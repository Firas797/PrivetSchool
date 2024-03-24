const fs = require('fs'); // Node.js file system module
const path = require('path'); // Node.js path module
const multer = require('multer'); // For handling file uploads
const Courses = require('./../models/coursModel'); // Update the path to your model

const storage = multer.memoryStorage(); // Store file as Buffer in memory


const courseCtrl = {
    createCourse: async (req, res) => {
        try {
            const { Title, classe, urlVid, description, category } = req.body;

            const newCourse = new Courses({
                Title,
                classe,
                urlVid,
                description,
                category,
                pdfFile: req.file ? req.file.path : '' // Store the file path
            });

            await newCourse.save();

            res.status(201).json({ msg: 'Course created successfully', course: newCourse });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
   

    getAllCourses: async (req, res) => {
        try {
            const courses = await Courses.find();
            res.json(courses);
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    getCourseById: async (req, res) => {
        try {
            const course = await Courses.findById(req.params.id);
            if (!course) {
                return res.status(404).json({ msg: 'Course not found' });
            }
            res.json(course);
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    updateCourse: async (req, res) => {
        try {
            const { Title,  classe, urlVid, description, category } = req.body;

            const updatedCourse = {
                Title,
                
                classe,
                urlVid,
                description,
                category
            };

            if (req.file) {
                updatedCourse.pdfFile = {
                    data: req.file.buffer,
                    contentType: req.file.mimetype
                };
            }

            const course = await Courses.findByIdAndUpdate(req.params.id, updatedCourse, { new: true });

            if (!course) {
                return res.status(404).json({ msg: 'Course not found' });
            }

            res.json({ msg: 'Course updated successfully', course });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    deleteCourse: async (req, res) => {
        try {
            const course = await Courses.findByIdAndDelete(req.params.id);

            if (!course) {
                return res.status(404).json({ msg: 'Course not found' });
            }

            res.json({ msg: 'Course deleted successfully' });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }
};

module.exports = courseCtrl;
