import React from 'react';

import Header from './Header'; //Include Heder
import Footer from './Footer'; //Include Footer

 
class Home extends React.Component {
  
  render() {
    return (
     <div className="home-page">
        <h1>Anterior Cruciate Ligament</h1>
        <a href="http://localhost:3000/admin/">  
          <button>VIEW MORE</button>  
        </a>
    </div>
   )
  };
}

export default Home;