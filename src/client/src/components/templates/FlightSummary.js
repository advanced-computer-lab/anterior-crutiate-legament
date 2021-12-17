import React from "react";
import { useHistory } from "react-router-dom";

import SideNav from "./SideNav";
import Footer from "./Footer";
import PageHeaderSvg from "../basic components/PageHeaderSvg";

import { Grid } from "@material-ui/core";
import { Stack } from "@mui/material";
import axios from "axios";
import FlightRow from "../pages/admin/FlightRow";
import FlightsTable from "../pages/admin/FlightsTable";

export default function RootFunction(props) {
  const history = useHistory();
  return <FlightSummary history={history} />;
}

class FlightSummary extends React.Component {
  constructor(props) {
    super(props);
  }

   render() {
    let encodedSearchTerms = encodeURIComponent(
      JSON.stringify({ _id: this.props.history.location.state.arrival_id })
    );
    axios
      .get(
        `http://localhost:8000/api/user/getFlightDetails?searchFilters=${encodedSearchTerms}`
      )
      .then((res) => {
      });
    return (
      <div>

      </div>
    );
  }
}
