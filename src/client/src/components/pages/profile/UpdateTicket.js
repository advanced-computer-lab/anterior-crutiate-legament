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
import SeatPicker from "react-seat-picker";
import Slider from "@mui/material/Slider";
import SubmitButton from "../../basic components/SubmitButton";
import { getUserToken ,getUserID} from "../../../handleToken.js";
import { parse } from 'path';

import PaymentForm from "./PaymentForm";

export default class UpdateTicket extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            flightID: props.flightID,
            cabin: props.cabin,
            seats: props.seats,
            confirmPassword: "",
            open: false,
            selectAdultChild: false,
            atLeastOneError: false,
            refundTap: false,
            payTap: false,
            rows: null,
            updateInfo: "",
            newSeats: "",
            newPrice: 0,
            oldPrice:props.price,
            refundAmount:0,
            amountToPay:0,
            child: 0
        };
        //console.log(props);
    }

    componentDidMount() {
        var flightID = this.state.flightID;

        let encodedSearchTerms = encodeURIComponent(
            JSON.stringify({ _id: flightID })
        );

        let promise = axios
            .get(
                `http://localhost:8000/api/user/flightData/?searchFilters=${encodedSearchTerms}`
            )
            .then((res) => {
                this.setState({
                    FlightsDetails: res.data[0],
                });
            })
            .catch((err) => {
                console.log("Error from getting flights details.");
            });


        promise.then(() => {
            this.setState({
                rows: this.state.FlightsDetails
                    ? this.setCabinArray(
                        this.state.cabin,
                        this.state.FlightsDetails,
                        this.state.seats
                    )
                    : null,
            });
        });
    }

    setCabinArray(cabinType, flightsDetails, seats) {
        let reservedArr =
            cabinType === "Economy"
                ? flightsDetails.economyCabin
                : cabinType === "Business"
                    ? flightsDetails.businessCabin
                    : flightsDetails.firstCabin;
        let mySize =
            cabinType === "Economy"
                ? flightsDetails.Economy
                : cabinType === "Business"
                    ? flightsDetails.Business
                    : flightsDetails.First;
        let reserved = Array(mySize).fill(0);
        for (let x of reservedArr) {
            reserved[x] = 1;
        }
        for (let x of seats) {
            reserved[x] = 2;
        }
        let rows = Array(mySize);
        for (let i = 0; i < mySize; i++) {
            if (reserved[i] === 2) {
                rows[i] = {
                    id: i + 1,
                    number: i,
                    isSelected: true,
                    isReserved: false,
                };
            } else if (reserved[i] === 1) {
                rows[i] = {
                    id: i + 1,
                    number: i,
                    isSelected: true,
                    isReserved: true,
                };
            } else {
                rows[i] = {
                    id: i + 1,
                    number: i,
                    isSelected: false,
                    isReserved: false,
                };
            }
            //console.log(rows);
        }
        return [rows];
    }

    addSeat = ({ row, number, id }, add) => {
        add(row, number, id);
        this.state.rows[0][number].isSelected = true;
    };

    removeSeat = ({ row, number, id }, remove) => {
        remove(row, number);
        this.state.rows[0][number].isSelected = false;
    };
    divideRows(rows) {
        let res = [];
        let cur = [];
        for (let x of rows[0]) {
            if (cur.length === 10) {
                res.push(cur);
                cur = [];
            }
            cur.push(x);
        }
        res.push(cur);
        return res;
    }
    cntSelected = (rows) => {
        // console.log(rows)
        if (rows === null)
            return 0;
        let cnt = 0;
        for (let row of rows) {
            for (let seat of row) {
                if (seat.isSelected && !seat.isReserved) {
                    cnt++;
                }
            }
        }
        return cnt;
    }
    hasOneSelected = (rows) => {
        return this.cntSelected(rows) >= 1
    }
    continueOnClick = (e) => {
        if (!this.hasOneSelected(this.state.rows)) {
            this.setState({ atLeastOneError: true });
        } else {
            this.setState({ selectAdultChild: true });
        }
    }
    slider = (event, val) => {
        this.state.child = val;
    }
    calculatePrice = (cabinType, flightsDetails, numChild, total) => {

        let childPrice =
            cabinType === "Economy"
                ? flightsDetails.childEconomyPrice
                : cabinType === "Business"
                    ? flightsDetails.childBusinessPrice
                    : flightsDetails.childFirstPrice;
        let adultPrice =
            cabinType === "Economy"
                ? flightsDetails.adultEconomyPrice
                : cabinType === "Business"
                    ? flightsDetails.adultBusinessPrice
                    : flightsDetails.adultFirstPrice;
        let ans = adultPrice * (total - numChild) + childPrice * numChild;
        console.log("cost " + ans);
        return ans;
    }
    render() {
        // console.log("test 2")
        // console.log(this.state.rows)
        return (
            <div>
                <Button variant="outlined" onClick={(e) => this.setState({ open: true })} color="error">
                    Update
                </Button>
                <Dialog open={this.state.open} onClose={() => this.setState({ open: false })}>
                    <DialogTitle>Seats Edit</DialogTitle>
                    <DialogContent>
                        {this.state.rows ? (
                            <SeatPicker
                                selectedByDefault
                                rows={this.divideRows(this.state.rows)}
                                maxReservableSeats={100}
                                addSeatCallback={this.addSeat}
                                removeSeatCallback={this.removeSeat}
                            />
                        ) : (
                            ""
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={(e) => this.setState({ open: false })} color="error">Cancel</Button>
                        <SubmitButton click={this.continueOnClick} buttonText="Continue" />
                    </DialogActions>

                    <Dialog open={this.state.atLeastOneError} onClose={(e) => this.setState({ atLeastOneError: false })}>
                        <DialogContentText>You must select at least one seat</DialogContentText>
                        <DialogActions>
                            <Button onClick={(e) => this.setState({ atLeastOneError: false })} color="info">OK</Button>
                        </DialogActions>
                    </Dialog>
                    <Dialog open={this.state.selectAdultChild} onClose={(e) => this.setState({ selectAdultChild: false })}>
                        <DialogTitle>Select seats type</DialogTitle>
                        <DialogContent>You have {this.cntSelected(this.state.rows)} seats selected</DialogContent>
                        <DialogContent>Please select the number children seats</DialogContent>
                        <DialogContent>
                            <br />
                            <Slider
                                size="small"
                                defaultValue={0}
                                valueLabelDisplay="on"
                                step={1}
                                marks
                                min={0}
                                max={this.cntSelected(this.state.rows)}
                                onChangeCommitted={this.slider}
                                onChange={this.slider}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button
                                onClick={async (e) => {
                                    let updateInfo = {}

                                    let newPrice = this.calculatePrice(this.state.cabin, this.state.FlightsDetails, this.state.child, this.cntSelected(this.state.rows))
                                    let newSeats = [];
                                    
                                    for (let i of this.state.rows[0]) {
                                        if (!i.isReserved && i.isSelected) newSeats.push(i.number);
                                    }
                                    await this.setState({ selectAdultChild: false, newPrice: newPrice ,newSeats: newSeats});
                                    if(parseInt(this.state.oldPrice)>parseInt(this.state.newPrice)){
                                        await this.setState({refundTap: true,refundAmount:parseInt(this.state.oldPrice)-parseInt(this.state.newPrice)})
                                    }else{
                                        await this.setState({payTap: true,amountToPay:-parseInt(this.state.oldPrice)+parseInt(this.state.newPrice)})
                                    }
                                     console.log(this.state)
                                }}
                                color="info">OK</Button>
                        </DialogActions>
                    </Dialog>

                    {/* Open Dialog With Refund Amount */}

                    <Dialog open={this.state.refundTap} onClose={(e) => this.setState({ selectAdultChild: false })}>
                        <DialogTitle>Refund Amount</DialogTitle>

                        <DialogContent>You will be refund with amount {this.state.refundAmount}</DialogContent>
                        <DialogContent>Enter Your Password To Confirm Operation</DialogContent>
                        <DialogContent>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Password"
                                type="password"
                                fullWidth
                                variant="standard"
                                value={this.state.confirmPassword}
                                onChange={(e) => this.setState({ confirmPassword: e.target.value })}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={(e) => this.setState({ open: false })} color="error">Cancel</Button>
                            <Button onClick={
                                async (e) => {
                                    
                                    const data = {
                                        _id: getUserID(),
                                        token: JSON.parse(getUserToken()),
                                        password: this.state.confirmPassword
                                    };
                                    // console.log(data)
                                    let encodedId = encodeURIComponent(JSON.stringify(data));
                                    axios.get(`http://localhost:8000/api/user/verifyPassword?in=${encodedId}`)
                                        .then(async (res) => {
                                            // console.log(res.data.result);
                                            if (res.data.result === true) {
                                                this.setState({ open: false })
                                                let data = {
                                                    flightId: this.state.flightID,
                                                    seats: this.state.seats,
                                                    cabin: this.state.cabin,
                                                    userId: getUserID(),
                                                    token: getUserToken(),
                                                }
            
                                                await axios.delete('http://localhost:8000/api/user/cancelReservation', { data: data })

                                                data = {
                                                    userId: getUserID(),
                                                    flightId: this.state.flightID,
                                                    seats: this.state.newSeats,
                                                    cabin: this.state.cabin,
                                                    price: this.state.newPrice,
                                                    token: getUserToken(),
                                                }
                                                // console.log(data)
                                                 await axios.put('http://localhost:8000/api/user/reserveSeats', data)
                                                 await this.setState({refundTap:false,open:false })
                                                swal("Done", "Flight Updated successfully", "success");
                                            } else {
                                                swal("Error", "Enter a valid current password", "error");
                                            }

                                        });
                                }
                            } >Confirm</Button>
                        </DialogActions>
                    </Dialog>
                    <Dialog open={this.state.payTap} onClose={(e) => this.setState({ selectAdultChild: false })}>
                        <DialogTitle>Amount to Pay</DialogTitle>

                        <DialogContent>You Need To pay the difference {this.state.amountToPay}</DialogContent>
                        <DialogContent>Enter Your Password To Confirm Operation</DialogContent>
                        <DialogContent>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Password"
                                type="password"
                                fullWidth
                                variant="standard"
                                value={this.state.confirmPassword}
                                onChange={(e) => this.setState({ confirmPassword: e.target.value })}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={(e) => this.setState({ open: false })} color="error">Cancel</Button>
                            <Button onClick={
                                async (e) => {
                                    
                                    const data = {
                                        _id: getUserID(),
                                        token: JSON.parse(getUserToken()),
                                        password: this.state.confirmPassword
                                    };
                                    // console.log(data)
                                    let encodedId = encodeURIComponent(JSON.stringify(data));
                                    axios.get(`http://localhost:8000/api/user/verifyPassword?in=${encodedId}`)
                                        .then(async (res) => {
                                            // console.log(res.data.result);
                                            if (res.data.result === true) {
                                                this.setState({ open: false })
                                                let data = {
                                                    flightId: this.state.flightID,
                                                    seats: this.state.seats,
                                                    cabin: this.state.cabin,
                                                    userId: getUserID(),
                                                    token: getUserToken(),
                                                }
            
                                                await axios.delete('http://localhost:8000/api/user/cancelReservation', { data: data })

                                                data = {
                                                    userId: getUserID(),
                                                    flightId: this.state.flightID,
                                                    seats: this.state.newSeats,
                                                    cabin: this.state.cabin,
                                                    price: this.state.newPrice,
                                                    token: getUserToken(),
                                                }
                                                // console.log(data)
                                                 await axios.put('http://localhost:8000/api/user/reserveSeats', data)
                                                 await this.setState({refundTap:false,open:false })
                                                swal("Done", "Flight Updated successfully", "success");
                                            } else {
                                                swal("Error", "Enter a valid current password", "error");
                                            }

                                        });
                                }
                            } >Confirm</Button>
                        </DialogActions>
                    </Dialog>
                </Dialog>
                
            </div>
        );
    }
}
