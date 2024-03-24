import React, { useState } from 'react';
import SideBarAdmin from './SideBarAdmin';
import Register from '../../Login&Register/Register';
import Login from '../../Login&Register/Login';
import Teachers from './lesProfs/RegisterTeacher';
import AllTeachers from './lesProfs/ListTeachers/AllTeachers';
import './Side.css'
import ListStudents from './Students/ListStudents';

function AllSide() {
  const [activePage, setActivePage] = useState('home');

  const handlePageChange = (page) => {
    setActivePage(page);
  };

  return (
    <div className="sideBarPad">
      <SideBarAdmin activePage={activePage} handlePageChange={handlePageChange} />
      <div className="content">
        {/*
          Depending on the activePage state in the AllSide component4
          
          
          
          ,
          you can conditionally render the corresponding content here.
        */}
        {activePage === 'C_teachers' && <div> <Teachers/> </div>}
*        {activePage === 'L_teachers' && <div className='teachersS'> <AllTeachers/> </div>}
*        {activePage === 'L_Students' && <div className='teachersS'> <ListStudents/> </div>}

      </div>
    </div>
  );
}

export default AllSide;
