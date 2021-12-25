import React, { useEffect } from 'react';
import Cards from 'react-credit-cards';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import swal from 'sweetalert';
import axios from 'axios';
import { getUserID, getUserToken } from "../../../handleToken.js";
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom';
import { useHistory, useLocation } from "react-router-dom";
import LinearProgress from '@mui/material/LinearProgress';

import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate
} from './cardUtils'

import 'react-credit-cards/es/styles-compiled.css';

var Stripe = require('stripe')('pk_test_51K9e8iLXRXUubuQwgGqjiExXWFcWOvwfUwlCADJJD7w0Q5JFrlI0BRdRmC9Km5suRfUZ06ce0TppQKcCUGu4R6OV00H2GbbimL');
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default function RootFunction(props) {
  const history = useHistory();
  const data = useLocation();
  return <PaymentForm history={history} data={props} />;
}

class PaymentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cvc: '',
      expiry: '',
      focus: '',
      name: '',
      number: '',
      reserveReqDepart: props.data.reserveReqDepart,
      reserveReqArrival: props.data.reserveReqArrival,
      departPrice: props.data.departPrice,
      arrivalPrice: props.data.arrivalPrice,
      totalPrice: parseInt(props.data.departPrice) + parseInt(props.data.arrivalPrice),
      email: "",
      password: "",
      history:props.history,
      buttonDisplay:'',
      loading:'none',
      open: false
    };
  }

  componentDidMount() {
    if (!window.document.getElementById("stripe-script")) {
      var s = window.document.createElement("script");
      s.id = "stripe-script";
      s.type = "text/javascript";
      s.src = "https://js.stripe.com/v2/";
      s.onload = () => {
        window["Stripe"].setPublishableKey(
          "pk_test_51K9e8iLXRXUubuQwgGqjiExXWFcWOvwfUwlCADJJD7w0Q5JFrlI0BRdRmC9Km5suRfUZ06ce0TppQKcCUGu4R6OV00H2GbbimL"
        );
      };
      window.document.body.appendChild(s);
    }
    sleep(300);
  }
  handleInputFocus = (e) => {
    this.setState({ focus: e.target.name });
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  }

  render() {
    // if(!this.state.totalPrice) return <div>Loading..</div>
    return (
      <div>
        <button className="btn btn-primary" type="submit" onClick={() => this.setState({ open: true })} >
          Check Out
        </button>
        <Dialog open={this.state.open} onClose={() => this.setState({ open: false })}>
          <DialogTitle>Payment Form</DialogTitle>
          <DialogContent>
            <DialogContentText style={{ color: 'black' }}>
              Please add your payment card to complete reservation
              <h4>Total Amount to be paid: </h4>
              <h5 style={{ color: 'red' }}> totalPrice:{this.state.totalPrice} </h5>
              <h8>Departure Price:{this.state.departPrice} ---  Arrival Price:{this.state.arrivalPrice}</h8>
            </DialogContentText>
            <br />
            <div id="PaymentForm" style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>

              <Stack spacing={2}>
                <Cards
                  cvc={this.state.cvc}
                  expiry={this.state.expiry}
                  focused={this.state.focus}
                  name={this.state.name}
                  number={this.state.number}
                />


                <Stack spacing={1.5}>
                  <TextField
                    label="Email"
                    type="text"
                    name="email"
                    value={this.state.email}
                    onChange={(e) => this.setState({ email: e.target.value })}
                  />

                  <TextField
                    label="Card Number"
                    type="text"
                    name="number"
                    placeholder="Card Number"
                    pattern="[\d| ]{16,22}"
                    format={formatCreditCardNumber}
                    onChange={this.handleInputChange}
                    onFocus={this.handleInputFocus}
                  />


                  <TextField
                    label="Name on Card"
                    type="text"
                    name="name"
                    placeholder="Name on Card"
                    onChange={this.handleInputChange}
                    onFocus={this.handleInputFocus}
                  />


                  <TextField
                    label="Expiry Date"
                    type="text"
                    name="expiry"
                    placeholder="Expiry Date"
                    pattern="\d\d/\d\d"
                    format={formatExpirationDate}
                    onChange={this.handleInputChange}
                    onFocus={this.handleInputFocus}
                  />


                  <TextField
                    label="CVC"
                    type="text"
                    name="cvc"
                    placeholder="CVC"
                    pattern="\d{3,4}"
                    format={formatCVC}
                    onChange={this.handleInputChange}
                    onFocus={this.handleInputFocus}
                  />

                  <br />
                  <TextField
                    label="User Password"
                    type="password"
                    name="password"
                    onChange={(e) => this.setState({ password: e.target.value })}
                  />

                </Stack>

                <Button
                  variant="contained" style={{ backgroundColor: '#3B566E' , display: this.state.buttonDisplay  }}
                  onClick={() => {

                    try {
                      window.Stripe.card.createToken(
                        {
                          number: this.state.number,
                          exp_month: this.state.expiry.split("/")[0],
                          exp_year: this.state.expiry.split("/")[1],
                          cvc: this.state.cvc,
                          name: this.state.name,
                        },
                        (status, response) => {
                          if (status === 200) {
                            let data = {
                              _id: getUserID(),
                              token: JSON.parse(getUserToken()),
                              password: this.state.password,
                            };
                            let encodedId = encodeURIComponent(JSON.stringify(data));
                            axios.get(`http://localhost:8000/api/user/verifyPassword?in=${encodedId}`)
                              .then((res) => {
                                if(!validateEmail(this.state.email)){
                                  swal("Error", "Enter a vaild Email", "error");

                                }
                                else if (res.data.result === true) {
                                  this.setState({buttonDisplay:"none",loading:""});
                                  data = {
                                    token: response,
                                    email: this.state.email,
                                    amount: this.state.totalPrice,
                                  };
                                  axios.post(`http://localhost:8000/api/user/payment`, data)
                                    .then(() => {
                                      data = {
                                        email: this.state.email,
                                        amount: this.state.departPrice,
                                        subject: "Departure Flight",
                                        info: this.state.reserveReqDepart
                                      }
                                      axios.post(`http://localhost:8000/api/user/emailUserWithReservationInfo`, data)

                                      data = {
                                        email: this.state.email,
                                        amount: this.state.arrivalPrice,
                                        subject: "Arrival Flight",
                                        info: this.state.reserveReqArrival
                                      }
                                      axios.post(`http://localhost:8000/api/user/emailUserWithReservationInfo`, data)

                                    })
                                    .then(() => {
                                      axios.put(`http://localhost:8000/api/user/reserveSeats`, this.state.reserveReqDepart)
                                    })
                                    .then(() => {
                                      axios.put(`http://localhost:8000/api/user/reserveSeats`, this.state.reserveReqArrival)
                                    })
                                    .then(() => {
                                      this.state.history.push("/TransactionStatus")
                                    })
                                } else {
                                  swal("Error", "Enter a vaild  password", "error");
                                }
                              })



                          } else {
                            swal("Error", response.error.code, "error");
                            // console.log(response.error.code);
                          }
                        }
                      );
                    } catch (error) {
                      console.log(error);
                    }
                  }}
                >
                  Confirm
                </Button>
                <LinearProgress style={{display: this.state.loading}}/>
              </Stack>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

const validateEmail = (email) => {
  return String(email)
      .toLowerCase()
      .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
};