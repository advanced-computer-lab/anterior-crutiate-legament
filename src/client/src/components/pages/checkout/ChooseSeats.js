import React from "react";
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

export default function RootFunction(props) {
    const history = useHistory();
    const data = useLocation();
    return <ChooseSeats history={history} data={data}/>;
}

class ChooseSeats extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rowsDepart: null,
            rowsArrival: null,
            atLeastOneError: false,
            selectAdultChild: false,
            childDepart: 0,
            childArrival: 0
        };
    }

    componentWillMount() {
        if (!getUserToken())
          this.props.history.push("/");
    }

    componentDidMount() {
        var flightDepID = this.props.data.state.departure_id;
        var flightArrID = this.props.data.state.arrival_id;
       // console.log(flightDepID + " " + flightArrID);

        let encodedSearchTermsDepart = encodeURIComponent(
            JSON.stringify({_id: flightDepID})
        );

        let encodedSearchTermsArrive = encodeURIComponent(
            JSON.stringify({_id: flightArrID})
        );

        let promise1 = axios
            .get(
                `http://localhost:8000/api/user/flightData/?searchFilters=${encodedSearchTermsDepart}`
            )
            .then((res) => {
                this.setState({
                    DepartFlightsDetails: res.data[0],
                });
                console.log(this.state.DepartFlightsDetails)
            })
            .catch((err) => {
                console.log("Error from getting flights details.");
            });

        let promise2 = axios
            .get(
                `http://localhost:8000/api/user/flightData/?searchFilters=${encodedSearchTermsArrive}`
            )
            .then((res) => {
                this.setState({
                    ArrivalFlightsDetails: res.data[0],
                });
            })
            .catch((err) => {
                console.log("Error from getting flights details.");
            });

        Promise.all([promise1, promise2]).then(() => {
            this.setState({
                rowsDepart: this.state.DepartFlightsDetails
                    ? this.setCabinArray(
                        this.props.data.state.flight_class,
                        this.state.DepartFlightsDetails
                    )
                    : null,
            });
            this.setState({
                rowsArrival: this.state.ArrivalFlightsDetails
                    ? this.setCabinArray(
                        this.props.data.state.flight_class,
                        this.state.ArrivalFlightsDetails
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
        let reserved = Array(mySize).fill(0);
        for (var x of reservedArr) {
            reserved[x] = 1;
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

    addSeatDepart = ({row, number, id}, add) => {
        add(row, number, id);
        this.state.rowsDepart[0][number].isSelected = true;
    };

    removeSeatDepart = ({row, number, id}, remove) => {
        remove(row, number);
        this.state.rowsDepart[0][number].isSelected = false;
    };

    addSeatArrival = ({row, number, id}, add) => {
        add(row, number, id);
        this.state.rowsArrival[0][number].isSelected = true;
    };

    removeSeatArrival = ({row, number, id}, remove) => {
        remove(row, number);
        this.state.rowsArrival[0][number].isSelected = false;
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
        console.log(this.cntSelected(rows))
        return this.cntSelected(rows) >= 1
    }

    continueOnClick = (e) => {
        if (!this.hasOneSelected(this.state.rowsDepart) || !this.hasOneSelected(this.state.rowsArrival)) {
            this.setState({atLeastOneError: true});
        } else {
            this.setState({selectAdultChild: true});
        }
    }
    departSlider = (event, val) => {
        this.state.childDepart = val;
    }
    arrivalSlider = (event, val) => {
        this.state.childArrival = val;
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
        return adultPrice * (total - numChild) + childPrice * numChild;
    }

    render() {
        return (
            <Grid container>
                <SideNav/>
                <Grid item md={9} sm={6} xs={6} style={{marginLeft: "3%"}}>
                    <Stack>
                        <PageHeaderSvg
                            headerText="Choose Seats"
                            src="https://www.gstatic.com/travel-frontend/animation/hero/flights_3.svg"
                        />

                        <h3 className="text-center">Departing Flight</h3>
                        <br/>
                        {this.state.rowsDepart ? (
                            <SeatPicker
                                rows={this.divideRows(this.state.rowsDepart)}
                                maxReservableSeats={100}
                                addSeatCallback={this.addSeatDepart}
                                removeSeatCallback={this.removeSeatDepart}
                            />
                        ) : (
                            ""
                        )}

                        <hr/>
                        <h3 className="text-center">Arriving Flight</h3>
                        <br/>
                        {this.state.rowsArrival ? (
                            <SeatPicker
                                rows={this.divideRows(this.state.rowsArrival)}
                                maxReservableSeats={100}
                                addSeatCallback={this.addSeatArrival}
                                removeSeatCallback={this.removeSeatArrival}
                            />
                        ) : (
                            ""
                        )}
                        <br/>

                        <Grid container>
                            <Grid item md={0.5} sm={0.5} xs={0.5} style={{marginLeft: "3%"}}>
                                <SubmitButton click={this.continueOnClick} buttonText="Continue"/>
                            </Grid>
                            <Grid item md={0.5}>
                                <>&nbsp; &nbsp;</>
                            </Grid>
                            <Grid item md={0.5} style={{marginTop: "1%"}}>

                                <Link to={{pathname: "/home"}}>
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
                    <DialogContentText>You must select at least one arrival and at least one departure
                        seat</DialogContentText>
                    <DialogActions>
                        <Button onClick={(e) => this.setState({atLeastOneError: false})} color="info">OK</Button>
                    </DialogActions>
                </Dialog>
                <Dialog open={this.state.selectAdultChild} onClose={(e) => this.setState({selectAdultChild: false})}>
                    <DialogTitle>Select seats type</DialogTitle>
                    <DialogContent>You have {this.cntSelected(this.state.rowsDepart)} departure seats
                        and {this.cntSelected(this.state.rowsArrival)} arrival seats selected</DialogContent>
                    <DialogContent>Please select the number children seats for departure</DialogContent>
                    <DialogContent>
                        <br/>
                        <Slider
                            size="small"
                            defaultValue={0}
                            valueLabelDisplay="on"
                            step={1}
                            marks
                            min={0}
                            max={this.cntSelected(this.state.rowsDepart)}
                            onChangeCommitted={this.departSlider}
                            onChange={this.departSlider}
                        />
                    </DialogContent>
                    <DialogContent>Please select the number children seats for arrival</DialogContent>
                    <DialogContent>
                        <br/>
                        <Slider
                            size="small"
                            defaultValue={0}
                            valueLabelDisplay="on"
                            step={1}
                            marks
                            min={0}
                            max={this.cntSelected(this.state.rowsArrival)}
                            onChange={this.arrivalSlider}
                            onChangeCommitted={this.arrivalSlider}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={(e) => {
                            this.props.history.push("/checkOut", {
                                departure_id: this.props.data.state.departure_id,
                                arrival_id: this.props.data.state.arrival_id,
                                flight_class: this.props.data.state.flight_class,
                                rowsDepart: this.state.rowsDepart,
                                rowsArrival: this.state.rowsArrival,
                                adults: this.props.data.state.adults,
                                children: this.props.data.state.children,
                                childDepart: this.state.childDepart,
                                childArrival: this.state.childArrival,
                                priceDepart: this.calculatePrice(this.props.data.state.flight_class,
                                    this.state.DepartFlightsDetails, this.state.childDepart, this.cntSelected(this.state.rowsDepart)),
                                priceArrival: this.calculatePrice(this.props.data.state.flight_class,
                                    this.state.ArrivalFlightsDetails, this.state.childArrival, this.cntSelected(this.state.rowsArrival)),
                            })
                        }} color="info">OK</Button>
                    </DialogActions>
                </Dialog>

            </Grid>
        );
    }
}