import React from "react";
import axios from "axios";
import { Link, useNavigate, useHistory } from "react-router-dom";

import FlightsTable from "./FlightsTable.js";
import FlightsSearch from "./FlightsSearch.js";

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
    // authentication
  }

  componentDidMount() {
    this.displayFlights({});
  }

  displayFlights(searchTerms) {
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
  }

  render() {
    return (
      <div className="container-fluid">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <div class="container-fluid">
            <a class="navbar-brand" href="#">
              Welcome, Admin Name
            </a>
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavAltMarkup"
              aria-controls="navbarNavAltMarkup"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div class="navbar-nav mx-auto">
                <a class="nav-link active" aria-current="page" href="#">
                  <Link to={{ pathname: "/admin" }}>Search Flights</Link>
                </a>
                <a class="nav-link" href="#">
                  <Link to={{ pathname: "/admin/addFlight" }}>Add Flight</Link>
                </a>
                <a
                  class="nav-link disabled"
                  href="#"
                  tabindex="-1"
                  aria-disabled="true"
                >
                  Edit Flight
                </a>
                <a class="nav-link" href="#">
                  <Link to={{ pathname: "/admin" }}>Add Admin</Link>
                </a>
              </div>
              <div>
                <a class="nav-link" href="#">
                  <Link to={{ pathname: "/" }}>Logout</Link>
                </a>
              </div>
            </div>
          </div>
        </nav>

        {/*
        <div className="navbar">
          <div className="col-lg-3">
            <p>Welcome 'Main Admin'</p>
          </div>
          <div className="col-lg-9">
            <Link to="/admin/addFlight">
              <button className="btn btn-default ">Add Flight</button>
            </Link>
            <a href="/">Logout</a>
          </div>
          </div>
        */}
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
          <div>
            <FlightsSearch displayFlights={this.displayFlights} />
          </div>
        </div>
      </div>
    );
  }
}
