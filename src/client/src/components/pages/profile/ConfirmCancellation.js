import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import swal from 'sweetalert';
import axios from 'axios';
import { getUserToken } from "../../../handleToken.js";

export default class CancelRservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      personID: props.personID,
      flight_id: props.flight_id,
      cabin: props.cabin,
      seats: props.seats,
      personPassword: props.personPass,
      confirmPassword: "",
      open: false,
    }

  }


  render() {
    //console.log(this.state)
    return (
      <div>
        <Button variant="outlined" onClick={(e) => this.setState({ open: true })} color="error">
          Cancel
        </Button>
        <Dialog open={this.state.open} onClose={(e) => this.setState({ open: false })}>
          <DialogTitle>Reservation Cancellation</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To confirm reservation cancellation. Please, Enter your password:
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Password"
              type="password"
              fullWidth
              variant="standard"
              value={this.state.confirmPassword}
              onChange={(e) => this.setState({ confirmPassword: e.target.value })}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={(e) => this.setState({ open: false })} color="error">Cancel</Button>
            <Button onClick={
              async (e) => {
                // console.log(this.state.confirmPassword)
                // console.log(this.state.personPassword)
                const data = {
                  _id: this.state.personID,
                  token: JSON.parse(getUserToken()),
                  password: this.state.confirmPassword
              };
              let encodedId = encodeURIComponent(JSON.stringify(data));
              axios.get(`http://localhost:8000/api/user/verifyPassword?in=${encodedId}`)
                  .then((res) => {
                     // console.log(res.data.result);
                      if(res.data.result===true) {
                        this.setState({ open: false })
                        const data = {
                          flightId: this.state.flight_id,
                          seats: this.state.seats,
                          cabin: this.state.cabin,
                          userId: this.state.personID,
                          token: getUserToken(),
                        }
                        console.log(data);
                        axios.delete('http://localhost:8000/api/user/cancelReservation', { data: data })
                        swal("Done", "Flight deleted successfully", "success");
                      }else{
                          swal("Error", "Enter a valid current password", "error");
                      }
                      
                  });
              }
            } >Confirm</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}