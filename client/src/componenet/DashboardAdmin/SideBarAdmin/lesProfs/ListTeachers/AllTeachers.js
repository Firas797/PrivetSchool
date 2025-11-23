import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getAllTeachers, updateTeacher, deleteTeacher } from '../../../../../redux/Teachers/teacherSlice';
import '../../../../../App.css';
import './Teachers.css';

function AllTeachers() {
  const dispatch = useDispatch();

  // ✅ FIXED: Correct slice name
  const teachers = useSelector((state) => state.teacher.teachers);
  const loading = useSelector((state) => state.teacher.loading);

  const [editingTeacher, setEditingTeacher] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    // ✅ Fetch all teachers on component mount
    dispatch(getAllTeachers()).then((res) => {
      console.log("✅ Teachers fetched:", res.payload);
    });
  }, [dispatch]);

  const handleEdit = (teacher) => {
    setEditingTeacher(teacher._id);
    setFormData({
      name: teacher.name || '',
      age: teacher.age || '',
      numTel: teacher.numTel || '',
      classes: teacher.classes?.join(', ') || '',
      desc: teacher.desc || '',
      subject: teacher.subject || '',
      email: teacher.email || '',
    });
  };

  const handleUpdate = (e, teacherId) => {
    e.preventDefault();
    dispatch(
      updateTeacher({
        id: teacherId,
        teacherData: {
          ...formData,
          classes: formData.classes.split(',').map((item) => item.trim()),
        },
      })
    ).then(() => {
      setEditingTeacher(null);
      setFormData({});
      dispatch(getAllTeachers());
    });
  };

  const handleDelete = (teacherId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet enseignant ?')) {
      dispatch(deleteTeacher(teacherId)).then(() => {
        dispatch(getAllTeachers());
      });
    }
  };

  const handleCancelEdit = () => {
    setEditingTeacher(null);
    setFormData({});
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (loading) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="container">
      <div>
        <h1>Liste des professeurs</h1>
      </div>
      <br />
      <div className="container">
        <div className="col-lg-9 mt-4 mt-lg-0">
          <div className="row">
            <div className="col-md-12">
              <div className="user-dashboard-info-box table-responsive bg-white shadow-sm">
                <table className="table manage-candidates-top mb-0">
                  <thead>
                    <tr>
                      <th>Nom du professeur</th>
                      <th className="text-center">Matière</th>
                      <th className="text-center">Classes</th>
                      <th className="text-center">Description</th>
                      <th className="action text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teachers && teachers.length > 0 ? (
                      teachers.map((teacher) => (
                        <tr className="candidates-list" key={teacher._id}>
                          <td className="title">
                            <div className="thumb">
                              <img
                                className="img-fluid"
                                src="https://bootdey.com/img/Content/avatar/avatar1.png"
                                alt="teacher"
                              />
                            </div>
                            <div className="candidate-list-details">
                              <div className="candidate-list-info">
                                <div className="candidate-list-title">
                                  {editingTeacher === teacher._id ? (
                                    <input
                                      type="text"
                                      name="name"
                                      value={formData.name}
                                      onChange={handleInputChange}
                                      className="form-control"
                                      placeholder="Nom du professeur"
                                    />
                                  ) : (
                                    <h5 className="mb-0">{teacher.name}</h5>
                                  )}
                                </div>
                                {editingTeacher === teacher._id && (
                                  <div className="mt-2">
                                    <input
                                      type="email"
                                      name="email"
                                      value={formData.email}
                                      onChange={handleInputChange}
                                      className="form-control form-control-sm"
                                      placeholder="Email"
                                    />
                                    <input
                                      type="number"
                                      name="age"
                                      value={formData.age}
                                      onChange={handleInputChange}
                                      className="form-control form-control-sm mt-1"
                                      placeholder="Âge"
                                    />
                                    <input
                                      type="text"
                                      name="numTel"
                                      value={formData.numTel}
                                      onChange={handleInputChange}
                                      className="form-control form-control-sm mt-1"
                                      placeholder="Téléphone"
                                    />
                                  </div>
                                )}
                              </div>
                            </div>
                          </td>

                          <td className="text-center">
                            {editingTeacher === teacher._id ? (
                              <input
                                type="text"
                                name="subject"
                                value={formData.subject}
                                onChange={handleInputChange}
                                className="form-control"
                                placeholder="Matière"
                              />
                            ) : (
                              teacher.subject || '—'
                            )}
                          </td>

                          <td className="text-center">
                            {editingTeacher === teacher._id ? (
                              <input
                                type="text"
                                name="classes"
                                value={formData.classes}
                                onChange={handleInputChange}
                                className="form-control"
                                placeholder="Classes (séparées par des virgules)"
                              />
                            ) : teacher.classes && teacher.classes.length > 0 ? (
                              teacher.classes.join(', ')
                            ) : (
                              '—'
                            )}
                          </td>

                          <td className="text-center">
                            {editingTeacher === teacher._id ? (
                              <textarea
                                name="desc"
                                value={formData.desc}
                                onChange={handleInputChange}
                                className="form-control"
                                placeholder="Description"
                                rows="2"
                              />
                            ) : (
                              teacher.desc || '—'
                            )}
                          </td>

                          <td className="text-right">
                            {editingTeacher === teacher._id ? (
                              <ul className="list-unstyled mb-0 d-flex justify-content-end">
                                <li>
                                  <button
                                    onClick={(e) => handleUpdate(e, teacher._id)}
                                    className="btn btn-success btn-sm me-1"
                                    title="Sauvegarder"
                                  >
                                    <i className="fas fa-check" />
                                  </button>
                                </li>
                                <li>
                                  <button
                                    onClick={handleCancelEdit}
                                    className="btn btn-secondary btn-sm"
                                    title="Annuler"
                                  >
                                    <i className="fas fa-times" />
                                  </button>
                                </li>
                              </ul>
                            ) : (
                              <ul className="list-unstyled mb-0 d-flex justify-content-end">
                                <li>
                                  <a href="#" className="text-primary me-3" title="View">
                                    <i className="far fa-eye" />
                                  </a>
                                </li>
                                <li>
                                  <button
                                    onClick={() => handleEdit(teacher)}
                                    className="text-info me-3 border-0 bg-transparent"
                                    title="Modifier"
                                  >
                                    <i className="fas fa-pencil-alt" />
                                  </button>
                                </li>
                                <li>
                                  <button
                                    onClick={() => handleDelete(teacher._id)}
                                    className="text-danger border-0 bg-transparent"
                                    title="Supprimer"
                                  >
                                    <i className="far fa-trash-alt" />
                                  </button>
                                </li>
                              </ul>
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center">
                          Aucun professeur trouvé
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>

                <div className="text-center mt-3 mt-sm-3">
                  <ul className="pagination justify-content-center mb-0">
                    <li className="page-item disabled">
                      <span className="page-link">Précédent</span>
                    </li>
                    <li className="page-item active" aria-current="page">
                      <span className="page-link">1</span>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        2
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        Suivant
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllTeachers;
