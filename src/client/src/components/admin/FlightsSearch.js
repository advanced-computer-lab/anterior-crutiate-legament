import React from 'react';
import axios from 'axios';

class FlightsSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            flight_number: '',
            from: '',
            to: '',
            departure_time: '',
            arrival_time: ''
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.clearFields = this.clearFields.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
        const flightData = {};
        if(this.state.flight_number != '')
            flightData.flight_number = this.state.flight_number;
        if(this.state.from != '')
            flightData.from = this.state.from;
        if(this.state.to != '')
            flightData.to = this.state.to;
        if(this.state.departure_time != '')
            flightData.departure_time = this.state.departure_time;
        if(this.state.arrival_time != '')
            flightData.arrival_time = this.state.arrival_time;
        this.props.displayFlights(flightData);
        this.setState({
            flight_number: '',
            from: '',
            to: '',
            departure_time: '',
            arrival_time: '',
        });
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    clearFields() {
        this.setState({
            flight_number: '',
            from: '',
            to: '',
            departure_time: '',
            arrival_time: '',
        });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <input
                        type='search'
                        placeholder='Flight Number'
                        name='flight_number'
                        className='search-input'
                        value={this.state.flight_number}
                        onChange={this.onChange}
                    />
                    <br />
                    <input 
                        type='search'
                        placeholder='From'
                        name='from'
                        className='search-input'
                        value={this.state.from}
                        onChange={this.onChange}
                    />
                    <input
                        type='search'
                        placeholder='To'
                        name='to'
                        className='search-input'
                        value={this.state.to}
                        onChange={this.onChange}
                    />
                    <p className='add-flight-input'>Departure Time &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Arrival Time</p>
                    <input
                        type="datetime-local"
                        placeholder='Departure Time'
                        name='departure_time'
                        className='search-input'
                        value={this.state.departure_time}
                        onChange={this.onChange}
                    />
                    <input
                        type="datetime-local"
                        placeholder='Arrival Time'
                        name='arrival_time'
                        className='search-input'
                        value={this.state.arrival_time}
                        onChange={this.onChange}
                    />
                    <br />
                    <button className='search-input' type="submit">Submit</button>
                    <a onClick={this.clearFields}>  
                        <button className='search-input'>CLEAR ALL FILTERS</button>  
                    </a>
                </form>
            </div>
        );
    }
}

export default FlightsSearch;