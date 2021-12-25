import React from 'react';

import { Paper, Grid, Typography,Link,Stack } from '@material-ui/core';
import Logo from './Logo';
import "../../assets/css/templates/sidenav.css"
import home from '../../assets/images/home.png';
import profile from '../../assets/images/profile.png';
import search from '../../assets/images/search.png';
import login from '../../assets/images/login.png';
import register from '../../assets/images/register.png';
import out from '../../assets/images/log-out.png';

import {getUserToken,deleteUserToken, deleteUserID} from "../../handleToken";


function SideNavLink (props) {

    const logOut = () => {
        deleteUserToken();
        deleteUserID();
    }

     return (
        <Grid container className="sidenav" style={{marginTop: "15%"}}>    

            <Paper elevation={2} style={{padding:"3%", paddingBottom:"10%", marginLeft:"3%", backgroundColor:"#ecf4fb"}} >
            <Logo />
            <hr style = {{marginTop:"20%"}}/>

            <Grid container>
                <Paper  style={{backgroundColor:"#bad1fa",paddingBottom:"3%",margin:"1%"}}>
                <Link href = "/" >
                <Paper elevation={3} elevation={1} style={{backgroundColor:"#F8FFEF",padding:10 ,marginTop:"5%",marginLeft:"15%",marginRight:"10%", width:"20%",float:"left"}}>
                    <img  style={{width:"100%"}} src = {home} />
                </Paper>
                <Typography  style={{marginTop:"10%",color:"#3B566E"}}>
                    Home
                </Typography>
                </Link>
                </Paper>
            </Grid>

            <Grid container>
            <Paper  style={{backgroundColor:"#bad1fa",paddingBottom:"3%",margin:"1%"}}>

                <Link href = "/Profile" >
                <Paper elevation={3} elevation={1} style={{backgroundColor:"#F8FFEF",padding:10 ,marginTop:"5%",marginLeft:"15%",marginRight:"10%", width:"20%",float:"left"}}>
                     <img  style={{width:"100%"}} src = {profile} />
                </Paper>
                <Typography  style={{marginTop:"10%",color:"#3B566E"}}>
                    Profile
                </Typography>
                </Link>
                </Paper>
            </Grid>


            <Grid container>
            <Paper  style={{backgroundColor:"#bad1fa",paddingBottom:"3%",margin:"1%"}}>

                <Link href = "/home" >
                <Paper elevation={3} elevation={1} style={{backgroundColor:"#F8FFEF",padding:10 ,marginTop:"5%",marginLeft:"15%",marginRight:"10%", width:"20%",float:"left"}}>
                     <img  style={{width:"100%"}} src = {search} />
                </Paper>
                <Typography  style={{marginTop:"10%",color:"#3B566E"}}>
                    Search
                </Typography>
                </Link>
                </Paper>
            </Grid>
             
            <hr style = {{marginTop:"20%"}}/>

           { getUserToken()?
                <Grid container>
                    
                    <Link href = "/"  onClick={logOut}>
                    <Paper elevation={3} elevation={1} style={{backgroundColor:"#F8FFEF",padding:10 ,marginTop:"5%",marginLeft:"15%",marginRight:"10%", width:"20%",float:"left"}}>
                        <img  style={{width:"100%"}} src = {out} />
                    </Paper>    
                    <Typography  style={{marginTop:"10%",color:"#3B566E"}}>
                        Log out
                    </Typography>
                    </Link>
                </Grid>
                : null
            }

            { getUserToken()?null:
                <Grid container>
                    
                    <Link href = "/signIn">
                    <Paper elevation={3} elevation={1} style={{backgroundColor:"#F8FFEF",padding:10 ,marginTop:"5%",marginLeft:"15%",marginRight:"10%", width:"20%",float:"left"}}>
                        <img  style={{width:"100%"}} src = {login} />
                    </Paper>
                    <Typography  style={{marginTop:"10%",color:"#3B566E"}}>
                        Sign In
                    </Typography>
                    </Link>
                </Grid>
            }


            { getUserToken()?null:
                <Grid container>
                    
                    <Link href = "/register">
                    <Paper elevation={3} elevation={1} style={{backgroundColor:"#F8FFEF",padding:10 ,marginTop:"5%",marginLeft:"15%",marginRight:"10%", width:"20%",float:"left"}}>
                        <img  style={{width:"100%"}} src = {register} />
                    </Paper>    
                    <Typography  style={{marginTop:"10%",color:"#3B566E"}}>
                        Register
                    </Typography>
                    </Link>
                </Grid>
            }
            </Paper>

  
        </Grid>
        );
    }
    
    export default SideNavLink ;