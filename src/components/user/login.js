import React, { useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import * as yup from 'yup'
import { Field, Formik, Form } from "formik"
import { isAuthentication } from "../../redux/actions/auth"
import { loader } from "../../shared/elements"
import { useDispatch, useSelector } from "react-redux";
import { CLEAR_MESSAGE } from "../../redux/constans/message"
import { Auth } from "../../redux/actions/auth";
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  toast.configure()


  const { isAuth } = useSelector((state) => state.auth);
  const { errorMsg } = useSelector((state) => state.message);
  const { loading } = useSelector((state) => state.loading);

 

  useEffect(() => {
    dispatch(isAuthentication());
  }, [dispatch]);

  useEffect(() => {
    if (isAuth) {
      navigate("/");
    }
  }, [isAuth]);




  useEffect(() => {
    if (errorMsg !== "") {
      toast.error(errorMsg)
      dispatch({ type: CLEAR_MESSAGE });
    }
  }, [errorMsg]);



  const initialValues = {
    email: "",
    password: "",
  }

  const onSubmit = values => {
    dispatch(Auth(values))
  }

  const LoginValidator = yup.object().shape({
    email: yup.string().required("email field is required").email("email must be email"),
    password: yup.string().required("password field is required"),
  })



  return (
    // <!-- Start login page-->


    <div className="container d-flex align-items-center justify-content-center form-height-login pt-24px pb-24px">

      {loading && loader()}


      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-10">
          <div className="card">
            <div className="card-header bg-primary">
              <div className="ec-brand">
                <a href="index.html" title="Ekka">
                  <img className="ec-brand-icon" src="/assets/imgs/ws-logo.png" alt="" />
                </a>
              </div>
            </div>
            <div className="card-body p-5">
              <h4 className="text-dark mb-5">Sign In</h4>

              {
                <Formik
                  initialValues={initialValues}
                  onSubmit={onSubmit}
                  validationSchema={LoginValidator}>

                  {
                    ({ touched, errors }) => (

                      <Form action="#" method="post">

                        <div className="row">
                          <div className="form-group col-md-12 mb-4">
                            <Field type="email" className="form-control" name="email" placeholder="Email" />
                            <small className="input-error" style={{ display: errors.email ? "block" : "none" }} >{touched.email && errors.email}</small>

                          </div>
                          <div className="form-group col-md-12 ">
                            <Field type="password" className="form-control" name="password" placeholder="Password" />
                            <small className="input-error" style={{ display: errors.password ? "block" : "none" }} >{touched.password && errors.password}</small>

                          </div>
                          <div className="col-md-12">
                           
                            <button type="submit" disabled={(loading)} className="btn btn-primary btn-block mb-4">Sign In</button>

                          </div>
                        </div>



                      </Form>


                    )

                  }</Formik>}


            </div>
          </div>
        </div>
      </div>
    </div>

    // {/* <!-- End login page--> */}
  );
}

export default Login;
