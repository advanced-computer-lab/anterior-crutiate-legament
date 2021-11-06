import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

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
        let encodedSearchTerms = encodeURIComponent(JSON.stringify(searchTerms));
        axios
        .get(`http://localhost:8000/api/admin/adminSearchFlights?searchFilters=${encodedSearchTerms}`)
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
            <div className="admin-home-page-container">
                <div className="admin-logout-text">
                    <a href="/">Logout</a>
                </div>
                <div className="welcone-admin-text">
                    <p>Welcome 'Main Admin'</p>
                </div>
                <div className="admin-add-flight-button-container">
                    <Link to="/admin/addFlight">
                        <button className="add-flights-button">Add Flight</button>
                    </Link>
                </div>
                <div className="admin-flights-table-text">
                    <h1>Flights Table</h1>
                </div>
                <div className="admin-flights-table-container">
                    <FlightsTable flights={this.state.flightsDetails} />
                </div>
                <div className="admin-flights-search-text">
                    <h1>Flights Search</h1>
                </div>
                <div className="admin-flights-search-container">
                    <FlightsSearch displayFlights={this.displayFlights}/>
                </div>
            </div>
        );
    }
}

export default AdminApp;