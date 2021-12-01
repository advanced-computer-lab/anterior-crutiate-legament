import React  from 'react';

import SideNav from '../../templates/SideNav';

import { Grid , Paper, TextField } from '@material-ui/core';

 
function DashBoard(props) {

  const [value, setValue] = React.useState(new Date());

    return (

      <Grid container >
           <SideNav/>
           <Grid item md = {1} sm= {1} xs = {0} ></Grid>
           <Grid item md = {8} sm= {6} xs = {6} style={{marginTop:"7%"}} >
            <Paper style={{padding:"1.5%", backgroundColor:"#F7F7F7"}} >
               
             <TextField id="filled-basic" label="From" style={{width:"18%", margin:"1%"}} variant="filled" />
             <TextField id="filled-basic" label="To" style={{width:"18%", margin:"1%"}} variant="filled" />

   

             <TextField id="filled-basic" label="" style={{width:"18%", margin:"1%"}} variant="filled" />


             </Paper> 

             <hr style = {{marginTop:"20px"}}/>

           </Grid>
      </Grid>

   );
}

export default DashBoard;