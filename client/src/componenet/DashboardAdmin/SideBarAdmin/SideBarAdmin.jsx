import React from 'react';
import './Side.css';
import { FaChalkboardTeacher, FaUserGraduate, FaUserPlus } from 'react-icons/fa';

function SideBarAdmin({ activePage, handlePageChange }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2 className="sidebar-title">📘 Admin Panel</h2>
      </div>

      <div className="sidebar-section">
        <h3 className="sidebar-section-title">Professeurs</h3>
        <ul className="nav-links">
          <li className={activePage === 'C_teachers' ? 'active' : ''}>
            <button onClick={() => handlePageChange('C_teachers')}>
              <FaChalkboardTeacher className="icon" /> Création des professeurs
            </button>
          </li>
          <li className={activePage === 'L_teachers' ? 'active' : ''}>
            <button onClick={() => handlePageChange('L_teachers')}>
              <FaChalkboardTeacher className="icon" /> Liste des professeurs
            </button>
          </li>
        </ul>
      </div>

      <div className="sidebar-section">
        <h3 className="sidebar-section-title">Étudiants</h3>
        <ul className="nav-links">
          <li className={activePage === 'L_Students' ? 'active' : ''}>
            <button onClick={() => handlePageChange('L_Students')}>
              <FaUserGraduate className="icon" /> Liste des étudiants
            </button>
          </li>
        </ul>
      </div>

      <div className="sidebar-section">
        <h3 className="sidebar-section-title">Inscriptions</h3>
        <ul className="nav-links">
          <li className={activePage === 'L_NewUsers' ? 'active' : ''}>
            <button onClick={() => handlePageChange('L_NewUsers')}>
              <FaUserPlus className="icon" /> Nouveaux inscrits
            </button>
          </li>
        </ul>
      </div>
      
      <div className="sidebar-section">
        <h3 className="sidebar-section-title">Emploi du temps</h3>
        <ul className="nav-links">
          {/* Fixed: Changed from 'L_NewUsers' to 'L_Emploi' */}
          <li className={activePage === 'L_Emploi' ? 'active' : ''}>
            <button onClick={() => handlePageChange('L_Emploi')}>
              <FaUserPlus className="icon" /> Ajouter Emploi
            </button>
          </li>
        </ul>
      </div>
      
      <div className="sidebar-section">
        <h3 className="sidebar-section-title">Evenement</h3>
        <ul className="nav-links">
          {/* Fixed: Changed from 'L_NewUsers' to 'L_Events' */}
          <li className={activePage === 'L_Events' ? 'active' : ''}>
            <button onClick={() => handlePageChange('L_Events')}>
              <FaUserPlus className="icon" /> Creé evenement
            </button>
          </li>
        </ul>
      </div>
    </aside>
  );
}

export default SideBarAdmin;