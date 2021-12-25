import React, {useEffect} from 'react';
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


export default class UpdateTicket extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            flightID: props.flightID,
            cabin: props.cabin,
            seats: props.seats,
            open: false,
            selectAdultChild:false,
            atLeastOneError: false,
            rows: null,
            child: 0
        };
        console.log(props);
    }

    componentDidMount() {
        var flightID = this.state.flightID;

        let encodedSearchTerms = encodeURIComponent(
            JSON.stringify({_id: flightID})
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

    addSeat = ({row, number, id}, add) => {
        add(row, number, id);
        this.state.rows[0][number].isSelected = true;
    };

    removeSeat = ({row, number, id}, remove) => {
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
        console.log(rows)
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
            this.setState({atLeastOneError: true});
        } else {
            this.setState({selectAdultChild: true});
        }
    }
    slider = (event, val) => {
        this.state.child = val;
    }
    render() {
        return (
            <div>
                <Button variant="outlined" onClick={(e) => this.setState({open: true})} color="error">
                    Update
                </Button>
                <Dialog open={this.state.open} onClose={() => this.setState({open: false})}>
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
                        <SubmitButton click={this.continueOnClick} buttonText="Continue"/>
                    </DialogActions>

                    <Dialog open={this.state.atLeastOneError} onClose={(e) => this.setState({atLeastOneError: false})}>
                        <DialogContentText>You must select at least one seat</DialogContentText>
                        <DialogActions>
                            <Button onClick={(e) => this.setState({atLeastOneError: false})} color="info">OK</Button>
                        </DialogActions>
                    </Dialog>
                    <Dialog open={this.state.selectAdultChild} onClose={(e) => this.setState({selectAdultChild: false})}>
                        <DialogTitle>Select seats type</DialogTitle>
                        <DialogContent>You have {this.cntSelected(this.state.rows)} seats selected</DialogContent>
                        <DialogContent>Please select the number children seats</DialogContent>
                        <DialogContent>
                            <br/>
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
                            <Button onClick={(e) => {}} color="info">OK</Button>
                        </DialogActions>
                    </Dialog>
                    {/*
                    <DialogContent>
                        <DialogContentText style={{ color: 'red' }}>
                            Please Write Seats you want to cancel, seprated with ' - '.
                            <br />
                            <p style={{ color: 'red' }} >for example: 10-20-21</p>
                            <br />
                            <h4 style={{ color: 'black' }} > Your Seats </h4>
                            <p>10-20-30-40 </p>

                        </DialogContentText>
                        <br />
                        <div
                        // id="CancelSeats" style={{
                        //     display: 'flex',
                        //     alignItems: 'center',
                        //     justifyContent: 'center',
                        // }}
                        >

                            <Stack spacing={1}>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="seats"
                                    label="Select Canceld Seats"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                />
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="password"
                                    label="Confirm Password"
                                    type="password"
                                    fullWidth
                                    variant="standard"
                                />
                            </Stack>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={(e) => this.setState({ open: false })} color="error">Cancel</Button>
                        <Button >Confirm</Button>
                    </DialogActions> */}
                </Dialog>
            </div>
        );
    }
}
