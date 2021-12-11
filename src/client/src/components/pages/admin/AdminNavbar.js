import React from "react";
import { getAdminName, deleteAdminToken } from "../../../handleToken.js";
import { Link } from "react-router-dom";

class AdminNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
  }

  logOut(e) {
    deleteAdminToken();
  }

  render() {
    return (
      <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <div class="container-fluid">
            <a class="navbar-brand" href="#">
              Welcome, {getAdminName()}
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
                  <Link to={{ pathname: "/admin" }}>Check Flights</Link>
                </a>
                <a class="nav-link active" aria-current="page" href="#">
                  <a href="#flights-search-id">Flights Search</a>
                </a>
                <a class="nav-link" href="#">
                  <Link to={{ pathname: "/admin/addFlight" }}>Add Flight</Link>
                </a>
                <a class="nav-link" href="#">
                  <Link to={{ pathname: "/admin/addAdmin" }}>Add Admin</Link>
                </a>
              </div>
              <div>
                <form onSubmit={this.logOut}>
                  <button type="submit" className="btn btn-primary">
                    Logout
                  </button>
                </form>
              </div>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}
export default AdminNavbar;
