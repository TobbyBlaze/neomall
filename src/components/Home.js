import React, { Component } from 'react'
import axios from 'axios'
import ReactDOM from 'react-dom'
import { Link, useParams } from 'react-router-dom'
// import { Lines, Circle2 } from 'react-preloaders'
import Skeleton from 'react-loading-skeleton';

import Header from './Header';
import Footer from './Footer';

export default class Home extends Component{
    // _isMounted = false;
    constructor(props){
        super(props);

        this.state = {
            goods: [],
            goodsPage: null,
            popGoods: [],
            carts: [],
            cartsNum: '',
            delcart: '',
            // goods: [],
            good: {
                file : '',
                name : '',
                description : '',
                price : '',
                category : '',
            },
            errorMsg: '',
            loading: true,
            load: false,
            page: 1,
            prevY: 0
            
        }
    }

    addCart = () => {
        var a=localStorage.getItem("authen");
        // this.setState({ loading: true })
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
                // this.setState({ loading: false })
            })
    }

    deleteCart = () => {
        var a=localStorage.getItem("authen");

        axios

            // .post('http://localhost/Neomallapi/public/api/auth/storecart', this.state.good, {
            .post('https://neomallapi.herokuapp.com/api/auth/deletecart/'+this.state.delcart, {
                
                // params: {
                //     delcart: this.state.delcart,
                // },
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
        // this.setState({ loading: true })
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
                // this.setState({ loading: false })
            })
    }

    fetchData = (page) => {
        var a=localStorage.getItem("authen");
        this.setState({ load: true });
        // this.setState({ loading: true })
        axios

            // .get('https://cors-anywhere.herokuapp.com/http://localhost/Neomallapi/public/api/', {
            .get('https://neomallapi.herokuapp.com/api?page='+page, {
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': 'Bearer '+a,
                    // 'withCredentials': true
                }
            })
            .then(response => {
                console.log(response)
                console.log(this.state)
                console.log(response.data.goods.data)
                console.log("no auth")
                this.setState({ goods: [...this.state.goods, ...response.data.goods.data] })
                this.setState({ goodsPage: response.data.goods.current_page })
                // console.log(response.data.popGoods.data)
                this.setState({ popGoods: response.data.popGoods.data })
                this.setState({ loading: false })
                this.setState({ load: false });
            })
            .catch(error => {
                console.log(error)
                this.setState({errorMsg: 'Error retrieving data'})
                this.setState({ loading: false })
                this.setState({ load: false });
            })

        if(a){
            var shcart = "https://neomallapi.herokuapp.com/api/auth/shcart"
            var shwish = "https://neomallapi.herokuapp.com/api/auth/shwish"

            var options = {
                headers: {
                    // 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+a,
                    // 'withCredentials': true
                }
            };
    
            function requestShcart() {
                return axios.get(shcart, options);
            }
    
            function requestShwish() {
                return axios.get(shwish, options);
            }
    
            axios.all([requestShcart(), requestShwish()]).then(axios.spread((...responses) => {
            const responseOne = responses[0]
            const responseTwo = responses[1]
            // const responsesThree = responses[2]
            console.log(responseOne)
            // console.log(responseOne.data.goods.data)
            // this.setState({ goods: responseOne.data.goods.data })
            // console.log(responseOne.data.popGoods.data)
            // this.setState({ popGoods: responseOne.data.popGoods.data })
            console.log(responseOne.data.carts.data)
            this.setState({ carts: responseOne.data.carts.data })
            console.log(responseOne.data.cartsNum)
            this.setState({ cartsNum: responseOne.data.cartsNum })
            this.setState({ loading: false })
            
            // use/access the results 
            })).catch(errors => {
                // console.log(error)
                this.setState({errorMsg: 'Error retrieving data'})
                this.setState({ loading: false })
            })
        }
    }

    searchHandler = e => {
        e.preventDefault()
        axios
            .get('https://neomallapi.herokuapp.com/api/searchGoods',{
                headers: {

                    // 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
                    'Content-Type': 'application/json',
                    // 'Authorization': 'Bearer '+a,
                    // 'withCredentials': true
                }
            })
            .then(response => {
                console.log(response);
                this.setState({ goods: response.find_data.goods.data })
                // localStorage.clear("authen");
                // var a=null;
                // console.log(a);
                // window.location.href = "https://neomall.herokuapp.com"
            })
            .catch(error => {
                console.log(error)
                // this.setState({ loading: false })
            })
    }

    logoutHandler = e => {
        e.preventDefault()
        // console.log(this.state)
        // console.log($('meta[name="csrf-token"]').attr('content'))
        var a=localStorage.getItem("authen");
        // this.setState({ loading: true })
        

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
                // this.setState({ loading: false })
            })
    }

    handleObserver(entities, observer) {
        const y = entities[0].boundingClientRect.y;
        if (this.state.prevY > y) {
        //   const lastgood = this.state.goods[this.state.goods.length - 1];
        //   const curPage = lastgood.id;
        var curPage = this.state.goodsPage + 1;
          this.fetchData(curPage);
          this.setState({ page: curPage });
        }
        this.setState({ prevY: y });
      }

    componentDidMount(){
        this.fetchData(this.state.page);

        var options = {
            root: null,
            rootMargin: "0px",
            threshold: 1.0
        };
            
        this.observer = new IntersectionObserver(
            this.handleObserver.bind(this),
            options
        );
        this.observer.observe(this.loadingRef);

    }

    componentWillUnmount() {
        // fix Warning: Can't perform a React state update on an unmounted component
        this.setState = (state,callback)=>{
            return;
        };
    }

    render(){
        const { goods, popGoods, carts, cartsNum, errorMsg, delcart, loading } = this.state;
        var a=localStorage.getItem("authen");
        if(a == null){
            var auth = false;
        }else{
            var auth = true;
        }

        // Additional css
    const loadingCSS = {
        height: "30px",
        margin: "10px",
        color: "black"
      };
  
      // To change the loading icon behavior
      const loadingTextCSS = { display: this.state.load ? "block" : "none" };
  

        return(
            
            
            <div>
                
                <div className="container-fluid">
                    {/* <!-- header --> */}
                    <header className="header header-dark header-sticky">
                    <div className="container-fluid">
                        <div className="row">



                        <nav className="navbar navbar-expand-lg navbar-dark">
                            <Link to="/" className="navbar-brand order-1 order-lg-2"><img src="https://neomall.herokuapp.com/assets/images/logo.svg" alt="Logo" /></Link>
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


                    {/* <!-- search -->  */}
                    <div className="modal fade search" id="search" tabIndex="-1" role="dialog" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                        <div className="modal-header">
                            <form onSubmit={this.searchHandler}>
                            <input type="text" className="form-control" name="q" placeholder="Type your search here" aria-label="Type your search here" aria-describedby="button-addon2" />
                            <button type="submit" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                            </form>
                        </div>
                        </div>
                    </div>
                    </div>

                </div>
                <br />
                <br />
                <br />
                
                
                {/* <!-- slider --> */}
                <div className="swiper-container swiper-container-alt">
                <div className="swiper-wrapper">
                    <div className="swiper-slide">
                    <div className="image image-overlay image-zoom" style={{backgroundImage:'url(https://neomall.herokuapp.com/assets/images/background-4.jpg)'}}></div>
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
                    <div className="image image-overlay image-zoom" style={{backgroundImage:'url(https://neomall.herokuapp.com/assets/images/background-5.jpg)'}}></div>
                    <div className="container">
                        <div className="row align-items-center justify-content-center vh-80">
                        <div className="col-lg-6 text-white text-center" data-swiper-parallax-y="-100%">
                            <h1 className="display-2 mb-2">Transform your home with us.</h1>
                            <Link to="/store" className="btn btn-outline-white">See stores</Link>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="swiper-button-prev"></div>
                <div className="swiper-button-next"></div>
                </div>


                
                {/* <!-- products --> */}
                <section className="pt-0">
                <div className="container">
                    <div className="row">
                    <div className="col text-center">
                        <h4>Latest Products</h4>
                    </div>
                    </div>

                    <div className="row gutter-2 gutter-md-3">

                    
                    {loading?
                        <div>
                            <Skeleton width={300}/>
                            
                        </div>
                    :
                    goods.map((good, i)=>
                    
                        <div key={good.id} className="col-3 col-lg-2">
                            <div className="product">
                            <figure className="product-image">
                                <Link to={"product/"+good.id}>
                                <img src={"https://neomallapi.herokuapp.com/file/"+JSON.parse(good.image.split(',', 1))} alt="Image" />
                                <img src={"https://neomallapi.herokuapp.com/file/"+JSON.parse(good.image.split(',', 1))} alt="Image" />
                                </Link>
                            </figure>
                            <div className="product-meta">
                                <h3 className="product-title"><Link to={"product/"+good.id}>{good.name} </Link></h3>
                                <div className="product-price">
                                <span>${good.price}</span>
                                </div>
                                {/* <a href="api/storewish/{good.id.toString()}"><i class="fa fa-star"></i></a> */}
                            </div>
                            </div>
                        </div>
                    )
                    
                    }
                    </div>

                    <div
                    ref={loadingRef => (this.loadingRef = loadingRef)}
                    style={loadingCSS}
                    >
                    <span style={loadingTextCSS}>Loading... <Skeleton width={300}/></span>
                    </div>

                    {/* <div className="row">
                    <div className="col text-center">
                        <h4>Popular Products</h4>
                    </div>
                    </div>

                    <div className="row gutter-2 gutter-md-3">

                    {popGoods.map((good, i)=>
                    <div key={good.id} className="col-3 col-lg-2">
                        <div className="product">
                        <figure className="product-image">
                            <Link to={"product/"+good.id}>
                            <img src="https://neomall.herokuapp.com/assets/images/demo/product-1.jpg" alt="Image" />
                            <img src="https://neomall.herokuapp.com/assets/images/demo/product-1-2.jpg" alt="Image" />
                            </Link>
                        </figure>
                        <div className="product-meta">
                            <h3 className="product-title"><Link to={"product/"+good.id}>{good.name} </Link></h3>
                            <div className="product-price">
                            <span>${good.price}</span>
                            </div>
                            {/* <a href="api/storewish/{good.id.toString()}"><i class="fa fa-star"></i></a> 
                        </div>
                        </div>
                    </div>
                    )}
                    </div>

                    <div className="row">
                    <div className="col text-center">
                        <h4>Suggested Products</h4>
                    </div>
                    </div>

                    <div className="row gutter-2 gutter-md-3">

                    {goods.map((good, i)=>
                    <div key={good.id} className="col-3 col-lg-2">
                        <div className="product">
                        <figure className="product-image">
                            <Link to={"product/"+good.id}>
                            <img src="https://neomall.herokuapp.com/assets/images/demo/product-1.jpg" alt="Image" />
                            <img src="https://neomall.herokuapp.com/assets/images/demo/product-1-2.jpg" alt="Image" />
                            </Link>
                        </figure>
                        <div className="product-meta">
                            <h3 className="product-title"><Link to={"product/"+good.id}>{good.name} </Link></h3>
                            <div className="product-price">
                            <span>${good.price}</span>
                            </div>
                            {/* <a href="api/storewish/{good.id.toString()}"><i class="fa fa-star"></i></a> 
                        </div>
                        </div>
                    </div>
                    )}
                    </div> */}
                    

                    {/* <div className="col-6 col-lg-3">
                        <div className="product">
                        <figure className="product-image">
                            <span className="product-promo">-25%</span>
                            <Link to="#!">
                            <img src="https://neomall.herokuapp.com/assets/images/demo/product-4.jpg" alt="Image" />
                            <img src="https://neomall.herokuapp.com/assets/images/demo/product-4-2.jpg" alt="Image" />
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
                    </div> */}
                    
                    {/* </div> */}
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
                {/* <Circle2 customLoading={loading} color={'#ffffff'} background="#000000" animation="slide-right" /> */}
                
            </div>
        )
    }
}

// if (document.getElementById('home')) {
//     ReactDOM.render(<Home />, document.getElementById('home'));
// }
