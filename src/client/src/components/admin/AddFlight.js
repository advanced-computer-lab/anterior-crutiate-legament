import React from 'react';
import axios from 'axios';
import { now } from 'mongoose';

class AddFlight extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            flight_number: '',
            from: '',
            to: '',
            departure_time: '',
            arrival_time: '',
            economy: '',
            business: '',
            first: ''
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
        const flightData = {
            flight_number: this.state.flight_number,
            from: this.state.from,
            to: this.state.to,
            departure_time: this.state.departure_time,
            arrival_time: this.state.arrival_time,
            Economy: this.state.economy,
            Business: this.state.business,
            First: this.state.first
        };

        const departure_time = new Date(flightData.departure_time);
        const arrival_time = new Date(flightData.arrival_time) ;
        if(departure_time.getTime()<new Date().getTime() || departure_time.getTime()>arrival_time.getTime()){
            this.setState({error:"Error: enter valid data and try again!"}) ;    
        }   
        else{
            axios
            .post('http://localhost:8000/api/admin/adminCreateFlight', flightData)
            .then(res => {
                this.setState({
                    flight_number: '',
                    from: '',
                    to: '',
                    departure_time: '',
                    arrival_time: '',
                    economy: '',
                    business: '',
                    first: ''
                });
                this.props.history.push('/');
                window.location = "/admin"
            })
            .catch(err => {
                console.log("Error in adding a flight to the database!");
            });
        }
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {
        return (
            <div>
                <div className="add-flight-back-text">
                    <a href="/admin">Check Flights</a>
                </div>
                <form onSubmit={this.onSubmit}>
                    <h1 className="add-flight-text">Create a new flight</h1>
                    <p className="add-flight-text">Enter the flight details</p>
                    <input
                        type='text'
                        placeholder='Flight Number'
                        name='flight_number'
                        className='add-flight-input'
                        value={this.state.flight_number}
                        onChange={this.onChange}
                    />
                    <br />
                    <input
                        type='text'
                        placeholder='From'
                        name='from'
                        className='add-flight-input'
                        value={this.state.from}
                        onChange={this.onChange}
                    />
                    <input
                        type='text'
                        placeholder='To'
                        name='to'
                        className='add-flight-input'
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
                        className='add-flight-input'
                        value={this.state.departure_time}
                        onChange={this.onChange}
                    />
                    <input
                        type="datetime-local"
                        placeholder='Arrival Time'
                        name='arrival_time'
                        className='add-flight-input'
                        value={this.state.arrival_time}
                        onChange={this.onChange}
                    />
                    <br />
                    <input
                        type="number"
                        placeholder='Economy Class Seats'
                        name='economy'
                        className='add-flight-input'
                        value={this.state.economy}
                        onChange={this.onChange}
                    />
                    <input
                        type="number"
                        placeholder='Business Class Seats'
                        name='business'
                        className='add-flight-input'
                        value={this.state.business}
                        onChange={this.onChange}
                    />
                    <input
                        type="number"
                        placeholder='First Class Seats'
                        name='first'
                        className='add-flight-input'
                        value={this.state.first}
                        onChange={this.onChange}
                    />
                    <br />
                    <button className='add-flight-input' type="submit">Add Flight</button>
                </form>

                <h1>
                    {
                        this.state.error
                    }
                </h1>
            </div>
        );
    }
}

export default AddFlight;