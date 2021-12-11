import React from "react";
import { useHistory } from "react-router-dom";

import SideNav from "./SideNav";
import Footer from "./Footer";
import PageHeaderSvg from "../basic components/PageHeaderSvg";

import { Grid } from "@material-ui/core";
import { Stack } from "@mui/material";

export default function RootFunction(props) {
  const history = useHistory();
  return <FlightSummary history={history} />;
}

class FlightSummary extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <h1>{this.props.departure_id}</h1>
    );
  }
}
