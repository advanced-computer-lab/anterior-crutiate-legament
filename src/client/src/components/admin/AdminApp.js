import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import FlightsTable from './FlightsTable.js';
import FlightsSearch from './FlightsSearch.js';
import './Admin.css';

class AdminApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            flightsDetails: []
        };
        this.displayFlights = this.displayFlights.bind(this);
    }

    componentDidMount() {
        this.displayFlights({});
    }

    displayFlights(searchTerms) {
        axios
        .get('http://localhost:8000/api/adminRouter/adminSearchFlights', {
            params: {
                flight_number: searchTerms.flight_number,
                from: searchTerms.from,
                to: searchTerms.to,
                departure_time: searchTerms.departure_time,
                arrival_time: searchTerms.arrival_time
            }
        })
        .then(res => {
            this.setState({
                flightsDetails: res.data
            });
        })
        .catch(err =>{
            console.log('Error from getting flights details.');
        });
    }

    render() {
        return (
            <div className = "container">
                <FlightsSearch displayFlightsFunciton={this.displayFlights}/>
                <br />

                <FlightsTable flights={this.state.flightsDetails}/>
                <br />
                <Link to="/addFlight">Add Flight</Link>
            </div>
        );
    }
}

export default AdminApp;