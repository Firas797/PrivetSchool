const router = require('express').Router()
const userCtrl = require('../controllers/userCtrl')
const multer = require('multer')
const path = require('path')
const auth = require('../middleware/auth')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/profile-pictures/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, 'profile-' + uniqueSuffix + path.extname(file.originalname))
  }
})

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: function (req, file, cb) {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true)
    } else {
      cb(new Error('Only image files are allowed!'), false)
    }
  }
})


router.post('/register', userCtrl.register)

router.post('/login', userCtrl.login)

router.get('/logout', userCtrl.logout)

router.get('/refresh_token', userCtrl.refreshToken)

router.get('/infor', auth,  userCtrl.getUser)

router.get('/all_users', userCtrl.getAllUsers);

router.post('/update_quiz_score', auth, userCtrl.updateQuizScore); // Update quiz scores

 
router.get("/new-inscriptions",  userCtrl.getNewUsers); // ✅ new route we added
router.patch("/mark-user-reviewed/:id",  userCtrl.markUserAsSeen); // ✅ new route

// Add these new routes for profile pictures
router.patch('/update-profile-picture',auth, upload.single('profilePicture'), userCtrl.updateProfilePicture)
router.patch('/update-child-profile-picture/:childId',auth, upload.single('profilePicture'), userCtrl.updateChildProfilePicture)
module.exports = router