import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addHomeWorkAsync } from '../../../redux/HomeWork/HwSlice'; // Importer l'action addHomeWorkAsync

const CreateHomeWork = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [classe, setClasse] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleClasseChange = (e) => {
    setClasse(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      addHomeWorkAsync({
        title,
        description,
        category,
        classe,
      })
    );

    // Effacer les champs du formulaire après la création réussie du devoir
    setTitle('');
    setClasse('');
    setDescription('');
    setCategory('');
  };

  return (
    <div className="container">
      <div className="row my-4 my-lg-5">
        <div className="col-12 col-md-10 offset-md-1 col-lg-6 offset-lg-3 text-center">
          <p className="font-20 semi-font my-4">Créer un Exercice</p>
          <form className="create-course-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Titre du Cours</label>
              <input
                type="text"
                id="title"
                className="form-control"
                value={title}
                onChange={handleTitleChange}
                placeholder="Entrez le titre du cours"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="classe">Classe ou Niveau</label>
              <select
                id="classe"
                className="form-control"
                value={classe}
                onChange={handleClasseChange}
              >
                <option value="">Sélectionnez une Classe</option>
                <option value="1">1ère Année</option>
                <option value="2">2ème Année</option>
                <option value="3">3ème Année</option>
                <option value="4">4ème Année</option>
                <option value="5">5ème Année</option>
                <option value="6">6ème Année</option>
              </select>
            </div>
          
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                className="form-control"
                value={description}
                onChange={handleDescriptionChange}
                placeholder="Décrivez le devoir à réaliser"
                rows="4"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="category">Catégorie</label>
              <select
                id="category"
                className="form-control"
                value={category}
                onChange={handleCategoryChange}
              >
                <option value="">Sélectionnez une Catégorie</option>
                <option value="1">Mathématiques</option>
                <option value="2">Français</option>
                <option value="3">Sciences</option>
                <option value="4">Histoire-Géographie</option>
                <option value="5">Langues</option>
              </select>
            </div>
            
            <button type="submit" className="btn btn-primary">
              Créer le Devoir
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateHomeWork;