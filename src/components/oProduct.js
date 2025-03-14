import React, { Component } from 'react'
import axios from 'axios'
import ReactDOM from 'react-dom'
import { Link, useParams } from 'react-router-dom'
import { Lines, Circle2 } from 'react-preloaders'

import Header from './Header';
import Footer from './Footer';
// import Circle2 from 'react-preloaders/lib/Circle2/Circle2'

export default class Product extends Component{
    constructor(props){
        super(props);

        this.state = {
            
            goods: [],
            carts: [],
            cartsNum: '',
            sellers: [],
            good: {
                file : '',
                name : '',
                description : '',
                price : '',
                category : '',
                quantity : '',
            },
            cart: {
                file : '',
                name : '',
                description : '',
                price : '',
                category : '',
                quantity : '',
            },
            errorMsg: '',
            loading: true
            
        }
    }

    changeHandler = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    addCart = (e) => {
        e.preventDefault()
        const { match: { params } } = this.props;
        var a=localStorage.getItem("authen");
        this.setState({ loading: true })
        console.log("All states");
        console.log(this.state);
        if(a){
        axios
            .post('https://neomallapi.herokuapp.com/api/auth/storecart', this.state.good,
            {
                params: {
                    quantity: this.state.cart.quantity,
                },
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+a,
                }
            })
            .then(response => {
                console.log("All responses from add cart")
                console.log(response)
                console.log("Cart data");
                console.log(response.data);
                this.setState({ cart: response.data })
            })
            .catch(error => {
                console.log("Error from add cart")
                console.log(error)
                this.setState({errorMsg: 'Error retrieving data'})
                this.setState({ loading: false })
            })
        }else{
            window.location.href = 'https://neomall.herokuapp.com/product/'+this.props.match.params.id
        }
    }

    deleteCart = () => {
        var a=localStorage.getItem("authen");
        const { match: { params } } = this.props;
        console.log("All states");
        console.log(this.state);
        if(a){
        axios
            .get('https://neomallapi.herokuapp.com/api/auth/deletecart/'+this.state.delcart, {
                
                // params: {
                //     delcart: this.state.delcart,
                // },
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+a,
                }
            })
            .then(response => {
                console.log("All resonses from deletecart")
                console.log(response)
            })
            .catch(error => {
                console.log("Error from deletecart")
                console.log(error)
                this.setState({errorMsg: 'Error retrieving data'})
            })
        }else{
            window.location.href = 'https://neomall.herokuapp.com'+this.props.match.params.id
        }
    }

    addWish = (e) => {
        e.preventDefault()
        const { match: { params } } = this.props;
        var a=localStorage.getItem("authen");
        this.setState({ loading: true })
        console.log("All states");
        console.log(this.state);
        if(a){
        axios
            .post('https://neomallapi.herokuapp.com/api/auth/storewish', this.state.good,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+a,
                }
            })
            .then(response => {
                console.log("All responses from add wish")
                console.log(response)
                console.log("Cart data");
                console.log(response.data);
                this.setState({ wish: response.data })
            })
            .catch(error => {
                console.log("Error from add wish")
                console.log(error)
                this.setState({errorMsg: 'Error retrieving data'})
                this.setState({ loading: false })
            })
        }else{
            window.location.href = 'https://neomall.herokuapp.com'+this.props.match.params.id
        }
    }

    logoutHandler = e => {
        e.preventDefault()
        const { match: { params } } = this.props;
        var a=localStorage.getItem("authen");
        this.setState({ loading: true })
      
        axios
            .get('https://neomallapi.herokuapp.com/api/auth/logout',{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+a,
                }
            })
            .then(response => {
                // console.log(response);
                localStorage.clear("authen");
                var a=null;
                console.log(a);
                window.location.href = 'https://neomall.herokuapp.com/prdetails/'+this.props.match.params.id
            })
            .catch(error => {
                // console.log(error)
                this.setState({ loading: false })
            })
    }

    componentDidMount(){
        var a=localStorage.getItem("authen");
        const { match: { params } } = this.props;
        // console.log(this.props.match.params.id)

        axios
            .get('https://neomallapi.herokuapp.com/api/prdetails/'+this.props.match.params.id, {
                
                headers: {
                    // 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
                    'Content-Type': 'application/json',
                    // 'Authorization': 'Bearer '+a,
                    // 'withCredentials': true
                }
            })
            .then(response => {
                console.log(response)
                this.setState({ good: response.data.good })
                this.setState({ loading: false })
                
            })
            .catch(error => {
                console.log(error)
                this.setState({errorMsg: 'Error retrieving data'})
                this.setState({ loading: false })
            })

        var one = "https://neomallapi.herokuapp.com/api"
        var two = "https://neomallapi.herokuapp.com/api/auth/shcart"
        var three = "https://neomallapi.herokuapp.com/api"

        axios.defaults.headers.get['Accept'] = 'application/json'

        if(a){

        const options = {
            // headers: {'X-Custom-Header': 'value'}
            headers: {
                // 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+a,
                // 'withCredentials': true
            }
        };
       
        function request1() {
            return axios.get(one, options);
        }

        function request2() {
            return axios.get(two, options);
        }

        function request3() {
            return axios.get(three, options);
        }

        axios.all([request1(), request2(), request3()]).then(axios.spread((...responses) => {
        const responseOne = responses[0]
        const responseTwo = responses[1]
        const responsesThree = responses[2]
        console.log(responseOne.data.goods.data)
        this.setState({ goods: responseOne.data.goods.data })
        console.log(responseTwo.data.carts.data)
        this.setState({ carts: responseTwo.data.carts.data })
        console.log(responseTwo.data.cartsNum)
        this.setState({ cartsNum: responseTwo.data.cartsNum })
        // console.log(responsesThree.data.good)
        // this.setState({ good: responsesThree.data.good })
        // use/access the results 
        })).catch(errors => {
            // console.log(error)
            this.setState({errorMsg: 'Error retrieving data'})
        })

        }

    }

    render(){
        const { good, carts, cartsNum, errorMsg, loading } = this.state;
        // const { quantity } = this.state.good;
        const { quantity } = this.state.cart;

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
                                <Link data-toggle="modal" to="" data-target="#cart" className="nav-link"><span>Cart</span><span>{cartsNum}</span></Link>
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
                <br />
                <br />
                <br />


                {/* <!-- breadcrumbs --> */}
                <section className="breadcrumbs">
                <div className="container">
                    <div className="row">
                    <div className="col">
                        <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="index-2.html">Home</a></li>
                            <li className="breadcrumb-item"><a href="listing-sidebar.html">Shop</a></li>
                            <li className="breadcrumb-item active" aria-current="page">Product Masonry</li>
                        </ol>
                        </nav>
                    </div>
                    </div>
                </div>
                </section>


                {/* <!-- product --> */}
                <section className="pt-5">
                <div className="container">
                    <div className="row gutter-3 justify-content-between">

                    <div className="col-lg-5 pl-md-6 order-2">
                        <div className="sticky-top">

                        <div className="row">
                            <div className="col-12">
                            <span className="item-brand">Neutrale</span>
                            <h1 className="item-title">{good.name}</h1>
                            <span className="item-price">${good.price}</span>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12">
                            <p>{good.description}.</p>
                            </div>
                        </div>

                        <div className="row mb-4">
                            <div className="col-12">
                            <div className="form-group">
                                <label>Color</label>
                                <div className="btn-group-toggle btn-group-square btn-group-colors" data-toggle="buttons">
                                <label className="btn active text-red">
                                    <input type="radio" name="options" id="option1-2" checked />
                                </label>
                                <label className="btn text-blue">
                                    <input type="radio" name="options" id="option2-2" />
                                </label>
                                <label className="btn text-yellow">
                                    <input type="radio" name="options" id="option3-2" />
                                </label>
                                </div>
                            </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">

                            <form onSubmit={this.addCart} >
                                        <div className="product__details__quantity">
                                            <div className="quantity">
                                                <div className="pro-qty">
                                                <input type="number" name="quantity" value={quantity} placeholder="Qty" onChange={this.changeHandler} />
                                                </div>
                                            </div>
                                        </div>
                                    
                                        
                                        <button type="submit" className="btn btn-block btn-lg btn-primary">ADD TO CART</button>
                                    </form>

                            {/* <a href="#!" className="btn btn-block btn-lg btn-primary">Add to Cart</a> */}
                            </div>
                            <div className="col-12 mt-1">
                            <p className="small">Free Shipping worldwide available for this item.</p>
                            </div>
                        </div>

                        </div>
                    </div>

                    <div className="col-lg-7 order-1">
                        <div className="row gutter-1">
                        <div className="col-12">
                            <figure className="equal zoom">
                            <img className="zoom-img" src="https://neomall.herokuapp.com/assets/images/demo/product-35.jpg" alt="Product" />
                            </figure>
                        </div>
                        <div className="col-6">
                            <figure className="equal zoom">
                            <img className="zoom-img" src="https://neomall.herokuapp.com/assets/images/demo/product-35-2.jpg" alt="Product" />
                            </figure>
                        </div>
                        <div className="col-6">
                            <figure className="equal zoom">
                            <img className="zoom-img" src="https://neomall.herokuapp.com/assets/images/demo/product-35-3.jpg" alt="Product" />
                            </figure>
                        </div>
                        <div className="col-12">
                            <figure className="equal equal-50 zoom">
                            <img className="zoom-img" src="https://neomall.herokuapp.com/assets/images/demo/product-35-4.jpg" alt="Product" />
                            </figure>
                        </div>
                        </div>
                    </div>

                    </div>
                </div>
                </section>


                {/* <!-- info --> */}
                <section className="separator-top">
                <div className="container">
                    <div className="row gutter-4 justify-content-between">
                    <div className="col-lg-9 order-2 order-lg-1">
                        <div className="row gutter-2">
                        <div className="col-md-4">
                            <ul className="nav nav-tabs flex-md-column lavalamp" id="component-2" role="tablist">
                            <li className="nav-item">
                                <a className="nav-link active" data-toggle="tab" href="#component-2-1" role="tab" aria-controls="component-2-1" aria-selected="true">Description</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" data-toggle="tab" href="#component-2-2" role="tab" aria-controls="component-2-2" aria-selected="false">Information</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" data-toggle="tab" href="#component-2-3" role="tab" aria-controls="component-2-3" aria-selected="false">Delivery & Returns</a>
                            </li>
                            </ul>
                        </div>
                        <div className="col-md-8">
                            <div className="tab-content" id="component-2-content">
                            <div className="tab-pane fade show active" id="component-2-1" role="tabpanel" aria-labelledby="component-2-1">
                                <p>{good.description}.</p>
                            </div>
                            <div className="tab-pane fade" id="component-2-2" role="tabpanel" aria-labelledby="component-2-2">
                                <ul className="list-group list-group-line">
                                <li className="list-group-item">100% organic cotton (GOTS Certified)</li>
                                <li className="list-group-item">360 grams French terry knit fabric</li>
                                <li className="list-group-item">Made in Braga, Portugal</li>
                                </ul>
                            </div>
                            <div className="tab-pane fade" id="component-2-3" role="tabpanel" aria-labelledby="component-2-3">
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe dignissimos illum quisquam repellendus, laboriosam perspiciatis aliquid, possimus hic sunt omnis iusto enim ratione quod natus doloribus optio, recusandae eius laudantium.</p>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe reprehenderit ab fugiat, quia mollitia. Similique earum dolore dolores eveniet fuga velit, in architecto. Nam explicabo, praesentium dicta quam odio quia!</p>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className="col-lg-3 order-1 order-lg-2 text-lg-right">
                        <div className="rate">
                        <span>4.9</span>
                        <a data-toggle="modal" data-target="#reviews" className="action eyebrow text-primary underline">View Reviews</a>
                        </div>
                    </div>
                    </div>
                </div>
                </section>

                {/* <!-- related products --> */}
                <section className="separator-top no-overflow">
                <div className="container">
                    <div className="row">
                    <div className="col-12 mb-3">
                        <ul className="nav nav-tabs lavalamp" id="myTab" role="tablist">
                        <li className="nav-item">
                            <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Related Products</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Bought With This</a>
                        </li>
                        </ul>
                    </div>
                    <div className="col">
                        <div className="tab-content" id="myTabContent">
                        <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                            <div className="owl-carousel owl-carousel-arrows visible" data-items="[4,4,2,1]" data-margin="10" data-loop="true" data-dots="true" data-nav="true">
                            <div className="product">
                                <figure className="product-image">
                                <a href="#!">
                                    <img src="https://neomall.herokuapp.com/assets/images/demo/product-23.jpg" alt="Image" />
                                </a>
                                </figure>
                                <div className="product-meta">
                                <h3 className="product-title"><a href="#!">Moss Green T-Four BT Earphones</a></h3>
                                <div className="product-price">
                                    <span>$50</span>
                                    <span className="product-action">
                                    <a href="#!">Add to cart</a>
                                    </span>
                                </div>
                                <a href="#!" className="product-like"></a>
                                </div>
                            </div>
                            <div className="product">
                                <figure className="product-image">
                                <a href="#!">
                                    <img src="https://neomall.herokuapp.com/assets/images/demo/product-24.jpg" alt="Image" />
                                    <img src="https://neomall.herokuapp.com/assets/images/demo/product-24-2.jpg" alt="Image" />
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
                            <div className="product">
                                <figure className="product-image">
                                <a href="#!">
                                    <img src="https://neomall.herokuapp.com/assets/images/demo/product-25.jpg" alt="Image" />
                                    <img src="https://neomall.herokuapp.com/assets/images/demo/product-25-2.jpg" alt="Image" />
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
                            <div className="product">
                                <figure className="product-image">
                                <a href="#!">
                                    <img src="https://neomall.herokuapp.com/assets/images/demo/product-11.jpg" alt="Image" />
                                    <img src="https://neomall.herokuapp.com/assets/images/demo/product-11-2.jpg" alt="Image" />
                                </a>
                                </figure>
                                <div className="product-meta">
                                <h3 className="product-title"><a href="#!">Black Low Curve Iceman Trimix Sneakers</a></h3>
                                <div className="product-price">
                                    <span>$271</span>
                                    <span className="product-action">
                                    <a href="#!">Add to cart</a>
                                    </span>
                                </div>
                                <a href="#!" className="product-like"></a>
                                </div>
                            </div>
                            <div className="product">
                                <figure className="product-image">
                                <a href="#!">
                                    <img src="https://neomall.herokuapp.com/assets/images/demo/product-26.jpg" alt="Image" />
                                    <img src="https://neomall.herokuapp.com/assets/images/demo/product-26-2.jpg" alt="Image" />
                                </a>
                                </figure>
                                <div className="product-meta">
                                <h3 className="product-title"><a href="#!">Black / Black V03D Watch</a></h3>
                                <div className="product-price">
                                    <span>$213</span>
                                    <span className="product-action">
                                    <a href="#!">Add to cart</a>
                                    </span>
                                </div>
                                <a href="#!" className="product-like"></a>
                                </div>
                            </div>
                            <div className="product">
                                <figure className="product-image">
                                <a href="#!">
                                    <img src="https://neomall.herokuapp.com/assets/images/demo/product-27.jpg" alt="Image" />
                                    <img src="https://neomall.herokuapp.com/assets/images/demo/product-27-2.jpg" alt="Image" />
                                </a>
                                </figure>
                                <div className="product-meta">
                                <h3 className="product-title"><a href="#!">Dark Navy Stealth Till Bag</a></h3>
                                <div className="product-price">
                                    <span>$57</span>
                                    <span className="product-action">
                                    <a href="#!">Add to cart</a>
                                    </span>
                                </div>
                                <a href="#!" className="product-like"></a>
                                </div>
                            </div>
                            <div className="product">
                                <figure className="product-image">
                                <a href="#!">
                                    <img src="https://neomall.herokuapp.com/assets/images/demo/product-9.jpg" alt="Image" />
                                    <img src="https://neomall.herokuapp.com/assets/images/demo/product-9-2.jpg" alt="Image" />
                                </a>
                                </figure>
                                <div className="product-meta">
                                <h3 className="product-title"><a href="#!">Black Denim Jacket</a></h3>
                                <div className="product-price">
                                    <span>$183</span>
                                    <span className="product-action">
                                    <a href="#!">Add to cart</a>
                                    </span>
                                </div>
                                <a href="#!" className="product-like"></a>
                                </div>
                            </div>
                            </div>
                        </div>
                        <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                            <div className="owl-carousel owl-carousel-arrows visible" data-items="[4,4,2,1]" data-margin="10" data-loop="true" data-dots="true" data-nav="true">
                            <div className="product">
                                <figure className="product-image">
                                <a href="#!">
                                    <img src="https://neomall.herokuapp.com/assets/images/demo/product-9.jpg" alt="Image" />
                                    <img src="https://neomall.herokuapp.com/assets/images/demo/product-9-2.jpg" alt="Image" />
                                </a>
                                </figure>
                                <div className="product-meta">
                                <h3 className="product-title"><a href="#!">Black Denim Jacket</a></h3>
                                <div className="product-price">
                                    <span>$183</span>
                                    <span className="product-action">
                                    <a href="#!">Add to cart</a>
                                    </span>
                                </div>
                                <a href="#!" className="product-like"></a>
                                </div>
                            </div>
                            <div className="product">
                                <figure className="product-image">
                                <a href="#!">
                                    <img src="https://neomall.herokuapp.com/assets/images/demo/product-25.jpg" alt="Image" />
                                    <img src="https://neomall.herokuapp.com/assets/images/demo/product-25-2.jpg" alt="Image" />
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
                            <div className="product">
                                <figure className="product-image">
                                <a href="#!">
                                    <img src="https://neomall.herokuapp.com/assets/images/demo/product-24.jpg" alt="Image" />
                                    <img src="https://neomall.herokuapp.com/assets/images/demo/product-24-2.jpg" alt="Image" />
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
                            <div className="product">
                                <figure className="product-image">
                                <a href="#!">
                                    <img src="https://neomall.herokuapp.com/assets/images/demo/product-27.jpg" alt="Image" />
                                    <img src="https://neomall.herokuapp.com/assets/images/demo/product-27-2.jpg" alt="Image" />
                                </a>
                                </figure>
                                <div className="product-meta">
                                <h3 className="product-title"><a href="#!">Dark Navy Stealth Till Bag</a></h3>
                                <div className="product-price">
                                    <span>$57</span>
                                    <span className="product-action">
                                    <a href="#!">Add to cart</a>
                                    </span>
                                </div>
                                <a href="#!" className="product-like"></a>
                                </div>
                            </div>
                            <div className="product">
                                <figure className="product-image">
                                <a href="#!">
                                    <img src="https://neomall.herokuapp.com/assets/images/demo/product-11.jpg" alt="Image" />
                                    <img src="https://neomall.herokuapp.com/assets/images/demo/product-11-2.jpg" alt="Image" />
                                </a>
                                </figure>
                                <div className="product-meta">
                                <h3 className="product-title"><a href="#!">Black Low Curve Iceman Trimix Sneakers</a></h3>
                                <div className="product-price">
                                    <span>$271</span>
                                    <span className="product-action">
                                    <a href="#!">Add to cart</a>
                                    </span>
                                </div>
                                <a href="#!" className="product-like"></a>
                                </div>
                            </div>
                            <div className="product">
                                <figure className="product-image">
                                <a href="#!">
                                    <img src="https://neomall.herokuapp.com/assets/images/demo/product-26.jpg" alt="Image" />
                                    <img src="https://neomall.herokuapp.com/assets/images/demo/product-26-2.jpg" alt="Image" />
                                </a>
                                </figure>
                                <div className="product-meta">
                                <h3 className="product-title"><a href="#!">Black / Black V03D Watch</a></h3>
                                <div className="product-price">
                                    <span>$213</span>
                                    <span className="product-action">
                                    <a href="#!">Add to cart</a>
                                    </span>
                                </div>
                                <a href="#!" className="product-like"></a>
                                </div>
                            </div>
                            <div className="product">
                                <figure className="product-image">
                                <a href="#!">
                                    <img src="https://neomall.herokuapp.com/assets/images/demo/product-23.jpg" alt="Image" />
                                </a>
                                </figure>
                                <div className="product-meta">
                                <h3 className="product-title"><a href="#!">Moss Green T-Four BT Earphones</a></h3>
                                <div className="product-price">
                                    <span>$50</span>
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
                </section>

                {/* <!-- new review --> */}
                <div className="modal fade sidebar" id="writeReview" tabIndex="-1" role="dialog" aria-labelledby="writeReviewLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="writeReviewLabel">New Review</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form className="row gutter-2">
                        <div className="form-group col-12">
                            <label htmlFor="exampleFormControlInput1">Email address</label>
                            <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
                        </div>
                        <div className="form-group col-12">
                            <label htmlFor="exampleFormControlSelect1">Rating</label>
                            <select className="form-control custom-select" id="exampleFormControlSelect1">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                            </select>
                        </div>
                        <div className="form-group col-12">
                            <label htmlFor="exampleFormControlTextarea1">Example textarea</label>
                            <textarea className="form-control" id="exampleFormControlTextarea1" rows="5"></textarea>
                        </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <div className="container-fluid">
                        <div className="row gutter-0">
                            <div className="col">
                            <a href="#!" className="btn btn-lg btn-block btn-primary" data-dismiss="modal">Publish Review</a>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>



                {/* <Footer /> */}
            </div>
        )
    }
}

if (document.getElementById('Product')) {
    ReactDOM.render(<Product />, document.getElementById('Product'));
}
