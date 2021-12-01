import React from 'react';

import { Grid , Paper } from '@material-ui/core';
import Logo from "../basic components/Logo" ;
import SideNavLink from '../basic components/SideNavLink';


function SideNav () {
    return (

                <Grid container item md = {2} sm = {3} xs={4} id= "ttte">
                     
                     <Logo />
                     <SideNavLink/>
                </Grid>

    );
}

export default SideNav ;