import React, { Component } from 'react'
import axios from 'axios'
import ReactDOM from 'react-dom'
import { Link, useParams } from 'react-router-dom'
import { Lines, Circle2 } from 'react-preloaders'

import OwlCarousel from 'react-owl-carousel2';
import Skeleton from 'react-loading-skeleton';

import Dictaphone from './Dictaphone';

import Header from './Header';
import Footer from './Footer';
// import Circle2 from 'react-preloaders/lib/Circle2/Circle2'

export default class Product extends Component{
    constructor(props){
        super(props);

        this.state = {
            
            relatedGoods: [],
            recentViewedGoods: [],
            carts: [],
            cartsNum: '',
            delcart: '',
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
            rating: null,
            review: '',
            reviews: [],
            body: '',
            errorMsg: '',
            qty: '',
            size: '',
            colorCode: '',
            color: '',
            hex: '',
            good_id: '',
            loading: true
            
        }
    }

    // onValueChange(event) {
    //     this.setState({
    //       size: event.target.value
    //     });
    // }

    changeHandler = e => {
        this.setState({ [e.target.name]: e.target.value })
        console.log(this.state)
    }

    addCart = (e) => {
        e.preventDefault()
        const { match: { params } } = this.props;
        var a=localStorage.getItem("authen");
        this.setState({ loading: true })
        console.log(this.state.hex)
        console.log("All states");
        console.log(this.state);
        if(a){
            axios
            .get('https://www.thecolorapi.com/id?hex='+this.state.hex.substring(1),
            {
                // params: {
                //     hex: this.state.color,
                // },
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': 'Bearer '+a,
                }
            })
            .then(response => {
                console.log("All responses from add cart")
                console.log(response)
                // console.log("Cart data");
                console.log(response.data.name.value);
                this.setState({ color: response.data.name.value })
            })
            .catch(error => {
                console.log("Error from add cart")
                console.log(error)
                this.setState({errorMsg: 'Error retrieving data'})
                this.setState({ loading: false })
            })

        axios
            .post('https://neomallapi.herokuapp.com/api/auth/storecart', this.state.good,
            {
                params: {
                    qty: this.state.qty,
                    color: this.state.color,
                    good_id: this.state.good_id,
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

    addReview = (e) => {
        e.preventDefault()
        const { match: { params } } = this.props;
        var a=localStorage.getItem("authen");
        this.setState({ loading: true })
        console.log("All states");
        console.log(this.state);
        if(a){
        axios
            .post('https://neomallapi.herokuapp.com/api/auth/storereview', this.state.good,
            {
                params: {
                    good_id: this.state.good_id,
                    rating: this.state.rating,
                    body: this.state.body,
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
                // this.setState({ review: response.data })
                this.setState({ reviews: [...this.state.reviews, response.data] })
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
            window.location.href = 'https://neomall.herokuapp.com/product/'+this.props.match.params.id
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
                this.setState({ good_id: response.data.good.id })
                this.setState({ relatedGoods: response.data.relatedGoods.data })
                this.setState({ recentViewedGoods: response.data.recentViewedGoods })
                this.setState({ loading: false })
                
            })
            .catch(error => {
                console.log(error)
                this.setState({errorMsg: 'Error retrieving data'})
                this.setState({ loading: false })
            })

        axios
            .get('https://neomallapi.herokuapp.com/api/review/'+this.props.match.params.id, {
                
                headers: {
                    // 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
                    'Content-Type': 'application/json',
                    // 'Authorization': 'Bearer '+a,
                    // 'withCredentials': true
                }
            })
            .then(response => {
                console.log(response)
                console.log(response.data.reviews)
                this.setState({ reviews: response.data.reviews })
                this.setState({ loading: false })
                
            })
            .catch(error => {
                console.log(error)
                this.setState({errorMsg: 'Error retrieving data'})
                this.setState({ loading: false })
            })

        var one = "https://neomallapi.herokuapp.com/api"
        var two = "https://neomallapi.herokuapp.com/api/auth/shcart"
        // var three = "https://neomallapi.herokuapp.com/api/auth/review/"+this.props.match.params.id

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

        axios.all([request1(), request2()]).then(axios.spread((...responses) => {
        const responseOne = responses[0]
        const responseTwo = responses[1]
        console.log(responseOne.data.goods.data)
        this.setState({ goods: responseOne.data.goods.data })
        console.log(responseTwo.data.carts.data)
        this.setState({ carts: responseTwo.data.carts.data })
        console.log(responseTwo.data.cartsNum)
        this.setState({ cartsNum: responseTwo.data.cartsNum })
        // console.log(responsesThree.data.reviews)
        // this.setState({ reviews: responsesThree.data.reviews })
        // use/access the results 
        })).catch(errors => {
            // console.log(error)
            this.setState({errorMsg: 'Error retrieving data'})
        })

        }

    }

    componentWillUnmount() {
        // fix Warning: Can't perform a React state update on an unmounted component
        this.setState = (state,callback)=>{
            return;
        };
    }

    render(){
        const { good, carts, cartsNum, errorMsg, loading, qty, size, color, hex, good_id, rating, body, reviews, relatedGoods, recentViewedGoods } = this.state;
        // const { quantity } = this.state.good;
        const { quantity } = this.state.cart;

        var a=localStorage.getItem("authen");
        if(a == null){
            var auth = false;
        }else{
            var auth = true;
        }

        const relatedGoodsCarousel = {
            items: 3,
            margin: 5,
            // nav: true,
            // navText:<p>Next</p>,
            rewind: true,
            autoplay: true
        };

        const recentViewedGoodsCarousel = {
            items: 3,
            margin: 5,
            // nav: true,
            // navText:<p>Next</p>,
            rewind: true,
            autoplay: true
        };
        
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
                <section class="breadcrumbs bg-light">
                <div class="container">
                    <div class="row">
                    <div class="col">
                        <nav aria-label="breadcrumb">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><a href="index-2.html">Home</a></li>
                            <li class="breadcrumb-item"><a href="listing-sidebar.html">Shop</a></li>
                            <li class="breadcrumb-item active" aria-current="page">Product</li>
                        </ol>
                        </nav>
                    </div>
                    </div>
                </div>
                </section>


                {/* <!-- product --> */}
                <section class="pt-5">
                <div class="container">
                    <div class="row gutter-2 gutter-md-4 justify-content-between">

                    <div class="col-lg-5 order-2">
                        <div class="sticky-top">

                        <div class="row">
                            <div class="col-12">
                            <span class="item-brand">{good.seller_name}</span>
                            <h1 class="item-title">{good.name}</h1>
                            <span class="item-price">
                                <s class="text-muted">${good.originalPrice}</s>
                                ${good.price}
                            </span>
                            </div>
                        </div>

                        <div class="row mb-4">
                            <div class="col-12">
                            <div class="form-group">
                                <label>Size</label>
                                <div class="btn-group-toggle btn-group-square" data-toggle="buttons">
                                <label class="btn active">
                                    <input type="radio" name="size" id="option1" value="S" checked={size === "S"} onChange={this.changeHandler} /> S
                                </label>
                                <label class="btn">
                                    <input type="radio" name="size" id="option2" value="M" checked={size === "M"} onChange={this.changeHandler} /> M
                                </label>
                                <label class="btn">
                                    <input type="radio" name="size" id="option3" value="L" checked={size === "L"} onChange={this.changeHandler}/> L
                                </label>
                                <label class="btn">
                                    <input type="radio" name="size" id="option4" value="XL" checked={size === "XL"} onChange={this.changeHandler}/> XL
                                </label>
                                <label class="btn">
                                    <input type="radio" name="size" id="option5" value="XXL" checked={size === "XXL"} onChange={this.changeHandler}/> XXL
                                </label>
                                <label class="btn">
                                    <input type="radio" name="size" id="option5" value="3XL" checked={size === "3XL"} onChange={this.changeHandler}/> 3XL
                                </label>
                                </div>
                            </div>
                            </div>
                            <div class="col-12 mt-1">
                            <div class="form-group">
                                
                                {/* <input type="color" /> */}
                                {/* <div class="btn-group-toggle btn-group-square btn-group-colors" data-toggle="buttons">
                                <label class="">
                                    <input type="radio" name="options" id="option1-2" checked />
                                </label>
                                <label class="btn text-blue">
                                    <input type="radio" name="options" id="option2-2" />
                                </label>
                                <label class="btn text-yellow">
                                    <input type="radio" name="options" id="option3-2" />
                                </label>
                                </div> */}
                            </div>
                            </div>
                        </div>

                        <Dictaphone />

                        {auth?
                        <div class="row">
                            <div class="col-md-8">
                                <form onSubmit={this.addCart} >
                                    {/* <input type="hidden" class="form-control" name="good_id" value={good_id} onChange={this.changeHandler} /> */}
                                    <label>Color</label>
                                    <br />
                                    <input type="color" class="form-control" name="hex" value={hex} onChange={this.changeHandler}/>
                                    <input type="number" class="form-control" name="qty" value={qty} placeholder="Quantity" onChange={this.changeHandler} />
                                    <button type="submit" class="btn btn-block btn-lg btn-primary">Add to Cart</button>
                                </form>
                            </div>
                        </div>
                        :
                            <div class="row">
                                <div class="col-md-8">
                                    <Link to="/portal">Login to add this item to cart</Link>
                                </div>
                            </div>
                        }

                        </div>
                    </div>

                    <div class="col-lg-6 order-1">
                        <div class="row gutter-3">
                        <div class="col-12">
                            <figure class="equal zoom">
                            <img class="zoom-img" src="https://neomall.herokuapp.com/assets/images/demo/product-34.jpg" alt="Product" />
                            </figure>
                        </div>
                        <div class="col-12">
                            <figure class="equal zoom">
                            <img class="zoom-img" src="https://neomall.herokuapp.com/assets/images/demo/product-34-3.jpg" alt="Product" />
                            </figure>
                        </div>
                        <div class="col-12">
                            <figure class="equal zoom">
                            <img class="zoom-img" src="https://neomall.herokuapp.com/assets/images/demo/product-34-2.jpg" alt="Product" />
                            </figure>
                        </div>
                        </div>
                    </div>

                    </div>
                </div>
                </section>

                {/* <!-- info --> */}
                <section class="separator-bottom">
                <div class="container">
                    <div class="row gutter-2 gutter-lg-4">
                    <div class="col-md-4 col-lg-2">
                        <div class="rate">
                        <span>4.9</span>
                        <a data-toggle="modal" data-target="#reviews" class="action eyebrow text-primary underline">View Reviews</a>
                        </div>
                    </div>
                    <div class="col-md-8 col-lg-6">
                        <p>{good.description}</p>
                    </div>
                    <div class="col-lg-4">
                        <ul class="list-group list-group-line">
                        {/* <li class="list-group-item d-flex justify-content-between align-items-center">
                            SKU
                            <span class="text-dark">1421354</span>
                        </li> */}
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                            Category
                            <span class="text-dark">{good.category}</span>
                        </li>
                        {/* <li class="list-group-item d-flex justify-content-between align-items-center">
                            Tags
                            <span class="text-dark"><a href="#" class="underline text-dark">backpack</a>, <a href="#" class="underline text-dark">minimal</a></span>
                        </li> */}
                        </ul>
                    </div>
                    </div>
                </div>
                </section>


                {/* <!-- related products --> */}
                <section class="no-overflow">
                <div class="container">
                    <div class="row">
                    <div class="col-12 mb-3">
                        <ul class="nav nav-tabs lavalamp" id="myTab" role="tablist">
                        <li class="nav-item">
                            <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Related Products</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Recently Viewed Products</a>
                        </li>
                        </ul>
                    </div>
                    <div class="col">
                        <div class="tab-content" id="myTabContent">
                        <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                            <OwlCarousel ref="car" options={relatedGoodsCarousel} >
                            {loading?
                                <div>
                                    <Skeleton width={500} height={400} />
                                    
                                </div>
                            :
                            
                            relatedGoods.map((relGood, i)=>
                                <div key={relGood.id} class="product">
                                    <figure class="product-image">
                                    <Link to={"../product/"+relGood.id}>
                                        {relGood.discount?
                                        <span class="product-promo">-{relGood.discount}%</span>
                                        :
                                        <span></span>
                                        }
                                        <img src="assets/images/demo/product-8.jpg" alt="Image" />
                                        <img src="assets/images/demo/product-8-2.jpg" alt="Image" />
                                    </Link>
                                    </figure>
                                    <div class="product-meta">
                                    <p class="product-title"><a href="#!">{relGood.name}</a></p>
                                    <div class="product-price">
                                        <span>{relGood.price}</span>
                                        {/* <span class="product-action">
                                        <a href="#!">Add to cart</a>
                                        </span> */}
                                    </div>
                                    <a href="#!" class="product-like"></a>
                                    </div>
                                </div>
                                )
                        
                            }
                            </OwlCarousel>
                        </div>
                        <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                            <OwlCarousel ref="car" options={recentViewedGoodsCarousel} >
                            {loading?
                                <div>
                                    <Skeleton width={500} height={400} />
                                    
                                </div>
                            :
                            
                            recentViewedGoods.map((recGood, i)=>
                                <div key={recGood.goodId} class="product">
                                    <figure class="product-image">
                                    <Link to={"../product/"+recGood.goodId}>
                                        {recGood.discount?
                                        <span class="product-promo">-{recGood.discount}%</span>
                                        :
                                        <span></span>
                                        }
                                        <img src="assets/images/demo/product-8.jpg" alt="Image" />
                                        <img src="assets/images/demo/product-8-2.jpg" alt="Image" />
                                    </Link>
                                    </figure>
                                    <div class="product-meta">
                                    <p class="product-title"><a href="#!">{recGood.goodName}</a></p>
                                    <div class="product-price">
                                        <span>{recGood.goodPrice}</span>
                                        {/* <span class="product-action">
                                        <a href="#!">Add to cart</a>
                                        </span> */}
                                    </div>
                                    <a href="#!" class="product-like"></a>
                                    </div>
                                </div>
                                )
                        
                            }
                            </OwlCarousel>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </section>

                {/* <!-- reviews --> */}
                <div class="modal fade sidebar" id="reviews" tabindex="-1" role="dialog" aria-labelledby="reviewsLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                    
                    <div class="modal-header">
                        <h5 class="modal-title" id="reviewsLabel">Reviews</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="row gutter-3">
                        {reviews.map((rev, i)=>
                        <div key={rev.id} class="col-12">
                            <blockquote class="testimonial">
                            <div class="testimonial-rate">
                                {/* for(var i; i <= {rev.rating}; i++){
                                    <span class="icon-ui-star"></span>
                                } */}
                                {[...Array(rev.rating)].map((e, i) => <span class="icon-ui-star" key={i}></span>)}
                                {/* <span class="icon-ui-star"></span>
                                <span class="icon-ui-star"></span>
                                <span class="icon-ui-star"></span>
                                <span class="icon-ui-star"></span>
                                <span class="icon-ui-star"></span> */}
                            </div>
                            <p>{rev.body}</p>
                            <footer>{rev.user_name} on {rev.created_at}</footer>
                            </blockquote>
                        </div>
                        )}
                        </div>
                    </div>
                    <div class="modal-footer">
                        <div class="container-fluid">
                        <div class="row gutter-0">
                            <div class="col">
                            <a href="#!" class="btn btn-lg btn-block btn-primary" data-toggle="modal" data-target="#writeReview" data-dismiss="modal">Write Review</a>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>


                {/* <!-- new review --> */}
                <div class="modal fade sidebar" id="writeReview" tabindex="-1" role="dialog" aria-labelledby="writeReviewLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="writeReviewLabel">New Review</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form onSubmit={this.addReview}>
                    <div class="modal-body">
                        <div class="row gutter-2">
                            <div class="form-group col-12">
                                <label for="exampleFormControlSelect1">Rating</label>
                                <select name="rating" value={rating} class="form-control custom-select" id="exampleFormControlSelect1" onChange={this.changeHandler}>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                </select>
                            </div>
                            <div class="form-group col-12">
                                <label for="exampleFormControlTextarea1">Review</label>
                                <textarea name="body" value={body} class="form-control" id="exampleFormControlTextarea1" rows="5" onChange={this.changeHandler}></textarea>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <div class="container-fluid">
                        <div class="row gutter-0">
                            <div class="col">
                            <button type="submit" class="btn btn-lg btn-block btn-primary">Publish Review</button>
                            </div>
                        </div>
                        </div>
                    </div>
                    </form>
                    </div>
                </div>
                </div>

                {/* <!-- edit review --> */}
                <div class="modal fade sidebar" id="editReview" tabindex="-1" role="dialog" aria-labelledby="editReviewLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="writeReviewLabel">New Review</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form onSubmit={this.editReview}>
                    <div class="modal-body">
                        <div class="row gutter-2">
                            <div class="form-group col-12">
                                <label for="exampleFormControlSelect1">Rating</label>
                                <select name="rating" value={rating} class="form-control custom-select" id="exampleFormControlSelect1" onChange={this.changeHandler}>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                </select>
                            </div>
                            <div class="form-group col-12">
                                <label for="exampleFormControlTextarea1">Review</label>
                                <textarea name="body" value={body} class="form-control" id="exampleFormControlTextarea1" rows="5" onChange={this.changeHandler}></textarea>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <div class="container-fluid">
                        <div class="row gutter-0">
                            <div class="col">
                            <button type="submit" class="btn btn-lg btn-block btn-primary">Publish Review</button>
                            </div>
                        </div>
                        </div>
                    </div>
                    </form>
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
