const fs = require('fs'); // Node.js file system module
const path = require('path'); // Node.js path module
const multer = require('multer'); // For handling file uploads
const HomeWork = require('./../models/Hw'); // Update the path to your model

const storage = multer.memoryStorage(); // Store file as Buffer in memory


const HwCtrl = {
    createHw: async (req, res) => {
        try {
            const { Title, classe,  description, category } = req.body;

            const newHw = new HomeWork({
                Title,
                classe,
                description,
                category,
                pdfFile: req.file ? req.file.path : '' // Store the file path
            });

            await newHw.save();

            res.status(201).json({ msg: 'Course created successfully', course: newHw });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
   

    getAllHw: async (req, res) => {
        try {
            const HomeWork = await HomeWork.find();
            res.json(HomeWork);
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    getHwById: async (req, res) => {
        try {
            const HomeWork = await HomeWork.findById(req.params.id);
            if (!course) {
                return res.status(404).json({ msg: 'Course not found' });
            }
            res.json(HomeWork);
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    updateHw: async (req, res) => {
        try {
            const { Title,  classe,  description, category } = req.body;

            const updatedCourse = {
                Title,
                classe,
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

    deleteHw: async (req, res) => {
        try {
            const HomeWork = await HomeWork.findByIdAndDelete(req.params.id);

            if (!HomeWork) {
                return res.status(404).json({ msg: 'Course not found' });
            }

            res.json({ msg: 'Course deleted successfully' });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }
};

module.exports = HwCtrl;
