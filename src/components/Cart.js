import React, { Component } from 'react'
import axios from 'axios'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'

import Header from './Header';
import Footer from './Footer';

export default class Cart extends Component{
    constructor(props){
        super(props);

        this.state = {
            
            carts: [],
            subprice: '',
            price: '',
            
            subtotal: '',
            tootal: '',

            order: {
                // file : '',
                cart_id: '',
                name : '',
                description : '',
                subprice: '',
                price : '',
                category : '',
                quantity : '',
            },
            errorMsg: ''
            
        }
    }

    check = e => {
        e.preventDefault()
        var a=localStorage.getItem("authen");
        // console.log(this.state);

        axios
            // .post('http://localhost/yummypizza/public/api/auth/order', this.state,
            .post('https://damp-island-72638.herokuapp.com/api/auth/order', this.state,
            {
               
                headers: {
                    // 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+a,
                    // 'withCredentials': true
                }
            })
            .then(response => {
                // console.log(response)
            })
            .catch(error => {
                // console.log(error)
            })
    }

    componentDidMount(){
        var a=localStorage.getItem("authen");
        // const { match: { params } } = this.props;
        axios

            // .get('http://localhost/yummypizza/public/api/auth/shcart', {
            .get('https://damp-island-72638.herokuapp.com/api/auth/shcart', {
                headers: {
                    // 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+a,
                    // 'withCredentials': true
                }
            })
            .then(response => {
                // console.log(response.data.carts.data);
                this.setState({ carts: response.data.carts.data });
                var c = this.state.carts.map((cart, i)=> cart.price);
                var q = this.state.carts.map((cart, i)=> cart.quantity);
                var sum = parseInt(c) * parseInt(q);
                // var subprice = cart.subprice;
                // var price = cart.price;
                // this.setState({ subprice: c });
                // this.setState({ price: sum });

                // console.log(sum)
                // console.log(q)
                // console.log(c);
            })
            .catch(error => {
                // console.log(error)
                this.setState({errorMsg: 'Error retrieving data'})
            })

    }

    render(){
        const { carts, errorMsg, subtotal, total } = this.state;
        const { id, subprice, cart_id, name, description, price, category, quantity } = this.state;
        
        return(
            <div>
                <Header />
                
                {/* <!-- hero --> */}
                <section className="hero">
                <div className="container">
                    <div className="row">
                    <div className="col text-center">
                        <h1>Your Cart</h1>
                    </div>
                    </div>
                </div>
                </section>

                <section className="pt-0">
                <div className="container">
                    <div className="row mb-0 d-none d-lg-flex">
                    <div className="col">
                        <div className="row pr-6">
                        <div className="col-lg-6"><span className="eyebrow">Product</span></div>
                        <div className="col-lg-2 text-center"><span className="eyebrow">Price</span></div>
                        <div className="col-lg-2 text-center"><span className="eyebrow">Quantity</span></div>
                        <div className="col-lg-2 text-center"><span className="eyebrow">Total</span></div>
                        </div>
                    </div>
                    </div>
                    <div className="row">

                    <div className="col cart-item-list cart-item-list-minimal">

                        {/* <!-- cart item --> */}
                        <div className="cart-item">
                        <div className="row align-items-center">
                            <div className="col-12 col-lg-6">
                            <div className="media media-product">
                                <a href="#!"><img src="assets/images/demo/product-4.jpg" alt="Image" /></a>
                                <div className="media-body">
                                <h5 className="media-title">Analog Magazine Rack</h5>
                                <span className="small">Red</span>
                                </div>
                            </div>
                            </div>
                            <div className="col-4 col-lg-2 text-center">
                            <span className="cart-item-price">$120</span>
                            </div>
                            <div className="col-4 col-lg-2 text-center">
                            <div className="counter">
                                <span className="counter-minus icon-minus" field='qty-1'></span>
                                <input type='text' name='qty-1' className="counter-value" value="2" min="1" max="10" />
                                <span className="counter-plus icon-plus" field='qty-1'></span>
                            </div>
                            </div>
                            <div className="col-4 col-lg-2 text-center">
                            <span className="cart-item-price">$240</span>
                            </div>
                            <a href="#!" className="cart-item-close"><i className="icon-x"></i></a>
                        </div>
                        </div>

                        {/* <!-- cart item --> */}
                        <div className="cart-item">
                        <div className="row align-items-center">
                            <div className="col-12 col-lg-6">
                            <div className="media media-product">
                                <a href="#!"><img src="assets/images/demo/product-24.jpg" alt="Image" /></a>
                                <div className="media-body">
                                <h5 className="media-title">Closca helmet</h5>
                                <span className="small">Black</span>
                                </div>
                            </div>
                            </div>
                            <div className="col-4 col-lg-2 text-center">
                            <span className="cart-item-price">$132</span>
                            </div>
                            <div className="col-4 col-lg-2 text-center">
                            <div className="counter">
                                <span className="counter-minus icon-minus" field='qty-2'></span>
                                <input type='text' name='qty-2' className="counter-value" value="1" min="1" max="10" />
                                <span className="counter-plus icon-plus" field='qty-2'></span>
                            </div>
                            </div>
                            <div className="col-4 col-lg-2 text-center">
                            <span className="cart-item-price">$132</span>
                            </div>
                            <a href="#!" className="cart-item-close"><i className="icon-x"></i></a>
                        </div>
                        </div>

                        {/* <!-- cart item --> */}
                        <div className="cart-item">
                        <div className="row align-items-center">
                            <div className="col-12 col-lg-6">
                            <div className="media media-product">
                                <a href="#!"><img src="assets/images/demo/product-25.jpg" alt="Image" /></a>
                                <div className="media-body">
                                <h5 className="media-title">Sigg Water Bottle</h5>
                                <span className="small">Gravel Black</span>
                                </div>
                            </div>
                            </div>
                            <div className="col-4 col-lg-2 text-center">
                            <span className="cart-item-price">$23</span>
                            </div>
                            <div className="col-4 col-lg-2 text-center">
                            <div className="counter">
                                <span className="counter-minus icon-minus" field='qty-3'></span>
                                <input type='text' name='qty-3' className="counter-value" value="2" min="1" max="10" />
                                <span className="counter-plus icon-plus" field='qty-3'></span>
                            </div>
                            </div>
                            <div className="col-4 col-lg-2 text-center">
                            <span className="cart-item-price">$46</span>
                            </div>
                            <a href="#!" className="cart-item-close"><i className="icon-x"></i></a>
                        </div>
                        </div>

                    </div>

                    </div>
                    <div className="row justify-content-between">
                    <div className="col-md-6 col-lg-4">
                        <div className="inline-block">
                        <span className="eyebrow">Total</span>
                        <h4 className="h2">$418</h4>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-4">
                        <div className="input-group">
                        <input type="text" className="form-control" placeholder="Coupon Code" aria-label="Coupon" />
                        <div className="input-group-append">
                            <button type="button" className="btn btn-secondary btn-ico"><i className="icon-arrow-right"></i></button>
                        </div>
                        </div>
                        <a href="checkout.html" className="btn btn-lg btn-primary btn-block mt-1">Checkout</a>
                    </div>
                    </div>
                </div>
                </section>


                <Footer />
            </div>
        )
    }
}

if (document.getElementById('Cart')) {
    ReactDOM.render(<Cart />, document.getElementById('Cart'));
}
