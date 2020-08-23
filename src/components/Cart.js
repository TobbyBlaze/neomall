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
            .post('https://neomallapi.herokuapp.com/api/auth/order', this.state,
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

    logoutHandler = e => {
        e.preventDefault()
        // console.log(this.state)
        // console.log($('meta[name="csrf-token"]').attr('content'))
        var a=localStorage.getItem("authen");
        

        axios
            // .get('http://localhost/yummypizza/public/api/auth/logout',{
            .get('https://neomallapi.herokuapp.com/api/auth/logout',{
                headers: {

                    // 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+a,
                    // 'withCredentials': true
                }
            })
            .then(response => {
                // console.log(response);
                localStorage.clear("authen");
                var a=null;
                console.log(a);
                window.location.href = "https://neomall.herokuapp.com"
            })
            .catch(error => {
                // console.log(error)
            })
    }

    componentDidMount(){
        var a=localStorage.getItem("authen");
        // const { match: { params } } = this.props;
        if(a){
        axios

            // .get('http://localhost/yummypizza/public/api/auth/shcart', {
            .get('https://neomallapi.herokuapp.com/api/auth/shcart', {
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
        }else{
            window.location.href = "https://neomall.herokuapp.com/portal";
        }

    }

    render(){
        const { carts, errorMsg, subtotal, total } = this.state;
        const { id, subprice, cart_id, name, description, price, category, quantity } = this.state;

        var a=localStorage.getItem("authen");
        if(a == null){
            var auth = false;
        }else{
            var auth = true;
        }
        
        return(
            <div>
                <div>
                    {/* <!-- header --> */}
                    <header className="header header-dark header-sticky">
                    <div className="container">
                        <div className="row">
                        <nav className="navbar navbar-expand-lg navbar-dark">
                            <Link to="/" className="navbar-brand order-1 order-lg-2"><img src="assets/images/logo.svg" alt="Logo" /></Link>
                            <button className="navbar-toggler order-2" type="button" data-toggle="collapse" data-target=".navbar-collapse" aria-controls="navbarMenu" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                            </button>

                            <div className="collapse navbar-collapse order-3 order-lg-1" id="navbarMenu">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item dropdown">
                                <Link className="nav-link" to="/">
                                    Home
                                </Link>
                                </li>
                                <li className="nav-item dropdown">
                                <Link className="nav-link" to="/store">
                                    Stores
                                </Link>
                                </li>
                                <li className="nav-item dropdown">
                                <Link className="nav-link" to="/profile">
                                    Profile
                                </Link>
                                </li>
                            </ul>
                            </div>

                            <div className="collapse navbar-collapse order-4 order-lg-3" id="navbarMenu2">
                            <ul className="navbar-nav ml-auto">
                            
                                {auth?
                                    <li className="nav-item">
                                        <Link className="nav-link" onClick={this.logoutHandler}>Log out</Link>
                                    </li>
                                :
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/portal">Log In</Link>
                                    </li>
                                }
                                
                                <li className="nav-item">
                                <Link data-toggle="modal" to="" data-target="#search" className="nav-link"><i className="icon-search"></i></Link>
                                </li>
                                <li className="nav-item cart">
                                <Link data-toggle="modal" to="" data-target="#cart" className="nav-link"><span>Cart</span><span>2</span></Link>
                                </li>
                            </ul>
                            </div>
                        </nav>
                        </div>
                    </div>
                    </header>

                    {/* <!-- cart --> */}
                    <div className="modal fade sidebar" id="cart" tabIndex="-1" role="dialog" aria-labelledby="cartLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="cartLabel">Cart</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">

                            <div className="row gutter-3">
                            <div className="col-12">
                                <div className="cart-item cart-item-sm">
                                <div className="row align-items-center">
                                    <div className="col-lg-9">
                                    <div className="media media-product">
                                        <Link to="#!"><img src="assets/images/demo/product-3.jpg" alt="Image" /></Link>
                                        <div className="media-body">
                                        <h5 className="media-title">Black IC Pendant Light</h5>
                                        <span className="media-subtitle">Black, Steel</span>
                                        </div>
                                    </div>
                                    </div>
                                    <div className="col-lg-3 text-center text-lg-right">
                                    <span className="cart-item-price">$90</span>
                                    </div>
                                    <Link to="#!" className="cart-item-close"><i className="icon-x"></i></Link>
                                </div>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="cart-item cart-item-sm">
                                <div className="row align-items-center">
                                    <div className="col-lg-9">
                                    <div className="media media-product">
                                        <Link to="#!"><img src="assets/images/demo/product-4.jpg" alt="Image" /></Link>
                                        <div className="media-body">
                                        <h5 className="media-title">Red Analog Magazine Rack</h5>
                                        <span className="media-subtitle">Red</span>
                                        </div>
                                    </div>
                                    </div>
                                    <div className="col-lg-3 text-center text-lg-right">
                                    <span className="cart-item-price">$120</span>
                                    </div>
                                    <Link to="#!" className="cart-item-close"><i className="icon-x"></i></Link>
                                </div>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="cart-item cart-item-sm">
                                <div className="row align-items-center">
                                    <div className="col-lg-9">
                                    <div className="media media-product">
                                        <Link to="#!"><img src="assets/images/demo/product-24.jpg" alt="Image" /></Link>
                                        <div className="media-body">
                                        <h5 className="media-title">Closca Helmet</h5>
                                        <span className="media-subtitle">Black</span>
                                        </div>
                                    </div>
                                    </div>
                                    <div className="col-lg-3 text-center text-lg-right">
                                    <span className="cart-item-price">$132</span>
                                    </div>
                                    <Link to="#!" className="cart-item-close"><i className="icon-x"></i></Link>
                                </div>
                                </div>
                            </div>
                            </div>
                            
                        </div>
                        <div className="modal-footer">
                            <div className="container-fluid">
                            <div className="row gutter-0">
                                <div className="col d-none d-md-block">
                                <Link to="cart.html" className="btn btn-lg btn-block btn-secondary">View Cart</Link>
                                </div>
                                <div className="col">
                                <Link to="checkout.html" className="btn btn-lg btn-block btn-primary">Checkout</Link>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>


                    {/* <!-- search --> */}
                    <div className="modal fade search" id="search" tabIndex="-1" role="dialog" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                        <div className="modal-header">
                            <input type="text" className="form-control" placeholder="Type your search here" aria-label="Type your search here" aria-describedby="button-addon2" />
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        </div>
                    </div>
                    </div>

                </div>
                

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


                {/* <Footer /> */}
            </div>
        )
    }
}

if (document.getElementById('Cart')) {
    ReactDOM.render(<Cart />, document.getElementById('Cart'));
}
