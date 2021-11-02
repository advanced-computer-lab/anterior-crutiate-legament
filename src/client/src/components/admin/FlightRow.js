import React from 'react';
import { Link } from 'react-router-dom';

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
                <td>{this.props.data.departure_time}</td>
                <td>{this.props.data.arrival_time}</td>
                <td>{/*this.props.data.capin.Economy*/}</td>
                <td>{/*this.props.data.capin.Business*/}</td>
                <td>{/*this.props.data.capin.First*/}</td>
                <td><Link to={{
                    pathname: "/controlFlight",
                    data: this.props.data
                }}> Go </Link> </td>
            </tr>
        );
    }
}

export default FlightRow;