import React, { useEffect } from 'react';
import Login from './componenet/Login&Register/Login'
import LoginTeacher from './componenet/Login&Register/LoginTeacher'
import Register from './componenet/Login&Register/Register'
import Landing from './../src/componenet/LandingPage/Landing'
import { BrowserRouter , Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux'
import AllSide from './componenet/DashboardAdmin/SideBarAdmin/AllSide'
import AllTeachers from './componenet/DashboardAdmin/SideBarAdmin/lesProfs/ListTeachers/AllTeachers'
import Students from './componenet/DashboardStudents/Students'
import Teacher from './componenet/DashboardTeachhers/SideBarTeacher/AllSideTeacher'
import NewUsers from './componenet/DashboardAdmin/SideBarAdmin/newUsres/NewUsers'
import UserEvents from './componenet/LandingPage/Events/UserEvents'
import { useDispatch } from 'react-redux';
import { refreshUserData } from './redux/LoginRegister/authSlice';
import DashboardCEO from './componenet/DashboardCeo/DashboardCEO';
import Emploi from './componenet/LandingPage/Emploi/Emploi';
import Notifications from './componenet/LandingPage/Notifications/Notifications';
function App() {

const isAdmi = useSelector((state)=> state.user?.role)
 const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(refreshUserData());
    }
  }, [dispatch]);

  return (
    <div>



      <Routes>

      <Route path="/" element={<Landing />} />


               <Route path="/login" element={<Login />} />
               <Route path="/loginProf" element={<LoginTeacher />} /> 

               <Route path="/register" element={<Register />} />
                              <Route path="/CEO" element={<DashboardCEO />} />

               

                     <Route path="/Admin" element={<AllSide />} />
                         <Route path="/getAllTeachers" element={<AllTeachers />} />



                     {/* Updated routes with childId parameter */}
          <Route path="/student/:childId?" element={<Students />} />
          <Route path="/Emploi/:childId?" element={<Emploi/>} />
                         <Route path="/notifications" element={<Notifications/>} />



                         <Route path="/Teacher" element={<Teacher />} />
                                                  <Route path="/NewUsers" element={<NewUsers/>} />
                       <Route path="/evenements" element={<UserEvents/>} />


 


      </Routes>
      



    </div>
  )
}

export default App