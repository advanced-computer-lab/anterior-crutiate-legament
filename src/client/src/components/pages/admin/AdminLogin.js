import React from "react";
import axios from "axios";
import {
  setAdminName,
  setAdminToken,
  getAdminToken,
} from "../../../handleToken.js";
import { useHistory } from "react-router-dom";

export default function RootFunction(props) {
  const history = useHistory();
  return <AdminLogin history={history} />;
}

class AdminLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      message: "",
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
    console.log(getAdminToken());
    if (getAdminToken()) this.props.history.push("/admin");
  }

  onSubmit(e) {
    e.preventDefault();
    let loginDetails = {
      email: this.state.email,
      password: this.state.password,
    };
    let encodedLogin = encodeURIComponent(JSON.stringify(loginDetails));
    axios
      .get(
        `http://localhost:8000/api/admin/adminLogin?loginDetails=${encodedLogin}`
      )
      .then((res) => {
        if(res.data.accessToken) {
          setAdminToken(res.data.accessToken);
          setAdminName(res.data.firstName + " " + res.data.lastName);
        }
        this.setState({ message : "" });
        //setAdminName(res.data[0].firstName + " " + res.data[0].lastName);
        if (getAdminToken()) this.props.history.push("/admin");
        else console.log("token not found");
      })
      .catch((err) => {
        this.setState({ message : "Wrong Email or Password" });
        console.log("Error when contacting login API.");
      });

    //console.log(getAdminToken());
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
                <br />
                <div className="form-group">
                  <label for="exampleInputEmail1">Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder=" Email Address"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange}
                    required
                  />
                </div>
                <br />
                <div className="form-group">
                  <label for="exampleInputPassword1">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                    placeholder=" Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}
                    required
                  />
                </div>
                <br />
                <button type="submit" className="btn btn-primary">
                  Log In
                </button>
              </form>
              <br />
              <h4 className="text-center font-weight-bold">{this.state.message}</h4>
            </div>
            <div className="col-lg-3"></div>
          </div>
        </div>
      </div>
    );
  }
}
