import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createQuiz, resetQuizState } from '../../../redux/Teachers/teacherSlice';

function CreateQuizForm() {
  const dispatch = useDispatch();
  const { quizLoading, quizSuccess, quizError, teacher } = useSelector((state) => state.teacher);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [classLevel, setClassLevel] = useState('');
  const [teacherName, setTeacherName] = useState('');
  const [type, setType] = useState('multiple-choice');
  const [difficulty, setDifficulty] = useState('easy');
  const [questions, setQuestions] = useState([
    { question: '', options: ['', '', '', ''], correctAnswer: '' },
  ]);

  useEffect(() => {
    if (teacher?.name && !teacherName) setTeacherName(teacher.name);
  }, [teacher, teacherName]);

  useEffect(() => {
    if (quizSuccess) {
      const timer = setTimeout(() => {
        dispatch(resetQuizState());
        setTitle('');
        setCategory('');
        setClassLevel('');
        setTeacherName(teacher?.name || '');
        setQuestions([{ question: '', options: ['', '', '', ''], correctAnswer: '' }]);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [quizSuccess, dispatch, teacher]);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      type === 'multiple-choice'
        ? { question: '', options: ['', '', '', ''], correctAnswer: '' }
        : { question: '', correctAnswer: '' },
    ]);
  };

  const removeQuestion = (index) => {
    if (questions.length > 1) setQuestions(questions.filter((_, i) => i !== index));
  };

  const handleQuestionChange = (index, field, value) => {
    const updated = [...questions];
    updated[index][field] = value;
    setQuestions(updated);
  };

  const handleOptionChange = (qIndex, optIndex, value) => {
    const updated = [...questions];
    updated[qIndex].options[optIndex] = value;
    setQuestions(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !category || !classLevel || !teacherName || questions.length === 0) {
      alert('Veuillez remplir tous les champs obligatoires (*)');
      return;
    }

    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      if (!q.question || !q.correctAnswer) {
        alert(`Veuillez remplir la question ${i + 1} et sa réponse correcte`);
        return;
      }
      if (type === 'multiple-choice' && q.options.some(opt => !opt)) {
        alert(`Veuillez remplir toutes les options pour la question ${i + 1}`);
        return;
      }
    }

    const quizData = {
      title,
      category,
      classLevel: Number(classLevel),
      type,
      difficulty,
      questions: questions.map((q) => ({
        question: q.question,
        options: type === 'multiple-choice' ? q.options : undefined,
        correctAnswer: q.correctAnswer,
      })),
      createdBy: teacherName
    };

    dispatch(createQuiz(quizData));
  };

  return (
    <div
      className="min-vh-100 d-flex justify-content-center align-items-start py-5"
      style={{
        background: 'linear-gradient(135deg, #f3f4f7 0%, #e7efff 100%)',
        paddingBottom: '100px'
      }}
    >
      <div className="col-12 col-lg-10 col-xl-8">
        <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
          <div
            className="card-header text-white text-center py-5"
            style={{
              background: 'linear-gradient(90deg, #007bff 0%, #00b4d8 100%)'
            }}
          >
            <h2 className="fw-bold mb-2">🧠 Créer un Nouveau Quiz</h2>
            <p className="opacity-75 mb-0">Remplissez les informations pour créer votre quiz</p>
          </div>

          <div className="card-body p-4 p-md-5 bg-white">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 mb-4">
                  <label className="form-label fw-semibold text-primary">
                    <i className="fas fa-heading me-2"></i>Titre du Quiz *
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    style={{ borderRadius: '10px' }}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Entrez le titre du quiz"
                    required
                  />
                </div>
                <div className="col-md-6 mb-4">
                  <label className="form-label fw-semibold text-primary">
                    <i className="fas fa-book me-2"></i>Matière *
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    style={{ borderRadius: '10px' }}
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="Ex: Mathématiques, Français..."
                    required
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-4 mb-4">
                  <label className="form-label fw-semibold text-primary">
                    <i className="fas fa-graduation-cap me-2"></i>Niveau *
                  </label>
                  <select
                    className="form-select form-select-lg"
                    style={{ borderRadius: '10px' }}
                    value={classLevel}
                    onChange={(e) => setClassLevel(e.target.value)}
                    required
                  >
                    <option value="">Choisir un niveau</option>
                    {[1,2,3,4,5,6].map(n => (
                      <option key={n} value={n}>{n}ᵉ année</option>
                    ))}
                  </select>
                </div>

                <div className="col-md-4 mb-4">
                  <label className="form-label fw-semibold text-primary">
                    <i className="fas fa-user-tie me-2"></i>Professeur *
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    style={{ borderRadius: '10px' }}
                    value={teacherName}
                    onChange={(e) => setTeacherName(e.target.value)}
                    placeholder="Votre nom"
                    required
                  />
                  {teacher?.name && (
                    <small className="text-muted">Connecté: <strong>{teacher.name}</strong></small>
                  )}
                </div>

                <div className="col-md-4 mb-4">
                  <label className="form-label fw-semibold text-primary">
                    <i className="fas fa-list-alt me-2"></i>Type
                  </label>
                  <select
                    className="form-select form-select-lg"
                    style={{ borderRadius: '10px' }}
                    value={type}
                    onChange={(e) => {
                      setType(e.target.value);
                      setQuestions([
                        e.target.value === 'multiple-choice'
                          ? { question: '', options: ['', '', '', ''], correctAnswer: '' }
                          : { question: '', correctAnswer: '' },
                      ]);
                    }}
                  >
                    <option value="multiple-choice">Choix Multiple</option>
                    <option value="calculation">Calcul</option>
                  </select>
                </div>
              </div>

              <div className="row mb-5">
                <div className="col-md-6">
                  <label className="form-label fw-semibold text-primary">
                    <i className="fas fa-chart-line me-2"></i>Difficulté
                  </label>
                  <select
                    className="form-select form-select-lg"
                    style={{ borderRadius: '10px' }}
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                  >
                    <option value="easy">Facile</option>
                    <option value="medium">Moyen</option>
                    <option value="hard">Difficile</option>
                  </select>
                </div>
              </div>

              <div className="border-top pt-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h4 className="text-primary fw-bold">
                    <i className="fas fa-question-circle me-2"></i>Questions
                  </h4>
                  <button type="button" className="btn btn-success btn-lg rounded-pill shadow-sm" onClick={addQuestion}>
                    <i className="fas fa-plus me-2"></i>Ajouter
                  </button>
                </div>

                {questions.map((q, qIndex) => (
                  <div key={qIndex} className="card border-0 shadow-sm mb-4 rounded-3">
                    <div className="card-header bg-light d-flex justify-content-between align-items-center">
                      <h5 className="text-primary mb-0">
                        Question {qIndex + 1}
                      </h5>
                      {questions.length > 1 && (
                        <button type="button" className="btn btn-outline-danger btn-sm" onClick={() => removeQuestion(qIndex)}>
                          <i className="fas fa-trash"></i>
                        </button>
                      )}
                    </div>
                    <div className="card-body">
                      <input
                        type="text"
                        className="form-control mb-3"
                        style={{ borderRadius: '8px' }}
                        placeholder="Saisissez la question"
                        value={q.question}
                        onChange={(e) => handleQuestionChange(qIndex, 'question', e.target.value)}
                        required
                      />

                      {type === 'multiple-choice' && (
                        <>
                          {q.options.map((opt, optIndex) => (
                            <div key={optIndex} className="input-group mb-2">
                              <span className="input-group-text bg-primary text-white border-0 fw-bold">
                                {String.fromCharCode(65 + optIndex)}
                              </span>
                              <input
                                type="text"
                                className="form-control border-primary"
                                placeholder={`Option ${String.fromCharCode(65 + optIndex)}`}
                                value={opt}
                                onChange={(e) => handleOptionChange(qIndex, optIndex, e.target.value)}
                                required
                              />
                            </div>
                          ))}

                          <input
                            type="text"
                            className="form-control border-success mt-3"
                            placeholder="Lettre de la bonne réponse (A, B, C, D)"
                            value={q.correctAnswer}
                            onChange={(e) => handleQuestionChange(qIndex, 'correctAnswer', e.target.value)}
                            required
                          />
                        </>
                      )}

                      {type === 'calculation' && (
                        <input
                          type="text"
                          className="form-control border-success mt-3"
                          placeholder="Réponse correcte"
                          value={q.correctAnswer}
                          onChange={(e) => handleQuestionChange(qIndex, 'correctAnswer', e.target.value)}
                          required
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="btn btn-primary btn-lg px-5 py-3 rounded-pill shadow"
                  disabled={quizLoading}
                  style={{
                    background: 'linear-gradient(90deg, #007bff, #00b4d8)',
                    border: 'none'
                  }}
                >
                  {quizLoading ? (
                    <>
                      <i className="fas fa-spinner fa-spin me-2"></i>Création...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-save me-2"></i>Créer le Quiz
                    </>
                  )}
                </button>
              </div>
            </form>

            {quizSuccess && (
              <div className="alert alert-success mt-4 text-center">
                ✅ Quiz créé avec succès par <strong>{teacherName}</strong> !
              </div>
            )}
            {quizError && (
              <div className="alert alert-danger mt-4 text-center">
                ⚠️ {quizError}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateQuizForm;
