import React,{ useEffect } from 'react';
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

import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate
} from './cardUtils'

import 'react-credit-cards/es/styles-compiled.css';

var Stripe = require('stripe')('pk_test_51K9e8iLXRXUubuQwgGqjiExXWFcWOvwfUwlCADJJD7w0Q5JFrlI0BRdRmC9Km5suRfUZ06ce0TppQKcCUGu4R6OV00H2GbbimL');
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default class PaymentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cvc: '',
      expiry: '',
      focus: '',
      name: '',
      number: '',
      open: true
    };
  }

  handleInputFocus = (e) => {
    this.setState({ focus: e.target.name });
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  }
 
  render() {
    return (
      <Dialog open={this.state.open} onClose={()=>this.setState({open:false})}>
        <DialogTitle>Payment Form</DialogTitle>
        <DialogContent>
          <DialogContentText style={{ color: 'black' }}>
            Please add your payment card to complete reservation
          </DialogContentText>
          <br/>
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

              </Stack>

              <Button
                variant="contained" style={{ backgroundColor: '#3B566E' }}
                onClick={() => {
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
                  try {
                   
                    console.log(this.state.number+" "+ this.state.expiry+" "+this.state.cvc+" "+this.state.name);
                    window.Stripe.card.createToken(
                      {
                        number: this.state.number,
                        exp_month: this.state.expiry.split("/")[0],
                        exp_year: this.state.expiry.split("/")[1],
                        cvc: this.state.cvc,
                        name: this.state.name,
                      },
                      (status, response) => {
                        console.log(response)
                        console.log(1)
                        if (status === 200) {
                          // axios
                          //   .post("/stripe-payment", {
                          //     token: response,
                          //     email: values.email,
                          //     amount: values.amount,
                          //   })
                          //   .then((res) => window.alert(JSON.stringify(res.data, 0, 2)))
                          //   .catch((err) => console.log(err));
                        } else {
                          swal("Error",response.error.code , "error");
                         // console.log(response.error.code);
                        }
                      }
                    );
                  } catch (error) {
                    console.log(error);
                  }
                }}
              >
                Next
              </Button>
            </Stack>
          </div>
        </DialogContent>
      </Dialog>
    );
  }
}
