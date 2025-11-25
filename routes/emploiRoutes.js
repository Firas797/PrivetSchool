const express = require("express");
const multer = require("multer");
const {
  createOrUpdateEmploi,
  getEmploiByClass,
  deleteEmploiDay,
} = require("../controllers/emploiController");

const router = express.Router();

// Multer setup for emploi images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/emplois/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Routes
router.post("/", upload.single("image"), createOrUpdateEmploi);
router.get("/:className", getEmploiByClass);
router.delete("/:className/:dayNumber", deleteEmploiDay);

module.exports = router;
