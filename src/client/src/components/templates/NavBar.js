import React from 'react';

import logo from  "../../assets/img/logo-ct-2.png"; 
import { Link } from '@material-ui/core';
import {getUserToken,deleteUserToken} from "../../handleToken";


function NavBar () {

    const logOut = () => {
      deleteUserToken() ;
    }
    return (

      <header className="header-area header-sticky wow slideInDown"style={{backgroundColor:"#F3F1F5"}} data-wow-duration="0.75s" data-wow-delay="0s">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <nav className="main-nav" >
              <a href="/" className="logo">
                <img src= {logo} alt=""/>
              </a>
              
              <ul className="nav">
                <li className="scroll-to-section"><a href="/" className="active">Home</a></li>
                <li className="scroll-to-section"><a href="/services">Services</a></li>
                <li className="scroll-to-section"><a href="/contact">Contact</a></li> 
                {getUserToken()?
                <li className="scroll-to-section"><a href="/profile">Profile</a></li>:null
                }
                {getUserToken()?"":
                <li className="scroll-to-section"><a href="/signIn">Sign In</a></li>
                }
                {getUserToken()?"":
                <li className="scroll-to-section"><div className="border-first-button"><a href="/register">Register</a></div></li> 
                }

                {getUserToken()?
                <Link href = "/"  onClick={logOut}>
                    <li className="scroll-to-section"><div className="border-first-button"><a>Log Out</a></div></li> 
                </Link>:"" 
                }
              </ul>        
              <a className='menu-trigger'>
                  <span>Menu</span>
              </a>
            </nav>
          </div>
        </div>
      </div>
    </header>
 
    );
}

export default NavBar ;