import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCourseAsync } from '../../../redux/cours/coursSlice';
import '../../DashboardAdmin/SideBarAdmin/Side.css';

const CreateCourse = () => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [classe, setClasse] = useState('');
  const [urlVid, setUrlVid] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [pdfFile, setPdfFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !classe || !description || !category) {
      alert('Please fill all required fields');
      return;
    }

    dispatch(
      addCourseAsync({ Title: title, classe, urlVid, description, category, pdfFile })
    );

    setTitle('');
    setClasse('');
    setUrlVid('');
    setDescription('');
    setCategory('');
    setPdfFile(null);
  };

  return (
    <div className="container">
      <div className="row my-4 my-lg-5">
        <div className="col-12 col-md-10 offset-md-1 col-lg-6 offset-lg-3 text-center">
          <p className="font-20 semi-font my-4">Créer un Nouveau Cours</p>
          <form className="create-course-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Titre du Cours *</label>
              <input
                type="text"
                id="title"
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Entrez le titre du cours"
              />
            </div>

            <div className="form-group">
              <label htmlFor="classe">Classe ou Niveau *</label>
              <select
                id="classe"
                className="form-control"
                value={classe}
                onChange={(e) => setClasse(e.target.value)}
              >
                <option value="">Sélectionnez une Classe</option>
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <option key={num} value={num}>{num}ème Année</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="urlVid">URL de la Vidéo (optionnel)</label>
              <input
                type="text"
                id="urlVid"
                className="form-control"
                value={urlVid}
                onChange={(e) => setUrlVid(e.target.value)}
                placeholder="Collez le lien de la vidéo"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description *</label>
              <textarea
                id="description"
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Décrivez le contenu du cours"
                rows="4"
              />
            </div>

            <div className="form-group">
              <label htmlFor="category">Catégorie *</label>
              <select
                id="category"
                className="form-control"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Sélectionnez une Catégorie</option>
                <option value="Mathématiques">Mathématiques</option>
                <option value="Français">Français</option>
                <option value="Sciences">Sciences</option>
                <option value="Histoire-Géographie">Histoire-Géographie</option>
                <option value="Langues Étrangères">Langues Étrangères</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="pdfFile">Fichier PDF (optionnel)</label>
              <input
                type="file"
                id="pdfFile"
                className="form-control"
                accept="application/pdf"
                onChange={(e) => setPdfFile(e.target.files[0])}
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Créer le Cours
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateCourse;
