import React from "react";
import { useHistory } from "react-router-dom";

import SideNav from "../../templates/SideNav";
import Footer from "../../templates/Footer";
import PageHeaderSvg from "../../basic components/PageHeaderSvg";

import { Grid } from "@material-ui/core";
import { Stack } from "@mui/material";

export default function RootFunction(props) {
  const history = useHistory();
  return <ChooseSeats history={history} />;
}

class ChooseSeats extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Grid container>
        <SideNav />
        <Grid item md={9} sm={6} xs={6} style={{ marginLeft: "3%" }}>
          <Stack>
            <PageHeaderSvg
              headerText="Choose Seats"
              src="https://www.gstatic.com/travel-frontend/animation/hero/flights_3.svg"
            />
            
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
