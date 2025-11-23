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

    // Valider les données du formulaire ici si nécessaire

    // Dispatch l'action pour enregistrer le professeur
    dispatch(
      registerTeacher({
        name,
        age,
        numTel,
        classes: teacherClass, // Changé de "class" à "classes"
        desc,
        subject,
        email,
        password,
      })
    );

    // Effacer les champs du formulaire après l'enregistrement réussi
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
            {/* <img src="assets/custom/images/signin-logo.png" alt="signin" className="img-fluid" /> */}
            <p className="font-20 semi-font fables-main-text-color mt-4 mb-5">Créer un nouveau Professeur</p>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Nom du Professeur</label>
                <input
                  type="text"
                  id="name"
                  className="form-control"
                  value={name}
                  onChange={handleNameChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="age">Âge du Professeur</label>
                <input
                  type="number"
                  id="age"
                  className="form-control"
                  value={age}
                  onChange={handleAgeChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="numTel">Numéro de Téléphone du Professeur</label>
                <input
                  type="text"
                  id="numTel"
                  className="form-control"
                  value={numTel}
                  onChange={handleNumTelChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="teacherClass">Classes ou Niveaux Enseignés (séparés par des virgules)</label>
                <input
                  type="text"
                  id="teacherClass"
                  className="form-control"
                  value={teacherClass}
                  onChange={handleClassChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="desc">Description ou Présentation</label>
                <input
                  type="text"
                  id="desc"
                  className="form-control"
                  value={desc}
                  onChange={handleDescChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="subject">Matière Enseignée</label>
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
                <label htmlFor="password">Mot de Passe</label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Enregistrer
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterTeacher;