import React from "react"
import { Link } from "react-router-dom";


const Breadcrumb = (props) => {


  return (
    // <!-- Start breadcrumb start -->

    <>
      {
      
      props.btn === true ? 
      
      <div className="breadcrumb-wrapper breadcrumb-contacts">
        <div>
          <h1>{props.name}</h1>
          <p className="breadcrumbs"><span><Link to="/">Home</Link></span>
            <span><i className="mdi mdi-chevron-right"></i></span>{props.name}
          </p>
        </div>
        <div>
          {props.children}
        </div>
      </div> 
      
      :
        <div className="breadcrumb-wrapper breadcrumb-wrapper-2">
          <h1>{props.name}</h1>
          <p className="breadcrumbs"><span><a href="index.html">Home</a></span>
            <span><i className="mdi mdi-chevron-right" /></span>{props.name}
          </p>
        </div>
        
        }

    </>

        
        
            

          

    // <!-- End breadcrumb start -->
  );
}  

export default Breadcrumb;