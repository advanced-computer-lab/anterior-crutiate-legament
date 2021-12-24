import React from 'react';
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import swal from 'sweetalert';
import axios from 'axios';
import { getUserToken } from "../../../handleToken.js";

export default class ChangePassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            personID: props.personID,
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
            personPass: ""
        };
    }
    componentDidMount() {
        const data = {
            _id: this.state.personID,
            token: getUserToken(),
        };
        let encodedId = encodeURIComponent(JSON.stringify(data));

        axios.get(`http://localhost:8000/api/user/getUserDetails?in=${encodedId}`)
            .then((res) => {
                this.setState({
                    personPass: res.data[0].password,
                    currentPassword: res.data[0].password
                })
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
                                } else {
                                    const data = {
                                        _id: this.state.personID,
                                        token: JSON.parse(getUserToken()),
                                        password: this.state.currentPassword
                                    };
                                    let encodedId = encodeURIComponent(JSON.stringify(data));
                                    axios.get(`http://localhost:8000/api/user/verifyPassword?in=${encodedId}`)
                                        .then((res) => {
                                           // console.log(res.data.result);
                                            if(res.data.result===true) {
                                                const data = {
                                                    _id: this.state.personID,
                                                    token: JSON.parse(getUserToken()),
                                                    password: this.state.newPassword
                                                };
                                                let encodedId = encodeURIComponent(JSON.stringify(data));
                                                
                                                axios.put(`http://localhost:8000/api/user/editUserData`, data);
            
                                                swal("Done", "Your Password is up to date", "success");
                                            }else{
                                                swal("Error", "Enter a valid current password", "error");
                                            }
                                            
                                        });
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
