import React from "react";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useHistory, useLocation } from "react-router-dom";
import FlightImg from './ticket-alt.png';

export default function NoTicketsYet(){
  const history = useHistory();
  const data = useLocation();

    const bull = (
        <Box
          component="span"
          sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
        >
          •
        </Box>
      );
    return(
        <dev>
            <Card sx={{ maxWidth: 300 }} >
              <Paper elevation={3} style={{ backgroundColor: 'rgba(245, 245, 245, 1)'}}>
                <CardContent  >
                    <Grid md={4}>
                        <img  src={FlightImg}/>
                    </Grid>
                    <h4 >No Reservation Yet</h4>
                </CardContent>
                <CardActions>
                    <Grid xs={5}>
                        <Button 
                        variant="contained" style={{backgroundColor:'rgb(59, 86, 110)'}}
                        onClick={()=>{
                          history.push("/home")
                        }}
                        >Book Now</Button>
                    </Grid>
                </CardActions>
                </Paper>
            </Card>
        </dev>
    );
}