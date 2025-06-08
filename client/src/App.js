import React from 'react'
import Login from './componenet/Login&Register/Login'
import LoginTeacher from './componenet/Login&Register/LoginTeacher'
import DashboardTeachers from './componenet/DashboardTeachhers/DashboardTeachers'
import Register from './componenet/Login&Register/Register'
import Landing from './../src/componenet/LandingPage/Landing'
import { BrowserRouter , Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux'
import AllSide from './componenet/DashboardAdmin/SideBarAdmin/AllSide'
import AllTeachers from './componenet/DashboardAdmin/SideBarAdmin/lesProfs/ListTeachers/AllTeachers'
import Students from './componenet/DashboardStudents/Students'

import Teacher from './componenet/DashboardTeachhers/SideBarTeacher/AllSideTeacher'
import Quiz from './componenet/QuizTemplate/Quiz'
function App() {

const isAdmi = useSelector((state)=> state.user?.role)

  return (
    <div>



      <Routes>

      <Route path="/" element={<Landing />} />


               {/* <Route path="/login" element={<Login />} />
               <Route path="/loginProf" element={<LoginTeacher />} /> */}

               <Route path="/register" element={<Register />} />
               

                         {/* <Route path="/Admin" element={<AllSide />} />
                         <Route path="/dashboardTeacher" element={<DashboardTeachers />} />
                         <Route path="/getAllTeachers" element={<AllTeachers />} />



                         <Route path="/Student" element={<Students />} />



                         <Route path="/Teacher" element={<Teacher />} />
                         <Route path="/Test" element={<Quiz/>} />
 */}


      </Routes>
      



    </div>
  )
}

export default App