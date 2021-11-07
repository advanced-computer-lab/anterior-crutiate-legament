import React from 'react';
import axios from 'axios'

class EditFlight extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            flight : {
                _id:"",
                flight_number: "",
                from: "",
                to: "",
                departure_time: "",
                arrival_time:"",
                Economy: "",
                Business: "",
                First: ""
            }
        };
    }
    sendEditRequest =  async (event) => {
        event.preventDefault()
        let endpoint = `http://localhost:8000/api/admin/adminUpdateFlight`
        await axios.put(endpoint, this.state.flight)
    }
    deleteFlight = async (event) => {
        event.preventDefault()
        let endpoint = `http://localhost:8000/api/admin/adminDeleteFlight`
        await axios.delete(endpoint, {data : this.state.flight})
    }

    
    componentDidMount() {
        let flightId = this.props.match.params.id
        let encodedSearchTerms = encodeURIComponent(JSON.stringify({_id:flightId}));
        let endpoint = `http://localhost:8000/api/admin/adminSearchFlights?searchFilters=${encodedSearchTerms}`
        axios.get(endpoint).then(res => {
            let myFlight = res.data[0]
            myFlight.arrival_time = myFlight.arrival_time.substring(0,10)
            myFlight.departure_time = myFlight.departure_time.substring(0,10)
            this.setState({
                flight : myFlight
            })
        })
    }
    set(name) {
        return (event) => {this.state.flight[name] = event.target.value;}
    }
    render() {
        return (
            <div>
                <form onSubmit={this.sendEditRequest}>
                    <label>Flight Number: </label>
                    <input type="text" defaultValue={this.state.flight.flight_number} onChange={this.set("flight_number")}></input>
                    <br></br>
                    
                    <label>From : </label>
                    <input type="text" defaultValue={this.state.flight.from} onChange={this.set("from")}></input>
                    <br></br>

                    <label>To : </label>
                    <input type="text" defaultValue={this.state.flight.to} onChange={this.set("to")}></input>
                    <br></br>

                    <label>Departure time: </label>
                    <input type="date" defaultValue={this.state.flight.departure_time} onChange={this.set("departure_time")}></input>
                    <br></br>

                    <label>Arrival time: </label>
                    <input type="date" defaultValue={this.state.flight.arrival_time} onChange={this.set("arrival_time")}></input>
                    <br></br>

                    <label>Economy seats: </label>
                    <input type="text" defaultValue={this.state.flight.Economy} onChange={this.set("Economy")}></input>
                    <br></br>

                    <label>Business seats:</label>
                    <input type="text" defaultValue={this.state.flight.Business} onChange={this.set("Business")}></input>
                    <br></br>

                    <label>First class seats:</label>
                    <input type="text" defaultValue={this.state.flight.First} onChange={this.set("First")}></input>
                    <br></br>
                    <input type="submit" value="Save"></input>
                </form>
                <button onClick={this.popUpDelete}>Delete</button>
            </div>
        );
    }
}

export default EditFlight
