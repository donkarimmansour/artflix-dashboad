import React, { Fragment, useEffect, useState } from "react"
import { get_count, get_orders, set_status  } from "../../redux/actions/orders";
import Breadcrumb from "../stuff/breadcrumb";
import myClassNames from 'classnames';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isAuthentication } from "../../redux/actions/auth"
import { ImageVIEW } from "../../shared/funs";
import moment from "moment";
import { loader } from "../../shared/elements";
import { CLEAR_MESSAGE } from "../../redux/constans/message";
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


const Orders = () => { 

    const navigate = useNavigate();
    const dispatch = useDispatch()
  
    const [Pages, setPages] = useState({ pages: ["", "", ""], currentPage: 1 })
    const [filter, setFilter] = useState({ sort: JSON.stringify({ updatedAt: -1 }), limit: 20  ,  skip: 0, filter: JSON.stringify({ name: { $ne: "karimmansour" } }) })
  
    const { orders , count } = useSelector(state => state.orders)
    const { isAuth, token } = useSelector((state) => state.auth);
    const { loading } = useSelector((state) => state.loading);
    const { errorMsg } = useSelector((state) => state.message);
   
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
      const skip = Pages.currentPage === 1 ? 0 : ((Pages.currentPage - 1) * filter.limit)
      dispatch(get_count({ filter: filter.filter }, authorization))
      dispatch(get_orders({ ...filter, skip } , authorization))
  
    }, [dispatch, filter])
  
   
  
    useEffect(() => {
        if (errorMsg !== "") {
            toast.error(errorMsg)
            dispatch({ type: CLEAR_MESSAGE });
        }
    }, [errorMsg]);
  
    useEffect(() => {
      setPages((Pages) => {
        Pages.pages.length = Math.ceil(count / filter.limit)
        Pages.pages.fill("page")
        return { ...Pages, pages: Pages.pages }
      })
    }, [count])
  
 
    const setLimit = (e) => {
      setFilter({ ...filter, limit: parseInt(e.target.value) })
    }
  
    const setQuery = (e) => {
      setFilter({ ...filter, filter: JSON.stringify({ 
        $or: [
          { "shippingaddress.firstname": { $regex: e.target.value, $options: "i" } }, 
          { "shippingaddress.lastname": { $regex: e.target.value, $options: "i" } }, 
          { orders: { $elemMatch: { name: { $regex: e.target.value, $options: 'i' } } } }
        ] }) })
    }
  
    const paginations = []
    const Pagination = () => {
      const currentPage = Pages.currentPage
      const pagesLength = Pages.pages.length
      if (pagesLength > 0) {
        if (currentPage === 1) {
          for (let pageid = 1; pageid <= pagesLength; pageid++) {
            paginations.push(<li key={pageid} className={myClassNames("paginate_button page-item", { " active": pageid === currentPage })} ><a onClick={() => { setCurrentPags(pageid) }} href="javascript:void(0)" className="page-link">{pageid}</a></li>)
            if (pageid === 3) {
              paginations.push(
                <li key="next" className="paginate_button page-item next"><a onClick={() => { setCurrentPags("next") }} className="page-link" href="javascript:void(0)">Next <i className="ecicon eci-angle-right"></i></a></li>
              )
              return
            }
          }
        }
        else if (pagesLength > 0 && currentPage === pagesLength || currentPage === (pagesLength - 1) || currentPage === (pagesLength - 2)) {
          paginations.push(
            <li key="previews" className="paginate_button page-item previous"><a onClick={() => { setCurrentPags("prev") }} className="page-link" href="javascript:void(0)">Previews <i className="ecicon eci-angle-left"></i></a></li>
          )
          for (let pageid = (pagesLength - 3); pageid <= pagesLength; pageid++) {
            if (pageid > 0) {
              paginations.push(<li key={pageid} className={myClassNames("paginate_button page-item", { "active": pageid === currentPage })}><a onClick={() => { setCurrentPags(pageid) }} href="javascript:void(0)" a className="page-link">{pageid}</a></li>)
            }
          }
        }
        else {
          paginations.push(
            <li key="previews" className="paginate_button page-item previous"><a onClick={() => { setCurrentPags("prev") }} className="page-link" href="javascript:void(0)">Previews <i className="ecicon eci-angle-left"></i></a></li>
          )
          for (let pageid = (currentPage - 1); pageid <= pagesLength; pageid++) {
            paginations.push(<li key={pageid} className={myClassNames("paginate_button page-item", { "active": pageid === currentPage })}><a onClick={() => { setCurrentPags(pageid) }} href="javascript:void(0)" className="page-link">{pageid}</a></li>)
            if (pageid === currentPage + 2) {
              paginations.push(
                <li key="next" className="paginate_button page-item next"><a onClick={() => { setCurrentPags("next") }} href="javascript:void(0)" className="page-link">Next <i className="ecicon eci-angle-right"></i></a></li>
              )
              return
            }
          }
        }
      }//end if
    }//end Pagination
  
    (() => {
      Pagination()
    })()
  
    const setCurrentPags = (current) => {
      if (current === "prev") setPages({ ...Pages, currentPage: Pages.currentPage - 1 })
      else if (current === "next") setPages({ ...Pages, currentPage: Pages.currentPage + 1 })
      else setPages({ ...Pages, currentPage: current })
    }
  

    const changeStatus = (status , orderId , productId) => {
        dispatch(set_status({orderId , productId , status} , authorization))     
    }



    return (
        <Fragment>

            {/* CONTENT WRAPPER */}
            <div className="ec-content-wrapper">
                <div className="content">


                    <Breadcrumb name="Orders" />

                    {loading && loader()}

                    <div className="row">
                        <div className="col-12">
                            <div className="card card-default">
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <div id="responsive-data-table_wrapper" className="dataTables_wrapper dt-bootstrap5 no-footer">
                                          
                                          
                                          <div className="row justify-content-between top-information">

                                                  <div className="dataTables_length" id="responsive-data-table_length">
                                                    <label>
                                                      Show
                                                      <select onChange={setLimit} value={filter.limit} name="responsive-data-table_length" aria-controls="responsive-data-table" className="form-select form-select-sm">
                                                        <option value={20}>20</option>
                                                        <option value={30}>30</option>
                                                        <option value={50}>50</option>
                                                        <option value={75}>75</option>
                                                        <option value={100000}>All</option>
                                                      </select>
                                                      entries
                                                    </label>
                                                  </div>
                                                  <div id="responsive-data-table_filter" className="dataTables_filter">
                                                    <label>Search:<input type="search" className="form-control form-control-sm" aria-controls="responsive-data-table" onChange={setQuery} />
                                                    </label>
                                                  </div>
                                                </div>

                                          <table id="responsive-data-table" className="table dataTable no-footer" style={{ width: '100%' }} aria-describedby="responsive-data-table_info">
                                            <thead>
                                                <tr>
                                                    <th className="sorting" tabIndex={0} aria-controls="responsive-data-table" rowSpan={1} colSpan={1} aria-label="Customer: activate to sort column ascending" style={{ width: '101px' }}>Product</th>
                                                    <th className="sorting" tabIndex={0} aria-controls="responsive-data-table" rowSpan={1} colSpan={1} aria-label="Customer: activate to sort column ascending" style={{ width: '101px' }}>Customer</th>
                                                    <th className="sorting" tabIndex={0} aria-controls="responsive-data-table" rowSpan={1} colSpan={1} aria-label="Items: activate to sort column ascending" style={{ width: '48px' }}>Name</th>
                                                    <th className="sorting" tabIndex={0} aria-controls="responsive-data-table" rowSpan={1} colSpan={1} aria-label="Price: activate to sort column ascending" style={{ width: '44px' }}>Price</th>
                                                    <th className="sorting" tabIndex={0} aria-controls="responsive-data-table" rowSpan={1} colSpan={1} aria-label="Payment: activate to sort column ascending" style={{ width: '71px' }}>Quantity</th>
                                                    <th className="sorting" tabIndex={0} aria-controls="responsive-data-table" rowSpan={1} colSpan={1} aria-label="Payment: activate to sort column ascending" style={{ width: '71px' }}>Color</th>
                                                    <th className="sorting" tabIndex={0} aria-controls="responsive-data-table" rowSpan={1} colSpan={1} aria-label="Payment: activate to sort column ascending" style={{ width: '71px' }}>Size</th>
                                                    <th className="sorting" tabIndex={0} aria-controls="responsive-data-table" rowSpan={1} colSpan={1} aria-label="Payment: activate to sort column ascending" style={{ width: '71px' }}>Shipping</th>
                                                    <th className="sorting" tabIndex={0} aria-controls="responsive-data-table" rowSpan={1} colSpan={1} aria-label="Status: activate to sort column ascending" style={{ width: '77px' }}>Status</th>
                                                    <th className="sorting" tabIndex={0} aria-controls="responsive-data-table" rowSpan={1} colSpan={1} aria-label="Date: activate to sort column ascending" style={{ width: '63px' }}>Date</th>
                                                    <th className="sorting" tabIndex={0} aria-controls="responsive-data-table" rowSpan={1} colSpan={1} aria-label="Action: activate to sort column ascending" style={{ width: '71px' }}>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                                {orders && orders.length > 0 &&

                                                    orders.map((order, oi) => {
                                                        return (
                                                            order.orders.map((ordr, coi) => {console.log(ordr.shipping);
                                                                return (

                                                                    <tr key={coi} className="odd">
                                                                        <td className="sorting_1"><img className="tbl-thumb" src={ImageVIEW(ordr.images[0])} alt="Product Image" /></td>

                                                                        <td>{`${order.shippingaddress.firstname} ${order.shippingaddress.lastname}`}</td>
                                                                        <td>{ordr.name}</td>
                                                                        <td>${ordr.price}</td>
                                                                        <td>{ordr.quantity}</td>
                                                                        <td>{ordr.color}</td>
                                                                        <td>{ordr.size}</td>
                                                                        <td>{`${ordr.shipping.name} ($${ordr.shipping.price})`}</td>

                                                                        <td>
                                                                            <div className="btn-group">
                                                                                <button type="button" className="btn btn-outline-success">{ordr.status}</button>
                                                                                <button type="button" className="btn btn-outline-success dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-display="static">
                                                                                    <span className="sr-only">Info</span>
                                                                                </button>
                                                                                <div className="dropdown-menu">
                                                                                    <a className="dropdown-item" href="javascript:void(2);" onClick={() => {changeStatus("processed" , order._id , ordr.productId)}}>processed</a>
                                                                                    <a className="dropdown-item" href="javascript:void(2);" onClick={() => {changeStatus("designing" , order._id , ordr.productId)}}>designing</a>
                                                                                    <a className="dropdown-item" href="javascript:void(2);" onClick={() => {changeStatus("shipped" , order._id , ordr.productId)}}>shipped</a>
                                                                                    <a className="dropdown-item" href="javascript:void(2);" onClick={() => {changeStatus("enroute" , order._id , ordr.productId)}}>enroute</a>
                                                                                    <a className="dropdown-item" href="javascript:void(2);" onClick={() => {changeStatus("arrived" , order._id , ordr.productId)}}>arrived</a>
                                                                                </div>
                                                                            </div>
                                                                        </td>

                                                                        <td>{moment(ordr.updatedAt).format("DD/MM/YYYY")}</td>

                                                                        <td>
                                                                            <div className="btn-group">
                                                                                <button type="button" className="btn btn-outline-success">Info</button>
                                                                                <button type="button" className="btn btn-outline-success dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-display="static">
                                                                                    <span className="sr-only">Info</span>
                                                                                </button>
                                                                                <div className="dropdown-menu">

                                                                                    <Link className="dropdown-item" to={`/orders/${order._id}/${ordr.productId}`}>view</Link>
                                                                                    {/* <Link className="dropdown-item" to={`/track/${order._id}/${ordr.productId._id}`}>view</Link> */}


                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                    </tr>

                                                                )




                                                            })

                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </table>

                                          <div className="row justify-content-between bottom-information">
                                            <div className="dataTables_info" id="responsive-data-table_info" role="status" aria-live="polite">Showing {(((filter.limit * Pages.currentPage) - filter.limit) + 1)} to {filter.limit * Pages.currentPage} of {count} entries</div>
                                            <div className="dataTables_paginate paging_simple_numbers" id="responsive-data-table_paginate">
                                              <ul className="pagination">
                                                {paginations}
                                              </ul>
                                            </div>
                                          </div>
                                          <div className="clear" />
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                </div> {/* End Content */}
            </div> {/* End Content Wrapper */}


        </Fragment>


    );
}

export default Orders;
