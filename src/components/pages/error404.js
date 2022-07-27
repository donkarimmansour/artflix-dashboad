import React from "react"
import { useTranslation } from 'react-i18next';
import {  Link } from 'react-router-dom';
import { ImageLink } from "../../shared/funs";




const Error404 = () => {
    // const { t } = useTranslation();

  return (  
    // // <!-- Start error 404 -->
 
    <div className="error-wrapper border bg-white px-5">
        <div className="row justify-content-center align-items-center text-center">
          <div className="col-xl-4">
            <h1 className="text-primary bold error-title">404</h1>
            <p className="pt-4 pb-5 error-subtitle">Looks like something went wrong.</p>
            <Link to="/" className="btn btn-primary btn-pill">Back to Home</Link>
          </div>
          <div className="col-xl-6 pt-5 pt-xl-0 text-center">
            <img src="/assets/assets/img/lightenning.png" className="img-fluid" alt="Error Page Image" />
          </div>
        </div>
      </div>
 
    //  {/* <!-- End error 404 --> */}
  );
}  

export default Error404;
