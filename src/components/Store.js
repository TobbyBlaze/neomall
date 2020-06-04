import React, { Component } from 'react'
import axios from 'axios'
import ReactDOM from 'react-dom'
import { Link, useParams } from 'react-router-dom'

import Header from './Header';
import Footer from './Footer';

export default class Store extends Component{
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

            // .post('http://localhost/yummypizza/public/api/auth/storecart', this.state.good, {
            .post('https://damp-island-72638.herokuapp.com/api/auth/storecart', this.state.good, {
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

            .get('http://localhost/yummypizza/public/api/auth', {
            // .get('https://damp-island-72638.herokuapp.com/api/auth', {
                headers: {
                    // 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+a,
                    // 'withCredentials': true
                }
            })
            .then(response => {
                // console.log(response.data.goods.data)
                this.setState({ goods: response.data.goods.data })
            })
            .catch(error => {
                // console.log(error)
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
                
                {/* <!-- listing --> */}
                <section className="pt-0">
                    <div className="container">

                        <div className="row">

                        {/* <!-- content --> */}
                        <div className="col">
                            <div className="row gutter-2 gutter-lg-3">
                            <div className="col-6 col-lg-4">
                                <div className="product">
                                <figure className="product-image">
                                    <a href="#!">
                                    <img src="assets/images/demo/product-1.jpg" alt="Image" />
                                    <img src="assets/images/demo/product-1-2.jpg" alt="Image" />
                                    </a>
                                </figure>
                                <div className="product-meta">
                                    <h3 className="product-title"><a href="#!">Fawn Wool / Natural Mammoth Chair </a></h3>
                                    <div className="product-price">
                                    <span>$2,268</span>
                                    <span className="product-action">
                                        <a href="#!">Add to cart</a>
                                    </span>
                                    </div>
                                    <a href="#!" className="product-like"></a>
                                </div>
                                </div>
                            </div>
                            <div className="col-6 col-lg-4">
                                <div className="product">
                                <figure className="product-image">
                                    <span className="product-promo">-25%</span>
                                    <div className="owl-carousel" data-nav="true" data-loop="true">
                                    <a href="#!">
                                        <img src="assets/images/demo/product-2.jpg" alt="Image" />
                                    </a>
                                    <a href="#!">
                                        <img src="assets/images/demo/product-2-2.jpg" alt="Image" />
                                    </a>
                                    <a href="#!">
                                        <img src="assets/images/demo/product-2-3.jpg" alt="Image" />
                                    </a>
                                    </div>
                                </figure>
                                <div className="product-meta">
                                    <h3 className="product-title"><a href="#!">Dark Stained NY11 Dining Chair</a></h3>
                                    <div className="product-price">
                                    <span>$504</span>
                                    <span className="product-action">
                                        <a href="#!">Add to cart</a>
                                    </span>
                                    </div>
                                    <a href="#!" className="product-like"></a>
                                </div>
                                </div>
                            </div>
                            <div className="col-6 col-lg-4">
                                <div className="product">
                                <figure className="product-image">
                                    <a href="#!">
                                    <img src="assets/images/demo/product-3.jpg" alt="Image" />
                                    <img src="assets/images/demo/product-3-2.jpg" alt="Image" />
                                    </a>
                                </figure>
                                <div className="product-meta">
                                    <h3 className="product-title"><a href="#!">Black IC Pendant Light</a></h3>
                                    <div className="product-price">
                                    <span>$410</span>
                                    <span className="product-action">
                                        <a href="#!">Add to cart</a>
                                    </span>
                                    </div>
                                    <a href="#!" className="product-like"></a>
                                </div>
                                </div>
                            </div>
                            <div className="col-6 col-lg-4">
                                <div className="product">
                                <figure className="product-image">
                                    <a href="#!">
                                    <img src="assets/images/demo/product-24.jpg" alt="Image" />
                                    <img src="assets/images/demo/product-24-2.jpg" alt="Image" />
                                    </a>
                                </figure>
                                <div className="product-meta">
                                    <h3 className="product-title"><a href="#!">Black Closca Helmet</a></h3>
                                    <div className="product-price">
                                    <span>$132</span>
                                    <span className="product-action">
                                        <a href="#!">Add to cart</a>
                                    </span>
                                    </div>
                                    <a href="#!" className="product-like"></a>
                                </div>
                                </div>
                            </div>


                            <div className="col-6 col-lg-4">
                                <div className="product">
                                <figure className="product-image">
                                    <a href="#!">
                                    <img src="assets/images/demo/product-25.jpg" alt="Image" />
                                    <img src="assets/images/demo/product-25-2.jpg" alt="Image" />
                                    </a>
                                </figure>
                                <div className="product-meta">
                                    <h3 className="product-title"><a href="#!">Gravel Black Sigg Water Bottle</a></h3>
                                    <div className="product-price">
                                    <span>$23</span>
                                    <span className="product-action">
                                        <a href="#!">Add to cart</a>
                                    </span>
                                    </div>
                                    <a href="#!" className="product-like"></a>
                                </div>
                                </div>
                            </div>
                            <div className="col-6 col-lg-4">
                                <div className="product">
                                <figure className="product-image">
                                    <a href="#!">
                                    <img src="assets/images/demo/product-4.jpg" alt="Image" />
                                    <img src="assets/images/demo/product-4-2.jpg" alt="Image" />
                                    </a>
                                </figure>
                                <div className="product-meta">
                                    <h3 className="product-title"><a href="#!">Red Analog Magazine Rack</a></h3>
                                    <div className="product-price">
                                    <span>$120</span>
                                    <span className="product-action">
                                        <a href="#!">Add to cart</a>
                                    </span>
                                    </div>
                                    <a href="#!" className="product-like"></a>
                                </div>
                                </div>
                            </div>
                            <div className="col-6 col-lg-4">
                                <div className="product">
                                <figure className="product-image">
                                    <a href="#!">
                                    <img src="assets/images/demo/product-5.jpg" alt="Image" />
                                    <img src="assets/images/demo/product-5-2.jpg" alt="Image" />
                                    </a>
                                </figure>
                                <div className="product-meta">
                                    <h3 className="product-title"><a href="#!">Black Piani Table Lamp</a></h3>
                                    <div className="product-price">
                                    <span>$290</span>
                                    <span className="product-action">
                                        <a href="#!">Add to cart</a>
                                    </span>
                                    </div>
                                    <a href="#!" className="product-like"></a>
                                </div>
                                </div>
                            </div>
                            <div className="col-6 col-lg-4">
                                <div className="product">
                                <figure className="product-image">
                                    <a href="#!">
                                    <img src="assets/images/demo/product-6.jpg" alt="Image" />
                                    <img src="assets/images/demo/product-6-2.jpg" alt="Image" />
                                    </a>
                                </figure>
                                <div className="product-meta">
                                    <h3 className="product-title"><a href="#!">Grey Pendant Bell Lamp</a></h3>
                                    <div className="product-price">
                                    <span>$258</span>
                                    <span className="product-action">
                                        <a href="#!">Add to cart</a>
                                    </span>
                                    </div>
                                    <a href="#!" className="product-like"></a>
                                </div>
                                </div>
                            </div>
                            <div className="col-6 col-lg-4">
                                <div className="product">
                                <figure className="product-image">
                                    <a href="#!">
                                    <img src="assets/images/demo/product-7.jpg" alt="Image" />
                                    <img src="assets/images/demo/product-7-2.jpg" alt="Image" />
                                    </a>
                                </figure>
                                <div className="product-meta">
                                    <h3 className="product-title"><a href="#!">Garnet Must Sofa</a></h3>
                                    <div className="product-price">
                                    <span>$4,668</span>
                                    <span className="product-action">
                                        <a href="#!">Add to cart</a>
                                    </span>
                                    </div>
                                    <a href="#!" className="product-like"></a>
                                </div>
                                </div>
                            </div>
                            </div>
                            <div className="row">
                            <div className="col">
                                <nav className="d-inline-block">
                                <ul className="pagination">
                                    <li className="page-item active"><a className="page-link" href="#!">1 <span className="sr-only">(current)</span></a></li>
                                    <li className="page-item" aria-current="page"><a className="page-link" href="#!">2</a></li>
                                    <li className="page-item"><a className="page-link" href="#!">3</a></li>
                                    <li className="page-item"><a className="page-link" href="#!">4</a></li>
                                </ul>
                                </nav>
                            </div>
                            </div>
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
