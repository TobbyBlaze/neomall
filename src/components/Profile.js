import React, { Component } from 'react'
import axios from 'axios'
import ReactDOM from 'react-dom'
import { Link, useParams } from 'react-router-dom'

import Header from './Header';
import Footer from './Footer';

export default class Profile extends Component{
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
            .post('https://neomallapi.com/api/auth/storecart', this.state.good, {
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
        if(a){
        axios

            // .get('http://localhost/yummypizza/public/api/auth', {
            .get('https://neomallapi.herokuapp.com/api/auth', {
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
        }else{
            window.location.href = "https://neomall.herokuapp.com/portal";
        }

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
                <section className="hero hero-small bg-purple text-white">
                    <div className="container">
                        <div className="row gutter-2 gutter-md-4 align-items-end">
                        <div className="col-md-6 text-center text-md-left">
                            <h1 className="mb-0">Michael Campbell</h1>
                            <span className="text-muted">New York, USA</span>
                        </div>
                        <div className="col-md-6 text-center text-md-right">
                            <a href="#!" className="btn btn-sm btn-outline-white">Sign out</a>
                        </div>
                        </div>
                    </div>
                </section>



                {/* <!-- listing --> */}
               <section className="pt-5">
                    <div className="container">
                        <div className="row gutter-4 justify-content-between">


                        {/* <!-- sidebar --> */}
                        <aside className="col-lg-3">
                            <div className="nav nav-pills flex-column lavalamp" id="sidebar-1" role="tablist">
                            <a className="nav-link active" data-toggle="tab" href="#sidebar-1-1" role="tab"  aria-controls="sidebar-1" aria-selected="true">Profile</a>
                            <a className="nav-link" data-toggle="tab" href="#sidebar-1-2" role="tab" aria-controls="sidebar-1-2" aria-selected="false">Orders</a>
                            <a className="nav-link" data-toggle="tab" href="#sidebar-1-3" role="tab" aria-controls="sidebar-1-3" aria-selected="false">Addresses</a>
                            <a className="nav-link" data-toggle="tab" href="#sidebar-1-4" role="tab" aria-controls="sidebar-1-4" aria-selected="false">Payments</a>
                            <a className="nav-link" data-toggle="tab" href="#sidebar-1-5" role="tab" aria-controls="sidebar-1-5" aria-selected="false">Wishlist</a>
                            </div>
                        </aside>
                        {/* <!-- / sidebar --> */}

                        {/* <!-- content --> */}
                        <div className="col-lg-9">
                            <div className="row">
                            <div className="col">
                                <div className="tab-content" id="myTabContent">

                                {/* <!-- profile --> */}
                                <div className="tab-pane fade show active" id="sidebar-1-1" role="tabpanel" aria-labelledby="sidebar-1-1">
                                    <div className="row mb-2">
                                    <div className="col-12">
                                        <h3>Personal Data</h3>
                                    </div>
                                    </div>
                                    <div className="row gutter-1">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                        <label htmlFor="exampleInput1">First Name</label>
                                        <input id="exampleInput1" type="text" className="form-control" placeholder="First name" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                        <label htmlFor="exampleInput2">Last Name</label>
                                        <input id="exampleInput2" type="text" className="form-control" placeholder="Last name" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                        <label htmlFor="exampleInput3">City</label>
                                        <input id="exampleInput3" type="text" className="form-control" placeholder="City" />
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="form-group">
                                        <label htmlFor="exampleInput4">Street</label>
                                        <input id="exampleInput4" type="text" className="form-control" placeholder="Street" />
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="form-group">
                                        <label htmlFor="exampleInput5">Zip</label>
                                        <input id="exampleInput5" type="text" className="form-control" placeholder="Zip" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                        <label htmlFor="exampleInput6">Telephone</label>
                                        <input id="exampleInput6" type="text" className="form-control" placeholder="Telephone" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                        <label htmlFor="exampleInput7">Email</label>
                                        <input id="exampleInput7" type="text" className="form-control" placeholder="Email" />
                                        </div>
                                    </div>
                                    </div>


                                    <div className="row mb-2 mt-6">
                                    <div className="col-12">
                                        <h3>Password</h3>
                                    </div>
                                    </div>
                                    <div className="row gutter-1">
                                    <div className="col-12">
                                        <div className="form-group">
                                        <label htmlFor="exampleInput8">Old Password</label>
                                        <input id="exampleInput8" type="password" className="form-control" placeholder="Password" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                        <label htmlFor="exampleInput9">New Password</label>
                                        <input id="exampleInput9" type="password" className="form-control" placeholder="Password" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                        <label htmlFor="exampleInput10">Retype New Password</label>
                                        <input id="exampleInput10" type="password" className="form-control" placeholder="Password" />
                                        </div>
                                    </div>
                                    </div>

                                    <div className="row">
                                    <div className="col">
                                        <a href="#!" className="btn btn-primary">Save Changes</a>
                                    </div>
                                    </div>
                                </div>

                                {/* <!-- orders --> */}
                                <div className="tab-pane fade" id="sidebar-1-2" role="tabpanel" aria-labelledby="sidebar-1-2">
                                    <div className="row">
                                        <div className="col-12">
                                            <h3 className="mb-0">Orders</h3>
                                        <span className="eyebrow">8 Items</span>
                                        </div>
                                    </div>
                                    <div className="row gutter-2">
                                    <div className="col-12">
                                        <div className="order">
                                        <div className="row align-items-center">
                                            <div className="col-lg-4">
                                            <h3 className="order-number">Order 451534</h3>
                                            <a href="#!" className="action eyebrow underline">View Order</a>
                                            </div>
                                            <div className="col-lg-4">
                                            <span className="order-status sent">Shipped on 15 Apr, 2019</span>
                                            </div>
                                            <div className="col-lg-4">
                                            <ul className="order-preview justify-content-end">
                                                <li><a href="product-1.html" title="Fawn Wool / Natural Mammoth Chair" data-toggle="tooltip" data-placement="top"><img src="assets/images/demo/product-1.jpg" alt="Fawn Wool / Natural Mammoth Chair" /></a></li>
                                                <li><a href="product-1.html" title="Dark Stained NY11 Dining Chair" data-toggle="tooltip" data-placement="top"><img src="assets/images/demo/product-2.jpg" alt="Dark Stained NY11 Dining Chair" /></a></li>
                                            </ul>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="order">
                                        <div className="row align-items-center">
                                            <div className="col-lg-4">
                                            <h3 className="order-number">Order 165342</h3>
                                            <a href="#!" className="action eyebrow underline">View Order</a>
                                            </div>
                                            <div className="col-lg-4">
                                            <span className="order-status canceled">Canceled</span>
                                            </div>
                                            <div className="col-lg-4">
                                            <ul className="order-preview justify-content-end">
                                                <li><a href="product-1.html" title="Red Analog Magazine Rack" data-toggle="tooltip" data-placement="top"><img src="assets/images/demo/product-4.jpg" alt="Red Analog Magazine Rack" /></a></li>
                                                <li><a href="product-1.html" title="Black Piani Table Lamp" data-toggle="tooltip" data-placement="top"><img src="assets/images/demo/product-5.jpg" alt="Black Piani Table Lamp" /></a></li>
                                                <li><a href="product-1.html" title="Grey Pendant Bell Lamp" data-toggle="tooltip" data-placement="top"><img src="assets/images/demo/product-6.jpg" alt="Grey Pendant Bell Lamp" /></a></li>
                                            </ul>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="order">
                                        <div className="row align-items-center">
                                            <div className="col-lg-4">
                                            <h3 className="order-number">Order 524312</h3>
                                            <a href="#!" className="action eyebrow underline">View Order</a>
                                            </div>
                                            <div className="col-lg-4">
                                            <span className="order-status">In Progress</span>
                                            </div>
                                            <div className="col-lg-4">
                                            <ul className="order-preview justify-content-end">
                                                <li><a href="product-1.html" title="Black Low Curve Iceman Trimix Sneakers" data-toggle="tooltip" data-placement="top"><img src="assets/images/demo/product-11.jpg" alt="Black Low Curve Iceman Trimix Sneakers" /></a></li>
                                            </ul>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                    </div>
                                    <div className="row">
                                    <div className="col">
                                        <ul className="pagination">
                                        <li className="page-item active"><a className="page-link" href="#!">1 <span className="sr-only">(current)</span></a></li>
                                        <li className="page-item" aria-current="page"><a className="page-link" href="#!">2</a></li>
                                        <li className="page-item"><a className="page-link" href="#!">3</a></li>
                                        <li className="page-item"><a className="page-link" href="#!">4</a></li>
                                        </ul>
                                    </div>
                                    </div>
                                </div>

                                {/* <!-- addresses --> */}
                                <div className="tab-pane fade" id="sidebar-1-3" role="tabpanel" aria-labelledby="sidebar-1-3">
                                    <div className="row">
                                    <div className="col">
                                        <h3 className="mb-0">Addresses</h3>
                                        <span className="eyebrow">2 Entry</span>
                                    </div>
                                    </div>
                                    <div className="row gutter-2">
                                    <div className="col-md-6">
                                        <div className="card card-data">
                                        <div className="card-header card-header-options">
                                            <div className="row align-items-center">
                                            <div className="col">
                                                <h3 className="card-title">Address 1</h3>
                                            </div>
                                            <div className="col text-right">
                                                <div className="dropdown">
                                                <button id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" type="button" className="btn btn-lg btn-secondary btn-ico"><i className="icon-more-vertical"></i></button>
                                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                    <li>
                                                    <a className="dropdown-item" href="#!">Edit</a>
                                                    </li>
                                                    <li>
                                                    <a className="dropdown-item" href="#!">Delete</a>
                                                    </li>
                                                </ul>
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                                        <div className="card-body w-75">
                                            <h5 className="eyebrow text-muted">Where</h5>
                                            <p className="card-text">1620 East Ayre Str
                                            Suite M3115662
                                            Wilmington, DE 19804
                                            United States</p>
                                            <h5 className="eyebrow text-muted">To</h5>
                                            <p className="card-text">Michael Doe</p>
                                        </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="card card-data">
                                        <div className="card-header card-header-options">
                                            <div className="row align-items-center">
                                            <div className="col">
                                                <h3 className="card-title">Address 2</h3>
                                            </div>
                                            <div className="col text-right">
                                                <div className="dropdown">
                                                <button id="dropdownMenuButton2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" type="button" className="btn btn-lg btn-secondary btn-ico"><i className="icon-more-vertical"></i></button>
                                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton2">
                                                    <li>
                                                    <a className="dropdown-item" href="#!">Edit</a>
                                                    </li>
                                                    <li>
                                                    <a className="dropdown-item" href="#!">Delete</a>
                                                    </li>
                                                </ul>
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                                        <div className="card-body w-75">
                                            <h5 className="eyebrow text-muted">Where</h5>
                                            <p className="card-text">1620 East Ayre Str
                                            Suite M3115662
                                            Wilmington, DE 19804
                                            United States</p>
                                            <h5 className="eyebrow text-muted">To</h5>
                                            <p className="card-text">Michael Doe</p>
                                        </div>
                                        </div>
                                    </div>
                                    </div>

                                    <div className="row">
                                    <div className="col">
                                        <h3>New Address</h3>
                                    </div>
                                    </div>
                                    <div className="row gutter-1">
                                    <div className="col-12">
                                        <div className="form-group">
                                        <label htmlFor="city">City</label>
                                        <input id="city" type="text" className="form-control" placeholder="" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                        <label htmlFor="cardNumber">Address</label>
                                        <input id="cardNumber" type="text" className="form-control" placeholder="" />
                                        </div>
                                    </div>
                                    <div className="col-6 col-md-3">
                                        <div className="form-group">
                                        <label htmlFor="cardNumber2">Nr</label>
                                        <input id="cardNumber2" type="text" className="form-control" placeholder="" />
                                        </div>
                                    </div>
                                    <div className="col-6 col-md-3">
                                        <div className="form-group">
                                        <label htmlFor="cardNumber3">Ap</label>
                                        <input id="cardNumber3" type="text" className="form-control" placeholder="" />
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <a href="#!" className="btn btn-primary">Add</a>
                                    </div>
                                    </div>
                                </div>

                                {/* <!-- payments --> */}
                                <div className="tab-pane fade" id="sidebar-1-4" role="tabpanel" aria-labelledby="sidebar-1-4" />
                                    <div className="row">
                                    <div className="col">
                                        <h3 className="mb-0">Payments</h3>
                                        <span className="eyebrow">1 Entry</span>
                                    </div>
                                    </div>
                                    <div className="row gutter-2 mb-6">
                                    <div className="col-md-6">
                                        <div className="card card-data">
                                        <div className="card-header card-header-options">
                                            <div className="row align-items-center">
                                            <div className="col">
                                                <h3 className="card-title">Visa</h3>
                                            </div>
                                            <div className="col text-right">
                                                <div className="dropdown">
                                                <button id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" type="button" className="btn btn-lg btn-secondary btn-ico"><i className="icon-more-vertical"></i></button>
                                                <ul className="dropdown-menu" aria-labelledby="dropdownMenu2">
                                                    <li>
                                                    <a className="dropdown-item" href="#!">Edit</a>
                                                    </li>
                                                    <li>
                                                    <a className="dropdown-item" href="#!">Delete</a>
                                                    </li>
                                                </ul>
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                                        <div className="card-body w-75">
                                            <h5 className="eyebrow text-muted">Paymeny Method</h5>
                                            <p className="card-text"><b>Visa</b> ends in 1537 Exp: 8/2022</p>
                                            <h5 className="eyebrow text-muted">Last Payment</h5>
                                            <p className="card-text"><b>$7.00</b> successful on 04/14/2019</p>
                                        </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="card card-data">
                                        <div className="card-header card-header-options">
                                            <div className="row align-items-center">
                                            <div className="col">
                                                <h3 className="card-title">Paypal</h3>
                                            </div>
                                            <div className="col text-right">
                                                <div className="dropdown">
                                                <button id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" type="button" className="btn btn-lg btn-secondary btn-ico"><i className="icon-more-vertical"></i></button>
                                                <ul className="dropdown-menu" aria-labelledby="dropdownMenu2">
                                                    <li>
                                                    <a className="dropdown-item" href="#!">Edit</a>
                                                    </li>
                                                    <li>
                                                    <a className="dropdown-item" href="#!">Delete</a>
                                                    </li>
                                                </ul>
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                                        <div className="card-body w-75">
                                            <h5 className="eyebrow text-muted">Mail</h5>
                                            <p className="card-text">payment@webuildthemes.com</p>
                                            <h5 className="eyebrow text-muted">Last Payment</h5>
                                            <p className="card-text"><b>$19.00</b> successful on 05/15/2019</p>
                                        </div>
                                        </div>
                                    </div>
                                    </div>

                                    <div className="row">
                                        <div className="col">
                                            <h3 className="mb-0">New Payment Method</h3>
                                        </div>
                                    </div>
                                    <div className="row gutter-1">
                                    <div className="col-12">
                                        <div className="form-group">
                                        <label htmlFor="cardNumber">Card Number</label>
                                        <input type="text" className="form-control" placeholder="" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                        <label htmlFor="cardNumber">Name on Card</label>
                                        <input type="text" className="form-control" placeholder="" />
                                        </div>
                                    </div>
                                    <div className="col-6 col-md-3">
                                        <div className="form-group">
                                        <label htmlFor="cardNumber">Month</label>
                                        <select className="custom-select">
                                            <option selected>Open this select menu</option>
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                        </select>
                                        </div>
                                    </div>
                                    <div className="col-6 col-md-3">
                                        <div className="form-group">
                                        <label htmlFor="cardNumber">Year</label>
                                        <select className="custom-select">
                                            <option selected>Open this select menu</option>
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                        </select>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <a href="#!" className="btn btn-primary">Add</a>
                                    </div>
                                    </div>
                                </div>

                                {/* <!-- wishlist --> */}
                                <div className="tab-pane fade" id="sidebar-1-5" role="tabpanel" aria-labelledby="sidebar-1-5">
                                    <div className="row">
                                    <div className="col">
                                        <h3 className="mb-0">Wishlist</h3>
                                        <span className="eyebrow">3 Product</span>
                                    </div>
                                    </div>
                                    <div className="row gutter-2">
                                    <div className="col-md-6 col-lg-4">
                                        <div className="product">
                                        <div className="product-options">
                                            <select id="inputState" className="custom-select">
                                            <option selected>Color</option>
                                            <option>Black</option>
                                            <option>Blue</option>
                                            </select>
                                            <select id="inputState2" className="custom-select">
                                            <option selected>Size</option>
                                            <option>Large</option>
                                            <option>Small</option>
                                            </select>
                                        </div>
                                        <figure className="product-image">
                                            <a href="#!" className="btn btn-ico btn-rounded btn-white"><i className="icon-x"></i></a>
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
                                    <div className="col-md-6 col-lg-4">
                                        <div className="product">
                                        <div className="product-options">
                                            <select id="inputState3" className="custom-select">
                                            <option selected>Color</option>
                                            <option>Black</option>
                                            <option>Blue</option>
                                            </select>
                                            <select id="inputState4" className="custom-select">
                                            <option selected>Size</option>
                                            <option>Large</option>
                                            <option>Small</option>
                                            </select>
                                        </div>
                                        <figure className="product-image">
                                            <a href="#!" className="btn btn-ico btn-rounded btn-white"><i className="icon-x"></i></a>
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
                                    <div className="col-md-6 col-lg-4">
                                        <div className="product">
                                        <div className="product-options">
                                            <select id="inputState5" className="custom-select">
                                            <option selected>Color</option>
                                            <option>Black</option>
                                            <option>Blue</option>
                                            </select>
                                            <select id="inputState6" className="custom-select">
                                            <option selected>Size</option>
                                            <option>Large</option>
                                            <option>Small</option>
                                            </select>
                                        </div>
                                        <figure className="product-image">
                                            <a href="#!" className="btn btn-ico btn-rounded btn-white"><i className="icon-x"></i></a>
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
                                    </div>
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        {/* <!-- / content --> */}

                        {/* </div> */}
                    </div>
                </section>
                {/* <!-- listing --> */}

                {/* <div>
                    <Footer />
                </div>
                 */}
            </div>
        )
    }
}

// if (document.getElementById('home')) {
//     ReactDOM.render(<Home />, document.getElementById('home'));
// }
