import React from "react";
import axios from "axios";
import { getAdminToken } from "../../../handleToken.js";
import { Link, useNavigate, useHistory } from "react-router-dom";

import FlightsTable from "./FlightsTable.js";
import FlightsSearch from "./FlightsSearch.js";
import AdminNavbar from "./AdminNavbar.js";

export default function RootFunction(props) {
  const history = useHistory();
  return <AdminApp history={history} />;
}

class AdminApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flightsDetails: [],
    };
    this.displayFlights = this.displayFlights.bind(this);
  }

  componentWillMount() {
    if (!getAdminToken()) this.props.history.push("/adminLogin");
  }

  componentDidMount() {
    this.displayFlights({});
  }

  displayFlights(searchTerms) {
    searchTerms.token = getAdminToken();
    let encodedSearchTerms = encodeURIComponent(JSON.stringify(searchTerms));
    axios
      .get(
        `http://localhost:8000/api/admin/adminSearchFlights?searchFilters=${encodedSearchTerms}`
      )
      .then((res) => {
        this.setState({
          flightsDetails: res.data,
        });
      })
      .catch((err) => {
        console.log("Error from getting flights details.");
      });
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div className="container-fluid">
        <AdminNavbar />
        <div className="row">
          <div className="text-center">
            <br />
            <h2>Flights Table</h2>
            <br />
          </div>
          <div className="table table-bordered table-responsive">
            <FlightsTable flights={this.state.flightsDetails} />
          </div>
          <div className="text-center">
            <br />
            <h2>Flights Search</h2>
            <br />
          </div>
          <div id="flights-search-id">
            <FlightsSearch displayFlights={this.displayFlights} />
          </div>
        </div>
      </div>
    );
  }
}
