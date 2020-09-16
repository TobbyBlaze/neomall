import React, { Component } from 'react'
import axios from 'axios'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'
import { Lines, Circle2 } from 'react-preloaders'

import Header from './Header';
import Footer from './Footer';

export default class Checkout extends Component{
    constructor(props){
        super(props);

        this.state = {
            carts: [],
            total: '',
            subtotal: '',
            // id: '',
            // name: '',
            first_name: '',
            last_name: '', 
            country: '', 
            address1: '', 
            address2: '', 
            city: '', 
            state: '', 
            zip: '', 
            phone: '', 
            email: '',
            loading: true
        }
    }


    changeHandler = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    order = e => {
        e.preventDefault()
        var a=localStorage.getItem("authen");
        console.log("All states");
        console.log(this.state);

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
                console.log("response");
                console.log(response)
                // this.setState({ order: response.data.cart.data })
                window.location.href = "https://damp-island-72638.herokuapp.com/thanks"
            })
            .catch(error => {
                console.log(error)
            })
    }

    logoutHandler = e => {
        e.preventDefault()
        // console.log(this.state)
        // console.log($('meta[name="csrf-token"]').attr('content'))
        var a=localStorage.getItem("authen");
        
        if(a){
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
        }else{
            window.location.href = "https://neomall.herokuapp.com/portal";
        }
    }


    componentDidMount(){
        var a=localStorage.getItem("authen");
        // const { match: { params } } = this.props;
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
                console.log(response.data.carts.data);
                this.setState({ carts: response.data.carts.data });
                var c = this.state.carts.map((cart, i)=> cart.price);
                var sum = c.reduce(function(a,b){return a+b;})
                this.setState({ subtotal: sum });
                this.setState({ total: sum });
                console.log(sum);
                this.setState({ loading: false })
            })
            .catch(error => {
                console.log(error)
                this.setState({errorMsg: 'Error retrieving data'})
                this.setState({ loading: false })
            })

    }

    render(){
        const { subtotal, total, carts, first_name, last_name, country, address1, address2, city, state, zip, phone, email, loading } = this.state
        
        var a=localStorage.getItem("authen");
        if(a == null){
            var auth = false;
        }else{
            var auth = true;
        }

        return(
            <div>
                <Circle2 customLoading={loading} color={'#ffffff'} background="#000000" animation="slide-right" />
                <div>
                    {/* <!-- header --> */}
                    <header className="header header-dark header-sticky">
                    <div className="container">
                        <div className="row">
                        <nav className="navbar navbar-expand-lg navbar-dark">
                            <Link to="/" className="navbar-brand order-1 order-lg-2"><img src="https://neomall.herokuapp.com/assets/images/logo.svg" alt="Logo" /></Link>
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
                            {carts.map((cart, i)=>
                            <div key={cart.id} className="col-12">
                                <div className="cart-item cart-item-sm">
                                <div className="row align-items-center">
                                    <div className="col-lg-9">
                                    <div className="media media-product">
                                        <Link to="#!"><img src="https://neomall.herokuapp.com/assets/images/demo/product-3.jpg" alt="Image" /></Link>
                                        <div className="media-body">
                                        <h5 className="media-title">{cart.name}</h5>
                                        {/* <span className="media-subtitle">Black, Steel</span> */}
                                        </div>
                                    </div>
                                    </div>
                                    <div className="col-lg-3 text-center text-lg-right">
                                    <span className="cart-item-price">${cart.price}</span>
                                    </div>
                                    <form onSubmit={this.deleteCart} >
                                        <input type="hidden" name="delcart" value={cart.id} onChange={this.changeHandler} />
                                        <button type="submit" className="cart-item-close"><i className="icon-x"></i></button>
                                    </form>
                                    {/* <Link to="#!" className="cart-item-close"><i className="icon-x"></i></Link> */}
                                </div>
                                </div>
                            </div>
                            )}
                            </div>
                        </div>

                        <div className="modal-footer">
                            <div className="container-fluid">
                            <div className="row gutter-0">
                                {/* <div className="col d-none d-md-block">
                                <a href="cart.html" className="btn btn-lg btn-block btn-secondary">View Cart</a>
                                </div> */}
                                <div className="col">
                                <a href="checkout" className="btn btn-lg btn-block btn-primary">Checkout</a>
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
                

                {/* <!-- breadcrumbs --> */}
                <section className="breadcrumbs separator-bottom">
                <div className="container">
                    <div className="row">
                    <div className="col">
                        <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="index-2.html">Home</a></li>
                            <li className="breadcrumb-item"><a href="listing-sidebar.html">Shop</a></li>
                            <li className="breadcrumb-item active" aria-current="page">Checkout</li>
                        </ol>
                        </nav>
                    </div>
                    </div>
                </div>
                </section>

                {/* <!-- hero --> */}
                <section>
                <div className="container">
                    <div className="row">
                    <div className="col text-center">
                        <h1>Checkout</h1>
                    </div>
                    </div>
                </div>
                </section>

                <section className="no-overflow pt-0">
                <div className="container">
                    <div className="row gutter-4 justify-content-between">


                    <div className="col-lg-8">

                        {/* <!-- delivery --> */}
                        <div className="row align-items-end mb-2">
                        <div className="col-md-6">
                            <h2 className="h3 mb-0"><span className="text-muted">01.</span> Address</h2>
                        </div>
                        <div className="col-md-6 text-md-right">
                            <a className="eyebrow unedrline action" data-toggle="modal" data-target="#addresses">My Addresses</a>
                        </div>
                        </div>
                        <div className="row gutter-1 mb-6">
                        <div className="form-group col-md-6">
                            <label htmlFor="firstName">First Name</label>
                            <input type="text" className="form-control" id="firstName" placeholder="" name="first_name" value={first_name} onChange={this.changeHandler} />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="lastName">Last Name</label>
                            <input type="text" className="form-control" id="lastName" placeholder="" name="last_name" value={last_name} onChange={this.changeHandler} />
                        </div>
                        <div className="form-group col">
                            <label htmlFor="telephone">Telephone</label>
                            <input type="text" className="form-control" id="telephone" placeholder="" name="phone" value={phone} onChange={this.changeHandler} />
                        </div>
                        <div className="form-group col-md-4">
                            <label htmlFor="country">Country</label>
                            <input type="text" className="form-control" id="country" placeholder="" name="country" value={country} onChange={this.changeHandler} />
                        </div>
                        <div className="form-group col-md-4">
                            <label htmlFor="city">City</label>
                            <input type="text" className="form-control" id="city" placeholder="" name="city" value={city} onChange={this.changeHandler} />
                        </div>
                        <div className="form-group col-md-4">
                            <label htmlFor="postcode">Postcode</label>
                            <input type="text" className="form-control" id="postcode" placeholder="" name="zip" value={zip} onChange={this.changeHandler} />
                        </div>
                        <div className="form-group col-md-8">
                            <label htmlFor="address">Address</label>
                            <input type="text" className="form-control" id="address" placeholder="" name="address1" value={address1} onChange={this.changeHandler} />
                        </div>
                        </div>

                        {/* <!-- payment --> */}
                        <div className="row align-items-end mb-2">
                        <div className="col-md-6">
                            <h2 className="h3 mb-0"><span className="text-muted">02.</span> Payment</h2>
                        </div>
                        <div className="col-md-6 text-md-right">
                            <a className="eyebrow unedrline action" data-toggle="modal" data-target="#payments">My payment methods</a>
                        </div>
                        </div>
                        <div className="row gutter-1 mb-6">
                        <div className="col-12 pb-1">
                            <ul className="nav nav-tabs lavalamp" id="myTab" role="tablist">
                            <li className="nav-item">
                                <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Credit Card</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">PayPal</a>
                            </li>
                            </ul>
                        </div>
                        <div className="col-12">
                            <div className="tab-content" id="myTabContent">
                            <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                <div className="row gutter-1">
                                <div className="form-group col-12">
                                    <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="basic-addon1"><i className="icon-credit-card"></i></span>
                                    </div>
                                    <input type="tel" className="form-control" placeholder="Card Number" aria-label="Username" aria-describedby="basic-addon1" />
                                    </div>
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="nameOnCard">Name on Card</label>
                                    <input type="text" className="form-control" id="nameOnCard" placeholder="" />
                                </div>
                                <div className="form-group col-md-3">
                                    <label htmlFor="month">Month</label>
                                    <input type="date" className="form-control" id="month" />
                                </div>
                                <div className="form-group col-md-3">
                                    <label htmlFor="cvv">CVV</label>
                                    <input type="password" className="form-control" id="cvv" placeholder="" />
                                </div>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                <div className="row gutter-1">
                                <div className="form-group col-md-8">
                                    <input type="email" className="form-control" id="mail" placeholder="Email" />
                                </div>
                                <div className="form-group col-md-4">
                                    <a href="#!" className="btn btn-block btn-secondary">Pay with paypal</a>
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="custom-control custom-switch mb-2">
                            <input type="checkbox" className="custom-control-input" id="customSwitch1" />
                            <label className="custom-control-label text-muted" htmlFor="customSwitch1">Billing address same as delivery.</label>
                            </div>
                        </div>
                        </div>

                        {/* <!-- shipping --> */}
                        <div className="row align-items-end mb-2">
                        <div className="col-md-6">
                            <h2 className="h3 mb-0"><span className="text-muted">03.</span> Shipping</h2>
                        </div>
                        </div>
                        <div className="row gutter-1">
                        <div className="col-md-6">
                            <div className="custom-control custom-choice">
                            <input type="radio" name="choice-shipping" className="custom-control-input" id="choice-shipping-1" />
                            <label className="custom-control-label text-dark" htmlFor="choice-shipping-1">
                                <span className="d-flex justify-content-between mb-1 eyebrow">Standard <span className="text-muted">Free</span></span>
                                Estimated 10-20 days shipping. Lorem Ipsum is simply dummy text of the printing and typesetting.
                            </label>
                            <span className="choice-indicator"></span>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="custom-control custom-choice">
                            <input type="radio" name="choice-shipping" className="custom-control-input" id="choice-shipping-2" />
                            <label className="custom-control-label text-dark" htmlFor="choice-shipping-2">
                                <span className="d-flex justify-content-between mb-1 eyebrow">Express <span className="text-muted">$49</span></span>
                                Estimated 10-20 days shipping. Lorem Ipsum is simply dummy text of the printing and typesetting.
                            </label>
                            <span className="choice-indicator"></span>
                            </div>
                        </div>
                        </div>
                    </div>


                    <aside className="col-lg-4">
                        <div className="row">

                        {/* <!-- order preview --> */}
                        <div className="col-12">
                            <div className="card card-data bg-light">
                            <div className="card-header py-2 px-3">
                                <div className="row align-items-center">
                                <div className="col">
                                    <h3 className="fs-18 mb-0">Your Cart</h3>
                                </div>
                                <div className="col text-right">
                                    <a href="cart.html" className="underline eyebrow">Edit</a>
                                </div>
                                </div>
                            </div>
                            <div className="card-body">
                                <ul className="list-group list-group-line">
                                <li className="list-group-item d-flex justify-content-between text-dark align-items-center">
                                    Analog Magazine Rack x2
                                    <span>$240</span>
                                </li>
                                <li className="list-group-item d-flex justify-content-between text-dark align-items-center">
                                    Closca Helmet
                                    <span>$132</span>
                                </li>
                                <li className="list-group-item d-flex justify-content-between text-dark align-items-center">
                                    Sigg Water Bottle x2
                                    <span>$46</span>
                                </li>
                                </ul>
                            </div>
                            </div>
                        </div>

                        {/* <!-- order summary --> */}
                        <div className="col-12 mt-1">
                            <div className="card card-data bg-light">
                            <div className="card-header py-2 px-3">
                                <div className="row align-items-center">
                                <div className="col">
                                    <h3 className="fs-18 mb-0">Order Summary</h3>
                                </div>
                                </div>
                            </div>
                            <div className="card-body">
                                <ul className="list-group list-group-minimal">
                                <li className="list-group-item d-flex justify-content-between align-items-center">
                                    Subtotal
                                    <span>$418</span>
                                </li>
                                <li className="list-group-item d-flex justify-content-between align-items-center">
                                    Shipping
                                    <span>Free</span>
                                </li>
                                <li className="list-group-item d-flex justify-content-between align-items-center">
                                    Discount
                                    <span>-25%</span>
                                </li>
                                </ul>
                            </div>
                            <div className="card-footer py-2">
                                <ul className="list-group list-group-minimal">
                                <li className="list-group-item d-flex justify-content-between align-items-center text-dark fs-18">
                                    Total
                                    <span>$313,5</span>
                                </li>
                                </ul>
                            </div>
                            </div>
                        </div>

                        {/* <!-- place order --> */}
                        <div className="col-12 mt-1">
                            <a href="#!" className="btn btn-primary btn-lg btn-block">Place Order</a>
                        </div>

                        </div>
                    </aside>

                    </div>
                </div>

                </section>

                <form action="/charge" method="POST">
                    <script
                            src="https://checkout.stripe.com/checkout.js" className="stripe-button"
                            // data-key="{{ env('STRIPE_PUB_KEY') }}"
                            data-key="pk_test_cQpWfd9LiCh47WuMzQNssAlU00JASuUqEy"
                            data-amount="1999"
                            data-name="Stripe Demo"
                            data-description="Online course about integrating Stripe"
                            data-image="https://stripe.com/img/documentation/checkout/marketplace.png"
                            data-locale="auto"
                            data-currency="usd">
                    </script>
                </form>


                {/* <Footer /> */}
            </div>
        )
    }
}



if (document.getElementById('checkout')) {
    ReactDOM.render(<Checkout />, document.getElementById('checkout'));
}
