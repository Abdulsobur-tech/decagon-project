import React, { useState } from "react";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import Registration from "./components/Registration";
 import Course from "./components/Course";
import Admin from "./components/Admin";
import ProtectedRoute from "./ProtectedRoute";


function App() {
  //const [loggedin, setLoggedin] =useState(localStorage.getItem('token') || false)
 // console.log(!loggedin)
  return (
    <>
      <Router>
       <Routes>
      <Route exact path='/' element={<HomePage/>}/>
      <Route exact path='/registration' element={<Registration/>}/>
      
      <Route exact path='/login' element={<Login/>}/>
      <Route exact path='/course/admin' element={<ProtectedRoute ><Admin/></ProtectedRoute>}/>
      
      <Route exact path='/course/registration' element={<ProtectedRoute><Course/></ProtectedRoute>}/>
    </Routes>  
    
   </Router>
    </>
  );
}

export default App;
