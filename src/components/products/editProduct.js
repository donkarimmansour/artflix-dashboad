import React, { Fragment, useEffect, useState } from "react"
import {  useParams, useNavigate , useLocation} from "react-router-dom";
import { create_product, edit_product, get_single_product } from "../../redux/actions/products";
import { useDispatch, useSelector } from "react-redux";
import Breadcrumb from "../stuff/breadcrumb";
import { isAuthentication } from "../../redux/actions/auth";
import * as yup from 'yup'
import { Field, Formik, Form, FieldArray } from "formik"
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { CLEAR_MESSAGE } from "../../redux/constans/message";
import { loader } from "../../shared/elements";
import { GET_MAIN_CATEGORIES } from "../../redux/constans/categories";
import { get_main_categories } from "../../redux/actions/categories";
import { Create } from "../../services/file";
import { START_LOADING, STOP_LOADING } from "../../redux/constans/loading";
import { ImageVIEW } from "../../shared/funs";
import moment from "moment";
import { Clone } from "../../services/products";

const EditProduct = () => {

    const navigate = useNavigate();
    const params = useParams();
    const dispatch = useDispatch()
    const location = useLocation()
    toast.configure()

    const [images, setImages] = useState([]);
    const [Lloading, setLLoading] = useState(false);

    const { main_categories } = useSelector(state => state.categories)
    const { singleproduct } = useSelector(state => state.products)
    const { errorMsg, successMsg } = useSelector((state) => state.message);
    const { isAuth, token } = useSelector((state) => state.auth);
    const { loading } = useSelector((state) => state.loading);

    const authorization = { "Authorization": `bearer ${token}` }

    
   

    useEffect(() => {

        if ((params.id && params.id !== "") && location.pathname.startsWith("/add-product")) {

            console.log('This should called once')

            setLLoading(true);


            Clone(params.id, authorization).then(({ data }) => {
                
                if (!data.err) {
                    setLLoading(false);
                    toast.success("Created");
                    dispatch(get_single_product({ filter: JSON.stringify({ _id: data.msg }) }))
                    navigate(`/edit-product/${data.msg}`)
                } else {
                    setLLoading(false);
                    toast.error(
                        typeof data.msg == "string" ? data.msg : data.msg[0]
                    );
                }
            })
                .catch((err) => {
                    console.log("get orders api err ", err);
                    setLLoading(false);
                    toast.error("something went wrong please try again");
                });
        }
        
    }, []);

    useEffect(() => {
        dispatch(isAuthentication());
    }, [dispatch]);

    useEffect(() => {
        if (!isAuth) {
            navigate("/login");
        }
    }, [isAuth]);


    useEffect(() => {

        if (singleproduct && singleproduct.name) {
            let info = []
            for (const value in singleproduct.info) {
                info.push({ key: value, val: singleproduct.info[value] })
            }
            setImages(singleproduct.images)
            setInitialValues({ ...singleproduct, info, limitedAtt: moment(singleproduct.limitedAtt).format("YYYY-MM-DDTHH:mm:ss") })
        }

    }, [singleproduct])

    


    useEffect(() => {
        dispatch(get_main_categories(GET_MAIN_CATEGORIES, { filter: JSON.stringify({ name: { $ne: "karimmansour" } }) }))

        if (params.id && params.id !== "")
            dispatch(get_single_product({ filter: JSON.stringify({ _id: params.id }) }))
        else  {
            setImages([])
            setInitialValues({ name: "",
            description: "",
            condition: "",
            status: "",
            category: "",
            limitedAtt: "",
            stock: 0,
            oldprice: 0,
            price: 0,
            info: [{"color" : "white"}],
            color: ["white"],
            shipping: [{ name : "free" , price : 0 , from : 20 , to : 30}],
            size: [{name : "standard" , price : 0}]})

        }

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
        condition: "",
        status: "",
        category: "",
        limitedAtt: "",
        stock: 0,
        oldprice: 0,
        price: 0,
        info: [{"color" : "white"}],
        color: ["white"],
        shipping: [{ name : "free" , price : 0 , from : 20 , to : 30}],
        size: [{name : "standard" , price : 0}]
    })

    const ProductValidator = yup.object().shape({
        name: yup.string().required("name field is required"),
        description: yup.string().required("description field is required"),
        condition: yup.string().required("condition field is required"),
        status: yup.string().required("status field is required"),
        category: yup.string().required("category field is required"),
        stock: yup.number().required("stock field is required"),
        oldprice: yup.number().required("oldprice field is required"),
        price: yup.number().required("price field is required"),


    })

    const onSubmit = values => {
        if (images.length === 0) {
            toast.error("Choose at least one photo")
        } else {
            let info = {}

            for (const value of values.info) {
                const { key, val } = value
                info = { ...info, [key]: val }
            }
    
          const data = { ...values, info, images }

            if (params.id && params.id !== "") {
                dispatch(edit_product(params.id, data, authorization))
            } else {
                dispatch(create_product(data, authorization))
            }
        }

    }

    const imageUpload = (e) => {
        const _this = e.target;

        if (_this.getAttribute('data-used') === "false") {
            if (_this.files && _this.files[0]) {

                var reader = new FileReader();

                reader.onload = function (evnt) {

                    _this.parentElement.parentElement.querySelector('.ec-image-preview').setAttribute('src', evnt.target.result)
                    _this.parentElement.parentElement.querySelector('.svg_img').setAttribute('src', "/assets/imgs/ws-remove.svg")
                    _this.setAttribute('data-used', "true")

                    const img = e.target.files[0];
                    const formData = new FormData();
                    formData.append('image', img);

                    // dispatch(set_single_image(formData, authorization, user._id))
                    dispatch({ type: START_LOADING })

                    Create(formData, authorization).then(({ data }) => {

                        if (!data.err) {
                            dispatch({ type: STOP_LOADING })

                            const id = data.msg
                            _this.setAttribute('data-img', id)
                            _this.setAttribute('type', "checkbox")
                            toast.success("photo uploaded")


                            setImages([...images, id])
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

        } if (_this.getAttribute('data-used') === "true") {

            if (_this.getAttribute('data-img') !== "") {
                setImages([...images.filter(i => i !== _this.getAttribute('data-img'))])
                _this.setAttribute('data-img', "")
                _this.setAttribute('data-used', "false")

                
            } 

            _this.parentElement.parentElement.querySelector('.ec-image-preview').setAttribute('src', "/assets/imgs/ws-vender-upload-preview.jpg")
            _this.parentElement.parentElement.querySelector('.svg_img').setAttribute('src', "/assets/assets/img/icons/edit.svg")
            setTimeout(() => {
                _this.setAttribute('type', "file")

            }, 1000)


        }


    }

    const checkIt = (length) => {
        if (params.id && params.id !== "" && images.length > length) {
            return true
        }
        return false
    }

    return (

        <Fragment>

            <div className="ec-content-wrapper">
                <div className="content">


                    <Breadcrumb name="Product"></Breadcrumb>


                    {(loading || Lloading) && loader()}


                    <div className="row">
                        <div className="col-12">
                            <div className="card card-default">
                                <div className="card-header card-header-border-bottom">
                                    <h2>Add Product</h2>
                                </div>
                                <div className="card-body">
                                    <div className="row ec-vendor-uploads">
                                        <div className="col-lg-4">
                                            <div className="ec-vendor-img-upload">
                                                <div className="ec-vendor-main-img">
                                                    <div className="avatar-upload">
                                                        <div className="avatar-edit">
                                                            <input disabled={loading} data-used={checkIt(0) ? true : false} data-img={checkIt(0) ? images[0] : ""} type={checkIt(0) ? "checkbox" : "file"} className="ec-image-upload" accept=".png, .jpg, .jpeg" onChange={imageUpload} />
                                                            <label htmlFor="imageUpload"><img src={checkIt(0) ? "/assets/imgs/ws-remove.svg" : "/assets/imgs/ws-edit.svg"} className="svg_img header_svg" alt="edit" />
                                                            </label>
                                                        </div>
                                                        <div className="avatar-preview ec-preview">
                                                            <div className="imagePreview ec-div-preview">
                                                                <img className="ec-image-preview" src={checkIt(0) ? ImageVIEW(images[0]) : "/assets/imgs/ws-vender-upload-preview.jpg"} alt="edit" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="thumb-upload-set colo-md-12">
                                                        <div className="thumb-upload">
                                                            <div className="thumb-edit">
                                                                <input disabled={loading} data-used={checkIt(1) ? true : false} data-img={checkIt(1) ? images[1] : ""} type={checkIt(1) ? "checkbox" : "file"} className="ec-image-upload" accept=".png, .jpg, .jpeg" onChange={imageUpload} />
                                                                <label htmlFor="imageUpload"><img src={checkIt(1) ? "/assets/imgs/ws-remove.svg" : "/assets/imgs/ws-edit.svg"} className="svg_img header_svg" alt="edit" /></label>
                                                            </div>
                                                            <div className="thumb-preview ec-preview">
                                                                <div className="image-thumb-preview">
                                                                    <img className="image-thumb-preview ec-image-preview" src={checkIt(1) ? ImageVIEW(images[1]) : "/assets/imgs/ws-vender-upload-preview.jpg"} alt="edit" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="thumb-upload">
                                                            <div className="thumb-edit">
                                                                <input disabled={loading} data-used={checkIt(2) ? true : false} data-img={checkIt(2) ? images[2] : ""} type={checkIt(2) ? "checkbox" : "file"} className="ec-image-upload" accept=".png, .jpg, .jpeg" onChange={imageUpload} />
                                                                <label htmlFor="imageUpload"><img src={checkIt(2) ? "/assets/imgs/ws-remove.svg" : "/assets/imgs/ws-edit.svg"} className="svg_img header_svg" alt="edit" /></label>
                                                            </div>
                                                            <div className="thumb-preview ec-preview">
                                                                <div className="image-thumb-preview">
                                                                    <img className="image-thumb-preview ec-image-preview" src={checkIt(2) ? ImageVIEW(images[2]) : "/assets/imgs/ws-vender-upload-preview.jpg"} alt="edit" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="thumb-upload">
                                                            <div className="thumb-edit">
                                                                <input disabled={loading} data-used={checkIt(3) ? true : false} data-img={checkIt(3) ? images[3] : ""} type={checkIt(3) ? "checkbox" : "file"} className="ec-image-upload" accept=".png, .jpg, .jpeg" onChange={imageUpload} />
                                                                <label htmlFor="imageUpload"><img src={checkIt(3) ? "/assets/imgs/ws-remove.svg" : "/assets/imgs/ws-edit.svg"} className="svg_img header_svg" alt="edit" /></label>
                                                            </div>
                                                            <div className="thumb-preview ec-preview">
                                                                <div className="image-thumb-preview">
                                                                    <img className="image-thumb-preview ec-image-preview" src={checkIt(3) ? ImageVIEW(images[3]) : "/assets/imgs/ws-vender-upload-preview.jpg"} alt="edit" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="thumb-upload">
                                                            <div className="thumb-edit">
                                                                <input disabled={loading} data-used={checkIt(4) ? true : false} data-img={checkIt(4) ? images[4] : ""} type={checkIt(4) ? "checkbox" : "file"} className="ec-image-upload" accept=".png, .jpg, .jpeg" onChange={imageUpload} />
                                                                <label htmlFor="imageUpload"><img src={checkIt(4) ? "/assets/imgs/ws-remove.svg" : "/assets/imgs/ws-edit.svg"} className="svg_img header_svg" alt="edit" /></label>
                                                            </div>
                                                            <div className="thumb-preview ec-preview">
                                                                <div className="image-thumb-preview">
                                                                    <img className="image-thumb-preview ec-image-preview" src={checkIt(4) ? ImageVIEW(images[4]) : "/assets/imgs/ws-vender-upload-preview.jpg"} alt="edit" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="thumb-upload">
                                                            <div className="thumb-edit">
                                                                <input disabled={loading} data-used={checkIt(5) ? true : false} data-img={checkIt(5) ? images[5] : ""} type={checkIt(5) ? "checkbox" : "file"} className="ec-image-upload" accept=".png, .jpg, .jpeg" onChange={imageUpload} />
                                                                <label htmlFor="imageUpload"><img src={checkIt(5) ? "/assets/imgs/ws-remove.svg" : "/assets/imgs/ws-edit.svg"} className="svg_img header_svg" alt="edit" /></label>
                                                            </div>
                                                            <div className="thumb-preview ec-preview">
                                                                <div className="image-thumb-preview">
                                                                    <img className="image-thumb-preview ec-image-preview" src={checkIt(5) ? ImageVIEW(images[5]) : "/assets/imgs/ws-vender-upload-preview.jpg"} alt="edit" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="thumb-upload">
                                                            <div className="thumb-edit">
                                                                <input disabled={loading} data-used={checkIt(6) ? true : false} data-img={checkIt(6) ? images[6] : ""} type={checkIt(6) ? "checkbox" : "file"} className="ec-image-upload" accept=".png, .jpg, .jpeg" onChange={imageUpload} />
                                                                <label htmlFor="imageUpload"><img src={checkIt(6) ? "/assets/imgs/ws-remove.svg" : "/assets/imgs/ws-edit.svg"} className="svg_img header_svg" alt="edit" /></label>
                                                            </div>
                                                            <div className="thumb-preview ec-preview">
                                                                <div className="image-thumb-preview">
                                                                    <img className="image-thumb-preview ec-image-preview" src={checkIt(6) ? ImageVIEW(images[6]) : "/assets/imgs/ws-vender-upload-preview.jpg"} alt="edit" />
                                                                </div>
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
                                                        validationSchema={ProductValidator}>
                                                        {
                                                            ({ touched, errors, values }) => (
                                                                <Form action="#" method="post" className="row g-3">

                                                                    <div className="col-md-6">
                                                                        <label htmlFor="inputEmail4" className="form-label">Product name</label>
                                                                        <Field type="text" className="form-control slug-title" name="name" />
                                                                        <small className="input-error" style={{ display: errors.name ? "block" : "none" }} >{touched.name && errors.name}</small>

                                                                    </div>

                                                                    <div className="col-md-6">
                                                                        <label className="form-label">Select Categories</label>
                                                                        <Field as="select" name="category" className="form-select">

                                                                            <option  value="...." disabled>....</option>

                                                                            {main_categories && main_categories.length > 0 &&
                                                                                main_categories.map((category, categoryI) => {
                                                                                    return (

                                                                                        <optgroup key={categoryI} label={category.name[0]}>
                                                                                            {category.categories && category.categories.length > 0 && category.categories.map((caty, catyI) => {
                                                                                                return (<option key={catyI} value={caty.category.name}>{caty.category.name}</option>)
                                                                                            })}
                                                                                        </optgroup>

                                                                                    )
                                                                                })}

                                                                        </Field>

                                                                        <small className="input-error" style={{ display: errors.category ? "block" : "none" }} >{touched.category && errors.category}</small>

                                                                    </div>

                                                                    <div className="col-md-6">
                                                                        <label className="form-label">condition</label>

                                                                        <Field as="select" name="condition" className="form-select">
                                                                            <option  value="...." disabled>....</option>
                                                                            <option value="new">new</option>
                                                                            <option value="old">old</option>
                                                                            <option value="as new">as new</option>
                                                                        </Field>

                                                                        <small className="input-error" style={{ display: errors.condition ? "block" : "none" }} >{touched.condition && errors.condition}</small>

                                                                    </div>

                                                                    <div className="col-md-6">
                                                                        <label className="form-label">status</label>

                                                                        <Field as="select" name="status" className="form-select">
                                                                            <option  value="...." disabled>....</option>
                                                                            <option value="draft">draft</option>
                                                                            <option value="published">published</option>
                                                                        </Field>
                                                                        <small className="input-error" style={{ display: errors.status ? "block" : "none" }} >{touched.status && errors.status}</small>

                                                                    </div>



                                                                    <div className="col-md-6">
                                                                        <label className="form-label">oldprice</label>
                                                                        <Field type="number" className="form-control" name="oldprice" />
                                                                        <small className="input-error" style={{ display: errors.oldprice ? "block" : "none" }} >{touched.oldprice && errors.oldprice}</small>
                                                                    </div>

                                                                    <div className="col-md-6">
                                                                        <label className="form-label">price</label>
                                                                        <Field type="number" className="form-control" name="price" />
                                                                        <small className="input-error" style={{ display: errors.price ? "block" : "none" }} >{touched.price && errors.price}</small>
                                                                    </div>

                                                                    <div className="col-md-6">
                                                                        <label className="form-label">stock</label>
                                                                        <Field type="number" className="form-control" name="stock" />
                                                                        <small className="input-error" style={{ display: errors.stock ? "block" : "none" }} >{touched.stock && errors.stock}</small>
                                                                    </div>

                                                                    <div className="col-md-6">
                                                                        <label className="form-label">limited Att</label>
                                                                        <Field type="datetime-local" className="form-control" name="limitedAtt" />
                                                                        <small className="input-error" style={{ display: errors.limitedAtt ? "block" : "none" }} >{touched.limitedAtt && errors.limitedAtt}</small>
                                                                    </div>

                                                                    <div className="col-md-12">
                                                                        <label className="form-label">Description</label>
                                                                        <Field as="textarea" className="form-control" rows={2} name="description" />
                                                                        <small className="input-error" style={{ display: errors.description ? "block" : "none" }} >{touched.description && errors.description}</small>
                                                                    </div>




                                                                    <div className="col-12 mb-25">
                                                                        <label className="form-label">Colors</label>



                                                                        <FieldArray
                                                                            name="color"
                                                                            render={arrayHelpers => (
                                                                                <> {

                                                                                    values.color &&


                                                                                    values.color.map((clr, index) => (
                                                                                        <Fragment key={index}>

                                                                                            <Field name={`color.${index}`} type="color" className="form-control form-control-color" id="exampleColorInput1" title="Choose your color" />

                                                                                            <button
                                                                                                type="button"
                                                                                                onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                                                                                            >
                                                                                                -
                                                                                            </button>



                                                                                        </Fragment>

                                                                                    ))


                                                                                }
                                                                                    <button type="button" onClick={() => arrayHelpers.push('#ff6191')}>
                                                                                        {/* show this when user has removed all friends from the list */}
                                                                                        add color
                                                                                    </button>
                                                                                </>


                                                                            )}
                                                                        />



                                                                    </div>


                                                                    <div className="col-12 mb-25">
                                                                        <label className="form-label">Size</label>
                                                                        <div className="form-checkbox-box">

                                                                            <FieldArray
                                                                                name="size"
                                                                                render={arrayHelpers => (
                                                                                    <> {

                                                                                        values.size &&


                                                                                        values.size.map((sz, index) => (
                                                                                            <Fragment key={index}>

                                                                                                <div className="form-check form-check-inline">
                                                                                                    <Field className="form-control" placeholder="Size" type="text" name={`size.${index}.size`} />
                                                                                                    <Field className="form-control" placeholder="Price" type="number" name={`size.${index}.price`} />
                                                                                                </div>
                                                                                                <button
                                                                                                    type="button"
                                                                                                    onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                                                                                                >
                                                                                                    -
                                                                                                </button>


                                                                                            </Fragment>

                                                                                        ))


                                                                                    }
                                                                                        <button type="button" onClick={() => arrayHelpers.push({ price: 0, size: "" })}>
                                                                                            {/* show this when user has removed all friends from the list */}
                                                                                            add size
                                                                                        </button>
                                                                                    </>


                                                                                )}
                                                                            />

                                                                        </div>
                                                                    </div>

                                                                    <div className="col-12 mb-25">
                                                                        <label className="form-label">Info</label>

                                                                        <FieldArray
                                                                            name="info"
                                                                            render={arrayHelpers => (
                                                                                <> {

                                                                                    values.info &&


                                                                                    values.info.map((nf, index) => (
                                                                                        <Fragment key={index}>

                                                                                            <div className="form-check form-check-inline">
                                                                                                <Field className="form-control" placeholder="Name" type="text" name={`info.${index}.key`} />
                                                                                                <Field className="form-control" placeholder="Value" type="text" name={`info.${index}.val`} />
                                                                                             </div>
                                                                                            <button
                                                                                                type="button"
                                                                                                onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                                                                                            >
                                                                                                -
                                                                                            </button>



                                                                                        </Fragment>

                                                                                    ))


                                                                                }
                                                                                    <button type="button" onClick={() => arrayHelpers.push({ key: "", val: "" })}>
                                                                                        {/* show this when user has removed all friends from the list */}
                                                                                        add info
                                                                                    </button>
                                                                                </>


                                                                            )}
                                                                        />

                                                                    </div>

                                                                    <div className="col-12 mb-25">
                                                                        <label className="form-label">shipping</label>

                                                                        <FieldArray
                                                                            name="shipping"
                                                                            render={arrayHelpers => (

                                                                           
                                                                                <> {

                                                                                    values.shipping &&


                                                                                    values.shipping.map((nf, index) => (
                                                                                            <Fragment key={index}>
    
                                                                                                <div className="form-check form-check-inline" style={{display : "flex" , flexWrap : "wrap"}}>
                                                                                                    <Field className="form-control" placeholder="name" type="text" name={`shipping.${index}.name`} />
                                                                                                    <Field className="form-control" placeholder="price" type="number" name={`shipping.${index}.price`} />
                                                                                                    <Field className="form-control" placeholder="from" type="number" name={`shipping.${index}.from`} />
                                                                                                    <Field className="form-control" placeholder="to" type="number" name={`shipping.${index}.to`} />
                                                                                                </div>
                                                                                                <button
                                                                                                    type="button"
                                                                                                    onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                                                                                                >
                                                                                                    -
                                                                                                </button>
    
                                                                                         
    
    
    
                                                                                            </Fragment>
    
                                                                                        ))


                                                                                }
                                                                                <br/>
                                                                                    <button type="button" onClick={() => arrayHelpers.push({ name: "", price: 0 , to : 0 , from : 0})}>
                                                                                        {/* show this when user has removed all friends from the list */}
                                                                                        add shipping
                                                                                    </button>
                                                                                </>


                                                                            )}
                                                                        />

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

export default EditProduct;
