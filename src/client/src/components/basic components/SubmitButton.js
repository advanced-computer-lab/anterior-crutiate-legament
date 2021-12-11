import React from 'react';

import "../../assets/css/components/submit-button.css"

function SubmitButton (props) {

     return (

        <button class="button-40" role="button" onClick={props.click}>{props.buttonText}</button>

        );
    }
    
    export default SubmitButton ;