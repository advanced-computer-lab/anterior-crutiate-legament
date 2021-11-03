import React from 'react';
import { Link } from 'react-router-dom';

import './Admin.css';

class FlightRow extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        console.log(this.props.data);
        return (
            <tr>
                <td>{this.props.data.flight_number}</td>
                <td>{this.props.data.from}</td>
                <td>{this.props.data.to}</td>
                <td>{this.props.data.departure_time}</td>
                <td>{this.props.data.arrival_time}</td>
                <td>{this.props.data.Economy}</td>
                <td>{this.props.data.Business}</td>
                <td>{this.props.data.First}</td>
                <td><Link to={{
                    pathname: "/editFlight",
                    search: `${this.props.data._id}`,
                }}> Go </Link> </td>
            </tr>
        );
    }
}

export default FlightRow;