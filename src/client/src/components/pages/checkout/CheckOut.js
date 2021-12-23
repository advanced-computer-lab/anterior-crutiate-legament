import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useHistory, useLocation } from "react-router-dom";
import { getUserID } from "../../../handleToken.js";

import SideNav from "../../templates/SideNav";
import Footer from "../../templates/Footer";
import PageHeaderSvg from "../../basic components/PageHeaderSvg";
import FlightSummary from "../../templates/FlightSummary";

import { Grid } from "@material-ui/core";
import { Stack } from "@mui/material";

import { getUserToken } from "../../../handleToken.js";


var seatsDepart, seatsArrival;

export default function RootFunction(props) {
  const history = useHistory();
  const data = useLocation();
  return <CheckOut history={history} data={data} />;
}

class CheckOut extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      departure_id: this.props.data.state.departure_id,
      arrival_id: this.props.data.state.arrival_id,
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    // generate seats

    console.log(getUserID());
    console.log(seatsDepart);
    console.log(seatsArrival);

    let endpoint = `http://localhost:8000/api/user/reserveSeats`;
    let reserveReqDepart = {
      userId: getUserID(),
      flightId: this.props.data.state.departure_id,
      seats: seatsDepart,
      cabin: this.props.data.state.flight_class,
      token: getUserToken(),
    };
    axios.put(endpoint, reserveReqDepart).then(() => {
      let reserveReqArrival = {
        userId: getUserID(),
        flightId: this.props.data.state.arrival_id,
        seats: seatsArrival,
        cabin: this.props.data.state.flight_class,
        token: getUserToken(),
      };
      axios.put(endpoint, reserveReqArrival).then(() => {
        this.props.history.push("/Profile");
      });
    });
  };

  render() {
    seatsDepart = [];
    for (let i of this.props.data.state.rowsDepart[0]) {
      if (!i.isReserved && i.isSelected) seatsDepart.push(i.number);
    }
    seatsArrival = [];
    for (let i of this.props.data.state.rowsArrival[0]) {
      if (!i.isReserved && i.isSelected) seatsArrival.push(i.number);
    }
    return (
      <Grid container>
        <SideNav />
        <Grid item md={9} sm={6} xs={6} style={{ marginLeft: "3%" }}>
          <Stack>
            <PageHeaderSvg
              headerText="Check Out"
              src="https://www.gstatic.com/travel-frontend/animation/hero/flights_3.svg"
            />
            {console.log(this.props.data.state)}
          </Stack>
          <h3 className="text-center">Departing Flight</h3>
          <FlightSummary _id={this.state.departure_id} />
          <br />
          <h4>Reserved Seat Numbers:</h4>
          <br />
          <ul>
            {seatsDepart.map((seat) => (
              <li>{seat}</li>
            ))}
          </ul>
          <hr />
          <h3 className="text-center">Returning Flight</h3>
          <FlightSummary _id={this.state.arrival_id} />
          <br />
          <h4>Reserved Seat Numbers:</h4>
          <br />
          <ul>
            {seatsArrival.map((seat) => (
              <li>{seat}</li>
            ))}
          </ul>
          <br />
          <form onSubmit={this.onSubmit}>
            <button className="btn btn-primary" type="submit">
              Check Out
            </button>
          </form>
          <br />
          <Link
            to={{
              pathname: "/chooseSeats",
              state: {
                departure_id: this.props.data.state.departure_id,
                arrival_id: this.props.data.state.arrival_id,
                flight_class: this.props.data.state.flight_class,
                adults: this.props.data.state.adults,
                children: this.props.data.state.children,
              },
            }}
          >
            <button className="btn btn-secondary">Go Back</button>
          </Link>
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
