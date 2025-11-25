const multer = require('multer');
const path = require('path'); // ✅ Add this line

// ✅ Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/'); // Make sure this folder exists
  },
  filename: (req, file, cb) => {
    // Example: 1731503200000.pdf
    cb(null, Date.now() + path.extname(file.originalname)); 
  },
});

// ✅ Create the multer instance
const upload = multer({ storage });

module.exports = upload;
