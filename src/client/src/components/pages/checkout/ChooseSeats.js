import React from "react";
import {useHistory} from "react-router-dom";

import SideNav from "../../templates/SideNav";
import Footer from "../../templates/Footer";
import PageHeaderSvg from "../../basic components/PageHeaderSvg";
import SeatPicker from "react-seat-picker";

import {Grid} from "@material-ui/core";
import {Stack} from "@mui/material";
import axios from "axios";
import {getAdminToken} from "../../../handleToken";

export default function RootFunction(props) {
    const history = useHistory();
    return <ChooseSeats history={history}/>;
}
var flightDepID = "61b3eccdada0d539014a9bd3";
var flightArrID = "61b3e5ba499219cee001e923";

var cabinType = "Economy"
var numbersOfReservedSeats = 5
let encodedSearchTerms = encodeURIComponent(JSON.stringify({_id: flightDepID}));

class ChooseSeats extends React.Component {

    setCabinArray(cabinType) {
        let reservedArr = cabinType === "Economy" ? this.state.flightsDetails.economyCabin :
            cabinType === "Business" ? this.state.flightsDetails.businessCabin :
                this.state.flightsDetails.firstCabin;
        let mySize = cabinType === "Economy" ? this.state.flightsDetails.Economy :
            cabinType === "Business" ? this.state.flightsDetails.Business :
                this.state.flightsDetails.First;
        let reserved = Array(mySize).fill(0)
        for (var x of reservedArr) {
            reserved[x] = 1;
        }
        let rows = Array(mySize)
        for (let i = 0; i < mySize; i++) {
            if (reserved[i] === 1) {
                rows[i] = {
                    id: i + 1,
                    number: i,
                    isSelected: true,
                    isReserved: true,
                }
            } else {
                rows[i] = {
                    id: i + 1,
                    number: i,
                    isSelected: false,
                    isReserved: false,
                }
            }
            console.log(rows)
        }
        return [rows];
    }

    componentDidMount() {

    }

    constructor(props) {
        super(props);
        this.state = {
        }
        axios
            .get(
                `http://localhost:8000/api/user/flightData/?searchFilters=${encodedSearchTerms}`
            )
            .then((res) => {
                this.setState({
                    flightsDetails: res.data[0],
                });
            })
            .catch((err) => {
                console.log("Error from getting flights details.");
            })
    }

    addSeat = ({row, number, id}, add) => {
        add(row, number, id)
    }

    removeSeat = ({row, number, id}, remove) => {
        remove(row, number)
    }

    render() {
        const rows = this.state.flightsDetails ? this.setCabinArray("Economy") : null;
        return (
            <Grid container>
                <SideNav/>
                <Grid item md={9} sm={6} xs={6} style={{marginLeft: "3%"}}>
                    <Stack>
                        <PageHeaderSvg
                            headerText="Choose Seats"
                            src="https://www.gstatic.com/travel-frontend/animation/hero/flights_3.svg"
                        />

                        {console.log(this.state)}
                        {rows ?
                            <SeatPicker rows={rows} maxReservableSeats={10} addSeatCallback={this.addSeat}
                                        removeSeatCallback={this.removeSeat}/> : ""}
                        {/*{console.log(this.state.flightsDetails)}*/}
                    </Stack>
                </Grid>
                <Grid
                    item
                    md={12}
                    style={{marginTop: "15%", left: "0", right: "0", bottom: "0"}}
                >
                    <Footer/>
                </Grid>
            </Grid>
        );
    }
}
