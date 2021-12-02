import React from 'react';

import "../../assets/css/components/logo.css"
import background from "../../assets/img/undraw_adventure_re_ncqp.svg";
function PageHeaderSvg (props) {

     return (

        <div  item  >
            <img style = {{height:"200px", display: "block", marginLeft: "auto", marginRight: "auto" ,marginBottom:"0", paddingBottom:"0" }}  src={props.src}/>
            <h2 style = {{textAlign:'center',marginBottom:"2%"}}>{props.headerText}</h2>
        </div>    
        );
    }
    
    export default PageHeaderSvg ;