import React from "react";
import axios from "axios";

class FlightsSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flight_number: "",
      from: "",
      to: "",
      departure_time: "",
      arrival_time: "",
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.clearFields = this.clearFields.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    const flightData = {};
    if (this.state.flight_number != "")
      flightData.flight_number = this.state.flight_number;
    if (this.state.from != "") flightData.from = this.state.from;
    if (this.state.to != "") flightData.to = this.state.to;
    if (this.state.departure_time != "")
      flightData.departure_time = this.state.departure_time;
    if (this.state.arrival_time != "")
      flightData.arrival_time = this.state.arrival_time;
    this.props.displayFlights(flightData);
    this.setState({
      flight_number: "",
      from: "",
      to: "",
      departure_time: "",
      arrival_time: "",
    });
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  clearFields() {
    this.setState({
      flight_number: "",
      from: "",
      to: "",
      departure_time: "",
      arrival_time: "",
    });
  }

  render() {
    return (
      <div className="row">
        <div className="col-3"></div>
        <div className="col-6">
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label for="flight_number">Flight Number</label>
              <input
                id="flight_number"
                type="search"
                placeholder="Enter Flight Number"
                name="flight_number"
                className="form-control"
                value={this.state.flight_number}
                onChange={this.onChange}
              />
            </div>

            <div className="form-group">
              <label for="from">From</label>
              <input
                id="from"
                type="search"
                placeholder="From"
                name="from"
                className="form-control"
                value={this.state.from}
                onChange={this.onChange}
              />
            </div>

            <div className="form-group">
              <label for="to">To</label>
              <input
                id="to"
                type="search"
                placeholder="To"
                name="to"
                className="form-control"
                value={this.state.to}
                onChange={this.onChange}
              />
            </div>

            <div className="form-group">
              <label for="departure_time">Departure Time</label>
              <input
                id="departure_time"
                type="datetime-local"
                placeholder="Departure Time"
                name="departure_time"
                className="form-control"
                value={this.state.departure_time}
                onChange={this.onChange}
              />
            </div>

            <div className="form-group">
              <label for="arrival_time">Arrival Time</label>
              <input
                id="arrival_time"
                type="datetime-local"
                placeholder="Arrival Time"
                name="arrival_time"
                className="form-control"
                value={this.state.arrival_time}
                onChange={this.onChange}
              />
            </div>
            <br />
            <button className="btn btn-primary" type="submit">
              Submit
            </button>
            <br />
            <br />
            <a onClick={this.clearFields}>
              <button className="btn btn-secondary">CLEAR ALL FILTERS</button>
            </a>
            <br />
            <br />
          </form>
        </div>
        <div className="col-3"></div>
      </div>
    );
  }
}

export default FlightsSearch;
