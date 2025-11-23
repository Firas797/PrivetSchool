import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createExam,
  getAllExams,
  getExamsByClass,
  updateExam,
  deleteExam,
  setCurrentExam,
  clearCurrentExam,
  clearError
} from '../../../redux/Exam/examSlice';
import './Exams.css';

const Exams = () => {
  const dispatch = useDispatch();
  const { exams, loading, error, currentExam } = useSelector(state => state.Exams);
  
  const [formData, setFormData] = useState({
    Title: '',
    description: '',
    classe: '',
    category: '',
    file: null
  });
  const [selectedClass, setSelectedClass] = useState('all');
  const [isDragging, setIsDragging] = useState(false);

  // Classes de 1ère année à 6ème année
  const classes = ['1ère année', '2ème année', '3ème année', '4ème année', '5ème année', '6ème année'];
  const categories = ['Examen Mi-parcours', 'Examen Final', 'Quiz', 'Devoir', 'Exercice Pratique'];

  useEffect(() => {
    dispatch(getAllExams());
  }, [dispatch]);

  useEffect(() => {
    if (currentExam) {
      setFormData({
        Title: currentExam.Title,
        description: currentExam.description,
        classe: currentExam.classe,
        category: currentExam.category,
        file: null
      });
    }
  }, [currentExam]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      file: e.target.files[0]
    }));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      setFormData(prev => ({
        ...prev,
        file: files[0]
      }));
    }
  };

  const handleClassFilter = (e) => {
    const classe = e.target.value;
    setSelectedClass(classe);
    
    if (classe === 'all') {
      dispatch(getAllExams());
    } else {
      dispatch(getExamsByClass(classe));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (currentExam) {
      await dispatch(updateExam({ id: currentExam._id, examData: formData }));
    } else {
      await dispatch(createExam(formData));
    }
    
    if (!error) {
      handleReset();
      if (selectedClass === 'all') {
        dispatch(getAllExams());
      } else {
        dispatch(getExamsByClass(selectedClass));
      }
    }
  };

  const handleReset = () => {
    setFormData({
      Title: '',
      description: '',
      classe: '',
      category: '',
      file: null
    });
    dispatch(clearCurrentExam());
  };

  const handleEdit = (exam) => {
    dispatch(setCurrentExam(exam));
    document.getElementById('exam-form').scrollIntoView({ behavior: 'smooth' });
  };

  const handleDelete = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet examen ?')) {
      dispatch(deleteExam(id));
    }
  };

  const handleCancel = () => {
    handleReset();
  };

  const downloadFile = (exam) => {
    if (exam.file && exam.file.data) {
      const byteArray = new Uint8Array(exam.file.data.data);
      const blob = new Blob([byteArray], { type: exam.file.contentType });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${exam.Title}_${exam.classe}.${exam.file.contentType.includes('pdf') ? 'pdf' : 'jpg'}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="exams-container">
      <div className="exams-content">
        {/* En-tête */}
        <div className="exams-header">
          <h1 className="exams-title">Gestion des Examens</h1>
          <p className="exams-subtitle">
            Créez, organisez et gérez les examens pour différentes classes facilement
          </p>
        </div>

        {/* Affichage des erreurs */}
      

        <div className="exams-grid">
          {/* Colonne de gauche - Formulaire de création/modification */}
          <div>
            <div id="exam-form" className="exam-form-container">
              <div className="form-header">
                <div>
                  <h2 className="form-title">
                    {currentExam ? 'Modifier l\'Examen' : 'Créer un Nouvel Examen'}
                  </h2>
                  <p className="form-subtitle">
                    {currentExam ? 'Mettez à jour les détails de l\'examen' : 'Remplissez les informations de l\'examen'}
                  </p>
                </div>
                <div className="form-icon">
                  {currentExam ? '✏️' : '📚'}
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                {/* Titre */}
                <div className="form-group">
                  <label className="form-label">Titre de l'Examen *</label>
                  <input
                    type="text"
                    name="Title"
                    value={formData.Title}
                    onChange={handleInputChange}
                    required
                    placeholder="ex: Examen Final de Mathématiques 2024"
                    className="form-input"
                  />
                </div>

                {/* Classe et Catégorie */}
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">Classe *</label>
                    <select
                      name="classe"
                      value={formData.classe}
                      onChange={handleInputChange}
                      required
                      className="form-select"
                    >
                      <option value="">Sélectionnez une Classe</option>
                      {classes.map(cls => (
                        <option key={cls} value={cls}>{cls}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Catégorie *</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                      className="form-select"
                    >
                      <option value="">Sélectionnez une Catégorie</option>
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Description */}
                <div className="form-group">
                  <label className="form-label">Description *</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows="4"
                    placeholder="Entrez la description de l'examen, les instructions, les notes importantes..."
                    className="form-textarea"
                  />
                </div>

                {/* Téléchargement de fichier */}
                <div className="form-group">
                  <label className="form-label">Fichier de l'Examen (PDF/Image)</label>
                  <div 
                    className={`file-upload-area ${isDragging ? 'dragging' : ''}`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleFileChange}
                      className="hidden"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <div className="file-upload-icon">📎</div>
                      <div className="file-upload-text">Choisir un fichier</div>
                      <div className="file-upload-hint">ou glisser-déposer ici</div>
                      <div className="file-upload-hint">Supporte PDF, JPG, PNG (Max 10MB)</div>
                      {formData.file && (
                        <div className="file-selected">
                          ✓ {formData.file.name}
                        </div>
                      )}
                    </label>
                  </div>
                  {currentExam?.file && !formData.file && (
                    <p className="text-sm text-gray-500 mt-2 p-2 bg-gray-50 rounded-lg">
                      📄 Fichier actuel: {currentExam.file.contentType}
                    </p>
                  )}
                </div>

                {/* Boutons d'action */}
                <div className="form-actions">
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary"
                  >
                    {loading ? (
                      <>
                        <div className="loading-spinner"></div>
                        {currentExam ? 'Mise à jour...' : 'Création...'}
                      </>
                    ) : (
                      <>
                        <span>{currentExam ? '🔄' : '✨'}</span>
                        {currentExam ? 'Mettre à Jour' : 'Créer l\'Examen'}
                      </>
                    )}
                  </button>
                  
                  {currentExam && (
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="btn-secondary"
                    >
                      Annuler
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* Colonne de droite - Liste des examens */}
          <div>
            {/* Filtre et statistiques */}
            <div className="filter-bar">
              <div className="flex items-center gap-4">
                <label className="filter-label">Filtrer par Classe:</label>
                <select
                  value={selectedClass}
                  onChange={handleClassFilter}
                  className="filter-select"
                >
                  <option value="all">Toutes les Classes</option>
                  {classes.map(cls => (
                    <option key={cls} value={cls}>{cls}</option>
                  ))}
                </select>
              </div>

              <div className="exam-count">
                {exams?.length || 0} {exams?.length === 1 ? 'Examen' : 'Examens'}
              </div>
            </div>

            {/* Liste des examens */}
            <div className="list-section">
              {loading ? (
                <div className="loading-state">
                  <div className="loading-spinner-large"></div>
                  <div className="loading-text">Chargement des examens...</div>
                  <div className="loading-subtext">Veuillez patienter un moment</div>
                </div>
              ) : !exams || exams.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-icon">📝</div>
                  <h3 className="empty-title">Aucun examen trouvé</h3>
                  <p className="empty-description">
                    {selectedClass !== 'all' 
                      ? `Aucun examen trouvé pour la ${selectedClass}. Créez le premier pour commencer !`
                      : 'Commencez par créer votre premier examen. Utilisez le formulaire à gauche pour débuter.'
                    }
                  </p>
                </div>
              ) : (
                <div className="exam-list">
                  {exams.map((exam, index) => (
                    <div key={exam._id} className="exam-card">
                      <div className="exam-header">
                        <div className="flex-1">
                          <h3 className="exam-title">{exam.Title}</h3>
                          <p className="exam-description">{exam.description}</p>
                        </div>
                        <div className="exam-badges">
                          <span className="badge badge-category">{exam.category}</span>
                          <span className="badge badge-class">{exam.classe}</span>
                        </div>
                      </div>
                      
                      <div className="exam-footer">
                        <div className="exam-meta">
                          {exam.file && (
                            <button
                              onClick={() => downloadFile(exam)}
                              className="download-btn"
                            >
                              <span>📥</span>
                              <span>Télécharger le Fichier</span>
                            </button>
                          )}
                          <div className="date-info">
                            <span>📅</span>
                            <span>
                              {new Date(exam.createdAt).toLocaleDateString('fr-FR', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              })}
                            </span>
                          </div>
                        </div>
                        
                        <div className="exam-actions">
                          <button
                            onClick={() => handleEdit(exam)}
                            className="btn-edit"
                          >
                            <span>✏️</span>
                            <span>Modifier</span>
                          </button>
                          <button
                            onClick={() => handleDelete(exam._id)}
                            className="btn-delete"
                          >
                            <span>🗑️</span>
                            <span>Supprimer</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Exams;