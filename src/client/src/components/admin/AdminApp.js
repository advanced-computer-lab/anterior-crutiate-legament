import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import FlightsTable from './FlightsTable.js';
import FlightsSearch from './FlightsSearch.js';

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
                flightsDetails: JSON.parse(res.data)
            });
            console.log(this.state.flightsDetails);
        })
        .catch(err =>{
            console.log('Error from getting flights details.');
        });
    }

    render() {
        return (
            <div>
                <FlightsTable flights={this.state.flightsDetails}/>
                <br />
                <FlightsSearch displayFlightsFunciton={this.displayFlights}/>
                <br />
                <Link to="./addFlight">Add Flight</Link>
            </div>
        );
    }
}

export default AdminApp;