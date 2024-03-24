// models/teacher.js
const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  numTel: { type: String, required: true },
  classes: [{ type: String, required: true }],
  desc:{ type: String, required: true },
  subject: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true
},
password: {
    type: String, 
    required: true
},
role: {
    type: String,
    default: "Prof"
},

});


module.exports = mongoose.model('Teacher', teacherSchema)