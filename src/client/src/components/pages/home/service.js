import React from 'react';

import NavBar from '../../templates/NavBar';
import Footer from '../../templates/Footer';
import ServiceCard from '../../templates/serviceCard';
import ContactForm from "../../templates/contactForm";
 
import Box from "@material-ui/core/Box";
import ent from '../../../assets/images/entertainment.jpg'
import pets from '../../../assets/images/pets.jpg'
import preg from '../../../assets/images/pregnant.jpg'
import kid from '../../../assets/images/kids.jpg'
import med from '../../../assets/images/medical.jpg'
import baby from '../../../assets/images/baby.jpg'


function service() {

    return (
        <div>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', '& > :not(style)': { m: 1}, height: 150, }}>
                <NavBar/>
            </Box>
            <h1 style={{textAlign: 'center',marginBottom:"1.5%"}}>  Our services    : </h1>
            <Box sx={{ display: 'flex', flexWrap: 'wrap' ,paddingTop:'20px' ,marginLeft :'150px' ,marginRight :'100px' }}>

                <Box sx={{ display: 'flex', flexWrap: 'wrap' , paddingLeft:'20px',paddingBottom:'20px'  }}>
                    <ServiceCard service='true' img={ent} name = 'ENTERTAINMENT' description = 'Enjoy our inflight entertainment on your next flight. ' />
                </Box>
                <Box sx={{ display: 'flex', flexWrap: 'wrap' , paddingLeft:'20px',paddingBottom:'20px'  }}>
                    <ServiceCard service='true' img={pets} name = 'TRAVELING WITH PETS' description = 'Am I allowed to take a pet on board. Learn more about the travelling with pets. ' />
                </Box>
                <Box sx={{ display: 'flex', flexWrap: 'wrap' , paddingLeft:'20px',paddingBottom:'20px'  }}>
                    <ServiceCard service='true' img={preg} name = 'EXPECTANT MOTHERS' description = 'You and your unborn child’s safety are our priority .Please see our guidelines what is may required.' />
                </Box>
                <Box sx={{ display: 'flex', flexWrap: 'wrap' , paddingLeft:'20px',paddingBottom:'20px'  }}>
                    <ServiceCard service='true' img={kid} name = 'YOUNG TRAVELERS' description = 'Learn more about what we offer for our young travelers. ' />
                </Box>
                <Box sx={{ display: 'flex', flexWrap: 'wrap' , paddingLeft:'20px' ,paddingBottom:'20px' }}>
                    <ServiceCard service='true' img={med} name = 'SPECIAL & MEDICAL ASSISTANCE' description = 'Click here to learn more about the special assistance we offer to customers with special needs. ' />
                </Box>
                <Box sx={{ display: 'flex', flexWrap: 'wrap' , paddingLeft:'20px' ,paddingBottom:'20px' }}>
                    <ServiceCard service='true' img={baby} name = 'BABY & CHILD CARE' description = 'Do I need to take special care of Infants during take-off, landing, and in the air? ' />
                </Box>
            </Box>



            <Footer/>
        </div>
    );
}

export default service ;