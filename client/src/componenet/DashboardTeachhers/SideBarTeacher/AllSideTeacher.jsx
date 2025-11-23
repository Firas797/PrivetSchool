import React, { useState } from 'react';
import SideBarTeach from './SideBarTeach';
import '../../DashboardAdmin/SideBarAdmin/Side.css';
import CreateCours from '../courssManagmenet/CreateCours.js';
import CreateHomeWork from '../HomeWorkMngmnt/CreateHomeWork';
import Conclusion from '../conclusion/Conclusion';
import CreateQuizForm from "../Quiz/CreateQuizForm.js"
import ListStudentsTeacher from '../ListStudentsTeacher/ListStudentsTeacher'
import CultureDashboard from '../CultureDashboard/CultureDashboard.jsx';
import Exams from '../Exams/Exams.js';

function AllSide() {
  const [activePage, setActivePage] = useState('home');

  const handlePageChange = (page) => {
    setActivePage(page);
  };

  return (
    <div className="sideBarPad">
      <SideBarTeach activePage={activePage} handlePageChange={handlePageChange} />
      
      <div className="content">
        {activePage === 'C_cours' && (
          <div className="teachersS">
            <CreateCours />
          </div>
        )}
        {activePage === 'C_homeWork' && (
          <div className="teachersS">
            <CreateHomeWork />
          </div>
        )}
        {activePage === 'classes' && (
          <div className="teachersS">
       
            <ListStudentsTeacher/>
          </div>
        )}
        {activePage === 'conclusion' && (
          <div className="teachersS">
            <Conclusion />
          </div>
        )}
        {activePage === 'culture' && (
          <div className="teachersS">
            <CultureDashboard />
          </div>
        )}
          {activePage === 'Quiz' && (
          <div className="teachersS">
            <CreateQuizForm/>
          </div>
        )}
          {activePage === 'exam' && (
          <div className="teachersS">
           <Exams/>
          </div>
        )}
      </div>
    </div>
  );
}

export default AllSide;
