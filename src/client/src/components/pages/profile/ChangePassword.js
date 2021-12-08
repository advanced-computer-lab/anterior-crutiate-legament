import React from 'react';
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

export default function ChangePassword(){
    return (
        <div>
            <Stack spacing={2}>
                <Grid xs={4} >
                    <TextField
                        id="Current Password"
                        label="Current Password"
                        type="password"
                        autoComplete="current-password"
                    />
                </Grid>
                <Box
                    sx={{
                        width: 220,
                        height: 5,
                        backgroundColor: 'primary.dark',
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
                        autoComplete="current-password"
                    />
                </Grid>
                <Grid xs={4}>
                    <TextField
                        id="Confirm Password"
                        label="Confirm Password"
                        type="password"
                        autoComplete="current-password"
                    />
                </Grid>
            </Stack>
        </div>
    );
}