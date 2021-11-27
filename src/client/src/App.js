import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import LandingPage from "./components/pages/home/LandingPage"
import DashBoard from './components/pages/home/DashBoard.js';
import Register from './components/pages/auth/Register';
import AdminApp from './components/pages/admin/AdminApp.js'
import AddFlight from './components/pages/admin/AddFlight.js';
import EditFlight from './components/pages/admin/EditFlight.js';
 
class App extends React.Component {
  render() {
    return (
      <Router>
          <Route exact path='/' component={LandingPage} />
          <Route exact path='/home' component={DashBoard} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/admin' component={AdminApp} />
          <Route exact path='/admin/addFlight' component={AddFlight} />
          <Route exact path='/admin/editFlight' component={EditFlight} />
      </Router>
    );
  }
}

export default App;
