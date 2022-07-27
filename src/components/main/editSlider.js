import React, { Fragment, useEffect, useState } from "react"
import {  useParams, useNavigate } from "react-router-dom";
import { create_product, edit_product, get_single_product } from "../../redux/actions/products";
import { useDispatch, useSelector } from "react-redux";
import Breadcrumb from "../stuff/breadcrumb";
import { isAuthentication } from "../../redux/actions/auth";
import * as yup from 'yup'
import { Field, Formik, Form} from "formik"
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { CLEAR_MESSAGE } from "../../redux/constans/message";
import { loader } from "../../shared/elements"; 
import { Create } from "../../services/file";
import { START_LOADING, STOP_LOADING } from "../../redux/constans/loading";
import { ImageVIEW } from "../../shared/funs";
import moment from "moment";
import { create_main, edit_main, get_single_main } from "../../redux/actions/main";

const EditSlider = () => {

    const navigate = useNavigate();
    const params = useParams();
    const dispatch = useDispatch()
    toast.configure()

    const [image, setImage] = useState("");

    const { singlemain } = useSelector(state => state.main)
    const { errorMsg, successMsg } = useSelector((state) => state.message);
    const { isAuth, token } = useSelector((state) => state.auth);
    const { loading } = useSelector((state) => state.loading);

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
        if (singlemain && singlemain.name) {
            setImage(singlemain.image)
            setInitialValues({ ...singlemain})
        }

    }, [singlemain])


    useEffect(() => {
        if (params.id && params.id !== "")
            dispatch(get_single_main({ filter: JSON.stringify({ _id: params.id }) }))
        else  setInitialValues({})

    }, [dispatch, params])

    useEffect(() => {
        if (errorMsg !== "") {
            toast.error(errorMsg)
            dispatch({ type: CLEAR_MESSAGE });
        }
    }, [errorMsg]);

    useEffect(() => {
        if ( ["updated" , "Created"].includes(successMsg) )  {
            toast.success(successMsg)
            dispatch({ type: CLEAR_MESSAGE });
        }
    }, [successMsg]);

    const [initialValues, setInitialValues] = useState({
        name: "",
        description: "",
        extra: "",
        btn: "",
        link: "",
    })

    const mainValidator = yup.object().shape({
        name: yup.string().required("name field is required"),
        description: yup.string().required("description field is required"),
        extra: yup.string().required("extra field is required"),
        btn: yup.string().required("btn field is required"),
        link: yup.string().required("link field is required"),

    })

    const onSubmit = values => {
        if (image === "") {
            toast.error("Choose your photo")
        } else {
            if (params.id && params.id !== "") {
                dispatch(edit_main(params.id , {...values , image} , authorization))
            } else {
                dispatch(create_main({...values , image} , authorization))
            }
        }

    }

    const imageUpload = (e) => {
        const _this = e.target;

            if (_this.files && _this.files[0]) {

                var reader = new FileReader();

                reader.onload = function (evnt) {

                    _this.parentElement.parentElement.querySelector('.ec-image-preview').setAttribute('src', evnt.target.result)

                    const img = e.target.files[0];
                    const formData = new FormData();
                    formData.append('image', img);

                    dispatch({ type: START_LOADING })

                    Create(formData, authorization).then(({ data }) => {

                        if (!data.err) {
                            dispatch({ type: STOP_LOADING })
                            dispatch(edit_main(params.id, {...initialValues , image : data.msg}, authorization))

                            const id = data.msg
                            setImage(id)
                        } else {
                            dispatch({ type: STOP_LOADING })
                            toast.error(typeof data.msg == "string" ? data.msg : data.msg[0])
                        }
                        //  console.log(data);

                    }).catch(err => {
                        console.log("get orders api err ", err);
                        dispatch({ type: STOP_LOADING })
                        toast.error("something went wrong please try again")
                    })



                }

                reader.readAsDataURL(_this.files[0]);
            }

       
    }

    const checkIt = () => {
        if (params.id && params.id !== "") {
            return true
        }
        return false
    }

    return (

        <Fragment>

            <div className="ec-content-wrapper">
                <div className="content"> 


                    <Breadcrumb name="Sliders"></Breadcrumb>
                    {loading && loader()}


                    <div className="row">
                        <div className="col-12">
                            <div className="card card-default">
                                <div className="card-header card-header-border-bottom">
                                    <h2>Add Slider</h2>
                                </div>
                                <div className="card-body">
                                    <div className="row ec-vendor-uploads">
                                        <div className="col-lg-4">
                                            <div className="ec-vendor-img-upload">
                                                <div className="ec-vendor-main-img">
                                                    <div className="avatar-upload">
                                                        <div className="avatar-edit">
                                                            <input disabled={loading} type="file" className="ec-image-upload" accept=".png, .jpg, .jpeg" onChange={imageUpload} />
                                                            <label htmlFor="imageUpload"><img src="/assets/imgs/ws-edit.svg" className="svg_img header_svg" alt="edit" />
                                                            </label>
                                                        </div>
                                                        <div className="avatar-preview ec-preview">
                                                            <div className="imagePreview ec-div-preview">
                                                                <img className="ec-image-preview" src={checkIt() ? ImageVIEW(image) : "/assets/imgs/ws-baner.jpg"} alt="edit" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    
                                             </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-8">
                                            <div className="ec-vendor-upload-detail">

                                                {
                                                    <Formik
                                                        initialValues={initialValues}
                                                        onSubmit={onSubmit}
                                                        enableReinitialize={true}
                                                        validateOnMount={true}
                                                        validationSchema={mainValidator}>
                                                        {
                                                            ({ touched, errors }) => (
                                                                <Form action="#" method="post" className="row g-3">

                                                                    <div className="col-md-6">
                                                                        <label htmlFor="inputEmail4" className="form-label">name</label>
                                                                        <Field type="text" className="form-control slug-title" name="name" />
                                                                        <small className="input-error" style={{ display: errors.name ? "block" : "none" }} >{touched.name && errors.name}</small>

                                                                    </div>

                                                                    <div className="col-md-6">
                                                                        <label htmlFor="inputEmail4" className="form-label">btn</label>
                                                                        <Field type="text" className="form-control slug-title" name="btn" />
                                                                        <small className="input-error" style={{ display: errors.btn ? "block" : "none" }} >{touched.name && errors.name}</small>

                                                                    </div>

                                                                    <div className="col-md-6">
                                                                        <label htmlFor="inputEmail4" className="form-label">link</label>
                                                                        <Field type="text" className="form-control slug-title" name="link" />
                                                                        <small className="input-error" style={{ display: errors.link ? "block" : "none" }} >{touched.name && errors.name}</small>

                                                                    </div>


                                                                    <div className="col-md-12">
                                                                        <label className="form-label">Description</label>
                                                                        <Field as="textarea" className="form-control" rows={2} name="description" />
                                                                        <small className="input-error" style={{ display: errors.description ? "block" : "none" }} >{touched.description && errors.description}</small>
                                                                    </div>
                                                                    <div className="col-md-12">
                                                                        <label className="form-label">extra</label>
                                                                        <Field as="textarea" className="form-control" rows={2} name="extra" />
                                                                        <small className="input-error" style={{ display: errors.extra ? "block" : "none" }} >{touched.extra && errors.extra}</small>
                                                                    </div>




                                                                    <div className="col-md-12">
                                                                        <button disabled={(loading)} ype="submit" className="btn btn-primary">Submit</button>
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
                            </div>
                        </div>
                    </div>

                </div>
            </div>


        </Fragment>
        // {/* <!-- end Single product  --> */}


    );
}

export default EditSlider;
