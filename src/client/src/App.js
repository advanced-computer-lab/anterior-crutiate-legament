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
import Profile from "./components/pages/profile/Profile.js";


import DateFnsUtils from '@date-io/date-fns'; 
import   {MuiPickersUtilsProvider} from '@material-ui/pickers';



import 'bootstrap/dist/css/bootstrap.min.css';
import "./assets/css/main/main.css"
 

 
function App() {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>

    <BrowserRouter>
    <Routes>
    <Route exact path='/' element={<LandingPage/>} />
    <Route exact path='/home' element={<DashBoard/>} />
    <Route exact path='/register' element={<Register/>} />
    <Route exact path='/signIn' element={<SignIn/>} />
    <Route exact path='/admin' element={<AdminApp/>} />
    <Route exact path='/admin/addFlight' element={<AddFlight/>} />
    <Route exact path='/admin/editFlight' element={<EditFlight/>} />
    <Route exact path='/Profile' element={<Profile/>} />

  </Routes>
  </BrowserRouter>

  </MuiPickersUtilsProvider>

  );
}

export default App;
