import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import LandingPage from "./components/pages/home/LandingPage"
import DashBoard from './components/pages/home/DashBoard.js';
import Register from './components/pages/auth/Register';
import SignIn from './components/pages/auth/SignIn';
import AdminApp from './components/pages/admin/AdminApp.js'
import AddFlight from './components/pages/admin/AddFlight.js';
import EditFlight from './components/pages/admin/EditFlight.js';

import 'bootstrap/dist/css/bootstrap.min.css';
import "./assets/css/main/main.css"
 

 
function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route exact path='/' element={<LandingPage/>} />
    <Route exact path='/home' element={<DashBoard/>} />
    <Route exact path='/register' element={<Register/>} />
    <Route exact path='/signIn' element={<SignIn/>} />
    <Route exact path='/admin' element={<AdminApp/>} />
    <Route exact path='/admin/addFlight' element={<AddFlight/>} />
    <Route exact path='/admin/editFlight' element={<EditFlight/>} />
  </Routes>
  </BrowserRouter>
  );
}

export default App;
