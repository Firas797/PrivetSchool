import React, { useState } from 'react';
import SideBarAdmin from './SideBarAdmin';
import Register from '../../Login&Register/Register';
import Login from '../../Login&Register/Login';
import Teachers from './lesProfs/RegisterTeacher';
import AllTeachers from './lesProfs/ListTeachers/AllTeachers';
import './Side.css'
import ListStudents from './Students/ListStudents';
import NewUsers from './newUsres/NewUsers'
import AdminEvents from './Events/AdminEvents';
import EmploiAdmin from './Emploi/EmploiAdmin';
function AllSide() {
  const [activePage, setActivePage] = useState('home');

  const handlePageChange = (page) => {
    setActivePage(page);
  };

  return (
    <div className="sideBarPad">
      <SideBarAdmin activePage={activePage} handlePageChange={handlePageChange} />
      <div className="content">

        {activePage === 'C_teachers' && <div> <Teachers/> </div>}
*        {activePage === 'L_teachers' && <div className='teachersS'> <AllTeachers/> </div>}
*        {activePage === 'L_Students' && <div className='teachersS'> <ListStudents/> </div>}
        {activePage === 'L_NewUsers' && <div className='teachersS'> <NewUsers/> </div>}
        {activePage === 'L_Events' && <div className='teachersS'> <AdminEvents/> </div>}
                {activePage === 'L_Emploi' && <div className='teachersS'> <EmploiAdmin/> </div>}



      </div>
    </div>
  );
}

export default AllSide;
