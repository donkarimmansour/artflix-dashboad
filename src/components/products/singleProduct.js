import React, { Fragment, useEffect, useState } from "react"
import { ImageVIEW } from '../../shared/funs';
import { Link, useParams, useNavigate } from "react-router-dom";
import { get_single_product } from "../../redux/actions/products";
import { useDispatch, useSelector } from "react-redux";
import Breadcrumb from "../stuff/breadcrumb";
import { isAuthentication } from "../../redux/actions/auth";
import Slider from "react-slick";
import moment from "moment";
import { loader } from "../../shared/elements";


const SingleProduct = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch() 
    const params = useParams();

    const [slider1, setSlider1] = useState(null);
    const [slider2, setSlider2] = useState(null);

    const { singleproduct } = useSelector(state => state.products)
    const { isAuth } = useSelector((state) => state.auth);
    const { loading } = useSelector((state) => state.loading);

    useEffect(() => {
        dispatch(isAuthentication());
    }, [dispatch]);

    useEffect(() => {
        if (!isAuth) {
            navigate("/login"); 
        }
    }, [isAuth]);

    useEffect(() => {
        if (params.id && params.id !== "")
            dispatch(get_single_product({ filter: JSON.stringify({ _id: params.id }) }))
    }, [dispatch, params])



    const settingsImage = {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: false,
    };


    const settingsImages = {
        slidesToShow: 4,
        slidesToScroll: 1,
        dots: false,
        arrows: true,
        focusOnSelect: true,
        rows: 1,
    };

    const infos = []

    for (const value in singleproduct.info) {
        infos.push(<li key={value}><span>{value}</span> {singleproduct.info[value]}</li>)
    }

    return (

        <Fragment>

            <div className="ec-content-wrapper">
                <div className="content">


                    <Breadcrumb name="Product" btn={true}>
                        <Link to={`/edit-product/${params.id}`} className="btn btn-primary">Edit</Link>
                    </Breadcrumb>

                    {loading && loader()}

                    <div className="row">
                        <div className="col-12">
                            <div className="card card-default">
                                <div className="card-header card-header-border-bottom">
                                    <h2>Product Detail</h2>
                                </div>

                                {singleproduct && singleproduct.name &&
                                    <div className="card-body product-detail">
                                        <div className="row">
                                            <div className="col-xl-4 col-lg-6">
                                                <div className="row">
                                                    <div className="single-pro-img">
                                                        <div className="single-product-scroll">

                                                            <Slider {...settingsImage} asNavFor={slider2} className="single-product-cover" ref={(slider) => setSlider1(slider)}>
                                                                {(singleproduct.images && singleproduct.images.length > 0) &&
                                                                    singleproduct.images.map((image, i) => {

                                                                        return (

                                                                            <div key={i} className="single-slide zoom-image-hover" >
                                                                                <img className="img-responsive" src={ImageVIEW(image)} alt={singleproduct.name} />
                                                                            </div>


                                                                        )
                                                                    })
                                                                }

                                                            </Slider>



                                                            <Slider {...settingsImages} asNavFor={slider1} className="single-nav-thumb" ref={(slider) => setSlider2(slider)}>

                                                                {(singleproduct.images && singleproduct.images.length > 0) &&
                                                                    singleproduct.images.map((image, i) => {

                                                                        return (

                                                                            <div key={i} className="single-slide" style={{ width: '100%', display: 'inline-block' }}>
                                                                                <img className="img-responsive" src={ImageVIEW(image)} alt={singleproduct.name} />
                                                                            </div>


                                                                        )
                                                                    })
                                                                }

                                                            </Slider>

                                                        </div>



                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-5 col-lg-6">
                                                <div className="row product-overview">
                                                    <div className="col-12">
                                                        <h5 className="product-title">{singleproduct.name}</h5>
                                                        <p className="product-rate">
                                                            <i className="mdi mdi-star is-rated" />
                                                            <i className="mdi mdi-star is-rated" />
                                                            <i className="mdi mdi-star is-rated" />
                                                            <i className="mdi mdi-star is-rated" />
                                                            <i className="mdi mdi-star" />
                                                        </p>
                                                        <p className="product-desc">{singleproduct.description}</p>
                                                        {/* <div className="ec-ofr">
                                                <h6>Available offers</h6>
                                                <ul>
                                                    <li><b>Special Price :</b> Get extra 16% off (price
                                                        inclusive of discount) <a href="#">T&amp;C</a> </li>
                                                    <li><b>Bank Offer :</b> 10% off on XYZ Bank Cards, up to
                                                        $12. On orders of $200 and above <a href="#">T&amp;C</a>
                                                    </li>
                                                    <li><b>Bank Offer :</b> 5% Unlimited Cashback on Ekka XYZ
                                                        Bank Credit Card <a href="#">T&amp;C</a></li>
                                                    <li><b>Bank Offer :</b> Flat $50 off on first Ekka Pay Later
                                                        order of $200 and above <a href="#">T&amp;C</a></li>
                                                </ul>
                                            </div> */}
                                                        <p className="product-price">${singleproduct.price}</p>
                                                        <p className="product-sku">{singleproduct.stock}</p>

                                                        {singleproduct.size.length > 0 &&

                                                            <ul className="product-size">
                                                                {
                                                                    singleproduct.size.map((size, index) => {
                                                                        return (
                                                                            <li key={index}>
                                                                                <span className="size" >{size.size}</span>
                                                                            </li>
                                                                        );
                                                                    })}

                                                            </ul>}

                                                        {singleproduct.color.length > 0 &&

                                                            <ul className="product-color">
                                                                {
                                                                    singleproduct.color.map((color, index) => {
                                                                        return (
                                                                            <li key={index}>
                                                                                <span className="color" style={{ backgroundColor: color }}></span>
                                                                            </li>
                                                                        );
                                                                    })}

                                                            </ul>
                                                        }




                                                        
                                            <div className="product-stock">
                                                <div className="stock">
                                                    <p className="title">Created att</p>
                                                    <p className="text">{moment(singleproduct.CreatedAt).format("DD/MM/YYYY")}</p>
                                                </div>
                                                <div className="stock">
                                                    <p className="title">last Updated</p>
                                                    <p className="text">{moment(singleproduct.UpdatedAt).format("DD/MM/YYYY")}</p>
                                                </div>
                                                <div className="stock">
                                                    <p className="title">Limited Att</p>
                                                    <p className="text">{moment(singleproduct.limitedAtt).format("DD/MM/YYYY")}</p>
                                                </div>
                                            </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/*                                             
                                            <div className="col-xl-3 col-lg-12 u-card">
                                                <div className="card card-default seller-card">
                                                    <div className="card-body text-center">
                                                        <a href="javascript:0" className="text-secondary d-inline-block">
                                                            <div className="image mb-3">
                                                                <img src="/assets/assets/img/user/u-xl-4.jpg" className="img-flurounded-circle" alt="Avatar Image" />
                                                            </div>
                                                            <h5 className="text-dark">John Karter</h5>
                                                            <p className="product-rate">
                                                                <i className="mdi mdi-star is-rated" />
                                                                <i className="mdi mdi-star is-rated" />
                                                                <i className="mdi mdi-star is-rated" />
                                                                <i className="mdi mdi-star is-rated" />
                                                                <i className="mdi mdi-star" />
                                                            </p>
                                                            <ul className="list-unstyled">
                                                                <li className="d-flex mb-1">
                                                                    <i className="mdi mdi-map mr-1" />
                                                                    <span>321/2, rio street, usa.</span>
                                                                </li>
                                                                <li className="d-flex mb-1">
                                                                    <i className="mdi mdi-email mr-1" />
                                                                    <span>example@email.com</span>
                                                                </li>
                                                                <li className="d-flex">
                                                                    <i className="mdi mdi-whatsapp mr-1" />
                                                                    <span>+00 987-654-3210</span>
                                                                </li>
                                                            </ul>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                       
                                        */}

                                        </div>
                                        <div className="row review-rating mt-4">
                                            <div className="col-12">
                                                <ul className="nav nav-tabs" id="myRatingTab" role="tablist">
                                                    <li className="nav-item">
                                                        <a className="nav-link active" id="product-detail-tab" data-bs-toggle="tab" data-bs-target="#productdetail" href="#productdetail" role="tab" aria-selected="true">
                                                            <i className="mdi mdi-library-books mr-1" /> Detail</a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a className="nav-link" id="product-information-tab" data-bs-toggle="tab" data-bs-target="#productinformation" href="#productinformation" role="tab" aria-selected="false">
                                                            <i className="mdi mdi-information mr-1" />Info</a>
                                                    </li>
                                                    {/* <li className="nav-item">
                                                        <a className="nav-link" id="product-reviews-tab" data-bs-toggle="tab" data-bs-target="#productreviews" href="#productreviews" role="tab" aria-selected="false">
                                                            <i className="mdi mdi-star-half mr-1" /> Reviews</a>
                                                    </li> */}
                                                </ul>
                                                <div className="tab-content" id="myTabContent2">
                                                    <div className="tab-pane pt-3 fade show active" id="productdetail" role="tabpanel">
                                                        <p>{singleproduct.description}</p>

                                                    </div>
                                                    <div className="tab-pane pt-3 fade" id="productinformation" role="tabpanel">
                                                        <ul>
                                                            {infos}
                                                        </ul>
                                                    </div>
                                                    {/* <div className="tab-pane pt-3 fade" id="productreviews" role="tabpanel">
                                                        <div className="ec-t-review-wrapper">
                                                            <div className="ec-t-review-item">
                                                                <div className="ec-t-review-avtar">
                                                                    <img src="/assets/assets/img/review-image/1.jpg" alt="" />
                                                                </div>
                                                                <div className="ec-t-review-content">
                                                                    <div className="ec-t-review-top">
                                                                        <p className="ec-t-review-name">Jeny Doe</p>
                                                                        <div className="ec-t-rate">
                                                                            <i className="mdi mdi-star is-rated" />
                                                                            <i className="mdi mdi-star is-rated" />
                                                                            <i className="mdi mdi-star is-rated" />
                                                                            <i className="mdi mdi-star is-rated" />
                                                                            <i className="mdi mdi-star" />
                                                                        </div>
                                                                    </div>
                                                                    <div className="ec-t-review-bottom">
                                                                        <p>Lorem Ipsum is simply dummy text of the printing
                                                                            and
                                                                            typesetting industry.
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="ec-t-review-item">
                                                                <div className="ec-t-review-avtar">
                                                                    <img src="/assets/assets/img/review-image/2.jpg" alt="" />
                                                                </div>
                                                                <div className="ec-t-review-content">
                                                                    <div className="ec-t-review-top">
                                                                        <p className="ec-t-review-name">Linda Morgus</p>
                                                                        <div className="ec-t-rate">
                                                                            <i className="mdi mdi-star is-rated" />
                                                                            <i className="mdi mdi-star is-rated" />
                                                                            <i className="mdi mdi-star is-rated" />
                                                                            <i className="mdi mdi-star is-rated" />
                                                                            <i className="mdi mdi-star" />
                                                                        </div>
                                                                    </div>
                                                                    <div className="ec-t-review-bottom">
                                                                        <p>Lorem Ipsum is simply dummy text of the printing
                                                                            and
                                                                            typesetting industry.
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                             
                                              */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </Fragment>
        // {/* <!-- end Single product  --> */}


    );
}

export default SingleProduct;
