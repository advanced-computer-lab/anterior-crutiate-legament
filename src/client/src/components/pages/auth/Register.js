import React from 'react';

import LandingNavBar from '../../templates/LandingNavBar';

import "../../../assets/css/forms/sign-up.css"
import 'bootstrap/dist/css/bootstrap.min.css';

 
class Register extends React.Component {

    render() {
        return (

            <>
            <LandingNavBar/>

            <div className="main-banner wow fadeIn" id="top" data-wow-duration="1s" data-wow-delay="0.5s">
                <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                    <div className="row">
                        

                    <div id= "register-img" className="col-md-5 pr-lg-5 mb-5 mb-md-0">
                <img src="https://bootstrapious.com/i/snippets/sn-registeration/illustration.svg" alt="" className="img-fluid mb-3 d-none d-md-block"/>
                <h2>Create an Account</h2>

                <div className="form-group col-lg-12 mx-auto d-flex align-items-center my-4">
                            <div className="border-bottom w-100 ml-5"></div>
                            <span className="px-2 small text-muted font-weight-bold text-muted">OR</span>
                            <div className="border-bottom w-100 mr-5"></div>
                        </div>

                        <div className="text-center w-100">
                            <p className="text-muted font-weight-bold">Already Registered? <a href="#" className="text-primary ml-2">Login</a></p>
                        </div>

                </div>

            <div className="col-md-7 col-lg-6 ml-auto">
                <form action="#">
                    <div className="row">

                        <div className="input-group col-lg-6 mb-4">
                            <div className="input-group-prepend">
                                <span className="input-group-text bg-white px-4 border-md border-right-0">
                                    <i className="fa fa-user text-muted"></i>
                                </span>
                            </div>
                            <input id="firstName" type="text" name="firstname" placeholder="First Name" className="form-control form-c bg-white border-left-0 border-md"/>
                        </div>

                        <div className="input-group col-lg-6 mb-4">
                            <div className="input-group-prepend">
                                <span className="input-group-text bg-white px-4 border-md border-right-0">
                                    <i className="fa fa-user text-muted"></i>
                                </span>
                            </div>
                            <input id="lastName" type="text" name="lastname" placeholder="Last Name" className="form-control form-c bg-white border-left-0 border-md"/>
                        </div>

                        <div className="input-group col-lg-12 mb-4">
                            <div className="input-group-prepend">
                                <span className="input-group-text bg-white px-4 border-md border-right-0">
                                    <i className="fa fa-envelope text-muted"></i>
                                </span>
                            </div>
                            <input id="email" type="email" name="email" placeholder="Email Address" className="form-control form-c bg-white border-left-0 border-md"/>
                        </div>

                        <div className="input-group col-lg-12 mb-4">
                            <div className="input-group-prepend">
                                <span className="input-group-text bg-white px-4 border-md border-right-0">
                                    <i className="fa fa-phone-square text-muted"></i>
                                </span>
                            </div>
                            <select id="countryCode" name="countryCode" styles="max-width: 80px" className="custom-select form-control form-c bg-white border-left-0 border-md h-100 font-weight-bold text-muted">
                                <option value="">+12</option>
                                <option value="">+10</option>
                                <option value="">+15</option>
                                <option value="">+18</option>
                            </select>
                            <input id="phoneNumber" type="tel" name="phone" placeholder="Phone Number" className="form-control form-c bg-white border-md border-left-0 pl-3"/>
                        </div>


                        <div className="input-group col-lg-6 mb-4">
                            <div className="input-group-prepend">
                                <span className="input-group-text bg-white px-4 border-md border-right-0">
                                    <i className="fa fa-lock text-muted"></i>
                                </span>
                            </div>
                            <input id="password" type="password" name="password" placeholder="Password" className="form-control form-c bg-white border-left-0 border-md"/>
                        </div>

                        <div className="input-group col-lg-6 mb-4">
                            <div className="input-group-prepend">
                                <span className="input-group-text bg-white px-4 border-md border-right-0">
                                    <i className="fa fa-lock text-muted"></i>
                                </span>
                            </div>
                            <input id="passwordConfirmation" type="text" name="passwordConfirmation" placeholder="Confirm Password" className="form-control form-c bg-white border-left-0 border-md"/>
                        </div>

                        <div className="form-group col-lg-12 mx-auto mb-0">
                            <a href="#" id = "sub" className="btn btn-primary btn-block py-2">
                                <span className="font-weight-bold">Create your account</span>
                            </a>
                        </div>


                    </div>
                </form>
            </div>

                    </div>
                    </div>
                </div>
                </div>
            </div>

        </>  

            )
        };
      }
      
  export default Register ;  