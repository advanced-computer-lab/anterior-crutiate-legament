import React, { useEffect } from "react";
import {Link} from "react-router-dom";
import {Redirect} from 'react-router-dom'
import {useHistory, useLocation} from "react-router-dom";
import { getUserToken } from "../../../handleToken.js";

import SideNav from "../../templates/SideNav";
import Footer from "../../templates/Footer";
import PageHeaderSvg from "../../basic components/PageHeaderSvg";
import SubmitButton from "../../basic components/SubmitButton";
import SeatPicker from "react-seat-picker";
import Dialog from '@mui/material/Dialog';
import Slider from '@mui/material/Slider';
import {Grid} from "@material-ui/core";
import {Stack} from "@mui/material";
import axios from "axios";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import swal from "sweetalert";

import PaymentForm from './PaymentForm'

export default function RootFunction(props) {
    const history = useHistory();
    const data = useLocation();
    useEffect(() => {
        if (!getUserToken()) history.push("/");
    }, []);
    return <ChooseNewSeats history={history} data={data}/>;
}

class ChooseNewSeats extends React.Component {
    constructor(props) {
        super(props);
        if(!props.data.state)
            return;
        console.log(props)
        this.state = {
            oldFlight:props.data.state.oldFlight,
            flightID: props.data.state.flightID,
            cabin: props.data.state.flight_class,
            selectAdultChild: false,
            atLeastOneError: false,
            rows: null,
            child: 0
        };
    }

    componentDidMount() {
        if(!this.props.data.state) 
            return;
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

    setCabinArray(cabinType, flightsDetails) {

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
        var reserved = Array(mySize).fill(0);
        for (let x of reservedArr) {
            reserved[x] = 1;
        }
        if(this.state.oldFlight.flightID === this.state.flightID && this.state.oldFlight.cabin === this.state.cabin) {
            for(let x of this.state.oldFlight.seats) {
                reserved[x] = 0;
            }
        }
        let rows = Array(mySize);
        for (let i = 0; i < mySize; i++) {
            if (reserved[i] === 1) {
                rows[i] = {
                    id: i + 1,
                    number: i,
                    isSelected: true,
                    isReserved: true,
                };
            }
            else if(reserved[i] === 2) {
                rows[i] = {
                    id: i + 1,
                    number: i,
                    isSelected: true,
                    isReserved: false,
                };
            
            } else  {
                rows[i] = {
                    id: i + 1,
                    number: i,
                    isSelected: false,
                    isReserved: false,
                };
            }
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
        if(!this.props.data.state) 
            return null;
        return (
            <Grid container>
                <SideNav/>
                <Grid item md={9} sm={6} xs={6} style={{marginLeft: "3%"}}>
                    <Stack>
                        <PageHeaderSvg
                            headerText="Choose Seats"
                            src="https://www.gstatic.com/travel-frontend/animation/hero/flights_3.svg"
                        />

                        <h3 className="text-center">Your Flight</h3>
                        <br/>
                        {this.state.rows ? (
                            <SeatPicker
                                rows={this.divideRows(this.state.rows)}
                                maxReservableSeats={100}
                                addSeatCallback={this.addSeat}
                                removeSeatCallback={this.removeSeat}
                            />
                        ) : (
                            ""
                        )}

                        <Grid container>
                            <Grid item md={0.5} sm={0.5} xs={0.5} style={{marginLeft: "3%"}}>
                                <SubmitButton click={this.continueOnClick} buttonText="Continue"/>
                            </Grid>
                            <Grid item md={0.5}>
                                <>&nbsp; &nbsp;</>
                            </Grid>
                            <Grid item md={0.5} style={{marginTop: "1%"}}>

                                <Link to={{
                                    pathname: "/editFlightsSummary",
                                    state: {
                                        departure_id: this.state.flightID,
                                        flight_class: this.state.cabin,
                                        adults: "",
                                        children: "",
                                        oldFlight: this.state.oldFlight
                                    }
                                }}>
                                    <button className="btn btn-secondary">Go Back</button>
                                </Link>
                            </Grid>
                        </Grid>

                    </Stack>
                </Grid>


                <Grid
                    item
                    md={12}
                    style={{marginTop: "15%", left: "0", right: "0", bottom: "0"}}
                >
                    <Footer/>
                </Grid>


                <Dialog open={this.state.atLeastOneError} onClose={(e) => this.setState({atLeastOneError: false})}>
                    <DialogTitle>You must select at least one seat</DialogTitle>
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
                        <Button onClick={(e) => {
                            this.props.history.push("/editCheckOut", {
                                oldFlight: this.state.oldFlight,
                                newFlight: {
                                    flightID: this.state.flightID,
                                    flight_class: this.state.cabin,
                                    rows: this.state.rows,
                                    adults: this.props.data.state.adults,
                                    children: this.props.data.state.children,
                                    child: this.state.child,
                                    seats:[],
                                    price: this.calculatePrice(this.state.cabin,
                                        this.state.FlightsDetails, this.state.child, this.cntSelected(this.state.rows)),

                                }
                            })
                        }
                        } color="info">OK</Button>
                        {/* <PaymentForm
                            flightID={this.state.flightID}
                            flight_class={this.state.cabin}
                            rows={this.state.rows}
                            adults={this.props.data.state.adults}
                            children={this.props.data.state.children}
                            child={this.state.child}
                            // price={this.calculatePrice(this.state.cabin,
                            //     this.state.FlightsDetails, this.state.child, this.cntSelected(this.state.rows))}

                             oldFlight={this.state.oldFlight}
                        /> */}
                    </DialogActions>
                </Dialog>

            </Grid>
        );
    }
}