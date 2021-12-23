import React, { useState, useEffect } from "react";

import {
  setUserToken,
  getUserToken,
} from "../../../handleToken.js";

import NavBar from "../../templates/NavBar";
import Footer from "../../templates/Footer";
import Progress from "../../basic components/Progress";
import TextField from "@mui/material/TextField";
import Form from "@mui/material/FormGroup";
import Grid from "@mui/material/FormGroup";
import SubmitButton from "../../basic components/SubmitButton";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";

function SignIn(props) {
  const history = useHistory();
  const data = useLocation();
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [signInfo, setSignInfo] = useState({
    email: "",
    password: "",
  });

  const [signing , setSigning] = useState(false);
  
  // ComponentWillMount
  useEffect(() => {
    if (getUserToken())
      if (data.state && data.state.redirect)
        history.push(data.state.redirect, data.state.redirectProps);
      else history.push("/");
  }, []);
  

  const signin = async (e) => {
    
    setError(false);
    setSigning(true);

    if (signInfo.email !== "" && signInfo.password !== "") {
        
          let encodedSearchTerms = encodeURIComponent(JSON.stringify(signInfo));
          
          await axios.get(`http://localhost:8000/api/user/userLogin?signInfo=${encodedSearchTerms}`)
          .then((res) => { 
              if (res.status == 200) {
                setSubmitted(true);
                setError(false);
                setUserToken(res.data._id); 
                if (data.state && data.state.redirect)
                  history.push(data.state.redirect, data.state.redirectProps);
                else 
                  history.push("/");
              } 
              else {
                setError(true);
                setSubmitted(false);
              }
              setSigning(false) ;
          });
    } 
    else {
      setSubmitted(false);
      setError(true);
    }
  };

  const successMessage = () => {
    return (
      <div
        className="success"
        style={{
          display: submitted ? "" : "none",
        }}
      >
        <h6>User {signInfo.email} successfully signed in!!</h6>
      </div>
    );
  };

  // Showing error message if error is true
  const errorMessage = () => {
    return (
      <div
        className="error"
        style={{
          display: error ? "" : "none",
        }}
      >
        <h6>Please enter all the fields correctly</h6>
      </div>
    );
  };

  return (
    <div >
      <NavBar />

      <div
        className="main-banner wow fadeIn"
        id="top"
        data-wow-duration="1s"
        data-wow-delay="0.5s"
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="row">
                <div
                  id="register-img"
                  className="col-md-5 pr-lg-5 mb-5 mb-md-0"
                >
                  <img
                    src="https://bootstrapious.com/i/snippets/sn-registeration/illustration.svg"
                    alt=""
                    className="img-fluid mb-3 d-none d-md-block"
                  />
                  <h2 id="create-acc">Sign in Now</h2>
                </div>

                <div id="reg-wrapper" className="col-md-4 col-lg-4 ml-auto">
                  <Form>
                    <TextField
                      value={signInfo.email}
                      onChange={(e) =>
                        setSignInfo({ ...signInfo, email: e.target.value })
                      }
                      id="outlined-basic"
                      label="email"
                      margin="normal"
                      variant="outlined"
                    />
                    <TextField
                      value={signInfo.password}
                      onChange={(e) =>
                        setSignInfo({ ...signInfo, password: e.target.value })
                      }
                      type="password"
                      id="outlined-basic"
                      label="Password"
                      margin="normal"
                      variant="outlined"
                    />
                    {signing?
                    <Progress/>:
                    <SubmitButton buttonText={"Sign In"} click={signin} />
                    }
                  </Form>
                  <div className="messages">
                    {errorMessage()}
                    {successMessage()}
                  </div>
                  <div className="form-group col-lg-12 mx-auto d-flex align-items-center my-4">
                    <div className="border-bottom w-100 ml-5"></div>
                    <span className="px-2 small text-muted font-weight-bold text-muted">
                      OR
                    </span>
                    <div className="border-bottom w-100 mr-5"></div>
                  </div>

                  <div className="text-center w-100">
                    <p className="text-muted font-weight-bold">
                      Do not have an account?{" "}
                      <a href="/register" className="text-primary ml-2">
                        Register
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default SignIn;
