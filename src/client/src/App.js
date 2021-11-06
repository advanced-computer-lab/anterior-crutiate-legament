import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from './components/home/Home.js';
import AdminApp from './components/admin/AdminApp.js'
import AddFlight from './components/admin/AddFlight.js';
import EditFlight from './components/admin/EditFlight.js';
import './assets/style/App.css';

class App extends React.Component {
  render() {
    return (
      <Router>
          <Route exact path='/' component={Home} />
          <Route exact path='/admin' component={AdminApp} />
          <Route exact path='/admin/addFlight' component={AddFlight} />
          <Route exact path='/admin/editFlight' component={EditFlight} />
      </Router>
    );
  }
}

export default App;
