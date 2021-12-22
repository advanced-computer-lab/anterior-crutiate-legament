import React, {useState} from 'react';

import NavBar from '../../templates/NavBar';
import Footer from '../../templates/Footer';
import TextField from '@mui/material/TextField';
import Form from '@mui/material/FormGroup';
import SubmitButton from '../../basic components/SubmitButton';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import "../../../handleToken";
 
function Register (props) {
    const history = useHistory();
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);
    const [message, setMessage] = useState("");

    const [registerInfo , setRegisterInfo] = useState(
        {
            firstName : "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
            passport: ""
        }
    );

     
    const register =  async (e) => {
        
        const validateEmail = await isValidEmail(registerInfo.email);

        console.log(validateEmail) ;
        if( 
            registerInfo.firstName === ""
            || registerInfo.lastName === ""
            || registerInfo.email === ""
            || registerInfo.passport === ""
            || registerInfo.password === ""){

            setSubmitted(false);
            setMessage("Please Enter All Fields correctly");
            setError(true);
            
        }
        else if(validateEmail == 0){
            setSubmitted(false);
            setMessage("Please Enter A Valid Email");
            setError(true);
        }
        else if(validateEmail == -1){
            setSubmitted(false);
            setMessage("This Email Already Exists");
            setError(true);
        }
        else if(registerInfo.password!==registerInfo.confirmPassword){
            setSubmitted(false);
            setMessage("Passwords do not Match");
            setError(true);
        }
        else{
            setSubmitted(true);
            setError(false);
            axios.post(`http://localhost:8000/api/user/userRegister`,   registerInfo);
            history.push("/");
        }

    };

  
    const successMessage = () => {
        return (
            <div
                className="success"
                style={{
                    display: submitted ? '' : 'none',
                }}>
                <h6>User {registerInfo.firstName} successfully registered!!</h6>
            </div>
        );
    };

    // Showing error message if error is true
    const errorMessage = (message) => {
        return (
            <div
                className="error"
                style = {{
                    display: error ? '' : 'none',
                }}>
                <h6>{message}</h6>
            </div>
        );
    };


    return (
                
            <>
            <NavBar/>

            <div className="main-banner wow fadeIn" id="top" data-wow-duration="1s" data-wow-delay="0.5s">
                <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                    <div className="row">
                        

                    <div id= "register-img" className="col-md-5 pr-lg-5 mb-5 mb-md-0">
                <img src="https://bootstrapious.com/i/snippets/sn-registeration/illustration.svg" alt="" className="img-fluid mb-3 d-none d-md-block"/>
                <h2 id = "create-acc" >Create an Account</h2>

                <div className="form-group col-lg-12 mx-auto d-flex align-items-center my-4">
                            <div className="border-bottom w-100 ml-5"></div>
                            <span className="px-2 small text-muted font-weight-bold text-muted">OR</span>
                            <div className="border-bottom w-100 mr-5"></div>
                        </div>

                        <div className="text-center w-100">
                            <p className="text-muted font-weight-bold">Already Registered? <a href="/signIn" className="text-primary ml-2">Sign In</a></p>
                        </div>

                </div>

                <div  id="reg-wrapper" className="col-md-4 col-lg-4 ml-auto">
                    <Form>
                        <TextField
                            value={registerInfo.firstName}
                            onChange = {(e) => setRegisterInfo({...registerInfo, firstName: e.target.value})}
                            id="outlined-basic" label="First Name" margin="dense" variant="outlined" />
                        <TextField
                            value={registerInfo.lastName}
                            onChange = {(e) => setRegisterInfo({...registerInfo, lastName: e.target.value})}
                            id="outlined-basic" label="Last Name" margin="dense" variant="outlined" />
                        <TextField
                            value={registerInfo.passport}
                            onChange = {(e) => setRegisterInfo({...registerInfo, passport: e.target.value})}
                            id="outlined-basic" label="Passport Number" margin="dense" variant="outlined" />
                        <TextField
                            value={registerInfo.email}
                            onChange = {(e) => setRegisterInfo({...registerInfo, email: e.target.value})}
                            id="outlined-basic" label="Email" margin="dense" variant="outlined" />
                        <TextField
                            type="password"
                            value={registerInfo.password}
                            onChange = {(e) => setRegisterInfo({...registerInfo, password: e.target.value})}
                            id="outlined-basic" label="Password" margin="dense" variant="outlined" />
                        <TextField
                            type="password"
                            value={registerInfo.confirmPassword}
                            onChange = {(e) => setRegisterInfo({...registerInfo, confirmPassword: e.target.value})}
                            id="outlined-basic" label="Confirm Password" margin="dense" variant="outlined" />
                        <SubmitButton buttonText = {"Register"} click ={register} />
                    </Form>
                    <div className="messages">
                        {errorMessage(message)}
                        {successMessage()}
                    </div>

                </div>

                    </div>
                    </div>
                </div>
                </div>
            </div>

            <Footer/>

        </>  

            );
      }
      
 async function isValidEmail  (email){

        if(! (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))){
          return 0 ;         
        }

        let encodedSearchTerms = encodeURIComponent(JSON.stringify({email:email}));        
        
        const exists = await axios.get(`http://localhost:8000/api/user/userExists?user=${encodedSearchTerms}`);
        
        if(exists.data)
            return -1 ;
        else 
            return 1 ;    
 
}


  export default Register ;  