import React from 'react';


import RoundButton from '../../basic components/RoundButton';
import RoundInputField from '../../basic components/RoundInputField';

import 'bootstrap/dist/css/bootstrap.min.css';

 
class SignIn extends React.Component {

    render() {
        return (

            <div className="container">
        	<div className="screen">
	        	<div className="screen__content">

                <RoundInputField placeholder = "Username" type = "text">

                </RoundInputField>
                <RoundInputField placeholder = "Password" type = "password">

                </RoundInputField>
                <RoundButton buttonText = "Sign In" >
                    
                </RoundButton>

                </div>
	        </div>
        </div>
   
       )
      };
    }
    
export default SignIn;