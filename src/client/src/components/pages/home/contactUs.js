import React from 'react';

import NavBar from '../../templates/NavBar';
import Footer from '../../templates/Footer';
import ContactUsCard from '../../templates/contactUsCard';
import ContactForm from "../../templates/contactForm";

import {Grid} from "@material-ui/core";
import SideNav from "../../templates/SideNav";
import Box from "@material-ui/core/Box";

import khater from '../../../assets/images/khater.jpg';
import omar from '../../../assets/images/omar.jpg';
import yahia from '../../../assets/images/yahia.jpg';
import jobeel from '../../../assets/images/jobeel.jpg';
import shetya from '../../../assets/images/shetaya.jpg';

function contactUs() {

    return (
        <div>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', '& > :not(style)': { m: 1}, height: 150, }}>
            <NavBar/>
            </Box>
            <h1> Our Software Engineers : </h1>
            <Box sx={{ display: 'flex', flexWrap: 'wrap' ,paddingTop:'20px' ,marginLeft :'150px' ,marginRight :'100px' }}>
                <Box sx={{ display: 'flex', flexWrap: 'wrap' , paddingLeft:'20px' ,paddingBottom:'20px' }}>
                <ContactUsCard img ={shetya} name = 'Mohamed Shetaya' email = 'mohammed.shetaya@student.guc.edu.eg' id = '46-16076' tut ='T16' moreDescription='7th semester met student @ The German University in Cairo '/>
                </Box>
                <Box sx={{ display: 'flex', flexWrap: 'wrap' , paddingLeft:'20px',paddingBottom:'20px'  }}>
                    <ContactUsCard img ={omar} name = 'Omar Tarek' email = 'omar.elabsawy@student.guc.edu.eg' id = '46-9578' tut='T14' moreDescription='7th semester met student @ The German University in Cairo '/>
                </Box>
                <Box sx={{ display: 'flex', flexWrap: 'wrap' , paddingLeft:'20px',paddingBottom:'20px'  }}>
                    <ContactUsCard img ={jobeel} name = 'Mahmoud Jobeel' email = 'mahmoud.jobeel@student.guc.edu.eg' id = '46-18406' tut ='T13' moreDescription='7th semester met student @ The German University in Cairo '/>
                </Box>
                <Box sx={{ display: 'flex', flexWrap: 'wrap' , paddingLeft:'20px',paddingBottom:'20px'  }}>
                    <ContactUsCard img ={yahia} name = 'Yahia Sherif' email = 'yahia.abdelbar@student.guc.edu.eg' id = '46-16162'tut ='T18 ' moreDescription='7th semester met student @ The German University in Cairo '/>
                </Box>
                <Box sx={{ display: 'flex', flexWrap: 'wrap' , paddingLeft:'20px',paddingBottom:'20px'  }}>
                    <ContactUsCard img ={khater} name = 'Abdelrahman Khater' email = 'abdelrahman.selim@student.guc.edu.eg' id = '46-18829' tut='T18' moreDescription='7th semester met student @ The German University in Cairo '/>
                </Box>

            </Box>
            <br/>
            <Box sx={{marginLeft:'600px' , marginRight: '600px' , border:'solid', paddingLeft:'50px',paddingTop:'20px', paddingRight:'50px',paddingBottom:'20px' }}>
                <h1> Email Us</h1>
                <ContactForm  />
            </Box>

            <Footer/>
        </div>
    );
};

export default contactUs ;