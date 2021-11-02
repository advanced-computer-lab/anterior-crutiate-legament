import React from 'react';
import axios from 'axios';

class AddFlight extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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
        
        const flightData = {
            flight_number: 10,
            from: this.state.from,
            to: this.state.to,
            departure_time: this.state.departure_time,
            arrival_time: this.state.arrival_time
        };

        console.log(flightData);
        
        axios
        .post('http://localhost:8000/api/adminRouter/adminCreateFlight', flightData)
        .then(res => {
            this.setState({
                from: '',
                to: '',
                departure_time: '',
                arrival_time: ''
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
                <input type="submit" />
            </form>
        );
    }
}

export default AddFlight;