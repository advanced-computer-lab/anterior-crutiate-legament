import React from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { getUserToken } from "../../../handleToken.js";

import SideNav from "../../templates/SideNav";
import FlightSummary from "../../templates/FlightSummary";
import Footer from "../../templates/Footer";
import PageHeaderSvg from "../../basic components/PageHeaderSvg";

import { Grid } from "@material-ui/core";
import { Stack } from "@mui/material";

export default function RootFunction(props) {
  const history = useHistory();
  return <Summary history={history} />;
}

class Summary extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    if (!getUserToken())
      this.props.history.push("/");
  }

  render() {
    let id1 = "61883f68293ea55d2eb27980";
    let id2 = "61b3dfc377423c8fb74845a6";
    return (
      <Grid container>
        <SideNav />
        <Grid item md={9} sm={6} xs={6} style={{ marginLeft: "3%" }}>
          <Stack>
            <PageHeaderSvg
              headerText="Flights Summary"
              src="https://www.gstatic.com/travel-frontend/animation/hero/flights_3.svg"
            />
            <h3 className="text-center">Departing Flight</h3>
            {/*<FlightSummary _id={this.props.departure_id} />*/}
            <FlightSummary _id={id1} />
            <hr />
            <h3 className="text-center">Returning Flight</h3>
            {/*<FlightSummary _id={this.props.arrival_id} />*/}
            <FlightSummary _id={id2} />
            <br />
            <Link
              to={{
                pathname: "/signIn",
                state: {
                  redirect: "/chooseSeats",
                  redirectProps: {
                    departure_id: this.props.departure_id,
                    arrival_id: this.props.arrival_id,
                  },
                },
              }}
            >
              <button className="btn btn-primary">Continue</button>
            </Link>
            <br />
            <Link to={{ pathname: "/home" }}>
              <button className="btn btn-secondary">Go Back</button>
            </Link>
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
