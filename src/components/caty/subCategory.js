import React, { useEffect, useState } from "react"
import { loader } from '../../shared/elements';
import myClassNames from 'classnames';
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isAuthentication } from "../../redux/actions/auth"
import { count_categories, create_category, delete_category, duplicate_category, edit_category, get_category, get_sub_categories } from "../../redux/actions/categories";
import Breadcrumb from "../stuff/breadcrumb";
import * as yup from 'yup'
import { Field, Formik, Form } from "formik"
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { CLEAR_MESSAGE } from "../../redux/constans/message";
import { COUNT_SUB_CATEGORY, CREATE_SUB_CATEGORY, DELETE_SUB_CATEGORY, DUPLICATE_SUB_CATEGORY, EDIT_SUB_CATEGORY, GET_CATEGORY, GET_SUB_CATEGORIES, GET_SUB_CATEGORIES_PARENTS } from "../../redux/constans/categories"


const SubCategory = () => {
  
    const navigate = useNavigate();
    const params = useParams();
    const dispatch = useDispatch()
   
    const [Pages, setPages] = useState({ pages: ["", "", ""], currentPage: 1 })
    const [filter, setFilter] = useState({ sort: JSON.stringify({ updatedAt: -1 }), expend: "parentcategory", limit: 20, skip: 0, filter: JSON.stringify({ parentcategory: { $ne: null } }) })
   
    const { sub_categories, category, sub_count, sub_parents_categories } = useSelector(state => state.categories)
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
        dispatch(count_categories(COUNT_SUB_CATEGORY, { filter: filter.filter }, authorization))
        dispatch(get_sub_categories(GET_SUB_CATEGORIES, { ...filter, skip }))
    }, [dispatch, filter])
   
    useEffect(() => {
        dispatch(get_sub_categories(GET_SUB_CATEGORIES_PARENTS, { filter: JSON.stringify({ parentcategory: { $eq: null } }) }))
        if (params.id && params.id !== "") {
            dispatch(get_category(GET_CATEGORY, { filter: JSON.stringify({ _id: params.id }) }))
        }
    }, [params])
 
    useEffect(() => {
        if (category && category.name)
            setInitialValues(category)
    }, [category])
  
    useEffect(() => {
        if (errorMsg !== "") {
            toast.error(errorMsg)
            dispatch({ type: CLEAR_MESSAGE });
        }
    }, [errorMsg]);
    
    useEffect(() => {
        setPages((Pages) => {
            Pages.pages.length = Math.ceil(sub_count / filter.limit)
            Pages.pages.fill("page")
            return { ...Pages, pages: Pages.pages }
        })
    }, [sub_count])

    const duplicateCaty = (category) => {
        dispatch(duplicate_category(DUPLICATE_SUB_CATEGORY, category, authorization))
    }

    const deleteCaty = (id) => {
        dispatch(delete_category(DELETE_SUB_CATEGORY, id, authorization))
    }

    const setLimit = (e) => {
        setFilter({ ...filter, limit: parseInt(e.target.value) })
    }

    const setQuery = (e) => {
        setFilter({ ...filter, filter: JSON.stringify({ name: { $regex: e.target.value, $options: 'i' }, parentcategory: { $ne: null } }) })
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

    const [initialValues, setInitialValues] = useState({
        name: "",
        shortDescription: "",
        fullDescription: "",
        parentcategory: "",
    })

    const onSubmit = values => {
        if (params.id && params.id !== "") {
            dispatch(edit_category(EDIT_SUB_CATEGORY, params.id, values, authorization))
        } else {
            dispatch(create_category(CREATE_SUB_CATEGORY, values, authorization))
        }
    }

    const MainCatyValidator = yup.object().shape({
        name: yup.string().required("name field is required"),
        shortDescription: yup.string().required("short Description field is required"),
        fullDescription: yup.string().required("full Description field is required"),
        parentcategory: yup.string().required("parent category field is required"),
    })

    return (
        // <!-- Ec Shop page -->
        <div className="ec-content-wrapper">
            <div className="content">
                <Breadcrumb name="Sub Categories" />
                {loading && loader()}
                <div className="row">
                    <div className="col-xl-4 col-lg-12">
                        <div className="ec-cat-list card card-default mb-24px">
                            <div className="card-body">
                                <div className="ec-cat-form">
                                    <h4>{(params.id && params.id !== "") ? "Edit Category" : "Add New Category"}</h4>
                                    {
                                        <Formik
                                            initialValues={initialValues}
                                            onSubmit={onSubmit}
                                            enableReinitialize={true}
                                            validateOnMount={true}
                                            validationSchema={MainCatyValidator}>
                                            {
                                                ({ touched, errors }) => (
                                                    <Form action="#" method="post">
                                                        <div className="form-group row">
                                                            <label htmlFor="text" className="col-12 col-form-label">Name</label>
                                                            <div className="col-12">
                                                                <Field name="name" className="form-control here slug-title" type="text" />
                                                                <small className="input-error" style={{ display: errors.name ? "block" : "none" }} >{touched.name && errors.name}</small>
                                                            </div>
                                                        </div>
                                                        <div className="form-group row">
                                                            <label className="col-12 col-form-label">Sort Description</label>
                                                            <div className="col-12">
                                                                <Field as="textarea" name="shortDescription" cols={40} rows={2} className="form-control" />
                                                                <small className="input-error" style={{ display: errors.shortDescription ? "block" : "none" }} >{touched.shortDescription && errors.shortDescription}</small>
                                                            </div>
                                                        </div>
                                                        <div className="form-group row">
                                                            <label className="col-12 col-form-label">Full Description</label>
                                                            <div className="col-12">
                                                                <Field as="textarea" name="fullDescription" cols={40} rows={4} className="form-control" />
                                                                <small className="input-error" style={{ display: errors.fullDescription ? "block" : "none" }} >{touched.fullDescription && errors.fullDescription}</small>
                                                            </div>
                                                        </div>
                                                        <div className="form-group row">
                                                            <label htmlFor="parent-category" className="col-12 col-form-label">Parent Category</label>
                                                            <div className="col-12">
                                                                <Field as="select" name="parentcategory" className="custom-select">
                                                                <option  value="....">...</option>
                                                                    {
                                                                        sub_parents_categories && sub_parents_categories.length > 0 &&
                                                                         sub_parents_categories.map((pcaty, pcayi) => {
                                                                            return (
                                                                                <option key={pcayi} value={pcaty._id}>{pcaty.name}</option>
                                                                            )
                                                                        })
                                                                    }
                                                                </Field>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-12">
                                                                <button name="submit" disabled={(loading)} type="submit" className="btn btn-primary">Submit</button>
                                                            </div>
                                                        </div>
                                                    </Form>
                                                )
                                            }
                                        </Formik>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-8 col-lg-12">
                        <div className="ec-cat-list card card-default">
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
                                        <table id="responsive-data-table" className="table dataTable no-footer" aria-describedby="responsive-data-table_info">
                                            <thead>
                                                <tr>
                                                    <th className="sorting" tabIndex={0} aria-controls="responsive-data-table" rowSpan={1} colSpan={1} aria-label="Name: activate to sort column ascending" style={{ width: '44.5312px' }}>Name</th>
                                                    <th className="sorting" tabIndex={0} aria-controls="responsive-data-table" rowSpan={1} colSpan={1} aria-label="Sub Categories: activate to sort column ascending" style={{ width: '68.0312px' }}>Main Category</th>
                                                    <th className="sorting" tabIndex={0} aria-controls="responsive-data-table" rowSpan={1} colSpan={1} aria-label="Action: activate to sort column ascending" style={{ width: '55.6719px' }}>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {sub_categories && sub_categories.length > 0 &&
                                                    sub_categories.map((category, categoryI) => {
                                                        return (
                                                            <tr key={categoryI} className="odd">
                                                                <td>{category.name}</td>
                                                                <td>
                                                                    <span className="ec-sub-cat-list" >
                                                                        <span className="ec-sub-cat-tag" >
                                                                            <Link to={`/main-category/${category.parentcategory?._id}`}>
                                                                                {category.parentcategory?.name}</Link>
                                                                        </span>
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <div className="btn-group">
                                                                        <button type="button" className="btn btn-outline-success">Info</button>
                                                                        <button type="button" className="btn btn-outline-success dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-display="static">
                                                                            <span className="sr-only">Info</span>
                                                                        </button>
                                                                        <div className="dropdown-menu">
                                                                            <Link className="dropdown-item" to={`/sub-category/${category._id}`}>
                                                                                Edit</Link>
                                                                            <a className="dropdown-item" href="javascript:void(0);" onClick={() => { deleteCaty(category._id) }}>Delete</a>
                                                                            <a className="dropdown-item" href="javascript:void(0);" onClick={() => { duplicateCaty(category) }}>duplicate</a>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })}
                                            </tbody>
                                        </table>
                                        <div className="row justify-content-between bottom-information">
                                            <div className="dataTables_info" id="responsive-data-table_info" role="status" aria-live="polite">Showing {(((filter.limit * Pages.currentPage) - filter.limit) + 1)} to {filter.limit * Pages.currentPage} of {sub_count} entries</div>
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
        </div>
        // <!-- Ec Shop page -->
    );
}
export default SubCategory;