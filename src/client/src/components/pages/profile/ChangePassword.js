import React from 'react';
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import swal from 'sweetalert';
import axios from 'axios';

export default class ChangePassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
            personPass: ""
        };
    }
    componentDidMount() {
        const data = {
            _id: "61b38e1f43fb1cc2ab42101b"
        };
        let encodedId = encodeURIComponent(JSON.stringify(data));

        axios.get(`http://localhost:8000/api/user/getUserDetails?in=${encodedId}`)
            .then((res) => {
                console.log(res.data[0].password+" test")
                this.setState({
                    personPass: res.data[0].password,
                    currentPassword: res.data[0].password
                })
                console.log(this.state.currentPassword+" test")
            });
    }
    render() {
        return (
            <div>
                <Stack spacing={2}>
                    <Grid xs={4} >
                        <TextField
                            id="Current Password"
                            label="Current Password"
                            type="password"
                            autoComplete="off"
                            onChange={(e) => this.setState({ currentPassword: e.target.value })}
                        />
                    </Grid>
                    <Box
                        sx={{
                            width: 220,
                            height: 5,
                            backgroundColor: '#3B566E',
                            '&:hover': {
                                backgroundColor: 'primary.main',
                                opacity: [0.9, 0.8, 0.7],
                            },
                        }}
                    />
                    <Grid xs={4}>
                        <TextField
                            id="New Password"
                            label="New Password"
                            type="password"
                            autoComplete="off"
                            onChange={(e) => this.setState({ newPassword: e.target.value })}
                        />
                    </Grid>
                    <Grid xs={4}>
                        <TextField
                            id="Confirm Password"
                            label="Confirm Password"
                            type="password"
                            autoComplete="off"
                            onChange={(e) => this.setState({ confirmPassword: e.target.value })}
                        />
                    </Grid>
                    <Grid xs={4}>

                        <Button
                            variant="contained" style={{ backgroundColor: '#3B566E' }}
                            onClick={() => {
                                 let res = comparePassword(this.state.newPassword, this.state.confirmPassword);
                                if (res) {
                                    swal("Error", res, "error");
                                }else if(this.state.currentPassword!==this.state.personPass){
                                    swal("Error", "Check your current password", "error");
                                }else{
                                    const data = {
                                        _id: "61b38e1f43fb1cc2ab42101b",
                                        password: this.state.newPassword
                                    };
                                    let encodedId = encodeURIComponent(JSON.stringify(data));
                                    console.log(this.state.passport);
                                     axios.put(`http://localhost:8000/api/user/editUserData`,data);
           
                                    swal("Done", "Your Password is up to date", "success");
                                }
                                
                            }}
                        >
                            Save Changes</Button>
                    </Grid>
                </Stack>
            </div>
        );
    }
}

const comparePassword = (newPassword, confirmPassword) => {
    if (!newPassword) {
        return "Please fill New Password box"
    }
    if (!confirmPassword) {
        return "Please fill Confirm Password box";
    }
    if (newPassword !== confirmPassword) {
        return "Check the match between new password and its confirmation";
    }
}
