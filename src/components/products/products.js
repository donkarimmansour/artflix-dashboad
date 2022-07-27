import React, { Fragment, useEffect, useState } from "react"
import { get_products, get_count, duplicate_product, delete_product} from "../../redux/actions/products";
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


const Products = () => {
 
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const [Pages, setPages] = useState({ pages: ["", "", ""], currentPage: 1 })
  const [filter, setFilter] = useState({ sort: JSON.stringify({ updatedAt: -1 }), limit: 20, skip: 0, filter: JSON.stringify({ name: { $ne: "karimmansour" } }) })

  const { products, count } = useSelector(state => state.products)
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
    dispatch(get_count({ filter: filter.filter }))
    dispatch(get_products({ ...filter, skip }))

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

  const duplicatePROD = (product) => {
   dispatch(duplicate_product(product, authorization))
  }

  const deletePROD = (id) => {
      dispatch(delete_product( id, authorization))
  }

  const setLimit = (e) => {
    setFilter({ ...filter, limit: parseInt(e.target.value) })
  }

  const setQuery = (e) => {
    setFilter({ ...filter, filter: JSON.stringify({ name: { $regex: e.target.value, $options: 'i' } }) })
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


  return (
    <Fragment>

      {/* CONTENT WRAPPER */}
      <div className="ec-content-wrapper">
        <div className="content">


          <Breadcrumb name="Products" btn={true}>
            <Link to="/add-product" className="btn btn-primary">Add</Link>
          </Breadcrumb>

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
                            <th className="sorting sorting_asc" tabIndex={0} aria-controls="responsive-data-table" rowSpan={1} colSpan={1} aria-sort="ascending" aria-label="Product: activate to sort column descending" style={{ width: '67.5156px' }}>Image</th>
                            <th className="sorting" tabIndex={0} aria-controls="responsive-data-table" rowSpan={1} colSpan={1} aria-label="Name: activate to sort column ascending" style={{ width: '147.094px' }}>Name</th>
                            <th className="sorting" tabIndex={0} aria-controls="responsive-data-table" rowSpan={1} colSpan={1} aria-label="Price: activate to sort column ascending" style={{ width: '47px' }}>Price</th>
                            <th className="sorting" tabIndex={0} aria-controls="responsive-data-table" rowSpan={1} colSpan={1} aria-label="Stock: activate to sort column ascending" style={{ width: '50.8906px' }}>Stock</th>
                            <th className="sorting" tabIndex={0} aria-controls="responsive-data-table" rowSpan={1} colSpan={1} aria-label="Date: activate to sort column ascending" style={{ width: '66.75px' }}>limited Att</th>
                            <th className="sorting" tabIndex={0} aria-controls="responsive-data-table" rowSpan={1} colSpan={1} aria-label="Date: activate to sort column ascending" style={{ width: '66.75px' }}>updated Att</th>
                            <th className="sorting" tabIndex={0} aria-controls="responsive-data-table" rowSpan={1} colSpan={1} aria-label="Action: activate to sort column ascending" style={{ width: '75.3438px' }}>Action</th>
                          </tr>
                        </thead>
                        <tbody>


                          {products && products.length > 0 &&

                            products.map((product, productI) => {
                              return (
                                <tr key={productI} className="odd">
                                  <td className="sorting_1"><img className="tbl-thumb" src={ImageVIEW(product.images[0])} alt="Product Image" /></td>

                                  <td>{product.name}</td>
                                  <td>${product.price}</td>
                                  <td>{product.stock}</td>
                                  <td>{moment(product.limitedAtt).format("DD/MM/YYYY")}</td>
                                  <td>{moment(product.updatedAt).format("DD/MM/YYYY")}</td>

                                  <td>
                                    <div className="btn-group">
                                      <button type="button" className="btn btn-outline-success">Info</button>
                                      <button type="button" className="btn btn-outline-success dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-display="static">
                                        <span className="sr-only">Info</span>
                                      </button>
                                      <div className="dropdown-menu">

                                        <Link className="dropdown-item" to={`/edit-product/${product._id}`}>Edit</Link>
                                        <Link className="dropdown-item" to={`/view-product/${product._id}`}>view</Link>
                                        <a className="dropdown-item" href="javascript:void(0);" onClick={() => { deletePROD(product._id) }}>Delete</a>
                                        <a className="dropdown-item" href="javascript:void(0);" onClick={() => { duplicatePROD(product) }}>duplicate</a>


                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              )
                            })}





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

export default Products;
