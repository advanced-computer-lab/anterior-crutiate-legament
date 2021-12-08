import React, { useState,useRef } from 'react';
import SideNav from '../../templates/SideNav';
import Footer from "../../templates/Footer";
import PageHeaderSvg from '../../basic components/PageHeaderSvg';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import ProfileNav from './ProfileNav.js'

import 
{
 Grid,
 TextField} 
from '@material-ui/core';
import { Stack } from '@mui/material';

export default function Profile(){
    return (
        <Grid container >
            <SideNav />
            <Grid item md={9} sm={6} xs={6} style={{ marginLeft: "3%" }} >
                <Stack>
                    <PageHeaderSvg headerText="GUC Air The World Between Your Hands" src="https://www.gstatic.com/travel-frontend/animation/hero/flights_3.svg" />
                    <ProfileNav />
                </Stack>
            </Grid>
            <Grid item md={12} style={{ marginTop: "15%", left: "0", right: "0", bottom: "0" }}>
                <Footer />
            </Grid>
        </Grid>
    )
}

const card = (
    <React.Fragment>
        <CardContent>
            
        </CardContent>

    </React.Fragment>
  );