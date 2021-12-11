import React, { useState } from 'react';
import NoTicketsYet from './NoTicketsYet';
import Ticket from './Ticket';
import Stack from '@mui/material/Stack';
import axios from 'axios';
export default class MyTickets extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ticketsList: [],
            name: "",
        }
    }
    componentDidMount() {
        const data = {
            _id: "61b38e1f43fb1cc2ab42101b"
        };
        let encodedId = encodeURIComponent(JSON.stringify(data));
        axios.get(`http://localhost:8000/api/user/getUserDetails?in=${encodedId}`)
            .then((res) => {
                this.setState({
                   ticketsList:res.data[0].reservations,
                   name:res.data[0].firstName.concat(" ".concat(res.data[0].lastName))
                })
            });
    }
    render() {
        const ticketsList =this.state.ticketsList;
        console.log(ticketsList);
        let tickets;
        if (ticketsList) {
            //ticketsList.map((ticket,k)=> console.log(typeof ticket))
            
            tickets=ticketsList.map((ticket,k)=>
            <Ticket key={ticket.id} info={ticket} name={this.state.name}/>);
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