import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { registerUser } from '../../redux/LoginRegister/authSlice';
import Dropdown from 'react-bootstrap/Dropdown';
import { FaChevronDown } from 'react-icons/fa';
import Navbar from '../LandingPage/Navbar/Navbar';

const Register = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [formData, setFormData] = useState({
    parentName: '',
    email: '',
    password: '',
    phoneNumber: '',
    plan: "Sélectionnez un programme",
    address: '',
    children: [{ name: '', age: '', schoolLevel: '' }]
  });

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const selectedPlan = queryParams.get('plan');
    if (selectedPlan) {
      setFormData(prev => ({ ...prev, plan: selectedPlan }));
    }
  }, [location]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleChildChange = (index, e) => {
    const { name, value } = e.target;
    const newChildren = [...formData.children];
    newChildren[index][name] = value;
    setFormData(prev => ({ ...prev, children: newChildren }));
  };

  const addChild = () => {
    setFormData(prev => ({
      ...prev,
      children: [...prev.children, { name: '', age: '', schoolLevel: '' }]
    }));
  };

  const removeChild = (index) => {
    const newChildren = formData.children.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, children: newChildren }));
  };

  const handlePlanSelect = (selectedPlan) => {
    setFormData(prev => ({ ...prev, plan: selectedPlan }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(formData));
    // Réinitialisation du formulaire après soumission
    setFormData({
      parentName: '',
      email: '',
      password: '',
      phoneNumber: '',
      plan: "Sélectionnez un programme",
      address: '',
      children: [{ name: '', age: '', schoolLevel: '' }]
    });
  };

  return (
    <div>
      <Navbar />
      <div className="fables-light-background-color">
        <div className="container"> 
          <nav aria-label="breadcrumb">
            <ol className="fables-breadcrumb breadcrumb px-0 py-3">
              <li className="breadcrumb-item"><a href="#" className="fables-second-text-color">Accueil</a></li>
              <li className="breadcrumb-item active" aria-current="page">Inscription</li>
            </ol>
          </nav> 
        </div>
      </div>
      <div className="container">
        <div className="row my-4 my-lg-5">
          <div className="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2 text-center">
            <img src="assets/custom/images/signin-logo.png" alt="signin" className="img-fluid" />
            <h2 className="font-20 semi-font fables-main-text-color mt-4 mb-5">Inscription au Bootcamp</h2>
            <form onSubmit={handleSubmit}>
              <h4 className="text-left mb-3">Informations du Parent/Tuteur</h4>
              
              <div className="form-row form-group">
                <div className="col-md-6 mb-4">
                  <div className="input-icon">
                    <span className="fables-iconuser-register fables-input-icon mt-2 font-13" />
                    <input
                      type="text"
                      name="parentName"
                      value={formData.parentName}
                      className="form-control rounded-0 py-3 pl-5 font-13 sign-register-input"
                      onChange={handleChange}
                      placeholder="Nom complet du parent/tuteur"
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6 mb-4">
                  <div className="input-icon">
                    <span className="fables-iconemail fables-input-icon mt-2 font-13" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      className="form-control rounded-0 py-3 pl-5 font-13 sign-register-input"
                      onChange={handleChange}
                      placeholder="Adresse email"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="form-row form-group">
                <div className="col-md-6 mb-4">
                  <div className="input-icon">
                    <span className="fables-iconphone fables-input-icon mt-2 font-13" />
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      className="form-control rounded-0 py-3 pl-5 font-13 sign-register-input"
                      onChange={handleChange}
                      placeholder="Numéro de téléphone"
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6 mb-4">
                  <div className="input-icon">
                    <span className="fables-iconaddress fables-input-icon mt-2 font-13" />
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      className="form-control rounded-0 py-3 pl-5 font-13 sign-register-input"
                      onChange={handleChange}
                      placeholder="Adresse complète"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="form-group mb-4">
                <div className="input-icon">
                  <span className="fables-iconpassword fables-input-icon font-19 mt-1" />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    className="form-control rounded-0 py-3 pl-5 font-13 sign-register-input"
                    onChange={handleChange}
                    placeholder="Créez un mot de passe"
                    required
                  />
                </div>
              </div>

              <div className="form-group mb-4">
                <div className="input-icon">
                  <span className="fables-iconprogram fables-input-icon mt-2 font-13" />
                  <Dropdown onSelect={handlePlanSelect}>
                    <Dropdown.Toggle
                      variant="success"
                      id="dropdown-basic"
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        backgroundColor: 'white',
                        color: 'black',
                        border: '1px solid #ccc',
                        padding: '10px 10px 10px 50px',
                        borderRadius: '0',
                      }}
                    >
                      {formData.plan}
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="w-100">
                      <Dropdown.Item eventKey="☀️ Bootcamp d'été">☀️ Bootcamp d'été</Dropdown.Item>
                      <Dropdown.Item eventKey="📚 Programme Annuel">📚 Programme Annuel</Dropdown.Item>
                      <Dropdown.Item eventKey="🎨 Ateliers Créatifs">🎨 Ateliers Créatifs</Dropdown.Item>
                      <Dropdown.Item eventKey="🧠 Soutien Scolaire">🧠 Soutien Scolaire</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>

              <h4 className="text-left mb-3 mt-5">Informations des Enfants</h4>
              
              {formData.children.map((child, index) => (
                <div key={index} className="border p-3 mb-4">
                  <div className="form-row">
                    <div className="col-md-4 mb-3">
                      <input
                        type="text"
                        name="name"
                        value={child.name}
                        className="form-control rounded-0 py-3 font-13"
                        onChange={(e) => handleChildChange(index, e)}
                        placeholder="Nom complet de l'enfant"
                        required
                      />
                    </div>
                    <div className="col-md-3 mb-3">
                      <input
                        type="number"
                        name="age"
                        value={child.age}
                        className="form-control rounded-0 py-3 font-13"
                        onChange={(e) => handleChildChange(index, e)}
                        placeholder="Âge"
                        min="4"
                        max="18"
                        required
                      />
                    </div>
                    <div className="col-md-4 mb-3">
                      <input
                        type="text"
                        name="schoolLevel"
                        value={child.schoolLevel}
                        className="form-control rounded-0 py-3 font-13"
                        onChange={(e) => handleChildChange(index, e)}
                        placeholder="Niveau scolaire (ex: CE2, 5ème)"
                        required
                      />
                    </div>
                    <div className="col-md-1 mb-3">
                      {formData.children.length > 1 && (
                        <button
                          type="button"
                          className="btn btn-danger rounded-0 py-3"
                          onClick={() => removeChild(index)}
                        >
                          ×
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              <div className="text-left mb-4">
                <button
                  type="button"
                  className="btn btn-secondary rounded-0 py-2"
                  onClick={addChild}
                >
                  + Ajouter un autre enfant
                </button>
              </div>

              <div className="form-group form-check text-left mb-4">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="termsCheck"
                  required
                />
                <label className="form-check-label" htmlFor="termsCheck">
                  J'accepte les conditions générales et la politique de confidentialité
                </label>
              </div>

              <button
                type="submit"
                className="btn btn-block rounded-0 white-color fables-main-hover-background-color fables-second-background-color font-16 semi-font py-3"
              >
                S'inscrire
              </button>
              
              <p className="fables-forth-text-color mt-3">
                Vous avez déjà un compte ?{' '}
                <a href="/login" className="font-16 semi-font fables-second-text-color underline fables-main-hover-color ml-2">
                  Connectez-vous
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;