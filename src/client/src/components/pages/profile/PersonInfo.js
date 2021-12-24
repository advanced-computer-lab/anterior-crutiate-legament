import React, { useState } from "react";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import ProfilePic from './profile.png'
import swal from 'sweetalert';
import axios from 'axios';
import { getUserToken } from "../../../handleToken.js";

export default class PersonInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            personID:props.personID,
            firstName: "",
            lastName: "",
            email: "",
            passport: ""
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
                    firstName: res.data[0].firstName,
                    lastName: res.data[0].lastName,
                    email: res.data[0].email,
                    passport: res.data[0].passport
                })
            });
    }

    render() {

        return (
            <div>
                <Box
                    sx={{ display: 'flex', flexWrap: 'wrap', '& > :not(style)': { m: 1, width: 800, height: 400, }, }}>

                    <Paper elevation={3} style={{ backgroundColor: 'rgba(245, 245, 245, 1)' }}>
                        <Stack spacing={1} direction="row">
                            <Box
                                sx={{ display: 'flex', flexWrap: 'wrap', '& > :not(style)': { m: 1, width: 500, height: 400, }, }}>
                                <Grid container justifyContent="center">
                                    <Stack spacing={1.5} >
                                        <Grid xs={12}>
                                            <TextField
                                                id="First Name"
                                                label="First Name"
                                                type="text"
                                                autoComplete="current-password"
                                                value={this.state.firstName}
                                                onChange={(e) =>this.setState({ firstName: e.target.value})}
                                            />
                                        </Grid>
                                        <Grid xs={12}>
                                            <TextField
                                                id="Last Name"
                                                label="Last Name"
                                                type="text"
                                                autoComplete="current-password"
                                                value={this.state.lastName}
                                                onChange={(e) => this.setState({ lastName: e.target.value})}
                                            />
                                        </Grid>

                                        <Grid xs={12}>
                                            <TextField
                                                id="Email"
                                                label="Email"
                                                type="text"
                                                autoComplete="current-password"
                                                value={this.state.email}
                                                onChange={(e) => this.setState({email:e.target.value})}
                                            />
                                        </Grid>
                                        <Grid xs={12}>
                                            <TextField
                                                id="Passport Numbe"
                                                label="Passport Number"
                                                type="text"
                                                autoComplete="current-password"
                                                value={this.state.passport}
                                                onChange={(e) => this.setState({ passport: e.target.value})}
                                            />
                                        </Grid>
                                        <Grid xs={12}>
                                            <Button
                                                variant="contained" style={{ backgroundColor: '#3B566E' }}
                                                onClick={() => {
                                                    let res = checkUser(this.state);

                                                    if (res) {
                                                        swal("Error", res, "error");;
                                                    } else {
                                                        //Send data to server
                                                        const data = {
                                                            _id: this.state.personID,
                                                            firstName:this.state.firstName,
                                                            lastName:this.state.lastName,
                                                            email:this.state.email,
                                                            passport:this.state.passport
                                                        };
                                                        let encodedId = encodeURIComponent(JSON.stringify(data));
                                                        console.log(this.state.passport);
                                                        data.token = getUserToken();
                                                        axios.put(`http://localhost:8000/api/user/editUserData`,data);
                                
                                                        swal("Done", "Your personal info is up to date", "success");

                                                    }
                                                }}
                                            >
                                                Save Changes</Button>
                                        </Grid>
                                    </Stack>
                                </Grid>

                            </Box>
                            <Box
                                sx={{ display: 'flex', flexWrap: 'wrap', '& > :not(style)': { m: 1, width: 250, }, height: 230, }}>
                                <Stack >
                                    <Box
                                        sx={{ backgroundColor: "#3B566E", '& > :not(style)': { m: 1, height: 200, } }}>
                                        <Paper style={{ backgroundImage: `url(${ProfilePic})`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'contain', }}>
                                        </Paper>
                                    </Box>
                                </Stack>
                            </Box>
                        </Stack>
                    </Paper>
                </Box>

            </div>
        );
    }
}

function checkUser(personInfo) {
    if (!validateEmail(personInfo.email)) {
        return "Enter a valid email on format example@gmail.com";
    }
    if (!validateName(personInfo.firstName)) {
        return "Enter a vaild first name on format First";
    }
    if (!validateName(personInfo.lastName)) {
        return "Enter a vaild first name on format Last";
    }


}
const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

const validateName = (name) => {
    var regName = new RegExp("^[A-Z][0-9]{8}$");
    return !regName.test(name);
}