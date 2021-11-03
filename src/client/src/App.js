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
        <div>
          <Route exact path='/' component={Home} />
          <Route path='/admin/' component={AdminApp} />
          <Route path='/addFlight' component={AddFlight} />
          <Route path='/editFlight' component={EditFlight} />
        </div>
      </Router>
    );
  }
}

export default App;
