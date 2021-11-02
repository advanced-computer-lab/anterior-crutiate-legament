import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import FlightDetails from './FlightDetails';

class FlightRow extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <tr>
                <td>{this.props.flight_number}</td>
                <td>{this.props.from}</td>
                <td>{this.props.to}</td>
                <td>{this.props.departure_time}</td>
                <td>{this.props.arrival_time}</td>
                <td>{this.props.capin.Economy}</td>
                <td>{this.props.capin.Business}</td>
                <td>{this.props.capin.First}</td>
                <td>{/* Link here */}</td>
            </tr>
        );
    }
}

export default FlightRow;