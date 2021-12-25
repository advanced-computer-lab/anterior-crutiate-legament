import React, { useEffect } from 'react';
import Cards from 'react-credit-cards';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import swal from 'sweetalert';
import axios from 'axios';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';


import SideNav from "../../templates/SideNav";
import Footer from "../../templates/Footer";
import PageHeaderSvg from "../../basic components/PageHeaderSvg";

export default class TransactionStatus extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            status:true
        }
    }
    render() {
        return (
            <div>
                <Grid container>
                    <SideNav />
                    <Grid item md={9} sm={6} xs={6} style={{ marginLeft: "3%" }}>
                        <Stack>
                            <PageHeaderSvg
                                headerText="Transaction Status"
                                src="https://www.gstatic.com/travel-frontend/animation/hero/flights_3.svg"
                            />
                            {/* {console.log(this.props.data.state)} */}
                        </Stack>
                        <Card sx={{ maxWidth: 345 }}>
                            <CardActionArea>
                                <CardMedia
                                     component="img"
                                     sx={{ width: 151 , height:150}}
                                     height="200"
                                    image={this.state.status ? "https://icon-library.com/images/successful-icon/successful-icon-6.jpg" : "https://jumeirahroyal.com/wp-content/uploads/d7e50cb89c.png"}
                                    alt="right mark"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                    {this.state.status ? "Successfull Transaction" : "Failed Transaction"}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {this.state.status ?  "Thank you for using GUC Air \n. Have a nice flight" : "We apologise for this failure \n .Please, Try again"}

                                </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                    <Grid
                        item
                        md={12}
                        style={{ marginTop: "15%", left: "0", right: "0", bottom: "0" }}
                    >
                        <Footer />
                    </Grid>
                </Grid>
            </div>
        )
    }
}