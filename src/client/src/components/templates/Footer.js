import React from 'react';
import "bootstrap-icons/font/bootstrap-icons.css";

function Footer () {
    return (

        <footer>
        <div class="container">
          <div class="row">
            <div style={{marginTop:"1.5%"}} class="col-lg-8">
              <h2 wi>
                About The Company
              </h2>
              <p style={{width:"85%", margin:"1%" , textAlign:"left"}}>
              GUC AIR is the largest airline and one of two flag carriers of Egypt. Based in Cairo, the airline is a subsidiary of GUC Air, which is owned by the ACL Corporation.
              GUC AIR was founded as an airline in 2021. It now flies to 157 destinations in 83 countries across six continents. 
              </p>
            </div>
            <div class="col-lg-4" style={{marginTop:"3%"}}>
              <div style={{marginTop:"2%", width: '50%',margin: 'auto',height: 'auto'}}>
              <i className="icon bi-envelope" style={{fontColor:"#FFFFFF" , fontSize:"25px"}}></i>
              <a href="contact" style={{fontSize:"20px"}} class="btn btn-">CONTACT US</a>
              </div>
              <div style={{marginTop:"2%", width: '50%',margin: 'auto',height: 'auto'}}>
              <i className="icon bi-book-half" style={{fontColor:"#FFFFFF" , fontSize:"25px"}}></i>
              <a style={{fontSize:"20px"}} href="services" class="btn btn-">SERVICES</a> 
              </div>
            </div>
          </div>
          <hr />
          <div class="row">
            <div  class="col-lg-12">
              <p style={{fontSize:"15px"}}>Copyright © 2022 GUC Air Co., Ltd. All Rights Reserved. 
              <br/>ACL </p>
            </div>
          </div>
        </div>
      </footer>
 
    );
}

export default Footer ;