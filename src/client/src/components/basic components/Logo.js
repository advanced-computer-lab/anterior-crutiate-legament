import React from 'react';

import "../../assets/css/components/logo.css"

import logo from "../../assets/img/logo-ct-2.png";


function Logo (props) {

     return (

        <div  item className="logo-wrapper" width="100%">
            <a  id ="ttt" href="/">
                <img id = "logo" src= {logo}/>    
                <span>GUC Air</span>
            </a>
        </div>    
        );
    }
    
    export default Logo ;