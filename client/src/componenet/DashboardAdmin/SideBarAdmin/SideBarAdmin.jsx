import React from 'react';
import './Side.css';

function SideBarAdmin(props) {
  const { activePage, handlePageChange } = props;

  return (
    <aside className="sidebar">
      <h1 className='title-sideBar'>* Profes</h1>
      
      <ul className="nav-links">
        <li className={activePage === 'C_teachers' ? 'active' : ''}>
          <button onClick={() => handlePageChange('C_teachers')}>- Création des profs</button>
        </li>
       
        <li className={activePage === 'L_teachers' ? 'active' : ''}>
          <button onClick={() => handlePageChange('L_teachers')}>- Liste des profs</button>
        </li>

      </ul>
      <br/>
      <h1 className='title-sideBar'>* Etudients</h1>
      
      <ul className="nav-links">
      
        <li className={activePage === 'L_Students' ? 'active' : ''}>
          <button onClick={() => handlePageChange('L_Students')}>- Liste des Etudiants </button>
        </li>
        

      </ul>
      <br/>
      <h1 className='title-sideBar'>* Manage</h1>

      
    </aside>
  );
}

export default SideBarAdmin;
