import React from 'react';

function SideBarAdmin(props) {
  const { activePage, handlePageChange } = props;

  return (
    <aside className="sidebar">
      <h1 className='title-sideBar'>* création</h1>
      <ul className="nav-links">
        <li className={activePage === 'C_cours' ? 'active' : ''}>
          <button onClick={() => handlePageChange('C_cours')}>- Création des cours</button>
        </li>
        <br/>
        <li className={activePage === 'C_homeWork' ? 'active' : ''}>
          <button onClick={() => handlePageChange('C_homeWork')}> - HomeWork</button>
        </li>
   

      </ul>
      <hr/>

      <h1 className='title-sideBar'> * Conclusion </h1>
      <ul className="nav-links">
      
        <li className={activePage === 'conclusion' ? 'active' : ''}>
          <button onClick={() => handlePageChange('conclusion')}>- conclusion </button>
        </li>
        

      </ul>
      <hr/>
      <h1 className='title-sideBar'>* Etudiants </h1>
      <ul className="nav-links">
      
        <li className={activePage === 'contact' ? 'active' : ''}>
          <button onClick={() => handlePageChange('contact')}>- Liste des Etudiants </button>
        </li>
        

      </ul>
    </aside>
  );
}

export default SideBarAdmin;
