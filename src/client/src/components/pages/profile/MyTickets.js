import React from "react";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Container} from "react-bootstrap";
import Chip from '@mui/material/Chip';
import DoneIcon from '@mui/icons-material/Done';
import DeleteIcon from '@mui/icons-material/Delete';
import { red } from '@mui/material/colors';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TicketPic from "./ticket.png"

import ConfirmCancellation from "./ConfirmCancellation.js";

import { maxHeight } from "@mui/system";

export default class MyTickets extends React.Component {
    
    constructor(props) {
        super()
        this.state = {

        }
    }
    render() {
        return(
               
            <div>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', '& > :not(style)': { m: 1, width: 800, height: 200, } }}>
                    <Stack direction="row">
                        <Box
                            sx={{ display: 'flex', flexWrap: 'wrap', '& > :not(style)': { m: 1, width: 600, height: 200, } }}>
                            <Paper style={{ backgroundImage: `url(${TicketPic})`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'contain', backgroundColor: 'rgba(0, 0, 245, 1)' }} >
                                <Stack spacing={1.2} padding={1}>
                                    <Stack spacing={1} direction="row">
                                        <h5 style={{ fontWeight: "bold" }}>Name:</h5>
                                        <p style={{ color: "black" }}>Mahmoud Jobeel</p>
                                    </Stack>

                                    <Stack direction="row" spacing={15}>
                                        <Stack spacing={1} direction="row">
                                            <h5 style={{ fontWeight: "bold" }} >From:</h5>
                                            <p style={{ color: "black" }}>Cairo</p>
                                        </Stack>
                                        <Stack spacing={1} direction="row">
                                            <h5 style={{ fontWeight: "bold" }} >To:</h5>
                                            <p style={{ color: "black" }}>London</p>
                                        </Stack>
                                    </Stack>
                                    <Stack spacing={1} direction="row">
                                        <h5 style={{ fontWeight: "bold" }} >Date:</h5>
                                        <p style={{ color: "black" }}>25/12/2021</p>
                                    </Stack>
                                    <Stack spacing={1} direction="row">
                                        <h5 style={{ fontWeight: "bold" }} >Boarding Time:</h5>
                                        <p style={{ color: "black" }}>15:00</p>
                                    </Stack>
                                    <Stack direction="row" spacing={5}>
                                        <Stack spacing={1} direction="row">
                                            <h5 style={{ fontWeight: "bold" }} >Gate:</h5>
                                            <p style={{ color: "black" }}>7</p>
                                        </Stack>
                                        <Stack spacing={1} direction="row">
                                            <h5 style={{ fontWeight: "bold" }} >Flight No:</h5>
                                            <p style={{ color: "black" }}>15485</p>
                                        </Stack>
                                        <Stack spacing={1} direction="row">
                                            <h5 style={{ fontWeight: "bold" }} >Seat:</h5>
                                            <p style={{ color: "black" }}>14</p>
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