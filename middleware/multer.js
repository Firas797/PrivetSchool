const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/'); // Change the destination folder accordingly
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Rename the file
    }
});

const upload = multer({ storage: storage });

module.exports = upload;