import React from 'react';
import axios from 'axios';

class AddFlight extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            flight_number: '',
            from: '',
            to: '',
            departure_time: '',
            arrival_time: '',
            economy: 0,
            business: 0,
            first: 0
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

        console.log(flightData);
        
        axios
        .post('http://localhost:8000/api/admin/adminCreateFlight', flightData)
        .then(res => {
            this.setState({
                flight_number: '',
                from: '',
                to: '',
                departure_time: '',
                arrival_time: '',
                economy: 0,
                business: 0,
                first: 0
            });
            this.props.history.push('/');
        })
        .catch(err => {
            console.log("Error in adding a flight to the database!");
        });
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <div>
                    <input
                        type='text'
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
                        type='text'
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
                        type='text'
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
                <div>
                    <input
                        type="number"
                        placeholder='Economy Class Seats'
                        name='economy'
                        className='form-control'
                        value={this.state.economy}
                        onChange={this.onChange}
                    />
                </div>
                <br />
                <div>
                    <input
                        type="number"
                        placeholder='Business Class Seats'
                        name='business'
                        className='form-control'
                        value={this.state.business}
                        onChange={this.onChange}
                    />
                </div>
                <br />
                <div>
                    <input
                        type="number"
                        placeholder='First Class Seats'
                        name='first'
                        className='form-control'
                        value={this.state.first}
                        onChange={this.onChange}
                    />
                </div>
                <br />
                <input type="submit" />
            </form>
        );
    }
}

export default AddFlight;