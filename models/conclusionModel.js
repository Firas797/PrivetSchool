const mongoose = require('mongoose');

const conclusionSchema = new mongoose.Schema({
    Title: {
        type: String,
        required: true,
        default: ''
    },
   
    classe: {
        type: String,
        required: true,
    },
   
    conclusion: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    pdfFile: {
        data: Buffer, // Store the PDF file as a Buffer
        contentType: String // Mime type of the PDF file
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('conclusion', conclusionSchema);
