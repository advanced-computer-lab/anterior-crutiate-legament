import React from "react";
import axios from "axios";
import { getAdminToken } from "../../../handleToken.js";
import { Link, useHistory } from "react-router-dom";
import AdminNavbar from "./AdminNavbar.js";

export default function RootFunction(props) {
  const history = useHistory();
  return <AddAdmin history={history} />;
}

class AddAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      message: "",
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
    if (!getAdminToken()) this.props.history.push("/adminLogin");
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const newAdminData = JSON.parse(JSON.stringify(this.state));
    newAdminData.token = getAdminToken();
    axios
      .post(`http://localhost:8000/api/admin/addAdmin`, newAdminData)
      .then((res) => {
        this.setState({ message: "Admin Added Successfully" });
      })
      .catch((err) => {
        console.log("Error when contacting admin API.");
        this.setState({ message: "Email Already Exists" });
      });
    // display a message
  }

  render() {
    return (
      <div className="container-fluid">
        <AdminNavbar />
        <div className="row">
          <div className="col-3"></div>
          <div className="col-6">
            <div className="text-center">
              <br />
              <h2>Add Admin</h2>
              <br />
            </div>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label for="firstName">First Name</label>
                <input
                  id="firstName"
                  type="search"
                  placeholder="Enter First Name"
                  name="firstName"
                  className="form-control"
                  value={this.state.firstName}
                  onChange={this.onChange}
                  required
                />
              </div>

              <div className="form-group">
                <label for="lastName">Last Name</label>
                <input
                  id="lastName"
                  type="search"
                  placeholder="Enter Last Name"
                  name="lastName"
                  className="form-control"
                  value={this.state.lastName}
                  onChange={this.onChange}
                  required
                />
              </div>
              <div className="form-group">
                <label for="email">Email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter Email"
                  name="email"
                  className="form-control"
                  value={this.state.email}
                  onChange={this.onChange}
                  required
                />
              </div>
              <div className="form-group">
                <label for="password">Password</label>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter Password"
                  name="password"
                  className="form-control"
                  value={this.state.password}
                  onChange={this.onChange}
                  required
                />
              </div>
              <br />
              <button className="btn btn-primary" type="submit">
                Submit
              </button>
            </form>
            <br />
            <h4 className="text-center font-weight-bold">{this.state.message}</h4>
          </div>
          <div className="col-3"></div>
        </div>
      </div>
    );
  }
}
