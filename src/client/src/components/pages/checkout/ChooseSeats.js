import React from "react";
import { useHistory, useLocation } from "react-router-dom";

import SideNav from "../../templates/SideNav";
import Footer from "../../templates/Footer";
import PageHeaderSvg from "../../basic components/PageHeaderSvg";
import SeatPicker from "react-seat-picker";

import { Grid } from "@material-ui/core";
import { Stack } from "@mui/material";
import axios from "axios";
import { getAdminToken } from "../../../handleToken";

export default function RootFunction(props) {
  const history = useHistory();
  const data = useLocation();
  return <ChooseSeats history={history} data={data}/>;
}

class ChooseSeats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
      var flightDepID = JSON.parse(this.props.data.state).departure_id;
      var flightArrID = JSON.parse(this.props.data.state).arrival_id;
      console.log(flightDepID + " " + flightArrID);

    let encodedSearchTermsDepart = encodeURIComponent(
      JSON.stringify({ _id: flightDepID })
    );

    let encodedSearchTermsArrive = encodeURIComponent(
      JSON.stringify({ _id: flightArrID })
    );

    axios
      .get(
        `http://localhost:8000/api/user/flightData/?searchFilters=${encodedSearchTermsDepart}`
      )
      .then((res) => {
        this.setState({
          DepartFlightsDetails: res.data[0],
        });
      })
      .catch((err) => {
        console.log("Error from getting flights details.");
      });

    axios
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
      console.log(rows);
    }
    return [rows];
  }

  addSeat = ({ row, number, id }, add) => {
    add(row, number, id);
  };

  removeSeat = ({ row, number, id }, remove) => {
    remove(row, number);
  };

  render() {
    const rowsDepart = this.state.DepartFlightsDetails
      ? this.setCabinArray(JSON.parse(this.props.data.state).flight_class, this.state.DepartFlightsDetails)
      : null;
    const rowsArrival = this.state.ArrivalFlightsDetails
      ? this.setCabinArray(JSON.parse(this.props.data.state).flight_class, this.state.ArrivalFlightsDetails)
      : null;
    return (
      <Grid container>
        <SideNav />
        <Grid item md={9} sm={6} xs={6} style={{ marginLeft: "3%" }}>
          <Stack>
            <PageHeaderSvg
              headerText="Choose Seats"
              src="https://www.gstatic.com/travel-frontend/animation/hero/flights_3.svg"
            />

            <h3 className="text-center">Departing Flight</h3>
            <br />
            {rowsDepart ? (
              <SeatPicker
                rows={rowsDepart}
                maxReservableSeats={100}
                addSeatCallback={this.addSeat}
                removeSeatCallback={this.removeSeat}
              />
            ) : (
              ""
            )}

            <hr />
            <h3 className="text-center">Arriving Flight</h3>
            <br />
            {rowsArrival ? (
              <SeatPicker
                rows={rowsArrival}
                maxReservableSeats={100}
                addSeatCallback={this.addSeat}
                removeSeatCallback={this.removeSeat}
              />
            ) : (
              ""
            )}
          </Stack>
        </Grid>
        <Grid
          item
          md={12}
          style={{ marginTop: "15%", left: "0", right: "0", bottom: "0" }}
        >
          <Footer />
        </Grid>
      </Grid>
    );
  }
}
