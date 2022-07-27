import React, { Fragment, useEffect, useState } from "react";
import Breadcrumb from "../stuff/breadcrumb";
import { useDispatch, useSelector } from "react-redux";
import { get_count_Subscribe, get_Subscribe } from "../../redux/actions/subscribe";
import moment from "moment";
import { loader } from "../../shared/elements";
import myClassNames from 'classnames';
import { useNavigate } from "react-router";
import { isAuthentication } from "../../redux/actions/auth";

 
const Subscribe = () => {

  const { Sub  , count} = useSelector((state) => state.subscribe);
  const { isAuth, token } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.loading);
  const Authorization = { Authorization: `bearer ${token}` };

  const navigate = useNavigate();
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(isAuthentication());
  }, [dispatch]);

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    } 
  }, [isAuth]);

  const [Pages, setPages] = useState({ pages: ["", "", ""], currentPage: 1 })
  const [filter, setFilter] = useState({ sort: JSON.stringify({ updatedAt: -1 }), limit: 20, skip: 0, filter: JSON.stringify({ name: { $ne: "karimmansour" } }) })

 
 

  useEffect(() => {
    const skip = Pages.currentPage === 1 ? 0 : ((Pages.currentPage - 1) * filter.limit)
    dispatch(get_Subscribe({ ...filter, skip } , Authorization))
    dispatch(get_count_Subscribe({ filter: filter.filter }, Authorization) )

  }, [dispatch, filter])




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
    setFilter({ ...filter, filter: JSON.stringify({ email: { $regex: e.target.value, $options: 'i' } }) })
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



  


  //------------------------------------END-OPEN-MODAL----------------
  return (
    <Fragment>
      {/* CONTENT WRAPPER */}
      <div className="ec-content-wrapper">
        <div className="content">
          <Breadcrumb name="Subscribe" >

          {loading && loader()}

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
                            <select onChange={setLimit}
                              name="responsive-data-table_length"
                              aria-controls="responsive-data-table"
                              className="form-select form-select-sm"
                            >
                              <option value={20}>20</option>
                              <option value={30}>30</option>
                              <option value={50}>50</option>
                              <option value={75}>75</option>
                              <option value={-1}>All</option>
                            </select>{" "}
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
                              type="search"  onChange={setQuery}
                              className="form-control form-control-sm"
                              aria-controls="responsive-data-table"
                            
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
                              aria-label="Action: activate to sort column ascending"
                              style={{ width: "70.9531px" }}
                            >
                              Date
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {Sub &&
                            Sub.length > 0 &&
                            Sub.map((subscr) => (
                              <tr className="odd" key={subscr._id}>
                                <td>{subscr.email} </td>
                                <td>{moment(subscr.createdAt).format("DD-MM-YYYY")}</td>
                                
                              </tr>
                            ))}
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
          </div>

        {/* End Content */}
      </div>{" "}
      {/* End Content Wrapper */}
    </Fragment>
  );
};

export default Subscribe;