import React, { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { getUserToken } from "../../../handleToken.js";

import SideNav from "../../templates/SideNav";
import FlightSummary from "../../templates/FlightSummary";
import Footer from "../../templates/Footer";
import PageHeaderSvg from "../../basic components/PageHeaderSvg";

import { Grid } from "@material-ui/core";
import { Stack } from "@mui/material";

import SubmitButton from "../../basic components/SubmitButton" ;

export default function RootFunction(props) {
  const history = useHistory();
  const data = useLocation();
  useEffect(() => {
    if (!getUserToken()) history.push("/");
  }, []);
  return <Summary history={history} data={data} />;
}

class Summary extends React.Component {
  constructor(props) {
    super(props);
    console.log(props)
  }

  render() {
    if(!this.props.data.state) 
      return null;
 //   console.log(this.props.data.state);

    console.log(this.props) ;
    return (
      <Grid container>
        <SideNav />
        <Grid item md={9} sm={6} xs={6} style={{ marginLeft: "3%" }}>
          <Stack>
            <PageHeaderSvg
              headerText="Flights Summary"
              src="https://www.gstatic.com/travel-frontend/animation/hero/flights_3.svg"
            />
           
            <FlightSummary header={"Your New Flight"} _id={this.props.data.state.departure_id} />
            
            <br />


            <Grid container >
                <Grid item md = {0.5} sm= {0.5} xs = {0.5} style={{marginLeft:"3%"}} >
                        
                  <Link
                    to={{
                      pathname: "/signIn",
                      state: {
                        redirect: "/chooseNewSeats",
                        redirectProps: {
                            flightID: this.props.data.state.departure_id,
                          flight_class: this.props.data.state.flight_class,
                          adults: this.props.data.state.adults,
                          children: this.props.data.state.children,
                          oldFlight: this.props.data.state.oldFlight,
                        },
                      },
                    }}
                  >
                    <SubmitButton buttonText="Continue"/>
                  </Link>
                </Grid>
                <Grid item md={0.5}>
                  <>&nbsp; &nbsp;</>      
                </Grid>
                <Grid item md={0.5} style= {{marginTop:"1%"}}>      
                  <Link to={{ pathname: "/editFlightDestination",
                              state : {oldFlight: this.props.data.state.oldFlight}
                             }}>
                  <button className="btn btn-secondary" >Go Back</button>
                  </Link>
                </Grid>
            </Grid>

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
