import React from 'react';

import "../../assets/css/components/shaded-button.css"

function ShadedButton (props) {

     return (

        <button class="button-50" role="button">{props.buttonText}</button>


        );
    }
    
    export default ShadedButton ;