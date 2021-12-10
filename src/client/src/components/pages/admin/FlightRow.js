import { Button } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

class FlightRow extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <tr>
        <td>{this.props.data.flight_number}</td>
        <td>{this.props.data.from}</td>
        <td>{this.props.data.to}</td>
        <td>{(new Date(this.props.data.departure_time)).toLocaleString()}</td>
        <td>{(new Date(this.props.data.arrival_time)).toLocaleString()}</td>
        <td>{this.props.data.Economy}</td>
        <td>{this.props.data.Business}</td>
        <td>{this.props.data.First}</td>
        <td>{this.props.data.adultEconomyPrice + " " + this.props.data.childEconomyPrice}</td>
        <td>{this.props.data.adultBusinessPrice + " " + this.props.data.childBusinessPrice}</td>
        <td>{this.props.data.adultFirstPrice + " " + this.props.data.childFirstPrice}</td>
        <td>
          <Link
            to={{
              pathname: "/admin/editFlight",
              state: {"flight_id": `${this.props.data._id}`},
            }}
          >
            <p className="btn btn-secondary">Edit</p>
          </Link>
        </td>
      </tr>
    );
  }
}

export default FlightRow;
