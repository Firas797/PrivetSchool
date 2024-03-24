const Teacher = require("../models/TeacherModel"); // Import the Teacher model
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const teacherCtrl = {
  register: async (req, res) => {
    try {
      const { name, age, numTel, classes, desc, subject, email, password } = req.body;

      const teacher = await Teacher.findOne({ email });
      if (teacher) return res.status(400).json({ msg: "The email already exists." });

      if (password.length < 6) {
        return res.status(400).json({ msg: "Password should be at least 6 characters long." });
      }

      // Password Encryption
      const passwordHash = await bcrypt.hash(password, 10);
      const newTeacher = new Teacher({
        name,
        age,
        numTel,
        classes,
        desc,
        subject,
        email,
        password: passwordHash,
      });

      // Save to MongoDB
      await newTeacher.save();

      // Then create jsonwebtoken for authentication
      const accessToken = createAccessToken({ id: newTeacher._id });
      const refreshToken = createRefreshToken({ id: newTeacher._id });

      res.cookie("refreshtoken", refreshToken, {
        httpOnly: true,
        path: "/teacher/refresh_token",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      res.json({ token: accessToken }); // Send the access token in the response

    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const teacher = await Teacher.findOne({ email });
      if (!teacher) return res.status(400).json({ msg: "Teacher does not exist." });

      const isMatch = await bcrypt.compare(password, teacher.password);
      if (!isMatch) return res.status(400).json({ msg: "Incorrect password." });

      // If login success, create access token and refresh token
      const accessToken = createAccessToken({ id: teacher._id });
      const refreshToken = createRefreshToken({ id: teacher._id });

      res.cookie("refreshtoken", refreshToken, {
        httpOnly: true,
        path: "/teacher/refresh_token",
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
      });

      res.json({
        msg: "Teacher logged",
        teacher: {
          name: teacher.name,
          email: teacher.email,
          role: teacher.role,
          subject: teacher.subject
        },
        token: accessToken
      });

    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  logout: async (req, res) => {
    try {
      res.clearCookie("refreshtoken", { path: "/teacher/refresh_token" });
      return res.json({ msg: "Logged out" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  refreshToken: (req, res) => {
    try {
      const rf_token = req.cookies.refreshtoken;
      if (!rf_token) return res.status(400).json({ msg: "Please Login or Register" });

      jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, teacher) => {
        if (err) return res.status(400).json({ msg: "Please Login or Register" });

        const accessToken = createAccessToken({ id: teacher.id });

        res.json({ accessToken });
      });

    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getTeacher: async (req, res) => {
    try {
      const teacher = await Teacher.findById(req.teacher.id).select("-password");
      if (!teacher) return res.status(400).json({ msg: "Teacher does not exist." });

      res.json(teacher);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getAllTeachers : async (req , res)=>{
    try{
const teachers = await Teacher.find();
if (!teachers || teachers.length === 0) {
  return res.status(404).json({ msg: "No teachers found." });
}
res.json(teachers);


    }catch (err) {      return res.status(500).json({ msg: err.message });
  }
  },
  
  updateTeacher : async (req, res) => {
    try {
      const { name, age, numTel, class: teacherClass, desc, subject, email, password } = req.body;
  
      const updatedData = {
        name,
        age,
        numTel,
        class: teacherClass,
        desc,
        subject,
        email,
      };
  
      if (password) {
        if (password.length < 6) {
          return res.status(400).json({ msg: "Password should be at least 6 characters long." });
        }
        const passwordHash = await bcrypt.hash(password, 10);
        updatedData.password = passwordHash;
      }
  
      const teacher = await Teacher.findByIdAndUpdate(req.params.id, updatedData, { new: true });
  
      if (!teacher) return res.status(400).json({ msg: "Teacher does not exist." });
  
      res.json(teacher);
  
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  
  
   deleteTeacher : async (req, res) => {
    try {
      const teacher = await Teacher.findByIdAndDelete(req.params.id);
      if (!teacher) return res.status(400).json({ msg: "Teacher does not exist." });
  
      res.json({ msg: "Teacher deleted successfully." });
  
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  }
  
};



const createAccessToken = (teacher) => {
  return jwt.sign(teacher, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "11m" });
};

const createRefreshToken = (teacher) => {
  return jwt.sign(teacher, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
};

module.exports = teacherCtrl;
