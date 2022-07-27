import React, { Fragment, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Link , useNavigate} from "react-router-dom"
import { isAuthentication, Logout } from "../redux/actions/auth";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { ImageVIEW } from "../shared/funs";

const Header = () => {

    const { isAuth, user } = useSelector((state) => state.auth);
toast.configure();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(isAuthentication());
    }, [dispatch]);
    
    useEffect(() => {
      if (!isAuth) {
        navigate("/login");
      }
    }, [isAuth]);

    const toggleMenu = e => {
        if (document.querySelector("body").className.includes("sidebar-minified-out")) {
            document.querySelector("body").classList.remove("sidebar-minified-out")
            document.querySelector("body").classList.add("sidebar-minified")
        }
        else if (!document.querySelector("body").className.includes("sidebar-minified-out")) { 
            document.querySelector("body").classList.remove("sidebar-minified")
            document.querySelector("body").classList.add("sidebar-minified-out")
        }
    } 

    const openPanel = e => {
       
            document.querySelector(".ec-tools-sidebar-overlay").style.display = "block"
            document.querySelector(".right-sidebar-container-2").classList.add("right-sidebar-2-visible")
    
    } 


    return (

        <Fragment>


    
                    {/* Header */}
                    <header className="ec-main-header" id="header">
                        <nav className="navbar navbar-static-top navbar-expand-lg">
                            {/* Sidebar toggle button */}
                            <button id="sidebar-toggler" className="sidebar-toggle" onClick={toggleMenu}/>

                            {/* search form */}
                            <div className="search-form d-lg-inline-block">
                            </div>

                            {/* navbar right */}
                            <div className="navbar-right">
                                <ul className="nav navbar-nav">
                                    {/* User Account */}
                                    <li className="dropdown user-menu">
                                        <button className="dropdown-toggle nav-link ec-drop" data-bs-toggle="dropdown" aria-expanded="false">
                                            <img src={ImageVIEW(user.image)} className="user-image" alt="User avatar" />
                                        </button>
                                        <ul className="dropdown-menu dropdown-menu-right ec-dropdown-menu">
                                            {/* User image */}
                                            <li className="dropdown-header">
                                              
                                                <img src={ImageVIEW(user.image)} className="img-circle" alt="User avatar" />
                                    
                                    
                                                <div className="d-inline-block">
                                                    {`${user.firstname} ${user.lastname}`}
                                                    <small className="pt-1">{`${user.email}`}</small>
                                                </div>


                                            </li>
                                            <li>
                                                <Link to="/profile">
                                                    <i className="mdi mdi-account" /> My Profile
                                                </Link>
                                            </li>
                                      
                                            <li className="dropdown-footer" onClick={() => {
                                                dispatch(Logout(() => {
                                                    navigate("/login")
                                                }))
                                            }}>
                                                <a href="javascript:void(0);" > <i className="mdi mdi-logout" /> Log Out </a>
                                            </li>
                                        </ul>
                                    </li>
                                     {/* <li className="right-sidebar-in right-sidebar-2-menu">
                                        <i className="mdi mdi-settings-outline mdi-spin" onClick={openPanel}/>
                                    </li> */}
                                </ul>
                            </div>
                        </nav>
                    </header>
                   
                   
                   
         


        </Fragment>



    );
}
export default Header;