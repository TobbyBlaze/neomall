import React, { Component } from 'react'
import axios from 'axios'

import Search from 'react-search'

import OwlCarousel from 'react-owl-carousel2';
// import 'react-owl-carousel2/style.css'; //Allows for server-side rendering.

import ReactDOM from 'react-dom'
import { Link, useParams } from 'react-router-dom'
// import { Lines, Circle2 } from 'react-preloaders'
import Skeleton from 'react-loading-skeleton';

import Header from './Header';
import Footer from './Footer';

export default class Category extends Component{
    constructor(props){
        super(props);

        this.state = {
            repos: [],
            goods: [],
            goodsPage: null,
            sellers: [],
            catGoods: [],
            carts: [],
            cartsNum: '',
            delcart: 0,
            q: '',
            errorMsg: '',
            loading: true,
            load: false,
            searchLoading: false,
            page: 1,
            prevY: 0
        }
    }

    changeHandler = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    HiItems(items) {
        console.log(items)
        // this.setState({ q: items })
      }

    getItemsAsync(searchValue, cb) {
        let url = 'https://neomallapi.herokuapp.com/api/searchGoods?q='+searchValue
        fetch(url).then( (response) => {
          return response.json();
        }).then((response) => {
            console.log(response)
        //   if(results.items != undefined){
            console.log(response.goods.data)
            let items = response.goods.data.map( (res, i) => { return { id: i, value: res.name, name: res.name, price: res.price } })
            this.setState({ repos: items })
            this.setState({ goods: items })
            this.setState({ searchLoading: true })
            cb(searchValue)
        //   }
        });
      }

    deleteCart = () => {
        var a=localStorage.getItem("authen");
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
            window.location.href = "https://neomall.herokuapp.com/portal"
        }
    }

    addWish = (e) => {
        e.preventDefault()
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
            window.location.href = "https://neomall.herokuapp.com/portal"
        }
    }

    fetchData = (page) => {
        const { match: { params } } = this.props;
        this.setState({ load: true });
        // this.setState({ loading: true })
        console.log("All states")
        console.log(this.state)
        axios
            .get('https://neomallapi.herokuapp.com/api/cat?'+this.props.match.params.id+'page='+page, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(response => {
                console.log("All responses from fetch data")
                console.log(response)
                console.log("All new goods")
                console.log(response.data.catGoods.data)
                this.setState({ catGoods: [...this.state.catGoods, ...response.data.catGoods.data] })
                
                this.setState({ goodsPage: response.data.catGoods.current_page })
                this.setState({ loading: false })
                this.setState({ load: false });
            })
            .catch(error => {
                console.log("Error from fetch data")
                console.log(error)
                this.setState({errorMsg: 'Error retrieving data'})
                this.setState({ loading: false })
                this.setState({ load: false });
            })
    }

    searchGoodsHandler = e => {
        e.preventDefault()
        console.log("All states")
        console.log(this.state)
        axios
            .get('https://neomallapi.herokuapp.com/api/searchGoods', {
                params: {
                    q: this.state.q,
                },
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(response => {
                console.log("All responses from search")
                console.log(response);
                console.log("All searched goods")
                console.log(response.data.goods.data)
                this.setState({ goods: response.data.goods.data })
                this.setState({ searchLoading: true })
                
            })
            .catch(error => {
                console.log("Error from search")
                console.log(error)
                // this.setState({ loading: false })
            })
    }

    logoutHandler = e => {
        e.preventDefault()
        console.log("All states")
        console.log(this.state)
        var a=localStorage.getItem("authen");
        // this.setState({ loading: true })

        axios
            .get('https://neomallapi.herokuapp.com/api/auth/logout',{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+a,
                }
            })
            .then(response => {
                console.log("All responses from logout")
                console.log(response);
                localStorage.clear("authen");
                var a=null;
                console.log(a);
                window.location.href = "https://neomall.herokuapp.com"
            })
            .catch(error => {
                console.log("Error from logout")
                console.log(error)
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
        var a=localStorage.getItem("authen");

        this.setState({ searchLoading: false })

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


        axios
            .get('https://neomallapi.herokuapp.com/api/stores', {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(response => {
                console.log("All responses from stores data")
                console.log(response)
                console.log("All stores")
                console.log(response.data.sellers.data)
                this.setState({ sellers: response.data.sellers.data })
            })
            .catch(error => {
                console.log("Error from stores data")
                console.log(error)
                this.setState({errorMsg: 'Error retrieving data'})
            })

        if(a){
            var shcart = "https://neomallapi.herokuapp.com/api/auth/shcart"
            var shwish = "https://neomallapi.herokuapp.com/api/auth/shwish"

            var options = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+a,
                }
            };
    
            function requestShcart() {
                return axios.get(shcart, options);
            }
    
            // function requestShwish() {
            //     return axios.get(shwish, options);
            // }
    
            axios.all([requestShcart()]).then(axios.spread((...responses) => {
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
         
            })).catch(errors => {
                console.log("Error on mount with auth")
                console.log(errors)
                this.setState({errorMsg: 'Error retrieving data'})
                this.setState({ loading: false })
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
        const { goods, catGoods, sellers, carts, cartsNum, errorMsg, delcart, loading, q, searchLoading } = this.state;
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
      const searchLoadingCSS = { display: this.state.searchLoading ? "none" : "block" };

    const storesCarousel = {
        items: 4,
        // nav: true,
        // navText:<p>Next</p>,
        rewind: true,
        autoplay: true
    };

    const newGoodsCarousel = {
        items: 3,
        margin: 5,
        // nav: true,
        // navText:<p>Next</p>,
        rewind: true,
        autoplay: true
    };

     
    // const events = {
    //     onDragged: function(event) {...},
    //     onChanged: function(event) {...}
    // };
  

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
                                {/* <li className="nav-item">
                                <Link className="nav-link" to="/">
                                    Home
                                </Link>
                                </li> */}
                                <li class="nav-item dropdown megamenu">
                                    <Link class="nav-link dropdown-toggle" to="#!" id="navbarDropdown-4" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Categories
                                    </Link>
                                    <div class="dropdown-menu" aria-labelledby="navbarDropdown-4">
                                        <div class="row">
                                        <ul class="col-6 col-md-3 col-lg-2">
                                            <li><span class="megamenu-title">Home</span></li>
                                            <li><Link class="dropdown-item" to="index-2.html">Home - classic</Link></li>
                                            <li><Link class="dropdown-item" to="index-carousel.html">Home - carousel</Link></li>
                                            <li><Link class="dropdown-item" to="index-categories.html">Home - categories</Link></li>
                                            <li><Link class="dropdown-item" to="index-modern.html">Home - modern</Link></li>
                                            <li><Link class="dropdown-item" to="index-minimal.html">Home - minimal</Link></li>
                                            <li><span class="megamenu-title">Shop</span></li>
                                            <li><Link class="dropdown-item" to="listing-sidebar.html">Listing - sidebar</Link></li>
                                            <li><Link class="dropdown-item" to="listing-full.html">Listing - full width</Link></li>
                                            <li><Link class="dropdown-item" to="listing-masonry.html">Listing - masonry</Link></li>
                                            <li><Link class="dropdown-item" to="listing-modern.html">Listing - modern</Link></li>
                                        </ul>
                                        <ul class="col-6 col-md-3 col-lg-2">
                                            <li><span class="megamenu-title">Product</span></li>
                                            <li><Link class="dropdown-item" to="product-classic.html">Product - classic</Link></li>
                                            <li><Link class="dropdown-item" to="product-scroll.html">Product - scroll</Link></li>
                                            <li><Link class="dropdown-item" to="product-masonry.html">Product - masonry</Link></li>
                                            <li><Link class="dropdown-item" to="product-modern.html">Product - modern</Link></li>
                                            <li><Link class="dropdown-item" to="product-promo.html">Product - promo</Link></li>
                                            <li><Link class="dropdown-item" to="product-oos.html">Product - out of stock</Link></li>
                                            <li><span class="megamenu-title">Order</span></li>
                                            <li><Link class="dropdown-item" to="cart.html">Cart</Link></li>
                                            <li><Link class="dropdown-item" to="cart-full.html">Cart - full width</Link></li>
                                            <li><Link class="dropdown-item" to="checkout.html">Checkout</Link></li>
                                        </ul>
                                        <ul class="col-6 col-md-3 col-lg-2">
                                            <li><span class="megamenu-title">Account</span></li>
                                            <li><Link class="dropdown-item" to="portal.html">Log In</Link></li>
                                            <li><Link class="dropdown-item" to="profile.html">Profile</Link></li>
                                            <li><Link class="dropdown-item" to="profile-orders.html">Orders</Link></li>
                                            <li><Link class="dropdown-item" to="profile-addresses.html">Addresses</Link></li>
                                            <li><Link class="dropdown-item" to="profile-payments.html">Payments</Link></li>
                                            <li><Link class="dropdown-item" to="profile-wishlist.html">Wishlist</Link></li>
                                            <li><span class="megamenu-title">Blog</span></li>
                                            <li><Link class="dropdown-item" to="blog-cards.html">Blog - cards</Link></li>
                                            <li><Link class="dropdown-item" to="blog-posts.html">Blog - posts</Link></li>
                                            <li><Link class="dropdown-item" to="post.html">Post</Link></li>
                                        </ul>
                                        <ul class="col-6 col-md-3 col-lg-2">
                                            <li><span class="megamenu-title">Pages</span></li>
                                            <li><Link class="dropdown-item" to="about.html">About</Link></li>
                                            <li><Link class="dropdown-item" to="contact.html">Contact</Link></li>
                                            <li><Link class="dropdown-item" to="faq.html">FAQ</Link></li>
                                            <li><Link class="dropdown-item" to="text.html">Text Page</Link></li>
                                            <li><Link class="dropdown-item" to="404.html">404</Link></li>
                                            <li><Link class="dropdown-item" to="coming-soon.html">Coming Soon</Link></li>
                                            <li><span class="megamenu-title">Docs</span></li>
                                            <li><Link class="dropdown-item" to="documentation/index.html">Documentation</Link></li>
                                            <li><Link class="dropdown-item" to="documentation/changelog.html">Changelog</Link></li>
                                        </ul>
                                        <ul class="col-6 col-md-3 col-lg-2">
                                            <li><span class="megamenu-title">Pages</span></li>
                                            <li><Link class="dropdown-item" to="about.html">About</Link></li>
                                            <li><Link class="dropdown-item" to="contact.html">Contact</Link></li>
                                            <li><Link class="dropdown-item" to="faq.html">FAQ</Link></li>
                                            <li><Link class="dropdown-item" to="text.html">Text Page</Link></li>
                                            <li><Link class="dropdown-item" to="404.html">404</Link></li>
                                            <li><Link class="dropdown-item" to="coming-soon.html">Coming Soon</Link></li>
                                            <li><span class="megamenu-title">Docs</span></li>
                                            <li><Link class="dropdown-item" to="documentation/index.html">Documentation</Link></li>
                                            <li><Link class="dropdown-item" to="documentation/changelog.html">Changelog</Link></li>
                                        </ul>
                                        {/* <div class="col-lg-4">
                                            <div class="promo">
                                            <span class="image image-overlay" style={{backgroundImage: 'url(assets/images/background-3.jpg)'}}></span>
                                            <div class="promo-footer p-4 text-white">
                                                <h3 class="mb-0">New Collection</h3>
                                                <Link to="#!" class="eyebrow underline text-white">Shop Now</Link>
                                            </div>
                                            </div>
                                        </div> */}
                                        </div>
                                    </div>
                                    </li>
                                <li className="nav-item">
                                <Link className="nav-link" to="/store">
                                    Stores
                                </Link>
                                </li>
                                
                                {auth?
                                    <li className="nav-item">
                                    <Link className="nav-link" to="/profile">
                                        Your Account
                                    </Link>
                                    </li>
                                :
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/portal"></Link>
                                    </li>
                                }
                                
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
                                {auth?
                                    <li className="nav-item cart">
                                        <Link data-toggle="modal" to="" data-target="#cart" className="nav-link"><span>Cart</span><span>{cartsNum}</span></Link>
                                    </li>
                                :
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/portal"></Link>
                                    </li>
                                }
                                
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
                                <Link to="cart.html" className="btn btn-lg btn-block btn-secondary">View Cart</Link>
                                </div> */}
                                <div className="col">
                                <Link to="checkout" className="btn btn-lg btn-block btn-primary">Checkout</Link>
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
                            {/* <form onSubmit={this.searchGoodsHandler}>
                            <input type="text" className="form-control" name="q" placeholder="Type your search here" aria-label="Type your search here" aria-describedby="button-addon2" onChange={this.changeHandler}/>
                            <button type="submit" className="close" data-dismiss="modal">Search</button> */}
                            {/* <button type="button" className="close" data-dismiss="modal" aria-label="Close"> */}
                            {/* <span aria-hidden="true">&times;</span> */}
                            {/* </button> */}
                            {/* </form> */}
                            <Search items={this.state.repos}
                            multiple={true}
                            getItemsAsync={this.getItemsAsync.bind(this)}
                            onItemsChanged={this.HiItems.bind(this)}
                            maxSelected={3}
                            placeholder='Search here'
                            NotFoundPlaceholder='No results found' />
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
                
                
                
                {/* <!-- banner --> */}
                <section class="py-0 relative" style={searchLoadingCSS}>
                <div class="container">
                    <div class="row">
                    <div class="col">
                        <div class="banner bg-purple px-2 py-3 px-md-4 py-md-5 text-white">
                        <div class="decoration decoration-top" style={{backgroundImage: 'url(assets/images/decoration-2.png)'}}></div>
                        <div class="row align-items-center gutter-1 gutter-md-4 text-center text-md-left">
                            <div class="col-md-6">
                            <h3 class="text-uppercase mb-0"><b>Sale</b> up to <b>50% Off</b></h3>
                            <p class="small">Terms & Conditions Apply</p>
                            </div>
                            <div class="col-md-6 text-md-right">
                            <a href="#!" class="btn btn-outline-white">View all products</a>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </section>

                <br />
                <section>
                <div className="container">
                <div class="row">
                <div class="col">
                <div class="tab-content" id="myTabContent">
                <div class="tab-pane fade show active" id="home" role="tabpanel">
                    <div class="row gutter-2 gutter-md-3">
                {catGoods.map((good, i)=>
                    <div key={good.id} class="col-6 col-lg-3">
                        <div class="product">
                        <figure class="product-image">
                            <Link to={"product/"+good.id}>
                            <img src="assets/images/demo/product-18.jpg" alt="Image" />
                            <img src="assets/images/demo/product-18-2.jpg" alt="Image" />
                            {/* <img src={"https://neomallapi.herokuapp.com/file/"+JSON.parse(good.image)[0]} alt="Image" />
                            <img src={"https://neomallapi.herokuapp.com/file/"+JSON.parse(good.image)[1]} alt="Image" /> */}
                            </Link>
                        </figure>
                        <div class="product-meta">
                            <p class="product-title"><Link to={"product/"+good.id}>{good.name}</Link></p>
                            <div class="product-price">
                            <span>${good.price}</span>
                            </div>
                            <a href="#!" class="product-like"></a>
                        </div>
                        </div>
                    </div>
                    )
                
                    }
                    </div>
                    </div>
                    </div>
                    </div>
                    </div>
                    </div>

                </section>

                <br />

                
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
