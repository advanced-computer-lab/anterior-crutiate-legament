import React from 'react';


import "../../assets/css/forms/sign-in.css";

function RoundButton (props) {
    return (

                <button className="button login__submit">
					<span className="button__text">{props.buttonText}</span>
					<i className="button__icon fas fa-chevron-right"></i>
				</button>


        );
    }
    
    export default RoundButton ;