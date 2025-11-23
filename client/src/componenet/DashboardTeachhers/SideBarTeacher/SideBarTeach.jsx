import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaBookOpen, FaClipboardList, FaUserFriends, FaCheckCircle, FaSignOutAlt } from 'react-icons/fa';
import { logoutTeacher } from '../../../redux/Teachers/teacherSlice';
import '../../DashboardAdmin/SideBarAdmin/Side.css';

function SideBarTeach({ activePage, handlePageChange }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const teacher = useSelector((state) => state.teacher.teacher);

  const handleLogout = () => {
    dispatch(logoutTeacher());
    navigate('/LoginProf'); // redirect to login page
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2 className="sidebar-title">
          👨‍🏫 Espace Prof
          {teacher && (
            <p className="sidebar-teacher-name">{teacher.name}</p>
          )}
        </h2>
      </div>

      {/* <div className="sidebar-section">
        <h3 className="sidebar-section-title">Étudiants</h3>
        <ul className="nav-links">
          <li className={activePage === 'classes' ? 'active' : ''}>
            <button onClick={() => handlePageChange('classes')}>
              <FaUserFriends className="icon" /> Liste des étudiants
            </button>
          </li>
        </ul>
      </div> */}

      <div className="sidebar-section">
        <h3 className="sidebar-section-title">Cours</h3>
        <ul className="nav-links">
          <li className={activePage === 'C_cours' ? 'active' : ''}>
            <button onClick={() => handlePageChange('C_cours')}>
              <FaBookOpen className="icon" /> Créer un cours
            </button>
          </li>
          <li className={activePage === 'C_homeWork' ? 'active' : ''}>
            <button onClick={() => handlePageChange('C_homeWork')}>
              <FaClipboardList className="icon" /> Exercices
            </button>
          </li>
        </ul>
      </div>

      <div className="sidebar-section">
        <h3 className="sidebar-section-title">Évaluations</h3>
        <ul className="nav-links">
          <li className={activePage === 'conclusion' ? 'active' : ''}>
            <button onClick={() => handlePageChange('conclusion')}>
              <FaCheckCircle className="icon" /> Conclusion
            </button>
          </li>
   
           <li className={activePage === 'culture' ? 'active' : ''}>
            <button onClick={() => handlePageChange('culture')}>
              <FaCheckCircle className="icon" /> Culture générale
            </button>
          </li>
        </ul>
      </div>
      <div className="sidebar-section">
        <h3 className="sidebar-section-title">Examens</h3>
        <ul className="nav-links">
          <li className={activePage === 'exam' ? 'active' : ''}>
            <button onClick={() => handlePageChange('exam')}>
              <FaCheckCircle className="icon" /> créer examen
            </button>
          </li>
   
      
        </ul>
      </div>
      <div className="sidebar-section">
        <h3 className="sidebar-section-title">Quiz</h3>
        <ul className="nav-links">
          <li className={activePage === 'Quiz' ? 'active' : ''}>
            <button onClick={() => handlePageChange('Quiz')}>
              <FaUserFriends className="icon" /> Créer Quiz
            </button>
          </li>
        </ul>
      </div>

      {/* Logout button */}
      <div className="sidebar-section">
        <ul className="nav-links">
          <li>
            <button onClick={handleLogout} className="logout-btn">
              <FaSignOutAlt className="icon" /> Déconnexion
            </button>
          </li>
        </ul>
      </div>
    </aside>
  );
}

export default SideBarTeach;
