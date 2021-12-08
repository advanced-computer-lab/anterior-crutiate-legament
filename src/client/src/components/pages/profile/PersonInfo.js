import React from "react";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import ProfilePic from './profile.png'
export default function PersonInfo() {
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
                                            defaultValue="Mahmoud"
                                        />
                                    </Grid>
                                    <Grid xs={12}>
                                        <TextField
                                            id="Last Name"
                                            label="Last Name"
                                            type="text"
                                            autoComplete="current-password"
                                            defaultValue="Jobeel"
                                        />
                                    </Grid>

                                    <Grid xs={12}>
                                        <TextField
                                            id="Email"
                                            label="Email"
                                            type="text"
                                            autoComplete="current-password"
                                            defaultValue="mahmoudjobeel@gmail.com"
                                        />
                                    </Grid>
                                    <Grid xs={12}>
                                        <TextField
                                            id="Passport Numbe"
                                            label="Passport Number"
                                            type="text"
                                            autoComplete="current-password"
                                            defaultValue="efwef25285"
                                        />
                                    </Grid>
                                    <Grid xs={12}>
                                        <Button  variant="contained" style={{backgroundColor: '#3B566E'}}>Save Changes</Button>
                                    </Grid>
                                </Stack>
                            </Grid>

                        </Box>
                        <Box
                            sx={{  display: 'flex', flexWrap: 'wrap', '& > :not(style)': { m: 1, width: 250, }, height: 230, }}>
                            <Stack >
                                <Box
                                    sx={{ backgroundColor: "#3B566E", '& > :not(style)': { m: 1, height: 200, }}}>
                                    <Paper style={{ backgroundImage: `url(${ProfilePic})`,backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'contain',}}>
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