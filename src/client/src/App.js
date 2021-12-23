import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";


 
import LandingPage from "./components/pages/home/LandingPage";
import DashBoard from "./components/pages/home/DashBoard.js";
import Register from "./components/pages/auth/Register.js";
import SignIn from "./components/pages/auth/SignIn.js";
import Summary from "./components/pages/checkout/Summary.js";
import ChooseSeats from "./components/pages/checkout/ChooseSeats.js";
import CheckOut from "./components/pages/checkout/CheckOut.js";

import AdminApp from "./components/pages/admin/AdminApp.js";
import AddFlight from "./components/pages/admin/AddFlight.js";
import EditFlight from "./components/pages/admin/EditFlight.js";
import AdminLogin from "./components/pages/admin/AdminLogin.js";
import AddAdmin from "./components/pages/admin/AddAdmin.js";
import Profile from "./components/pages/profile/Profile.js";
 
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/main/main.css";

function App() {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
 
 
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/home" component={DashBoard} />
      <Route exact path="/register" component={Register} />
      <Route exact path= {"/signIn"} component={SignIn} />
      <Route exact path='/Profile' component={Profile} />
      <Route exact path='/flightsSummary' component={Summary} />
      <Route exact path='/chooseSeats' component={ChooseSeats} />
      <Route exact path='/checkOut' component={CheckOut} />

      <Route exact path="/adminLogin" component={AdminLogin} />
      <Route exact path="/admin" component={AdminApp} />
      <Route exact path="/admin/addFlight" component={AddFlight} />
      <Route exact path="/admin/editFlight" component={EditFlight} />
      <Route exact path="/admin/addAdmin" component={AddAdmin} />
    </MuiPickersUtilsProvider>
   );
}

export default App;
