import React from "react";
import axios from "axios";
import { getAdminToken } from "../../../handleToken.js";
import { useHistory } from "react-router-dom";
import AdminNavbar from "./AdminNavbar.js";

export default function RootFunction(props) {
  const history = useHistory();
  return <AddFlight history={history} />;
}

class AddFlight extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flight_number: "",
      from: "",
      to: "",
      departure_time: "",
      arrival_time: "",
      economy: 0,
      business: 0,
      first: 0,
      adultEconomyPrice: 0,
      childEconomyPrice: 0,
      adultBusinessPrice: 0,
      childBusinessPrice: 0,
      adultFirstPrice: 0,
      childFirstPrice: 0,
      message: "",
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
    if (!getAdminToken()) this.props.history.push("/adminLogin");
  }

  onSubmit(e) {
    e.preventDefault();
    const flightData = {
      flight_number: this.state.flight_number,
      from: this.state.from,
      to: this.state.to,
      departure_time: this.state.departure_time,
      arrival_time: this.state.arrival_time,
      Economy: this.state.economy,
      Business: this.state.business,
      First: this.state.first,
      adultEconomyPrice: this.state.adultEconomyPrice,
      childEconomyPrice: this.state.childEconomyPrice,
      adultBusinessPrice: this.state.adultBusinessPrice,
      childBusinessPrice: this.state.childBusinessPrice,
      adultFirstPrice: this.state.adultFirstPrice,
      childFirstPrice: this.state.childFirstPrice,
    };

    let dataCorrect = true;
    const departure_time = new Date(flightData.departure_time);
    const arrival_time = new Date(flightData.arrival_time);
    if (
      departure_time.getTime() < new Date().getTime() ||
      departure_time.getTime() > arrival_time.getTime()
    )
      dataCorrect = false;
    if (!dataCorrect) {
      this.setState({ message: "Error: enter valid dates and try again!" });
    } else {
      flightData.token = getAdminToken();
      axios
        .post("http://localhost:8000/api/admin/adminCreateFlight", flightData)
        .then((res) => {
          this.setState({
            flight_number: "",
            from: "",
            to: "",
            departure_time: "",
            arrival_time: "",
            economy: 0,
            business: 0,
            first: 0,
            adultEconomyPrice: 0,
            childEconomyPrice: 0,
            adultBusinessPrice: 0,
            childBusinessPrice: 0,
            adultFirstPrice: 0,
            childFirstPrice: 0,
          });
          this.props.history.push("/");
          window.location = "/admin";
        })
        .catch((err) => {
          console.log("Error in adding a flight to the database!");
        });
    }
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  render() {
    return (
      <div className="container-fluid">
        <AdminNavbar />
        <div className="row">
          <div className="col-3"></div>
          <div className="col-6">
            <form onSubmit={this.onSubmit}>
              <br />
              <h1 className="text-center">Add a new flight</h1>
              <br />
              <label>Flight Number: </label>
              <input
                type="text"
                placeholder="Enter Flight Number"
                name="flight_number"
                className="form-control"
                value={this.state.flight_number}
                onChange={this.onChange}
                required
              />
              <label>From: </label>
              <input
                type="text"
                placeholder="From"
                name="from"
                className="form-control"
                value={this.state.from}
                onChange={this.onChange}
                required
              />
              <label>To: </label>
              <input
                type="text"
                placeholder="To"
                name="to"
                className="form-control"
                value={this.state.to}
                onChange={this.onChange}
                required
              />
              <label>Departure Time: </label>
              <input
                type="datetime-local"
                placeholder="Enter Departure Time"
                name="departure_time"
                className="form-control"
                value={this.state.departure_time}
                onChange={this.onChange}
                required
              />
              <label>Arrival Time: </label>
              <input
                type="datetime-local"
                placeholder="Enter Arrival Time"
                name="arrival_time"
                className="form-control"
                value={this.state.arrival_time}
                onChange={this.onChange}
                required
              />
              <label>Economy Class Seats: </label>
              <input
                type="number"
                placeholder="Enter Economy Class Seats"
                name="economy"
                className="form-control"
                value={this.state.economy}
                onChange={this.onChange}
                required
              />
              <label>Business Class Seats: </label>
              <input
                type="number"
                placeholder="Enter Business Class Seats"
                name="business"
                className="form-control"
                value={this.state.business}
                onChange={this.onChange}
                required
              />
              <label>First Class Seats: </label>
              <input
                type="number"
                placeholder="Enter First Class Seats"
                name="first"
                className="form-control"
                value={this.state.first}
                onChange={this.onChange}
                required
              />
              <label>Adult Economy Price: </label>
              <input
                type="number"
                placeholder="Enter Adult Economy Price"
                name="adultEconomyPrice"
                className="form-control"
                value={this.state.adultEconomyPrice}
                onChange={this.onChange}
                required
              />
              <label>Child Economy Price: </label>
              <input
                type="number"
                placeholder="Enter Child Economy Price"
                name="childEconomyPrice"
                className="form-control"
                value={this.state.childEconomyPrice}
                onChange={this.onChange}
                required
              />
              <label>Adult Business Price: </label>
              <input
                type="number"
                placeholder="Enter Adult Business Price"
                name="adultBusinessPrice"
                className="form-control"
                value={this.state.adultBusinessPrice}
                onChange={this.onChange}
                required
              />
              <label>Child Business Price: </label>
              <input
                type="number"
                placeholder="Enter Child Business Price"
                name="childBusinessPrice"
                className="form-control"
                value={this.state.childBusinessPrice}
                onChange={this.onChange}
                required
              />
              <label>Adult First Class Price: </label>
              <input
                type="number"
                placeholder="Enter Adult First Class Price"
                name="adultFirstPrice"
                className="form-control"
                value={this.state.adultFirstPrice}
                onChange={this.onChange}
                required
              />
              <label>Child First Class Price: </label>
              <input
                type="number"
                placeholder="Enter Child First Class Price"
                name="childFirstPrice"
                className="form-control"
                value={this.state.childFirstPrice}
                onChange={this.onChange}
                required
              />
              <br />
              <button className="btn btn-primary" type="submit">
                Add Flight
              </button>
              <br />
              <br />
            </form>
          </div>
          <br />
          <h4 className="text-center font-weight-bold">{this.state.message}</h4>
          <br />
          <div className="col-3"></div>
        </div>
      </div>
    );
  }
}
