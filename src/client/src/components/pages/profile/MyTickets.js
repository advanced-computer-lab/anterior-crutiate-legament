import React, { useState } from 'react';
import NoTicketsYet from './NoTicketsYet';
import Ticket from './Ticket';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import { getUserToken } from "../../../handleToken.js";


export default class MyTickets extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            personID:props.personID,
            personPass:"",
            ticketsList: [],
            name: "",
            isLoading: true
        }
    }
    async componentDidMount() {
        const data = {
            _id: this.state.personID,
            token: getUserToken(),
        };
        let encodedId = encodeURIComponent(JSON.stringify(data));
        await axios.get(`http://localhost:8000/api/user/getUserDetails?in=${encodedId}`)
            .then((res) => {

                this.setState({
                    ticketsList: res.data[0].reservations,
                    name: res.data[0].firstName.concat(" ".concat(res.data[0].lastName)),
                    personPass: res.data[0].password,
                    isLoading: false
                })
               
            });
    }

    render() {
        if (this.state.isLoading) {
            return <div>Loading...</div>
        }
        const ticketsList = this.state.ticketsList
        
        let tickets;
        if (ticketsList) {
           
            tickets = ticketsList.map((ticket, k) =>
                <Ticket key={ticket.id + "" + ticket.cabin} info={ticket} name={this.state.name} personID={this.state.personID} personPass={this.state.personPass}/>);
            return (
                <div>
                    <Stack spacing={1}>

                        {
                            tickets
                        }
                    </Stack>
                </div>
            )
        } else {

            return (
                <div>
                    <NoTicketsYet />
                </div>
            )
        }
    }


}