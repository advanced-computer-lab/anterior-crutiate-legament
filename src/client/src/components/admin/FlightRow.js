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
                <td>{this.props.data.Economy}</td>
                <td>{this.props.data.Business}</td>
                <td>{this.props.data.First}</td>
                <td>
                    <Link to={{
                        pathname: "/editFlight",
                        search: `${this.props.data._id}`,
                    }}>
                        <button className="edit-flight-button">Edit</button>
                    </Link>
                </td>
            </tr>
        );
    }
}

export default FlightRow;