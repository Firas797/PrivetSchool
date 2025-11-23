import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../redux/LoginRegister/authSlice";
import { toast } from "react-toastify";
import Navbar from "../LandingPage/Navbar/Navbar";
import Dropdown from "react-bootstrap/Dropdown";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    parentName: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
    children: [{ name: "", age: "", class: "" }],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleChildChange = (index, e) => {
    const { name, value } = e.target;
    const updatedChildren = [...formData.children];
    updatedChildren[index][name] = value;
    setFormData((prev) => ({ ...prev, children: updatedChildren }));
  };

  const handleClassSelect = (index, selectedClass) => {
    const updatedChildren = [...formData.children];
    updatedChildren[index].class = Number(selectedClass);
    setFormData((prev) => ({ ...prev, children: updatedChildren }));
  };

  const addChild = () => {
    setFormData((prev) => ({
      ...prev,
      children: [...prev.children, { name: "", age: "", class: "" }],
    }));
  };

  const removeChild = (index) => {
    setFormData((prev) => ({
      ...prev,
      children: prev.children.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.children.length === 0) {
      toast.error("Veuillez ajouter au moins un enfant.");
      return;
    }

    try {
      await dispatch(registerUser(formData)).unwrap();
      toast.success("Inscription réussie 🎉");
      navigate("/login");
    } catch (error) {
      toast.error(error?.message || "Erreur lors de l’inscription.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="fables-light-background-color">
        <div className="container">
          <nav aria-label="breadcrumb">
            <ol className="fables-breadcrumb breadcrumb px-0 py-3">
              <li className="breadcrumb-item">
                <a href="/" className="fables-second-text-color">
                  Accueil
                </a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Inscription
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="container">
        <div className="row my-4 my-lg-5">
          <div className="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2 text-center">
            <img
              src="assets/custom/images/signin-logo.png"
              alt="signin"
              className="img-fluid"
            />
            <h2 className="font-20 semi-font fables-main-text-color mt-4 mb-5">
              Inscription à l’école privée
            </h2>

            <form onSubmit={handleSubmit}>
              <h4 className="text-left mb-3">Informations du parent / tuteur</h4>

              <div className="form-row form-group">
                <div className="col-md-6 mb-4">
                  <input
                    type="text"
                    name="parentName"
                    value={formData.parentName}
                    onChange={handleChange}
                    placeholder="Nom complet du parent"
                    required
                    className="form-control rounded-0 py-3 font-13"
                  />
                </div>
                <div className="col-md-6 mb-4">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Adresse email"
                    required
                    className="form-control rounded-0 py-3 font-13"
                  />
                </div>
              </div>

              <div className="form-row form-group">
                <div className="col-md-6 mb-4">
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="Numéro de téléphone"
                    required
                    className="form-control rounded-0 py-3 font-13"
                  />
                </div>
                <div className="col-md-6 mb-4">
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Adresse complète"
                    required
                    className="form-control rounded-0 py-3 font-13"
                  />
                </div>
              </div>

              <div className="form-group mb-4">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Mot de passe"
                  required
                  className="form-control rounded-0 py-3 font-13"
                />
              </div>

              <h4 className="text-left mb-3 mt-5">Informations sur les enfants</h4>

              {formData.children.map((child, index) => (
                <div key={index} className="border p-3 mb-4">
                  <div className="form-row">
                    <div className="col-md-4 mb-3">
                      <input
                        type="text"
                        name="name"
                        value={child.name}
                        onChange={(e) => handleChildChange(index, e)}
                        placeholder="Nom complet de l'enfant"
                        required
                        className="form-control rounded-0 py-3 font-13"
                      />
                    </div>
                    <div className="col-md-3 mb-3">
                      <input
                        type="number"
                        name="age"
                        value={child.age}
                        onChange={(e) => handleChildChange(index, e)}
                        placeholder="Âge"
                        min="4"
                        max="18"
                        required
                        className="form-control rounded-0 py-3 font-13"
                      />
                    </div>
                    <div className="col-md-4 mb-3">
                      <Dropdown
                        onSelect={(selectedClass) =>
                          handleClassSelect(index, selectedClass)
                        }
                      >
                        <Dropdown.Toggle
                          variant="light"
                          className="w-100 text-left py-3"
                        >
                          {child.class
                            ? `Classe : ${child.class}ème année`
                            : "Sélectionner la classe"}
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="w-100">
                          {[1, 2, 3, 4, 5, 6].map((num) => (
                            <Dropdown.Item key={num} eventKey={num}>
                              {num}ème année
                            </Dropdown.Item>
                          ))}
                        </Dropdown.Menu>
                      </Dropdown>
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
                  + Ajouter un enfant
                </button>
              </div>

              <button
                type="submit"
                className="btn btn-block rounded-0 white-color fables-main-hover-background-color fables-second-background-color font-16 semi-font py-3"
              >
                S'inscrire
              </button>

              <p className="fables-forth-text-color mt-3">
                Vous avez déjà un compte ?{" "}
                <a
                  href="/login"
                  className="font-16 semi-font fables-second-text-color underline fables-main-hover-color ml-2"
                >
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
