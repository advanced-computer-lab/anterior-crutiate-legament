import React from 'react';

class FlightDetails extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        console.log(this.props.location.data);
        return (
            <h1>Hi</h1>
        );
    }
}

export default FlightDetails;