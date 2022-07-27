import React, { Fragment, lazy, Suspense } from "react"
import Header from "../header";
import Sidbar from "../sidbar";
import { Route, Routes } from 'react-router-dom';
import Footer from "../footer";
import IndexPage from "../indexPage";
import Panel from "../stuff/panel";
import Error404 from "../pages/error404"; 
const Contact = lazy(() => import("../contact/contact"));
const Subscribe = lazy(() => import("../subscribe/subscribe"));
const Main = lazy(() => import("../main/main"));
const MainCategory = lazy(() => import("../caty/mainCategory"));
const SubCategory = lazy(() => import("../caty/subCategory"));
const SingleProduct = lazy(() => import("../products/singleProduct")) ;
const EditProduct = lazy(() => import("../products/editProduct")) ;
const EditSlider = lazy(() => import("../main/editSlider")) ;
const Orders = lazy(() => import("../orders/orders")) ;
const ViewOrder = lazy(() => import("../orders/viewOrder")) ;
const Users = lazy(() => import("../user/users")) ;
const Profile = lazy(() => import("../user/profile")) ;
const UserProfile = lazy(() => import("../user/userProfile")) ;
const Products = lazy(() => import("../products/products")) ;


const Home = () => {

    return (

        <Fragment>
            <Panel />

            <div className="wrapper">

                <Sidbar/>
               {/* PAGE WRAPPER */}
                <div className="ec-page-wrapper">
                    {/* Header */}
                    <Header/>

                    <Routes>
                        <Route path="/orders" element={<Suspense fallback={<IndexPage />}><Orders /></Suspense>} />
                        <Route path="/orders/:orderid/:productid" element={<Suspense fallback={<IndexPage />}><ViewOrder /></Suspense>} />

                        <Route path="/users" element={<Suspense fallback={<IndexPage />}><Users /></Suspense>} />

                        <Route path="/user-profile/:id" element={<Suspense fallback={<IndexPage />}><UserProfile /></Suspense>} />
                        <Route path="/profile" element={<Suspense fallback={<IndexPage />}><Profile /></Suspense>} />
                        <Route path="/products" element={<Suspense fallback={<IndexPage />}><Products /></Suspense>} />
                        <Route path="/view-product/:id" element={<Suspense fallback={<IndexPage />}><SingleProduct /></Suspense>} />
                        <Route path="/main-category" element={<Suspense fallback={<IndexPage />}><MainCategory /></Suspense>} />
                        <Route path="/main-category/:id" element={<Suspense fallback={<IndexPage />}><MainCategory /></Suspense>} />
                        <Route path="/sub-category/:id" element={<Suspense fallback={<IndexPage />}><SubCategory /></Suspense>} />
                        <Route path="/sub-category" element={<Suspense fallback={<IndexPage />}><SubCategory /></Suspense>} />
                        <Route path="/main" element={<Suspense fallback={<IndexPage />}><Main /></Suspense>} />
                        <Route path="/edit-mn/:id" element={<Suspense fallback={<IndexPage />}><EditSlider /></Suspense>} />
                        <Route path="/add-mn" element={<Suspense fallback={<IndexPage />}><EditSlider /></Suspense>} />

                        <Route path="/edit-product/:id" element={<Suspense fallback={<IndexPage />}><EditProduct /></Suspense>} />
                        <Route path="/add-product/:id" element={<Suspense fallback={<IndexPage />}><EditProduct /></Suspense>} />
                        <Route path="/add-product" element={<Suspense fallback={<IndexPage />}><EditProduct /></Suspense>} />
                        <Route path="/contact" element={<Suspense fallback={<IndexPage />}><Contact /></Suspense>} />
                        <Route path="/subscribe" element={<Suspense fallback={<IndexPage />}><Subscribe /></Suspense>} />
                      
                        <Route path="/" element={<Suspense fallback={<IndexPage />}><Users /></Suspense>} />
                        <Route path="/*" element={<Error404 />} />
                    </Routes>


                    {/* Footer */}
                    <Footer/>

                </div> {/* End Page Wrapper */}
            </div>


        </Fragment>



    );
}
export default Home;