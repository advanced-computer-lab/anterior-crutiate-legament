import React from 'react';

import { Paper, Grid, Typography,Link,Stack } from '@material-ui/core';
import Logo from './Logo';
import "../../assets/css/templates/sidenav.css"

function SideNavLink (props) {

     return (
        <Grid container className="sidenav" style={{marginTop: "15%"}}>    

            <Paper elevation={2} style={{padding:"3%", paddingBottom:"10%", marginLeft:"3%", backgroundColor:"#F5F5F5"}} >
            <Logo />
            <hr style = {{marginTop:"20%"}}/>

            <Grid container>
                <Paper  style={{backgroundColor:"#CFE9D5",paddingBottom:"3%",margin:"1%"}}>
                <Link href = "/" >
                <Paper elevation={3} elevation={1} style={{backgroundColor:"#F8FFEF",padding:10 ,marginTop:"5%",marginLeft:"15%",marginRight:"10%", width:"20%",float:"left"}}>
                     <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" style = {{fill:"#3B566E"}} width="100%" height="auto"><path d="M23.121,9.069,15.536,1.483a5.008,5.008,0,0,0-7.072,0L.879,9.069A2.978,2.978,0,0,0,0,11.19v9.817a3,3,0,0,0,3,3H21a3,3,0,0,0,3-3V11.19A2.978,2.978,0,0,0,23.121,9.069ZM15,22.007H9V18.073a3,3,0,0,1,6,0Zm7-1a1,1,0,0,1-1,1H17V18.073a5,5,0,0,0-10,0v3.934H3a1,1,0,0,1-1-1V11.19a1.008,1.008,0,0,1,.293-.707L9.878,2.9a3.008,3.008,0,0,1,4.244,0l7.585,7.586A1.008,1.008,0,0,1,22,11.19Z"/></svg>
                </Paper>
                <Typography  style={{marginTop:"10%",color:"#3B566E"}}>
                    Home
                </Typography>
                </Link>
                </Paper>
            </Grid>

            <Grid container>
            <Paper  style={{backgroundColor:"#CFE9D5",paddingBottom:"3%",margin:"1%"}}>

                <Link href = "/Profile" >
                <Paper elevation={3} elevation={1} style={{backgroundColor:"#F8FFEF",padding:10 ,marginTop:"5%",marginLeft:"15%",marginRight:"10%", width:"20%",float:"left"}}>
                <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" style = {{fill:"#3B566E"}} width="100%" height="100%"><path d="M12,12A6,6,0,1,0,6,6,6.006,6.006,0,0,0,12,12ZM12,2A4,4,0,1,1,8,6,4,4,0,0,1,12,2Z"/><path d="M12,14a9.01,9.01,0,0,0-9,9,1,1,0,0,0,2,0,7,7,0,0,1,14,0,1,1,0,0,0,2,0A9.01,9.01,0,0,0,12,14Z"/></svg>                        </Paper>
                <Typography  style={{marginTop:"10%",color:"#3B566E"}}>
                    Profile
                </Typography>
                </Link>
                </Paper>
            </Grid>
            

            <Grid container>
            <Paper  style={{backgroundColor:"#CFE9D5",paddingBottom:"3%",margin:"1%"}}>

                <Link href = "/Flights" >
                <Paper elevation={3} elevation={1} style={{backgroundColor:"#F8FFEF",padding:10 ,marginTop:"5%",marginLeft:"15%",marginRight:"10%", width:"20%",float:"left"}}>
                <svg xmlns="http://www.w3.org/2000/svg" style = {{fill:"#3B566E"}}id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="100%" height="100%"><path d="M21,10H17.693L13.446,1.563A3,3,0,0,0,10.812,0H10.63A2.63,2.63,0,0,0,8.1,3.361L10.028,10H7.644a2.982,2.982,0,0,1-2.122-.879L4.105,7.7a2.409,2.409,0,0,0-2.814-.433A2.319,2.319,0,0,0,.125,8.689a2.525,2.525,0,0,0,.228,1.966L1.967,13.48A5.012,5.012,0,0,0,6.308,16h3.711L8.351,20.447A2.629,2.629,0,0,0,10.812,24a2.972,2.972,0,0,0,2.605-1.513L17.464,16H21a3,3,0,0,0,0-6ZM10.025,2.805A.63.63,0,0,1,10.63,2h.182a.989.989,0,0,1,.863.491L15.455,10H12.11ZM21,14H16.909a1,1,0,0,0-.848.471L11.69,21.479a1,1,0,0,1-.878.521.628.628,0,0,1-.588-.85l2.174-5.8A1,1,0,0,0,11.461,14H6.308a3,3,0,0,1-2.6-1.512L2.089,9.662a.523.523,0,0,1-.047-.4A.323.323,0,0,1,2.2,9.051.437.437,0,0,1,2.4,9a.415.415,0,0,1,.287.118l1.417,1.417A4.972,4.972,0,0,0,7.644,12H21a1,1,0,0,1,0,2Z"/></svg>
                </Paper>
                <Typography  style={{marginTop:"10%",color:"#3B566E"}}>
                    Flights
                </Typography>
                </Link>
                </Paper>
            </Grid>



            <hr style = {{marginTop:"20%"}}/>

            
            <Grid container>
                
                <Link href = "/" >
                <Paper elevation={3} elevation={1} style={{backgroundColor:"#F8FFEF",padding:10 ,marginTop:"5%",marginLeft:"15%",marginRight:"10%", width:"20%",float:"left"}}>
                <svg xmlns="http://www.w3.org/2000/svg" style = {{fill:"#3B566E"}} id="Outline" viewBox="0 0 24 24" width="100%" height="100%"><path d="M22.829,9.172,18.95,5.293a1,1,0,0,0-1.414,1.414l3.879,3.879a2.057,2.057,0,0,1,.3.39c-.015,0-.027-.008-.042-.008h0L5.989,11a1,1,0,0,0,0,2h0l15.678-.032c.028,0,.051-.014.078-.016a2,2,0,0,1-.334.462l-3.879,3.879a1,1,0,1,0,1.414,1.414l3.879-3.879a4,4,0,0,0,0-5.656Z"/><path d="M7,22H5a3,3,0,0,1-3-3V5A3,3,0,0,1,5,2H7A1,1,0,0,0,7,0H5A5.006,5.006,0,0,0,0,5V19a5.006,5.006,0,0,0,5,5H7a1,1,0,0,0,0-2Z"/></svg>                </Paper>
                <Typography  style={{marginTop:"10%",color:"#3B566E"}}>
                    Log out
                </Typography>
                </Link>
            </Grid>
 
            </Paper>

  
        </Grid>
        );
    }
    
    export default SideNavLink ;