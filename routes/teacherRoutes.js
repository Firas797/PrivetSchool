const router = require('express').Router();
const teacherCtrl = require('../controllers/TeacherCtrl');
const auth = require('../middleware/auth');

router.post('/registerTeacher', teacherCtrl.register);

router.post('/loginTeacher', teacherCtrl.login);

router.get('/logoutTeacher', teacherCtrl.logout);

router.get('/refresh_token', teacherCtrl.refreshToken);

router.get('/getTeachers',  teacherCtrl.getTeacher);
router.get('/getAllTeachers',  teacherCtrl.getAllTeachers);



router.put('/UpdateTeacher/:id', teacherCtrl.updateTeacher);
router.put('/deleteTeacher/:id', teacherCtrl.deleteTeacher);




module.exports = router;
