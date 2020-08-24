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

    addWishlist = () => {
        var a=localStorage.getItem("authen");
        axios

            // .post('http://localhost/yummypizza/public/api/auth/storecart', this.state.good, {
            .post('https://damp-island-72638.herokuapp.com/api/auth/storewish', this.state.good, {
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
        // var len = a.length;
        // localStorage.clear("authen");
        // a = null;
        // console.log(a);
        // console.log(len);

        var one = "https://neomallapi.herokuapp.com/api/auth"
        var two = "https://neomallapi.herokuapp.com/api/auth/shcart"
        var three = "https://neomallapi.herokuapp.com/api/auth"

        // const requestOne = axios.get(one);
        // const requestTwo = axios.get(two);
        // const requestThree = axios.get(three);

        axios.defaults.headers.get['Accept'] = 'application/json'

        // if(a){
        const options = {
            // headers: {'X-Custom-Header': 'value'}
            headers: {
                // 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+a,
                // 'withCredentials': true
            }
        };
        // }else{
        //     const options = {
        //         // headers: {'X-Custom-Header': 'value'}
        //         headers: {
        //             // 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
        //             'Content-Type': 'application/json',
        //             // 'Authorization': 'Bearer '+a,
        //             // 'withCredentials': true
        //         }
        //     };
        // }

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
        // use/access the results 
        })).catch(errors => {
            // console.log(error)
            this.setState({errorMsg: 'Error retrieving data'})
        })

        // if(a){
        //     axios

        //         // .get('https://cors-anywhere.herokuapp.com/http://localhost/Neomallapi/public/api/', {
        //         .get('https://neomallapi.herokuapp.com/api/auth', {
        //             headers: {
        //                 // 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
        //                 'Content-Type': 'application/json',
        //                 'Authorization': 'Bearer '+a,
        //                 // 'withCredentials': true
        //             }
        //         })
        //         .then(response => {
        //             // console.log(response.data.goods.data)
        //             // console.log("auth");
        //             this.setState({ goods: response.data.goods.data })
        //         })
        //         .catch(error => {
        //             // console.log(error)
        //             this.setState({errorMsg: 'Error retrieving data'})
        //         })
        // }else{
        //     axios

        //         // .get('https://cors-anywhere.herokuapp.com/http://localhost/Neomallapi/public/api/', {
        //         .get('https://neomallapi.herokuapp.com/api/auth', {
        //             headers: {
        //                 // 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
        //                 'Content-Type': 'application/json',
        //                 // 'Authorization': 'Bearer '+a,
        //                 // 'withCredentials': true
        //             }
        //         })
        //         .then(response => {
        //             console.log(response.data.goods.data)
        //             console.log("no auth")
        //             this.setState({ goods: response.data.goods.data })
        //         })
        //         .catch(error => {
        //             console.log(error)
        //             this.setState({errorMsg: 'Error retrieving data'})
        //         })
        // }

    }

    // getOne(good){
    //     this.setState({ 
    //         goods:{
    //         id : good.id,
    //         file : good.file,
    //         name : good.name,
    //         description : good.description,
    //         price : good.price,
    //         category : good.category
    //         }
    //     })
    // }

    componentWillUnmount() {
        // fix Warning: Can't perform a React state update on an unmounted component
        this.setState = (state,callback)=>{
            return;
        };
    }

    render(){
        const { goods, carts, errorMsg } = this.state;
        var a=localStorage.getItem("authen");
        if(a == null){
            var auth = false;
        }else{
            var auth = true;
        }

        return(
            
            <div>
                
                <div className="container-fluid">
                    {/* <!-- header --> */}
                    <header className="header header-dark header-sticky">
                    <div className="container-fluid">
                        <div className="row">



                        <nav className="navbar navbar-expand-lg navbar-dark">
                            <Link to="/" className="navbar-brand order-1 order-lg-2"><img src="assets/images/logo.svg" alt="Logo" /></Link>
                            <button className="navbar-toggler order-2" type="button" data-toggle="collapse" data-target=".navbar-collapse" aria-controls="navbarMenu" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                            </button>

                            <div className="collapse navbar-collapse order-3 order-lg-1" id="navbarMenu">
                            {/* <div className="" id="navbarMenu"> */}
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item">
                                <Link className="nav-link" to="/">
                                    Home
                                </Link>
                                </li>
                                <li className="nav-item">
                                <Link className="nav-link" to="/store">
                                    Stores
                                </Link>
                                </li>
                                <li className="nav-item">
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
                            )}
                            </div>
                        </div>
                    </div>
                    </div>
                    </div>


                    {/* <!-- search -->  */}
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
                            <Link to="/store" className="btn btn-outline-white">Shop Now</Link>
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

                    {goods.map((good, i)=>
                    <div key={good.id} className="col-6 col-lg-3">
                        <div className="product">
                        <figure className="product-image">
                            <Link to={"product/"+good.id}>
                            <img src="assets/images/demo/product-1.jpg" alt="Image" />
                            <img src="assets/images/demo/product-1-2.jpg" alt="Image" />
                            </Link>
                        </figure>
                        <div className="product-meta">
                            <h3 className="product-title"><Link to={"product/"+good.id}>{good.name} </Link></h3>
                            <div className="product-price">
                            <span>${good.price}</span>
                            <span className="product-action">
                                <a href="api/storecart/{good.id.toString()}">Add to cart</a>
                            </span>
                            </div>
                            <a href="api/storewish/{good.id.toString()}" className="product-like"></a>
                        </div>
                        </div>
                    </div>
                    )}
                    

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
                    
                    </div>
                    <div className="row">
                    <div className="col text-center">
                        {/* <Link to="#!" className="btn btn-outline-secondary">Load More</Link> */}
                    </div>
                    </div>
                </div>
                </section>
                <div>
                    {/* <Footer /> */}
                </div>
                
            </div>
        )
    }
}

// if (document.getElementById('home')) {
//     ReactDOM.render(<Home />, document.getElementById('home'));
// }
