import React, { useEffect,useRef } from 'react';

import { useHistory, useLocation } from "react-router-dom";
import SideNav from '../../templates/SideNav';
import SearchFilters from './SearchFilters';
import Footer from "../../templates/Footer";
import PageHeaderSvg from '../../basic components/PageHeaderSvg';
import { getUserToken } from "../../../handleToken.js";

import 
{
 Grid,
 TextField} 
from '@material-ui/core';
import { Stack } from '@mui/material';

export default function EditFlightDestination (props) {


  const history = useHistory();
  useEffect(() => {
    if (!getUserToken()) history.push("/");
  }, []);

  

  console.log(props)
  if (!getUserToken())
    return null;
  return (
      <Grid container >
           <SideNav/>
           <Grid item md = {9} sm= {6} xs = {6} style={{marginLeft:"3%"}} >
              <Stack>
                <PageHeaderSvg headerText = "Find Your Flight Now" src = "https://www.gstatic.com/travel-frontend/animation/hero/flights_3.svg"/>
              <SearchFilters props = {props}/>
              </Stack>
           </Grid>
           <Grid item md={12} style={{marginTop:"15%", left:"0" , right:"0", bottom:"0"}}>
           <Footer/>
           </Grid>
      </Grid>
  );
}