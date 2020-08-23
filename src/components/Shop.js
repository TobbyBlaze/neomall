import React, { Component } from 'react'
import axios from 'axios'
import ReactDOM from 'react-dom'
import { Link, useParams } from 'react-router-dom'

import Header from './Header';
import Footer from './Footer';

export default class Shop extends Component{
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
                <section className="hero hero-small">
                    <div className="container">
                        <div className="row">
                        <div className="col text-center">
                            <h1 className="mb-0">Furniture</h1>
                            <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><a href="index-2.html">Home</a></li>
                                <li className="breadcrumb-item active" aria-current="page">Furniture</li>
                            </ol>
                            </nav>
                        </div>
                        </div>
                    </div>
                    </section>



                    {/* <!-- listing --> */}
                    <section className="pt-0">
                    <div className="container">

                        <div className="row">
                        <div className="col">
                            <div className="row gutter-1 gutter-md-2 align-items-center">
                            <div className="col-md-6">
                                <span className="eyebrow">15 products</span>
                            </div>
                            <div className="col-md-6 text-md-right">
                                <div className="btn-group" role="group" aria-label="Basic example">
                                <div className="dropdown">
                                    <a className="btn btn-outline-secondary btn-sm dropdown-toggle" href="#!" role="button" id="dropdownMenuLink-2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    What's New
                                    </a>

                                    <div className="dropdown-menu" aria-labelledby="dropdownMenuLink-2">
                                    <a className="dropdown-item" href="#!">Price high to low</a>
                                    <a className="dropdown-item" href="#!">Price low to high</a>
                                    </div>
                                </div>
                                <button data-toggle="modal" data-target="#filter" type="button" className="btn btn-sm btn-outline-secondary">Filter</button>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>

                        <div className="row">

                        {/* <!-- content --> */}
                        <div className="col">
                            <div className="row gutter-3 masonry">
                            <div className="col-md-6 col-lg-4 text-white">
                                <a href="#!" className="product product-card">
                                <div className="equal equal-150">
                                    <span className="image image-scale" style={{backgroundImage: 'url(assets/images/demo/product-3-2.jpg)'}}></span>
                                    <h3 className="product-title">Black IC Pendant Light</h3>
                                    <div className="product-price-big"><span>$</span><span>410</span></div>
                                </div>
                                </a>
                            </div>
                            <div className="col-md-6 col-lg-4">
                                <a href="#!" className="product product-card">
                                <div className="equal equal-125">
                                    <span className="image image-scale" style={{backgroundImage: 'url(assets/images/demo/product-7.jpg)'}}></span>
                                    <h3 className="product-title">Grey Pendant Bell Lamp</h3>
                                    <div className="product-price-big"><span>$</span><span>258</span></div>
                                </div>
                                </a>
                            </div>
                            <div className="col-md-6 col-lg-4">
                                <a href="#!" className="product product-card">
                                <div className="equal equal-150">
                                    <span className="image image-scale" style={{backgroundImage: 'url(assets/images/demo/product-23.jpg)'}}></span>
                                    <h3 className="product-title">Moss Green T-Four BT Earphones</h3>
                                    <div className="product-price-big"><span>$</span><span>50</span></div>
                                </div>
                                </a>
                            </div>
                            <div className="col-md-6 col-lg-4">
                                <a href="#!" className="product product-card">
                                <div className="equal equal-150">
                                    <span className="image image-scale" style={{backgroundImage: 'url(assets/images/demo/product-24.jpg)'}}></span>
                                    <h3 className="product-title">Black Closca Helmet</h3>
                                    <div className="product-price-big"><span>$</span><span>132</span></div>
                                </div>
                                </a>
                            </div>
                            <div className="col-md-6 col-lg-4">
                                <a href="#!" className="product product-card">
                                <div className="equal equal-125">
                                    <span className="image image-scale" style={{backgroundImage: 'url(assets/images/demo/product-4.jpg)'}}></span>
                                    <h3 className="product-title">Red Analog Magazine Rack</h3>
                                    <div className="product-price-big"><span>$</span><span>120</span></div>
                                </div>
                                </a>
                            </div>
                            <div className="col-md-6 col-lg-4">
                                <a href="#!" className="product product-card">
                                <div className="equal equal-125">
                                    <span className="image image-scale" style={{backgroundImage: 'url(assets/images/demo/product-25.jpg)'}}></span>
                                    <h3 className="product-title">Gravel Black Sigg Water Bottle</h3>
                                    <div className="product-price-big"><span>$</span><span>23</span></div>
                                </div>
                                </a>
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

                {/* <div>
                    <Footer />
                </div> */}
                
            </div>
        )
    }
}

// if (document.getElementById('home')) {
//     ReactDOM.render(<Home />, document.getElementById('home'));
// }
