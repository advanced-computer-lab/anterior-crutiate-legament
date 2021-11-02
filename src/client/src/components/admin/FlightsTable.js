import React from 'react';
import FlightRow from './FlightRow.js'

import './Admin.css';

class FlightsTable extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        let flightRows = this.props.flights.map(
            flight => <FlightRow id={flight.flight_number} data={flight} />
        );
        return (
            <table>
                <tr>
                    <th>Flight ID</th>
                    <th>From</th>
                    <th>To</th>
                    <th>Departure Time</th>
                    <th>Arrival Time</th>
                    <th>Available Economy Seats</th>
                    <th>Available Business Seats</th>
                    <th>Available First Class Seats</th>
                    <th></th>
                </tr>
                {flightRows}
            </table>
        );
    }
}

export default FlightsTable;