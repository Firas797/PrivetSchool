import React, { useState } from 'react';
import SideBarTeach from './SideBarTeach';

import '../../DashboardAdmin/SideBarAdmin/Side.css'
import CreateCours from '../courssManagmenet/CreateCours.js'
import CreateHomeWork from '../HomeWorkMngmnt/CreateHomeWork';
import Conclusion from '../conclusion/Conclusion';
function AllSide() {
  const [activePage, setActivePage] = useState('home');

  const handlePageChange = (page) => {
    setActivePage(page);
  };

  return (
    <div className="sideBarPad">
      <SideBarTeach activePage={activePage} handlePageChange={handlePageChange} />
      <div className="content">
        {/*
          Depending on the activePage state in the AllSide component,
          you can conditionally render the corresponding content here.
        */}
        {activePage === 'C_cours' && <div> <CreateCours/> </div>}
        *        {activePage === 'C_homeWork' && <div > <CreateHomeWork/> </div>}

*        {activePage === 'classes' && <div className='teachersS'> hello </div>}
*        {activePage === 'conclusion' && <div className='conclusion'> <Conclusion/>   </div>}

      </div>
    </div>
  );
}

export default AllSide;
