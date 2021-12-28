import React, { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useHistory, useLocation } from "react-router-dom";
import { getUserID } from "../../../handleToken.js";

import SideNav from "../../templates/SideNav";
import Footer from "../../templates/Footer";
import PageHeaderSvg from "../../basic components/PageHeaderSvg";
import FlightSummary from "../../templates/FlightSummary";
//import SubmitButton from "../../basic components/SubmitButton" ;
import { Grid } from "@material-ui/core";
import { Stack } from "@mui/material";

import { getUserToken } from "../../../handleToken.js";
import PaymentForm from "./PaymentForm.js"

var seatsDepart, seatsArrival;

export default function RootFunction(props) {
  const history = useHistory();
  const data = useLocation();
  useEffect(() => {
    if (!getUserToken()) history.push("/");
  }, []);
  return <EditCheckOut history={history} data={data} />;
}

class EditCheckOut extends React.Component {
 
  constructor(props) {
    super(props);
    if(!props.data.state)
      return;
    this.state = {
      oldFlight:props.data.state.oldFlight,
      newFlight:props.data.state.newFlight,
    }
  }
  
  render() {
    if(!this.props.data.state) 
      return null;
    let newSeats = [];
    for (let i of this.state.newFlight.rows[0]) {
      if (!i.isReserved && i.isSelected) newSeats.push(i.number);
    }
    this.state.newFlight.seats=newSeats;
    
    if(!this.state.newFlight.price){
      return <div>Loading...</div>
    }
    let newFlight=this.state.newFlight;
    let oldFlight=this.state.oldFlight;
    
    return (
      <Grid container>
        <SideNav />
        <Grid item md={9} sm={6} xs={6} style={{ marginLeft: "3%" }}>
          <Stack>
            <PageHeaderSvg
              headerText="Check Out"
              src="https://www.gstatic.com/travel-frontend/animation/hero/flights_3.svg"
            />
            {/* {console.log(this.props.data.state)} */}
          </Stack>
          <h3 className="text-center">New Updated Flight</h3>
          <FlightSummary _id={this.state.newFlight.flightID} />
          <br />
          <h4>Reserved Seat Numbers:</h4>
          <br />
          <ul>
            {newSeats.map((seat) => (
              <li>{seat}</li>
            ))}
          </ul>
          <hr />
         
          <br />
          {/* <form onSubmit={this.onSubmit}>
            <button className="btn btn-primary" type="submit">
              Check Out
            </button>
          </form> */}
          <PaymentForm
            newFlight={newFlight}
            oldFlight={oldFlight}
          />
          <br />
          <Link
            to={{
              pathname: "/chooseNewSeats",
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
