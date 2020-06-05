import React, { Component } from 'react'
import axios from 'axios'
import ReactDOM from 'react-dom'
import { Link, useParams } from 'react-router-dom'

import Header from './Header';
import Footer from './Footer';

export default class Home extends Component{
    // _isMounted = false;
    constructor(props){
        super(props);

        this.state = {
            goods: [],
            good: {
                file : '',
                name : '',
                description : '',
                price : '',
                category : '',
            },
            errorMsg: ''
            
        }
    }

    addCart = () => {
        var a=localStorage.getItem("authen");
        axios

            // .post('http://localhost/Neomallapi/public/api/auth/storecart', this.state.good, {
            .post('https://neomallapi.herokuapp.com/api/auth/storecart', this.state.good, {
                headers: {
                    // 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+a,
                    // 'withCredentials': true
                }
            })
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
                this.setState({errorMsg: 'Error retrieving data'})
            })
    }

    componentDidMount(){
        var a=localStorage.getItem("authen");
        axios

            // .get('https://cors-anywhere.herokuapp.com/http://localhost/Neomallapi/public/api/', {
            .get('https://neomallapi.herokuapp.com/api', {
                headers: {
                    // 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
                    'Content-Type': 'application/json',
                    // 'Authorization': 'Bearer '+a,
                    // 'withCredentials': true
                }
            })
            .then(response => {
                console.log(response.data.goods.data)
                this.setState({ goods: response.data.goods.data })
            })
            .catch(error => {
                console.log(error)
                this.setState({errorMsg: 'Error retrieving data'})
            })

    }

    getOne(good){
        this.setState({
            goods:{
            id : good.id,
            file : good.file,
            name : good.name,
            description : good.description,
            price : good.price,
            category : good.category
            }
        })
    }

    componentWillUnmount() {
        // fix Warning: Can't perform a React state update on an unmounted component
        this.setState = (state,callback)=>{
            return;
        };
    }

    render(){
        const { goods, errorMsg } = this.state;

        return(
            
            <div>
                <Header />
                
                
                {/* <!-- slider --> */}
                <div className="swiper-container swiper-container-alt">
                <div className="swiper-wrapper">
                    <div className="swiper-slide">
                    <div className="image image-overlay image-zoom" style={{backgroundImage:'url(assets/images/background-4.jpg)'}}></div>
                    {/* <div className="image image-overlay image-zoom image-back" ></div> */}
                    <div className="container">
                        <div className="row align-items-center justify-content-center vh-80">
                        <div className="col-lg-8 text-white text-center" data-swiper-parallax-y="-100%">
                            <h1 className="display-2 mb-2">Your <b>perfect workspace</b> is waiting for you.</h1>
                            <Link to="/shop" className="btn btn-white">Shop Now</Link>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div className="swiper-slide">
                    <div className="image image-overlay image-zoom" style={{backgroundImage:'url(assets/images/background-5.jpg)'}}></div>
                    <div className="container">
                        <div className="row align-items-center justify-content-center vh-80">
                        <div className="col-lg-6 text-white text-center" data-swiper-parallax-y="-100%">
                            <h1 className="display-2 mb-2">Transform your home with us.</h1>
                            <Link to="/shop" className="btn btn-outline-white">Shop Now</Link>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="swiper-button-prev"></div>
                <div className="swiper-button-next"></div>
                </div>

                {/* <!-- latest products --> */}
                <section className="pt-0">
                <div className="container">
                    <div className="row">
                    <div className="col text-center">
                        <h2>Latest Products</h2>
                    </div>
                    </div>
                    <div className="row gutter-2 gutter-md-3">

                    <div className="col-6 col-lg-3">
                        <div className="product">
                        <figure className="product-image">
                            <Link to="#!">
                            <img src="assets/images/demo/product-1.jpg" alt="Image" />
                            <img src="assets/images/demo/product-1-2.jpg" alt="Image" />
                            </Link>
                        </figure>
                        <div className="product-meta">
                            <h3 className="product-title"><Link to="#!">Fawn Wool / Natural Mammoth Chair </Link></h3>
                            <div className="product-price">
                            <span>$2,268</span>
                            <span className="product-action">
                                <Link to="#!">Add to cart</Link>
                            </span>
                            </div>
                            <Link to="#!" className="product-like"></Link>
                        </div>
                        </div>
                    </div>
                    <div className="col-6 col-lg-3">
                        <div className="product">
                        <figure className="product-image">
                            <div className="owl-carousel" data-nav="true" data-loop="true">
                            <Link to="#!">
                                <img src="assets/images/demo/product-2.jpg" alt="Image" />
                            </Link>
                            <Link to="#!">
                                <img src="assets/images/demo/product-2-2.jpg" alt="Image" />
                            </Link>
                            <Link to="#!">
                                <img src="assets/images/demo/product-2-3.jpg" alt="Image" />
                            </Link>
                            </div>
                        </figure>
                        <div className="product-meta">
                            <h3 className="product-title"><Link to="#!">Dark Stained NY11 Dining Chair</Link></h3>
                            <div className="product-price">
                            <span>$504</span>
                            <span className="product-action">
                                <Link to="#!">Add to cart</Link>
                            </span>
                            </div>
                            <Link to="#!" className="product-like"></Link>
                        </div>
                        </div>
                    </div>
                    <div className="col-6 col-lg-3">
                        <div className="product">
                        <figure className="product-image">
                            <Link to="#!">
                            <img src="assets/images/demo/product-3.jpg" alt="Image" />
                            <img src="assets/images/demo/product-3-2.jpg" alt="Image" />
                            </Link>
                        </figure>
                        <div className="product-meta">
                            <h3 className="product-title"><Link to="#!">Black IC Pendant Light</Link></h3>
                            <div className="product-price">
                            <span>$410</span>
                            <span className="product-action">
                                <Link to="#!">Add to cart</Link>
                            </span>
                            </div>
                            <Link to="#!" className="product-like"></Link>
                        </div>
                        </div>
                    </div>

                    <div className="col-6 col-lg-3">
                        <div className="product">
                        <figure className="product-image">
                            <span className="product-promo">-25%</span>
                            <Link to="#!">
                            <img src="assets/images/demo/product-4.jpg" alt="Image" />
                            <img src="assets/images/demo/product-4-2.jpg" alt="Image" />
                            </Link>
                        </figure>
                        <div className="product-meta">
                            <h3 className="product-title"><Link to="#!">Red Analog Magazine Rack</Link></h3>
                            <div className="product-price">
                            <span>$120</span>
                            <span className="product-action">
                                <Link to="#!">Add to cart</Link>
                            </span>
                            </div>
                            <Link to="#!" className="product-like"></Link>
                        </div>
                        </div>
                    </div>
                    <div className="col-6 col-lg-3">
                        <div className="product">
                        <figure className="product-image">
                            <Link to="#!">
                            <img src="assets/images/demo/product-5.jpg" alt="Image" />
                            <img src="assets/images/demo/product-5-2.jpg" alt="Image" />
                            </Link>
                        </figure>
                        <div className="product-meta">
                            <h3 className="product-title"><Link to="#!">Black Piani Table Lamp</Link></h3>
                            <div className="product-price">
                            <span>$290</span>
                            <span className="product-action">
                                <Link to="#!">Add to cart</Link>
                            </span>
                            </div>
                            <Link to="#!" className="product-like"></Link>
                        </div>
                        </div>
                    </div>
                    <div className="col-6 col-lg-3">
                        <div className="product">
                        <figure className="product-image">
                            <Link to="#!">
                            <img src="assets/images/demo/product-6.jpg" alt="Image" />
                            <img src="assets/images/demo/product-6-2.jpg" alt="Image" />
                            </Link>
                        </figure>
                        <div className="product-meta">
                            <h3 className="product-title"><Link to="#!">Grey Pendant Bell Lamp</Link></h3>
                            <div className="product-price">
                            <span>$258</span>
                            <span className="product-action">
                                <Link to="#!">Add to cart</Link>
                            </span>
                            </div>
                            <Link to="#!" className="product-like"></Link>
                        </div>
                        </div>
                    </div>
                    <div className="col-6 col-lg-3">
                        <div className="product">
                        <figure className="product-image">
                            <Link to="#!">
                            <img src="assets/images/demo/product-25.jpg" alt="Image" />
                            <img src="assets/images/demo/product-25-2.jpg" alt="Image" />
                            </Link>
                        </figure>
                        <div className="product-meta">
                            <h3 className="product-title"><Link to="#!">Gravel Black Sigg Water Bottle</Link></h3>
                            <div className="product-price">
                            <span>$23</span>
                            <span className="product-action">
                                <Link to="#!">Add to cart</Link>
                            </span>
                            </div>
                            <Link to="#!" className="product-like"></Link>
                        </div>
                        </div>
                    </div>
                    <div className="col-6 col-lg-3">
                        <div className="product">
                        <figure className="product-image">
                            <Link to="#!">
                            <img src="assets/images/demo/product-7.jpg" alt="Image" />
                            <img src="assets/images/demo/product-7-2.jpg" alt="Image" />
                            </Link>
                        </figure>
                        <div className="product-meta">
                            <h3 className="product-title"><Link to="#!">Garnet Must Sofa</Link></h3>
                            <div className="product-price">
                            <span>$4,668</span>
                            <span className="product-action">
                                <Link to="#!">Add to cart</Link>
                            </span>
                            </div>
                            <Link to="#!" className="product-like"></Link>
                        </div>
                        </div>
                    </div>

                    </div>
                    <div className="row">
                    <div className="col text-center">
                        {/* <Link to="#!" className="btn btn-outline-secondary">Load More</Link> */}
                    </div>
                    </div>
                </div>
                </section>
                <div>
                    <Footer />
                </div>
                
            </div>
        )
    }
}

// if (document.getElementById('home')) {
//     ReactDOM.render(<Home />, document.getElementById('home'));
// }
