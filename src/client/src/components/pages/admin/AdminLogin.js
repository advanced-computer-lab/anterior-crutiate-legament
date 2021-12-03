import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function RootFunction(props) {
  const navigation = useNavigate();
  return <AdminLogin navigation={navigation} setToken={props.setToken}getToken={props.getToken} />;
}

class AdminLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
    if (this.props.getToken() !== undefined)
      this.props.navigation("/admin");
  }

  onSubmit(e) {
    e.preventDefault();
    let adminToken = 5;
    /*
    axios
    .get(`http://localhost:8000/api/admin/adminSearchFlights?searchFilters=`)
    .then((res) => {
        this.setState({
            flightsDetails: res.data,
        });
    })
    .catch((err) => {
        console.log("Error wjen contacting login API.");
    });
    */
    this.props.setToken(adminToken);
    this.props.navigation("/admin");
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  render() {
    return (
      <div>
        <div className="container-fluid">
          <h1 style={{ "margin-top": "10px" }} className="text-center">
            Admin Login
          </h1>
          <div className="row">
            <div className="col-lg-3"></div>
            <div className="col-lg-6">
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label for="exampleInputEmail1">Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder=" Email Address"
                    name="email"
                    value={this.state.flight_number}
                    onChange={this.onChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label for="exampleInputPassword1">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                    placeholder=" Password"
                    name="password"
                    value={this.state.flight_number}
                    onChange={this.onChange}
                    required
                  />
                </div>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="exampleCheck1"
                  />
                  <label className="form-check-label" for="exampleCheck1">
                    Remember Me
                  </label>
                </div>
                <button type="submit" className="btn btn-primary">
                  Log In
                </button>
              </form>
            </div>
            <div className="col-lg-3"></div>
          </div>
        </div>
      </div>
    );
  }
}
