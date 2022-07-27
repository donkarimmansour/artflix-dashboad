import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Breadcrumb from "../stuff/breadcrumb";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { Field, Formik, Form } from "formik";
import myClassNames from "classnames";
import {
  add_User,
  count_users,
  Edit_Rule,
  emailVerifiedUser,
  get_Users, 
  suspendedUser,
} from "../../redux/actions/users";
import moment from "moment";
import { isAuthentication } from "../../redux/actions/auth";
import { CLEAR_MESSAGE } from "../../redux/constans/message";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ImageVIEW } from "../../shared/funs";
const Users = () => {
  const { token, isAuth } = useSelector((state) => state.auth);
  const Authorization = { Authorization: `bearer ${token}` };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //---------------------------------IS-AUTHORIZATION---------------------------------
  useEffect(() => {
    dispatch(isAuthentication());
  }, [dispatch]);
  toast.configure();
  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, [isAuth]);
  //---------------------------------END-IS-AUTHORIZATION----------------------------
  //---------------------------------------------------------------------------------
  const { Users, count } = useSelector((state) => state.user);
  const { errorMsg, successMsg } = useSelector((state) => state.message);
  const { loading } = useSelector((state) => state.loading);
  const [filter, setFilter] = useState({
    sort: JSON.stringify({ updatedAt: -1 }),
    limit: 10,
    skip: 0,
    filter: JSON.stringify({ name: { $ne: "karimmansour" } }),
  });
  //  ---------------------------------GET-USERS--AND-PAGINATION---------------------------------------
  //------Pagination :
  const [Pages, setPages] = useState({ pages: ["", "", ""], currentPage: 1 });
  useEffect(() => {
    const skip =
      Pages.currentPage === 1 ? 0 : (Pages.currentPage - 1) * filter.limit;
    dispatch(count_users({ filter: filter.filter }, Authorization));
    dispatch(get_Users({ ...filter, skip  }, Authorization));
  }, [dispatch, filter]);
  
  //  ---------------------------------END-GET-USERS-AND-PAGINATION---------------------------------------

  
  //---------PAGINATION--------:
  useEffect(() => {
    setPages((Pages) => {
      Pages.pages.length = Math.ceil(count / filter.limit);
      Pages.pages.fill("page");
      return { ...Pages, pages: Pages.pages };
    });
  }, [count]);
  //--------END-PAGINATION--------:
  //---------------------------SEARCH----------------------------------------------

  //-----SHOW-LIMIT :
  const setLimit = (e) => {
    setFilter({ ...filter, limit: parseInt(e.target.value) });
  };
  //----END-SHOW-LIMIT :
  const setQuery = (e) => {
    setFilter({
      ...filter,
      filter: JSON.stringify({
        $or: [
          { firstname: { $regex: e.target.value, $options: "i" } },
          { lastname: { $regex: e.target.value, $options: "i" } },
          { email: { $regex: e.target.value, $options: "i" } },
        ],
      }),
    });
  };
  // console.log(Users);
  //-------------------------END-SEARCH----------------------------------------------
  //---------------------------PAGINATION------------------------------------------------
  const paginations = [];
  const Pagination = () => {
    const currentPage = Pages.currentPage;
    const pagesLength = Pages.pages.length;
    if (pagesLength > 0) {
      if (currentPage === 1) {
        for (let pageid = 1; pageid <= pagesLength; pageid++) {
          paginations.push(
            <li
              key={pageid}
              className={myClassNames("paginate_button page-item", {
                " active": pageid === currentPage,
              })}
            >
              <a
                onClick={() => {
                  setCurrentPags(pageid);
                }}
                href="javascript:void(0)"
                className="page-link"
              >
                {pageid}
              </a>
            </li>
          );
          if (pageid === 3) {
            paginations.push(
              <li key="next" className="paginate_button page-item next">
                <a
                  onClick={() => {
                    setCurrentPags("next");
                  }}
                  className="page-link"
                  href="javascript:void(0)"
                >
                  Next <i className="ecicon eci-angle-right"></i>
                </a>
              </li>
            );
            return;
          }
        }
      } else if (
        (pagesLength > 0 && currentPage === pagesLength) ||
        currentPage === pagesLength - 1 ||
        currentPage === pagesLength - 2
      ) {
        paginations.push(
          <li key="previews" className="paginate_button page-item previous">
            <a
              onClick={() => {
                setCurrentPags("prev");
              }}
              className="page-link"
              href="javascript:void(0)"
            >
              Previews <i className="ecicon eci-angle-left"></i>
            </a>
          </li>
        );
        for (let pageid = pagesLength - 3; pageid <= pagesLength; pageid++) {
          if (pageid > 0) {
            paginations.push(
              <li
                key={pageid}
                className={myClassNames("paginate_button page-item", {
                  active: pageid === currentPage,
                })}
              >
                <a
                  onClick={() => {
                    setCurrentPags(pageid);
                  }}
                  href="javascript:void(0)"
                  a
                  className="page-link"
                >
                  {pageid}
                </a>
              </li>
            );
          }
        }
      } else {
        paginations.push(
          <li key="previews" className="paginate_button page-item previous">
            <a
              onClick={() => {
                setCurrentPags("prev");
              }}
              className="page-link"
              href="javascript:void(0)"
            >
              Previews <i className="ecicon eci-angle-left"></i>
            </a>
          </li>
        );
        for (let pageid = currentPage - 1; pageid <= pagesLength; pageid++) {
          paginations.push(
            <li
              key={pageid}
              className={myClassNames("paginate_button page-item", {
                active: pageid === currentPage,
              })}
            >
              <a
                onClick={() => {
                  setCurrentPags(pageid);
                }}
                href="javascript:void(0)"
                className="page-link"
              >
                {pageid}
              </a>
            </li>
          );
          if (pageid === currentPage + 2) {
            paginations.push(
              <li key="next" className="paginate_button page-item next">
                <a
                  onClick={() => {
                    setCurrentPags("next");
                  }}
                  href="javascript:void(0)"
                  className="page-link"
                >
                  Next <i className="ecicon eci-angle-right"></i>
                </a>
              </li>
            );
            return;
          }
        }
      }
    } //end if
  }; //end Pagination
  (() => {
    Pagination();
  })();
  const setCurrentPags = (current) => {
    if (current === "prev")
      setPages({ ...Pages, currentPage: Pages.currentPage - 1 });
    else if (current === "next")
      setPages({ ...Pages, currentPage: Pages.currentPage + 1 });
    else setPages({ ...Pages, currentPage: current });
  };
  //---------------------------END-PAGINATION--------------------------------------------
  //  --------------------------------MESSAGE ERROR-SUCCES---------------------------------
  useEffect(() => {
    if (errorMsg !== "") {
      toast.error(errorMsg);
      dispatch({ type: CLEAR_MESSAGE });
    }
  }, [errorMsg]);
  useEffect(() => {
    if (successMsg === "user created" && successMsg==="account verified")  {
      toast.success(successMsg);
      closeModal();
      dispatch({ type: CLEAR_MESSAGE });
    }
  }, [successMsg]);
  //--------------------------------END-MESSAGE ERROR-SUCCES------------------------------
  //--------------------------------OPEN-MODAL--------------------------------------------
  const openModal = () => {
    document.querySelector("#addUser").classList.add("show");
    document.querySelector("#addUser").style.display = "block";
  };
  const closeModal = () => {
    document.querySelector("#addUser").classList.add("show");
    document.querySelector("#addUser").style.display = "none";
  };
  //--------------------------------END-MODAL----------------------------------------------
  //---------------------------------SUSPENDED---------------------------------------------
  const suspendAcount = (id, condition) => {
    let isAccountSuspended = false;
    if (condition) {
      isAccountSuspended = true;
    }
    dispatch(suspendedUser(id, { isAccountSuspended }, Authorization));
  };

  const changeRule = (id, rule) => {

    dispatch(Edit_Rule(id, { rule }, Authorization));
  }


  //---------------------------END-SUSPENDED--------------------------------------------
  //---------------------------VERIFIED-EMAIL--------------------------------------------
  const emailVerified = (id) => {
    dispatch(emailVerifiedUser(id, Authorization));
  };
  //--------------------------END-VERIFIED-EMAIL--------------------------------------

  //---------------------------FORMIK----------------------------------------------
  const initialValues = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmpassword: "",
    country: "",
    city: "",
    address: "",
    phone: "",
  };
  const onSubmit = (values) => {
    //-----------------ADD-USER----------------
    dispatch(add_User(values, Authorization));
  };
  const userValidator = yup.object().shape({
    firstname: yup.string().required("firstname field is required"),
    lastname: yup.string().required("lastname field is required"),
    email: yup
      .string()
      .required("email field is required")
      .email("email must be email"),
    address: yup.string().required("address field is required"),
    country: yup.string().required("country field is required"),
    city: yup.string().required("city field is required"),
    password: yup.string().required("password field is required"),
    confirmpassword: yup
      .string()
      .required("confirm password field is required")
      .test(
        "confirmpassword",
        "confirm password must be the same as password",
        function (value) {
          return this.parent.password === value;
        }
      ),
  });
  //---------------------------END-FORMIK----------------------------------------------
  //---------------------------SEARCH----------------------------------------------
  // const [searchTerm, setSearchTerm] = useState("");
  // const handleChange = (event) => {
  //   setSearchTerm(event.target.value);
  // };
  // const results = !searchTerm
  //   ? Users
  //   : Users.filter((user) =>
  //       user.firstname.toString().toLowerCase().includes(searchTerm.toLocaleLowerCase())
  //     );
  //-----------------------------
  //---------------------------END-SEARCH-----------------------------------------------

  //-------------------------------UPLOAD-IMAGE--------------------------------------

  return (
    <Fragment>
      {/* CONTENT WRAPPER */}
      <div className="ec-content-wrapper">
        <div className="content">
          <Breadcrumb name="Users" btn={true}>
            <a
              href="javascript:void(0);"
              className="btn btn-primary"
              onClick={openModal}
            >
              Add
            </a>
          </Breadcrumb>
          <div className="row">
            <div className="col-12">
              <div className="ec-vendor-list card card-default">
                <div className="card-body">
                  <div className="table-responsive">
                    <div
                      id="responsive-data-table_wrapper"
                      className="dataTables_wrapper dt-bootstrap5 no-footer"
                    >
                      <div className="row justify-content-between top-information">
                        <div
                          className="dataTables_length"
                          id="responsive-data-table_length"
                        >
                          <label>
                            Show{" "}
                            <select
                              name="responsive-data-table_length"
                              aria-controls="responsive-data-table"
                              className="form-select form-select-sm"
                              value={filter.limit}
                              onChange={setLimit}
                            >
                              <option value={10}>10</option>
                              <option value={20}>20</option>
                              <option value={30}>30</option>
                              <option value={50}>50</option>
                              <option value={75}>75</option>
                              <option value={-1}>All</option>
                            </select>
                            entries
                          </label>
                        </div>
                        <div
                          id="responsive-data-table_filter"
                          className="dataTables_filter"
                        >
                          <label>
                            Search:
                            <input
                              type="search"
                              className="form-control form-control-sm"
                              aria-controls="responsive-data-table"
                              // value={searchTerm}
                              // onChange={handleChange}
                              onChange={setQuery}
                            />
                          </label>
                        </div>
                      </div>
                      <table
                        id="responsive-data-table"
                        className="table dataTable no-footer"
                        aria-describedby="responsive-data-table_info"
                      >
                        <thead>
                          <tr>
                            <th
                              className="sorting sorting_asc"
                              tabIndex={0}
                              aria-controls="responsive-data-table"
                              rowSpan={1}
                              colSpan={1}
                              aria-sort="ascending"
                              aria-label="Profile: activate to sort column descending"
                              style={{ width: "53.5938px" }}
                            >
                              Profile
                            </th>
                            <th
                              className="sorting"
                              tabIndex={0}
                              aria-controls="responsive-data-table"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="Name: activate to sort column ascending"
                              style={{ width: "82.9688px" }}
                            >
                              First Name
                            </th>
                            <th
                              className="sorting"
                              tabIndex={0}
                              aria-controls="responsive-data-table"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="Name: activate to sort column ascending"
                              style={{ width: "82.9688px" }}
                            >
                              Last Name
                            </th>
                            <th
                              className="sorting"
                              tabIndex={0}
                              aria-controls="responsive-data-table"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="Email: activate to sort column ascending"
                              style={{ width: "170.344px" }}
                            >
                              Email
                            </th>
                            <th
                              className="sorting"
                              tabIndex={0}
                              aria-controls="responsive-data-table"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="Phone: activate to sort column ascending"
                              style={{ width: "115.109px" }}
                            >
                              Phone
                            </th>
                            <th
                              className="sorting"
                              tabIndex={0}
                              aria-controls="responsive-data-table"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="Action: activate to sort column ascending"
                              style={{ width: "70.9531px" }}
                            >
                              Suspended
                            </th>
                            <th
                              className="sorting"
                              tabIndex={0}
                              aria-controls="responsive-data-table"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="Total Buy: activate to sort column ascending"
                              style={{ width: "74.7031px" }}
                            >
                              Rule
                            </th>
                            <th
                              className="sorting"
                              tabIndex={0}
                              aria-controls="responsive-data-table"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="Status: activate to sort column ascending"
                              style={{ width: "53.6094px" }}
                            >
                              Verified
                            </th>
                            <th
                              className="sorting"
                              tabIndex={0}
                              aria-controls="responsive-data-table"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="Join On: activate to sort column ascending"
                              style={{ width: "64.125px" }}
                            >
                              Join On
                            </th>
                            <th
                              className="sorting"
                              tabIndex={0}
                              aria-controls="responsive-data-table"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="Action: activate to sort column ascending"
                              style={{ width: "70.9531px" }}
                            >
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {Users &&
                            Users.length > 0 &&
                            Users.map((user) => (
                              <tr className="odd" key={user._id}>
                                <td className="sorting_1">
                                  <img
                                    className="vendor-thumb"
                                    // src="/assets/assets/img/vendor/u1.jpg"
                                    alt="user profile"
                                    src={ImageVIEW(user.image)}
                                  />
                                </td>
                                <td>{user.firstname} </td>
                                <td>{user.lastname} </td>
                                <td>{user.email} </td>
                                <td>{user.phone}</td>
                                <td>
                                  <div className="btn-group mb-1">
                                    <button
                                      type="button"
                                      className="btn btn-outline-success"
                                    >
                                      {user.isAccountSuspended ? "yes" : "no"}
                                    </button>
                                    <button
                                      type="button"
                                      className="btn btn-outline-success dropdown-toggle dropdown-toggle-split"
                                      data-bs-toggle="dropdown"
                                      aria-haspopup="true"
                                      aria-expanded="false"
                                      data-display="static"
                                    >
                                      <span className="sr-only">Info</span>
                                    </button>
                                    <div className="dropdown-menu">
                                      <a
                                        className="dropdown-item"
                                        href="javascript:void(0)"
                                        onClick={() => {
                                          suspendAcount(user._id, true);
                                        }}
                                      >
                                        Yes
                                      </a>
                                      <a
                                        className="dropdown-item"
                                        href="javascript:void(0)"
                                        onClick={() => {
                                          suspendAcount(user._id, false);
                                        }}
                                      >
                                        No
                                      </a>
                                    </div>
                                  </div>
                                </td>
                               
                               
                                <td>
                                  <div className="btn-group mb-1">
                                    <button
                                      type="button"
                                      className="btn btn-outline-success"
                                    >
                                      {user.rule}
                                    </button>
                                    <button
                                      type="button"
                                      className="btn btn-outline-success dropdown-toggle dropdown-toggle-split"
                                      data-bs-toggle="dropdown"
                                      aria-haspopup="true"
                                      aria-expanded="false"
                                      data-display="static"
                                    >
                                      <span className="sr-only">Info</span>
                                    </button>
                                    <div className="dropdown-menu">
                                      <a
                                        className="dropdown-item"
                                        href="javascript:void(0)"
                                        onClick={() => {
                                          changeRule(user._id, "admin");
                                        }}
                                      >
                                        admin
                                      </a>
                                      <a
                                        className="dropdown-item"
                                        href="javascript:void(0)"
                                        onClick={() => {
                                          changeRule(user._id, "user");
                                        }}
                                      >
                                        user
                                      </a>
                                    </div>
                                  </div>
                                </td>
                               
                               
                                <td>
                                  <div className="btn-group mb-1">
                                    <button
                                      type="button"
                                      className="btn btn-outline-success"
                                    >
                                      {user.isEmailVerified ? "yes" : "no"}
                                    </button>
                                    <button
                                      type="button"
                                      className="btn btn-outline-success dropdown-toggle dropdown-toggle-split"
                                      data-bs-toggle="dropdown"
                                      aria-haspopup="true"
                                      aria-expanded="false"
                                      data-display="static"
                                    >
                                      <span className="sr-only">Info</span>
                                    </button>
                                    <div className="dropdown-menu">
                                      <a
                                        href="javascript:void(0)"
                                        className="dropdown-item"
                                        onClick={() => {
                                          emailVerified(user._id);
                                        }}
                                      >
                                        yes
                                      </a>
                                  
                                    </div>
                                  </div>
                                </td>
                                <td>
                                  {moment(user.createdAt).format("DD-MM-YYYY")}
                                </td>
                                <td>
                                  <div className="btn-group mb-1">
                                    <button
                                      type="button"
                                      className="btn btn-outline-success"
                                    >
                                      Info
                                    </button>
                                    <button
                                      type="button"
                                      className="btn btn-outline-success dropdown-toggle dropdown-toggle-split"
                                      data-bs-toggle="dropdown"
                                      aria-haspopup="true"
                                      aria-expanded="false"
                                      data-display="static"
                                    >
                                      <span className="sr-only">Info</span>
                                    </button>
                                    <div className="dropdown-menu">
                                      <Link
                                        className="dropdown-item"
                                        to={`/user-profile/${user._id}`}
                                      >
                                        Edit
                                      </Link>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                      <div className="row justify-content-between bottom-information">
                        <div
                          className="dataTables_info"
                          id="responsive-data-table_info"
                          role="status"
                          aria-live="polite"
                        >
                          Showing
                          {filter.limit * Pages.currentPage -
                            filter.limit +
                            1}{" "}
                          to {filter.limit * Pages.currentPage} of {count}{" "}
                          entries
                        </div>
                        <div
                          className="dataTables_paginate paging_simple_numbers"
                          id="responsive-data-table_paginate"
                        >
                          <ul className="pagination">{paginations}</ul>
                        </div>
                      </div>
                      <div className="clear" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* --------------------------------------------------------------------- */}
          <div
            className="modal fade modal-add-contact"
            id="addUser"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="exampleModalCenterTitle"
            aria-modal="true"
            style={{ paddingLeft: "0px" }}
          >
            <div
              className="modal-dialog modal-dialog-centered modal-lg"
              role="document"
            >
              <div className="modal-content">
                {
                  <Formik
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                    enableReinitialize={true}
                    validateOnMount={true}
                    validationSchema={userValidator}
                  >
                    {({ touched, errors }) => (
                      <Form action="#" method="post">
                        <div className="modal-header px-4">
                          <h5
                            className="modal-title"
                            id="exampleModalCenterTitle"
                          >
                            Add New User
                          </h5>
                        </div>

                        <div className="modal-body px-4">
                          {/* <div className="form-group row mb-6">
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
                                  required=""
                                 
                                  accept=".png, .jpg, .jpeg"
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
                          </div> */}

                          <div className="row mb-2">
                            <div className="col-lg-6">
                              <div className="form-group">
                                <label htmlFor="firstName">
                                  First name (*)
                                </label>
                                <Field
                                  type="text"
                                  className="form-control"
                                  id="firstName"
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
                                <label htmlFor="lastName">Last name (*)</label>
                                <Field
                                  type="text"
                                  className="form-control"
                                  id="lastName"
                                  name="lastname"
                                />
                                <small
                                  className="input-error"
                                  style={{
                                    display: errors.lastname ? "block" : "none",
                                  }}
                                >
                                  {touched.lastname && errors.lastname}
                                </small>
                              </div>
                            </div>

                            <div className="col-lg-6">
                              <div className="form-group mb-4">
                                <label htmlFor="email">Email (*)</label>
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
                            </div>
                            <div className="col-lg-6">
                              <div className="form-group mb-4">
                                <label htmlFor="phone">phone</label>
                                <Field
                                  type="tel"
                                  className="form-control"
                                  id="phone"
                                  name="phone"
                                />
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="form-group mb-4">
                                <label htmlFor="phone">Password (*)</label>
                                <Field
                                  type="password"
                                  className="form-control"
                                  id="password"
                                  name="password"
                                  autoComplete="off"
                                />
                                <small
                                  className="input-error"
                                  style={{
                                    display: errors.password ? "block" : "none",
                                  }}
                                >
                                  {touched.password && errors.password}
                                </small>
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="form-group mb-4">
                                <label htmlFor="phone">
                                  Confirm Password (*)
                                </label>
                                <Field
                                  type="password"
                                  className="form-control"
                                  id="confirmpassword"
                                  name="confirmpassword"
                                  autoComplete="off"
                                />
                                <small
                                  className="input-error"
                                  style={{
                                    display: errors.confirmpassword
                                      ? "block"
                                      : "none",
                                  }}
                                >
                                  {touched.confirmpassword &&
                                    errors.confirmpassword}
                                </small>
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="form-group">
                                <label htmlFor="address">Address (*)</label>
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
                            </div>
                            <div className="col-lg-6">
                              <div className="form-group mb-4">
                                <label htmlFor="phone">Country (*)</label>
                                <Field
                                  type="text"
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
                            </div>
                            <div className="col-lg-6">
                              <div className="form-group mb-4">
                                <label htmlFor="phone">City (*)</label>
                                <Field
                                  type="text"
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
                            </div>
                            {/* <div className="col-lg-6">
                        <div className="form-group mb-4">
                          <label htmlFor="event">Address</label>
                          <input
                            type="text"
                            className="form-control"
                            id="event"
                          />
                        </div>
                      </div> */}
                          </div>
                        </div>

                        <div className="modal-footer px-4">
                          <button
                            type="button"
                            className="btn btn-secondary btn-pill"
                            onClick={closeModal}
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="btn btn-primary btn-pill"
                            disabled={loading}
                          >
                            Save Contact
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
        {/* --------------------------------------------------------------------- */}
      </div>
    </Fragment>
  );
};

export default Users;