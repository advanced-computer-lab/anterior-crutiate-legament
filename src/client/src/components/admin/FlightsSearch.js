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

    render() {
        return (
            <div>
            <form onSubmit={this.onSubmit}>
                <div>
                    <input
                        type='search'
                        placeholder='Flight Number'
                        name='flight_number'
                        className='form-control'
                        value={this.state.flight_number}
                        onChange={this.onChange}
                    />
                </div>
                <br />
                <div>
                    <input
                        type='search'
                        placeholder='From'
                        name='from'
                        className='form-control'
                        value={this.state.from}
                        onChange={this.onChange}
                    />
                </div>
                <br />
                <div>
                    <input
                        type='search'
                        placeholder='To'
                        name='to'
                        className='form-control'
                        value={this.state.to}
                        onChange={this.onChange}
                    />
                </div>
                <br />
                <div>
                    <input
                        type="datetime-local"
                        placeholder='Departure Time'
                        name='departure_time'
                        className='form-control'
                        value={this.state.departure_time}
                        onChange={this.onChange}
                    />
                </div>
                <br />
                <div>
                    <input
                        type="datetime-local"
                        placeholder='Arrival Time'
                        name='arrival_time'
                        className='form-control'
                        value={this.state.arrival_time}
                        onChange={this.onChange}
                    />
                </div>
                <br />
                <input type="submit" />
                <br />
            </form>
            <br/>
            <a href="http://localhost:3000/admin/">  
                <button>CLEAR ALL FILTERS</button>  
            </a>
            </div>
        );
    }
}

export default FlightsSearch;