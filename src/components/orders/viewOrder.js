import React, { Fragment, useEffect, useState } from "react"
import { get_order } from "../../redux/actions/orders";
import Breadcrumb from "../stuff/breadcrumb";
import myClassNames from 'classnames';
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isAuthentication } from "../../redux/actions/auth"
import { ImageVIEW } from "../../shared/funs";
import moment from "moment";
import { loader } from "../../shared/elements";
import { CLEAR_MESSAGE } from "../../redux/constans/message";
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import myClassname from "classnames";
 

const ViewOrder = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch()
  const params = useParams()

  const { order } = useSelector(state => state.orders)
  const { isAuth, token } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.loading);
  const { errorMsg } = useSelector((state) => state.message);
  const [Status, setStatus] = useState("waiting")
  const [Order, setOrder] = useState({})

  const authorization = { "Authorization": `bearer ${token}` }

  useEffect(() => {
    dispatch(isAuthentication());
  }, [dispatch]);

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, [isAuth]);


  useEffect(() => {

    if (order._id) {
      const index = order.orders.findIndex(o => o.productId === params.productid)
      if (index !== -1) {
        const status = order.orders[index].status
        setStatus(status)
        setOrder(order.orders[index])
      }
    }

  }, [order])



  useEffect(() => {
    dispatch(get_order({ filter: { _id: params.orderid }, expend: "userId" }, authorization))
  }, [dispatch])

  useEffect(() => {

    if (order._id) {
      const index = order.orders.findIndex(o => o.productId === params.productid)
      if (index !== -1) {
        const status = order.orders[index].status
        setOrder(order.orders[index])
        setStatus(status)
      }
    }

  }, [order])

  useEffect(() => {
    if (errorMsg !== "") {
      toast.error(errorMsg)
      dispatch({ type: CLEAR_MESSAGE });
    }
  }, [errorMsg]);



  return (
    <Fragment>

      {/* CONTENT WRAPPER */}
      <div className="ec-content-wrapper">
        <div className="content">


          <Breadcrumb name="Orders" />

          {loading && loader()}

          <div className="row">
            <div className="col-12">
              <div className="ec-odr-dtl card card-default">
                <div className="card-header card-header-border-bottom d-flex justify-content-between">
                  <h2 className="ec-odr">Order Detail<br />
                    <span className="small">Order ID: #{order._id}</span>
                  </h2>
                </div>
                <div className="card-body">
                  {order && order._id &&

                    <div className="row">
                      <div className="col-xl-3 col-lg-6">
                        <address className="info-grid">
                          <div className="info-title"><strong>Customer:</strong></div><br />
                          <div className="info-content">
                            {order.userId.country}<br />
                            {order.userId.city}<br />
                            {order.userId.address}<br />
                            {order.userId.email}<br />
                            {order.userId.firstname}<br />
                            {order.userId.lastname}<br />
                            {order.userId?.postcode}<br />
                            {order.userId?.state}<br />
                            <abbr title="Phone">P:</abbr> {order?.phone}
                          </div>
                        </address>
                      </div>

                      <div className="col-xl-3 col-lg-6">
                        <address className="info-grid">
                          <div className="info-title"><strong>Shipped To:</strong></div><br />
                          <div className="info-content">
                            {order.shippingaddress.country}<br />
                            {order.shippingaddress.city}<br />
                            {order.shippingaddress.address}<br />
                            {order.shippingaddress.email}<br />
                            {order.shippingaddress.firstname}<br />
                            {order.shippingaddress.lastname}<br />
                            {order.shippingaddress?.postcode}<br />
                            {order.shippingaddress?.state}<br />
                            <abbr title="Phone">P:</abbr> {order.shippingaddress?.phone}
                          </div>
                        </address>
                      </div>
                      <div className="col-xl-3 col-lg-6">
                        <address className="info-grid">
                          <div className="info-title"><strong>Donation Cost:</strong></div><br />
                          <div className="info-content">
                            {order.donation}<br />
                          </div>
                        </address>
                      </div>
                      <div className="col-xl-3 col-lg-6">
                        <address className="info-grid">
                          <div className="info-title"><strong>Order Date:</strong></div><br />
                          <div className="info-content">
                            {moment(order.createdAt).format("dd-mm-yyyy")}
                          </div>
                        </address>
                      </div>
                    </div>


                  }
                  <div className="row">
                    <div className="col-md-12">
                      <h3 className="tbl-title">PRODUCT SUMMARY</h3>
                      <div className="table-responsive">
                        <table className="table table-striped o-tbl">
                          <thead>
                            <tr className="line">
                              <td><strong>#</strong></td>
                              <td className="text-center"><strong>IMAGE</strong></td>
                              <td className="text-center"><strong>PRODUCT</strong></td>
                              <td className="text-center"><strong>PRICE/UNIT</strong></td>
                              <td className="text-right"><strong>QUANTITY</strong></td>
                              <td className="text-right"><strong>SHIPPING</strong></td>
                              <td className="text-right"><strong>SUBTOTAL</strong></td>
                            </tr>
                          </thead>
                          <tbody>
                            {order && Order && Order.name &&
                              <tr >
                                <td>1</td>
                                <td><img className="product-img" src={ImageVIEW(Order.images[0])} alt="" /></td>
                                <td><strong>{Order.name}</strong></td>
                                <td className="text-center">${Order.price}</td>
                                <td className="text-center">{Order.quantity}</td>
                                <td className="text-center">{`${Order.shipping.name} ($${Order.shipping.price})`}</td>
                                <td className="text-right">${(Order.price * Order.quantity + Order.shipping.price)}</td>
                              </tr>
                            }




                            {/* <tr>
                              <td colSpan={4} />
                              <td className="text-right"><strong>Taxes</strong></td>
                              <td className="text-right"><strong>N/A</strong></td>
                            </tr>
                            <tr>
                              <td colSpan={4}>
                              </td>
                              <td className="text-right"><strong>Total</strong></td>
                              <td className="text-right"><strong>$2,400.00</strong></td>
                            </tr>
                            <tr>
                              <td colSpan={4}>
                              </td>
                              <td className="text-right"><strong>Payment Status</strong></td>
                              <td className="text-right"><strong>PAID</strong></td>
                            </tr> */}


                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Tracking Detail */}
              <div className="card mt-4 trk-order">
                {/* <div className="p-4 text-center text-white text-lg bg-dark rounded-top">
                  <span className="text-uppercase">Tracking Order No - </span>
                  <span className="text-medium">34VB5540K83</span>
                </div>
                <div className="d-flex flex-wrap flex-sm-nowrap justify-content-between py-3 px-2 bg-secondary">
                  <div className="w-100 text-center py-1 px-2"><span className="text-medium">Shipped
                    Via:</span> UPS Ground</div>
                  <div className="w-100 text-center py-1 px-2"><span className="text-medium">Status:</span>
                    Checking Quality</div>
                  <div className="w-100 text-center py-1 px-2"><span className="text-medium">Expected
                    Date:</span> DEC 09, 2021</div>
                </div> */}

                {order && Status !== "waiting" &&

                  <div className="card-body">
                    <div className="steps d-flex flex-wrap flex-sm-nowrap justify-content-between padding-top-2x padding-bottom-1x">
                      <div className="step completed" className={myClassname("step", { "completed": Status === "processed" || Status === "designing" || Status === "shipped" || Status === "enroute" || Status === "arrived" })}>
                        <div className="step-icon-wrap">
                          <div className="step-icon"><i className="mdi mdi-cart" /></div>
                        </div>
                        <h4 className="step-title">Confirmed Order</h4>
                      </div>
                      <div className="step completed" className={myClassname("step", { "completed": Status === "designing" || Status === "shipped" || Status === "enroute" || Status === "arrived" })}>
                        <div className="step-icon-wrap">
                          <div className="step-icon"><i className="mdi mdi-tumblr-reblog" /></div>
                        </div>
                        <h4 className="step-title">Processing Order</h4>
                      </div>
                      <div className="step completed" className={myClassname("step", { "completed": Status === "shipped" || Status === "enroute" || Status === "arrived" })}>
                        <div className="step-icon-wrap">
                          <div className="step-icon"><i className="mdi mdi-gift" /></div>
                        </div>
                        <h4 className="step-title">Product Dispatched</h4>
                      </div>
                      <div className="step" className={myClassname("step", { "completed": Status === "enroute" || Status === "arrived" })}>
                        <div className="step-icon-wrap">
                          <div className="step-icon"><i className="mdi mdi-truck-delivery" /></div>
                        </div>
                        <h4 className="step-title">On Delivery</h4>
                      </div>
                      <div className="step" className={myClassname("step", { "completed": Status === "arrived" })} >
                        <div className="step-icon-wrap">
                          <div className="step-icon"><i className="mdi mdi-hail" /></div>
                        </div>
                        <h4 className="step-title">Product Delivered</h4>
                      </div>
                    </div>
                  </div>
                }

              </div>
            </div>
          </div>

        </div> {/* End Content */}
      </div> {/* End Content Wrapper */}


    </Fragment>


  );
}

export default ViewOrder;
