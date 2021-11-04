import React from 'react';

import Header from './Header'; //Include Heder
//import Footer from './Footer'; //Include Footer

 
class Home extends React.Component {
  
  render() {
    return (
     <div className="home-page">
       <div className="home-page-components">
          <h1>Greatest Unique Country Airlines</h1>
          <a href="http://localhost:3000/admin/">  
            <button>Admin Login</button>  
          </a>
        </div>
    </div>
   )
  };
}

export default Home;