import React from 'react';


import  "../../assets/css/forms/sign-in.css";

function RoundInputField () {
    return (

        <div className="login__field">
            <i className="login__icon fas fa-user"></i>
            <input type="text" className="login__input" placeholder="User name / Email"/>
        </div>


        );
    }
    
    export default RoundInputField ;