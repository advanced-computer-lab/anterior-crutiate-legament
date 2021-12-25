import React, { useEffect } from 'react';
import Cards from 'react-credit-cards';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import swal from 'sweetalert';
import axios from 'axios';




export default class UpdateTicket extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            flightID:props.flightID ,
            cabin:props.cabin,
            seats:props.seats,
            open: false
        };
       
    }
  
    render() {
        return (
            <div>
                <Button variant="outlined" onClick={(e) => this.setState({ open: true })} color="error">
                         Update
                </Button>
                <Dialog open={this.state.open} onClose={() => this.setState({ open: false })}>

                    {/* <DialogTitle>Seats Cancelation</DialogTitle>
                    <DialogContent>
                        <DialogContentText style={{ color: 'red' }}>
                            Please Write Seats you want to cancel, seprated with ' - '.
                            <br />
                            <p style={{ color: 'red' }} >for example: 10-20-21</p>
                            <br />
                            <h4 style={{ color: 'black' }} > Your Seats </h4>
                            <p>10-20-30-40 </p>

                        </DialogContentText>
                        <br />
                        <div
                        // id="CancelSeats" style={{
                        //     display: 'flex',
                        //     alignItems: 'center',
                        //     justifyContent: 'center',
                        // }}
                        >

                            <Stack spacing={1}>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="seats"
                                    label="Select Canceld Seats"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                />
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="password"
                                    label="Confirm Password"
                                    type="password"
                                    fullWidth
                                    variant="standard"
                                />
                            </Stack>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={(e) => this.setState({ open: false })} color="error">Cancel</Button>
                        <Button >Confirm</Button>
                    </DialogActions> */}
                </Dialog>
            </div>
        );
    }
}
