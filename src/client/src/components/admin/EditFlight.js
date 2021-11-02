import React from 'react';

class EditFlight extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        console.log(this.props.location.search);
        return (
            <h1>EditFlight</h1>
        );
    }
}

export default EditFlight;