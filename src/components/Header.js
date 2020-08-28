import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Signout from './Signout';


const Header = () => {

    return(
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
                    <li className="nav-item">
                    <Link className="nav-link" to="/portal">Log In</Link>
                    </li>
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
                            <Link to="#!"><img src="https://neomall.herokuapp.com/assets/images/demo/product-3.jpg" alt="Image" /></Link>
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
                            <Link to="#!"><img src="https://neomall.herokuapp.com/assets/images/demo/product-4.jpg" alt="Image" /></Link>
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
                            <Link to="#!"><img src="https://neomall.herokuapp.com/assets/images/demo/product-24.jpg" alt="Image" /></Link>
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
);
    }

export default Header;