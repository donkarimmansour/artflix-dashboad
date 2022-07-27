import React, { Fragment, useEffect, useState } from "react";
import Breadcrumb from "../stuff/breadcrumb";
import { useParams, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { isAuthentication } from "../../redux/actions/auth";
import * as yup from "yup";
import { Field, Formik, Form } from "formik";
import { toast } from "react-toastify"; 
import { loader } from "../../shared/elements";
import { Create } from "../../services/file";
import { EditUsers, EditUsersImage, get_User } from "../../redux/actions/users";
import { ImageVIEW } from "../../shared/funs";
import { CLEAR_MESSAGE } from "../../redux/constans/message";

const UserProfile = () => {
  const params = useParams();
  const { isAuth, token } = useSelector((state) => state.auth);
  const { User } = useSelector((state) => state.user);
  const Authorization = { Authorization: `bearer ${token}` };
  const { loading } = useSelector((state) => state.loading);
  const { errorMsg, successMsg } = useSelector((state) => state.message);
  const [localCoading, setLocalLoading] = useState(false);


  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(isAuthentication());
  }, [dispatch]);
  toast.configure();
  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    } if (!params.id || params.id === "") {
      navigate(-1);
    }
  }, [isAuth, params]);



  useEffect(() => {
    if (errorMsg !== "") {
      toast.error(errorMsg)
      dispatch({ type: CLEAR_MESSAGE });
    }
  }, [errorMsg]);


  useEffect(() => {
    if (successMsg !== "") {
      toast.success(successMsg)
      dispatch({ type: CLEAR_MESSAGE });
    }
  }, [successMsg]);


  //form
  const [initial, setInitial] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    address: "",
    country: "",
    city: "",
    state: "",
    phone: "",
    postcode: "",
  });
  const Validator = yup.object().shape({
    firstname: yup.string().required("firstname field is required"),
    lastname: yup.string().required("lastname field is required"),
    email: yup
      .string()
      .required("email field is required")
      .email("email must be email"),
    address: yup.string().required("address field is required"),
    country: yup.string().required("country field is required"),
    city: yup.string().required("city field is required"),
  });
  useEffect(() => {
    setInitial({
      firstname: User.firstname || "",
      lastname: User.lastname || "",
      email: User.email || "",
      address: User.address || "",
      country: User.country || "",
      city: User.city || "",
      state: User.state || "",
      phone: User.phone || "",
      postcode: User.postcode || "",
      password: "",
    });
  }, [User]);

  const onSubmit = (values) => {
    dispatch(EditUsers(User._id, values, Authorization))
    
  };

  //upload image
  const uploadImage = (e) => {
    if (e.target.files && e.target.files[0]) {
      const img = e.target.files[0];
      console.log(img);
      //return
      const formData = new FormData();
      formData.append("image", img);


      setLocalLoading(true);

      Create(formData, Authorization)
        .then(({ data }) => {
          if (!data.err) {
            setLocalLoading(false);
            dispatch(EditUsersImage(User._id, { image: data.msg }, Authorization))

          } else {
            setLocalLoading(false);
            toast.error(typeof data.msg == "string" ? data.msg : data.msg[0]);
          }
          //  console.log(data);
        })
        .catch((err) => {
          console.log("get orders api err ", err);
          setLocalLoading(false);
          toast.error("something went wrong please try again");
        });
    }
  };

  //------------------------------------------
  useEffect(() => {
    dispatch(
      get_User({ filter: `{ "_id": "${params.id}"}` }, Authorization))
  }, [isAuth]);



  //upload image
  return (
    <Fragment>
      {/* CONTENT WRAPPER */}
      <div className="ec-content-wrapper">
        <div className="content">
          <Breadcrumb name="User Profile" />
          {(loading || localCoading) && loader()}
          {User && User._id && (
            <div className="card bg-white profile-content">
              <div className="row">
                <div className="col-lg-4 col-xl-3">
                  <div className="profile-content-left profile-left-spacing">
                    <div className="text-center widget-profile px-0 border-0">
                      <div className="card-img mx-auto rounded-circle">
                        <img src={ImageVIEW(User.image)} alt="user avatar" />
                      </div>
                    </div>
                    <hr className="w-100" />
                    <div className="contact-info pt-4">
                      <h5 className="text-dark">Contact Information</h5>
                      <p className="text-dark font-weight-medium pt-24px mb-2">
                        Email address
                      </p>
                      <p>{User.email}</p>
                      <p className="text-dark font-weight-medium pt-24px mb-2">
                        Phone Number
                      </p>
                      <p>{User.phone}</p>
                      <p className="text-dark font-weight-medium pt-24px mb-2">
                        Birthday
                      </p>

                    </div>
                  </div>
                </div>
                <div className="col-lg-8 col-xl-9">
                  <div className="tab-content px-3 px-xl-5" id="myTabContent">
                    <div className="tab-pane-content mt-5">
                      {
                        <Formik
                          initialValues={initial}
                          onSubmit={onSubmit}
                          validationSchema={Validator}
                          enableReinitialize
                        >
                          {({ touched, errors }) => (
                            <Form>

                              <div className="form-group row mb-6">
                                <label
                                  htmlFor="coverImage"
                                  className="col-sm-4 col-lg-2 col-form-label"
                                >
                                  User Image
                                </label>
                                <div className="col-sm-8 col-lg-10">
                                  <div className="custom-file mb-1">
                                    <input
                                      type="file"
                                      className="custom-file-input"
                                      id="coverImage"
                                      onChange={uploadImage}
                                    />
                                    <label
                                      className="custom-file-label"
                                      htmlFor="coverImage"
                                    >
                                      Choose file...
                                    </label>
                                    <div className="invalid-feedback">
                                      Example invalid custom file feedback
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="row mb-2">
                                <div className="col-lg-6">
                                  <div className="form-group">
                                    <label htmlFor="firstname">First name</label>
                                    <Field
                                      type="text"
                                      className="form-control"
                                      id="firstname"
                                      name="firstname"
                                    />
                                    <small
                                      className="input-error"
                                      style={{
                                        display: errors.firstname
                                          ? "block"
                                          : "none",
                                      }}
                                    >
                                      {touched.firstname && errors.firstname}
                                    </small>
                                  </div>
                                </div>
                                <div className="col-lg-6">
                                  <div className="form-group">
                                    <label htmlFor="lastname">Last name</label>
                                    <Field
                                      type="text"
                                      className="form-control"
                                      id="lastname"
                                      name="lastname"
                                    />
                                    <small
                                      className="input-error"
                                      style={{
                                        display: errors.lastname
                                          ? "block"
                                          : "none",
                                      }}
                                    >
                                      {touched.lastname && errors.lastname}
                                    </small>
                                  </div>
                                </div>
                              </div>
                              <div className="form-group mb-4">
                                <label htmlFor="email">Email</label>
                                <Field
                                  type="email"
                                  className="form-control"
                                  id="email"
                                  name="email"
                                />
                                <small
                                  className="input-error"
                                  style={{
                                    display: errors.email ? "block" : "none",
                                  }}
                                >
                                  {touched.email && errors.email}
                                </small>
                              </div>
                              <div className="form-group mb-4">
                                <label htmlFor="address">Address</label>
                                <Field
                                  type="text"
                                  className="form-control"
                                  id="address"
                                  name="address"
                                />
                                <small
                                  className="input-error"
                                  style={{
                                    display: errors.address ? "block" : "none",
                                  }}
                                >
                                  {touched.address && errors.address}
                                </small>
                              </div>
                              <div className="form-group mb-4">
                                <label htmlFor="country">Country</label>
                                <Field
                                  type="country"
                                  className="form-control"
                                  id="country"
                                  name="country"
                                />
                                <small
                                  className="input-error"
                                  style={{
                                    display: errors.country ? "block" : "none",
                                  }}
                                >
                                  {touched.country && errors.country}
                                </small>
                              </div>
                              <div className="form-group mb-4">
                                <label htmlFor="city">City</label>
                                <Field
                                  type="city"
                                  className="form-control"
                                  id="city"
                                  name="city"
                                />
                                <small
                                  className="input-error"
                                  style={{
                                    display: errors.city ? "block" : "none",
                                  }}
                                >
                                  {touched.city && errors.city}
                                </small>
                              </div>
                              <div className="form-group mb-4">
                                <label htmlFor="state">State</label>
                                <Field
                                  type="state"
                                  className="form-control"
                                  id="state"
                                  name="state"
                                />
                                <small
                                  className="input-error"
                                  style={{
                                    display: errors.state ? "block" : "none",
                                  }}
                                >
                                  {touched.state && errors.state}
                                </small>
                              </div>
                              <div className="form-group mb-4">
                                <label htmlFor="postcode">Post Code</label>
                                <Field
                                  type="postcode"
                                  className="form-control"
                                  id="postcode"
                                  name="postcode"
                                />
                                <small
                                  className="input-error"
                                  style={{
                                    display: errors.postcode ? "block" : "none",
                                  }}
                                >
                                  {touched.postcode && errors.postcode}
                                </small>
                              </div>
                              <div className="form-group mb-4">
                                <label htmlFor="password">password</label>
                                <Field
                                  type="password"
                                  className="form-control"
                                  id="password"
                                  name="password"
                                />
                              </div>
                              <div className="d-flex justify-content-end mt-5">
                                <button
                                  type="submit"
                                  className="btn btn-primary mb-2 btn-pill"
                                  disabled={loading || localCoading}
                                >
                                  Update Profile
                                </button>
                              </div>
                            </Form>
                          )}
                        </Formik> 
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </Fragment>
  );
};

export default UserProfile;