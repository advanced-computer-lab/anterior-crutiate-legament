import React from "react";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import TicketPic from "./ticket.png"
import ConfirmCancellation from "./ConfirmCancellation.js";
import axios from "axios";
import UpdateTicket from "./UpdateTicket"
import {
    getUserToken,
    getUserID,
  } from "../../../handleToken.js";

export default class Ticket extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            personID: props.personID,
            _id: props.info.flight_id,
            cabin: props.info.cabin,
            seats: props.info.seats,
            name: props.name,
            personPass: props.personPass,
            date: "",
            from: "",
            to: "",
            time: "",
            flight_number: "",
            price:props.info.price,
            isLoading: true
        }

    }
    async componentDidMount() {
        const data = {
            _id: this.state._id
        };
        let encodedId = encodeURIComponent(JSON.stringify(data));

        await axios.get(`http://localhost:8000/api/user/flightData?searchFilters=${encodedId}`)
            .then((res) => {
                let temp = new Date(Date.parse(res.data[0].departure_time));
                const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                // console.log(temp.getHours())
                this.setState({
                    from: res.data[0].from,
                    to: res.data[0].to,
                    date: (temp.getDate() + " - " + (temp.getMonth()+1) + " - " + temp.getFullYear()),
                    time: (weekday[temp.getDay()] + "  " + temp.getHours() % 12 + ":" + temp.getMinutes() + " " + (temp.getHours() >= 12 ? "PM" : "AM")),
                    flight_number: res.data[0].flight_number,
                    isLoading: false,

                })
                //console.log(this.state)

            });
    }
    render() {
        if (this.state.isLoading) {
            return (

                <div>Loading..</div>
            )
        }
       // console.log(this.state)
        return (

            <div>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', '& > :not(style)': { m: 1, width: 800, height: 200, } }}>
                    <Stack direction="row" >
                        <Box
                            sx={{ display: 'flex', flexWrap: 'wrap', '& > :not(style)': { m: 1, width: 600, height: 200, } }}>
                            <Paper style={{ backgroundImage: `url(${TicketPic})`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'contain', backgroundColor: 'rgba(0, 0, 245, 1)' }} >
                                <Stack spacing={0.5} padding={1}>
                                    <Stack spacing={1} direction="row">
                                        <h5 style={{ fontWeight: "bold" }}>Name:</h5>
                                        <p style={{ color: "black" }}>{this.state.name}</p>
                                    </Stack>

                                    <Stack direction="row" spacing={15}>
                                        <Stack spacing={1} direction="row">
                                            <h5 style={{ fontWeight: "bold" }} >From:</h5>
                                            <p style={{ color: "black" }}>{this.state.from}</p>
                                        </Stack>
                                        <Stack spacing={1} direction="row">
                                            <h5 style={{ fontWeight: "bold" }} >To:</h5>
                                            <p style={{ color: "black" }}>{this.state.to}</p>
                                        </Stack>
                                    </Stack>
                                    <Stack spacing={1} direction="row">
                                        <h5 style={{ fontWeight: "bold" }} >Date:</h5>
                                        <p style={{ color: "black" }}>{this.state.date}</p>
                                    </Stack>
                                    <Stack spacing={1} direction="row">
                                        <h5 style={{ fontWeight: "bold" }} >Time:</h5>
                                        <p style={{ color: "black" }}>{this.state.time}</p>
                                    </Stack>
                                    <Stack direction="row" spacing={8}>
                                        {/* <Stack spacing={1} direction="row">
                                            <h5 style={{ fontWeight: "bold" }} >Gate:</h5>
                                            <p style={{ color: "black" }}>{""}</p>
                                        </Stack> */}
                                        <Stack spacing={1} direction="row">
                                            <h5 style={{ fontWeight: "bold" }} >Flight No:</h5>
                                            <p style={{ color: "black" }}>{this.state.flight_number}</p>
                                        </Stack>
                                        <Stack spacing={1} direction="row">
                                            <h5 style={{ fontWeight: "bold" }} >Cabin:</h5>
                                            <p style={{ color: "black" }}>{this.state.cabin}</p>
                                        </Stack>
                                    </Stack>
                                    <Stack spacing={1} direction="row">
                                        <h5 style={{ fontWeight: "bold" }} >Seats:</h5>
                                        <p style={{ color: "black" }}>{this.state.seats.join(' - ')}</p>
                                    </Stack>
                                </Stack>

                            </Paper>

                        </Box>
                        <div
                            style={{

                                 display: 'flex',
                                 flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',

                            }}
                        >
                            
                            <ConfirmCancellation personID={this.state.personID}
                                flight_id={this.state._id}
                                cabin={this.state.cabin}
                                seats={this.state.seats}
                                personPass={this.state.personPass} />
                            <br/>
                            <UpdateTicket  flightID={this.state._id} cabin={this.state.cabin} seats={this.state.seats} price={this.state.price} />
                            <br/>
                            <Button
                             variant="outlined" onClick={(e) => this.setState({ open: true })} color="success"
                             onClick={()=>{
                                     const data = {
                                         userId: this.state.personID,
                                         flightId: this.state._id,
                                         token: JSON.parse(getUserToken()),
                                         cabin: this.state.cabin,
                                         password: this.state.currentPassword
                                     };
                                     try{
                                        axios.post(`http://localhost:8000/api/user/emailMeFlight`,data);
                                     }
                                     catch(e){

                                     }
                            }}
                             >
                                Email Me
                            </Button>
                        </div>

                    </Stack>
                </Box>

            </div>


        )

    }
}