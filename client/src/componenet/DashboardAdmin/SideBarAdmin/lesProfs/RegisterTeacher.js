import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerTeacher } from '../../../../redux/Teachers/teacherSlice';

const RegisterTeacher = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [numTel, setNumTel] = useState('');
  const [teacherClass, setTeacherClass] = useState('');
  const [desc, setDesc] = useState('');
  const [subject, setSubject] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAgeChange = (e) => {
    setAge(e.target.value);
  };

  const handleNumTelChange = (e) => {
    setNumTel(e.target.value);
  };

  const handleClassChange = (e) => {
    const inputClasses = e.target.value;
    const classesArray = inputClasses.split(',').map(classItem => classItem.trim());
    setTeacherClass(classesArray);
  };

  const handleDescChange = (e) => {
    setDesc(e.target.value);
  };

  const handleSubjectChange = (e) => {
    setSubject(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the form data here if needed

    // Dispatch the action to register the teacher
    dispatch(
      registerTeacher({
        name,
        age,
        numTel,
        classes: teacherClass, // Changed from "class" to "classes"
        desc,
        subject,
        email,
        password,
      })
    );

    // Clear the form fields after successful registration
    setName('');
    setAge('');
    setNumTel('');
    setTeacherClass('');
    setDesc('');
    setSubject('');
    setEmail('');
    setPassword('');
  };

  return (
    <div>
      <div className="container">
      <div className="row my-4 my-lg-5">
      <div className="col-12 col-md-10 offset-md-1 col-lg-6 offset-lg-3 text-center">
        <img src="assets/custom/images/signin-logo.png" alt="signin" className="img-fluid" />
        <p className="font-20 semi-font fables-main-text-color mt-4 mb-5">Create a new Teacher</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Teacher's Name</label>
            <input
              type="text"
              id="name"
              className="form-control"
              value={name}
              onChange={handleNameChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="age">Teacher's Age</label>
            <input
              type="number"
              id="age"
              className="form-control"
              value={age}
              onChange={handleAgeChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="numTel">Teacher's Phone Number</label>
            <input
              type="text"
              id="numTel"
              className="form-control"
              value={numTel}
              onChange={handleNumTelChange}
            />
          </div>
          <div className="form-group">
  <label htmlFor="teacherClass">Classes or Grades Taught (comma-separated)</label>
  <input
    type="text"
    id="teacherClass"
    className="form-control"
    value={teacherClass}
    onChange={handleClassChange}
  />
</div>
          <div className="form-group">
            <label htmlFor="desc">Description or Introduction</label>
            <input
              type="text"
              id="desc"
              className="form-control"
              value={desc}
              onChange={handleDescChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="subject">Subject Taught</label>
            <input
              type="text"
              id="subject"
              className="form-control"
              value={subject}
              onChange={handleSubjectChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="form-control"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="form-control"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </form>
      </div>
    </div>
    </div>
    </div>
  );
};

export default RegisterTeacher;
