const express = require("express");
const router = express.Router();
const examCtrl = require("../controllers/examCtrl");
const upload = require("../middleware/multer");
const path = require("path");

// ✅ إنشاء امتحان جديد (مع إمكانية رفع ملف PDF أو صورة)
router.post("/createExam", upload.single("file"), examCtrl.createExam);

// ✅ جلب جميع الامتحانات
router.get("/", examCtrl.getAllExams);

// ✅ NEW: جلب الامتحانات حسب الصف
router.get("/class/:classe", examCtrl.getExamsByClass);

// ✅ جلب امتحان حسب المعرّف
router.get("/:id", examCtrl.getExamById);

// ✅ تحديث امتحان (مع إمكانية تحديث الملف)
router.put("/:id", upload.single("file"), examCtrl.updateExam);

// ✅ حذف امتحان
router.delete("/:id", examCtrl.deleteExam);

module.exports = router;