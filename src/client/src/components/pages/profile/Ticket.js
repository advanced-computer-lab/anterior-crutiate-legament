import React from "react";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TicketPic from "./ticket.png"
import ConfirmCancellation from "./ConfirmCancellation.js";
import axios from "axios";
export default class Ticket extends React.Component {
    
    constructor(props) {
        
        console.log("Props " +props.name)
        super(props);
        this.state = {
            flight: {
                _id:props.info.flight_id,
                from:"",
                to:"",
                departure_time:"",
                arrival_time:"",
            },
            name:props.name
        };
    }
    componentDidMount() {
        const data = {
            _id: this.state.flight._id
        };
        let encodedId = encodeURIComponent(JSON.stringify(data));

        axios.get(`http://localhost:8000/api/user/searchFlights?in=${encodedId}`)
            .then((res) => {
                this.setState({
                    from: res.data[0].from,
                    to: res.data[0].to,
                    departure_time: res.data[0].departure_time,
                    arrival_time: res.data[0].arrival_time
                })
            });
    }
    render() {



        return (

            <div>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', '& > :not(style)': { m: 1, width: 800, height: 200, } }}>
                    <Stack direction="row">
                        <Box
                            sx={{ display: 'flex', flexWrap: 'wrap', '& > :not(style)': { m: 1, width: 600, height: 200, } }}>
                            <Paper style={{ backgroundImage: `url(${TicketPic})`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'contain', backgroundColor: 'rgba(0, 0, 245, 1)' }} >
                                <Stack spacing={1.2} padding={1}>
                                    <Stack spacing={1} direction="row">
                                        <h5 style={{ fontWeight: "bold" }}>Name:</h5>
                                        <p style={{ color: "black" }}>{this.state.name}</p>
                                    </Stack>

                                    <Stack direction="row" spacing={15}>
                                        <Stack spacing={1} direction="row">
                                            <h5 style={{ fontWeight: "bold" }} >From:</h5>
                                            <p style={{ color: "black" }}>{this.state.flight.from}</p>
                                        </Stack>
                                        <Stack spacing={1} direction="row">
                                            <h5 style={{ fontWeight: "bold" }} >To:</h5>
                                            <p style={{ color: "black" }}>{this.state.flight.to}</p>
                                        </Stack>
                                    </Stack>
                                    <Stack spacing={1} direction="row">
                                        <h5 style={{ fontWeight: "bold" }} >Date:</h5>
                                        <p style={{ color: "black" }}>{""}</p>
                                    </Stack>
                                    <Stack spacing={1} direction="row">
                                        <h5 style={{ fontWeight: "bold" }} >Boarding Time:</h5>
                                        <p style={{ color: "black" }}>{""}</p>
                                    </Stack>
                                    <Stack direction="row" spacing={5}>
                                        <Stack spacing={1} direction="row">
                                            <h5 style={{ fontWeight: "bold" }} >Gate:</h5>
                                            <p style={{ color: "black" }}>{""}</p>
                                        </Stack>
                                        <Stack spacing={1} direction="row">
                                            <h5 style={{ fontWeight: "bold" }} >Flight No:</h5>
                                            <p style={{ color: "black" }}>{""}</p>
                                        </Stack>
                                        <Stack spacing={1} direction="row">
                                            <h5 style={{ fontWeight: "bold" }} >Seat:</h5>
                                            <p style={{ color: "black" }}>{""}</p>
                                        </Stack>
                                    </Stack>
                                </Stack>

                            </Paper>

                        </Box>
                        <div
                            style={{

                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',

                            }}
                        >

                            <ConfirmCancellation />

                        </div>

                    </Stack>
                </Box>

            </div>


        )

    }
}