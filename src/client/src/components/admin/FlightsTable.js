import React from 'react';
import FlightRow from './FlightRow.js'

class FlightsTable extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        let flightRows = this.props.flights.map(
            flight => <FlightRow id={flight.flight_number} props={flight} />
        );
        return (
            <table>
                <th>
                    <td>Flight ID</td>
                    <td>From</td>
                    <td>To</td>
                    <td>Departure Time</td>
                    <td>Arrival Time</td>
                    <td>Available Economy Seats</td>
                    <td>Available Business Seats</td>
                    <td>Available First Class Seats</td>
                    <td></td>
                </th>
                {flightRows}
            </table>
        );
    }
}

export default FlightsTable;