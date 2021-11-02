import React from 'react';

class FlightDetails extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <h1>{JSON.stringify(this.state)}</h1>
        );
    }
}

export default FlightDetails;