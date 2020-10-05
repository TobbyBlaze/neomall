import React, { Component } from 'react'
import axios from 'axios'
import ReactDOM from 'react-dom'
import { Link, useParams } from 'react-router-dom'
import { Lines, Circle2 } from 'react-preloaders'
import Skeleton from 'react-loading-skeleton';

import Header from './Header';
import Footer from './Footer';

export default class Products extends Component{
    constructor(props){
        super(props);

        this.state = {
            storeGoods: [],
            goodsPage: null,
            carts: [],
            cartsNum: '',
            delcart: '',
            products: [],
            seller: '',
            errorMsg: '',
            q: '',
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

    addCart = (e) => {
        e.preventDefault()
        var a=localStorage.getItem("authen");
        this.setState({ loading: true })
        console.log("All states");
        console.log(this.state);
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
    }

    deleteCart = () => {
        var a=localStorage.getItem("authen");
        console.log("All states");
        console.log(this.state);
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
    }

    addWish = (e) => {
        e.preventDefault()
        var a=localStorage.getItem("authen");
        this.setState({ loading: true })
        console.log("All states");
        console.log(this.state);

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
    }

    fetchData = (page) => {
        this.setState({ load: true });
        const { match: { params } } = this.props;
        // this.setState({ loading: true })
        console.log("All states")
        console.log(this.state)
        axios
            .get('https://neomallapi.herokuapp.com/api/products/'+this.props.match.params.id+'?page='+page, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(response => {
                console.log("All responses from fetch data")
                console.log(response)
                console.log("All goods")
                console.log(response.data.storeGoods.data)
                this.setState({ storeGoods: [...this.state.storeGoods, ...response.data.storeGoods.data] })
                this.setState({ goodsPage: response.data.storeGoods.current_page })
                // console.log("All pop goods")
                // console.log(response.data.popGoods.data)
                // this.setState({ popGoods: response.data.popGoods.data })
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
        const { match: { params } } = this.props;
        // console.log(this.state)
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
                window.location.href = 'https://neomall.herokuapp.com/products/'+this.props.match.params.id
            })
            .catch(error => {
                // console.log(error)
                this.setState({ loading: false })
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
        const { match: { params } } = this.props;
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

    render(){
        const { storeGoods, carts, cartsNum, errorMsg, delcart, products, seller, loading } = this.state;
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
  

        return(
            
            <div>
                {/* <Circle2 customLoading={loading} color={'#ffffff'} background="#000000" animation="slide-right" /> */}
                
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
                <section class="hero hero-small bg-blue">
                <div class="decoration decoration-top" style={{backgroundImage: 'url(assets/images/decoration-1.png)'}}></div>
                <div class="container">
                    <div class="row gutter-2 align-items-end">
                    <div class="col-md-8 text-white">
                        <h1 class="mb-0">{seller.name}</h1>
                        <nav aria-label="breadcrumb">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><a href="index-2.html">Home</a></li>
                            <li class="breadcrumb-item active" aria-current="page">Listing Modern</li>
                        </ol>
                        </nav>
                    </div>
                    <div class="col-md-4 text-md-right">
                        <div class="btn-group" role="group" aria-label="Basic example">
                        <div class="dropdown">
                            <a class="btn btn-outline-white btn-sm dropdown-toggle" href="#!" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Sort
                            </a>

                            <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                            <a class="dropdown-item" href="#!">What's New</a>
                            <a class="dropdown-item" href="#!">Price high to low</a>
                            <a class="dropdown-item" href="#!">Price low to high</a>
                            </div>
                        </div>
                        <button data-toggle="modal" data-target="#filter" type="button" class="btn btn-sm btn-outline-white">Filter</button>
                        </div>
                    </div>
                    </div>
                </div>
                </section>
                {/* <!-- / hero --> */}



                {/* <!-- listing --> */}
                <section class="pt-5">
                <div class="container">


                    <div class="row">
                    <div class="col">
                        <ul class="filters">
                        <li><span>Size S,M <a href="#!" class="icon-x"></a></span></li>
                        <li><span>$0 to $500 <a href="#!" class="icon-x"></a></span></li>
                        </ul>
                    </div>
                    </div>


                    <div class="row gutter-2 gutter-lg-3">

                    {loading?
                        <div>
                            <Skeleton width={500} height={400} />
                            
                        </div>
                    :
                    storeGoods.map((product, i)=>
                    <div key={product.id} class="col-6 col-lg-4">
                        <div class="product">
                        <figure class="product-image">
                            <Link to={"product/"+product.id}>
                            {product.discount?
                            <span class="product-promo">-{product.discount}%</span>
                            :
                            <span></span>
                            }
                            <img src="https://neomall.herokuapp.com/assets/images/demo/product-1.jpg" alt="Image" />
                            <img src="https://neomall.herokuapp.com/assets/images/demo/product-1-2.jpg" alt="Image" />
                            </Link>
                        </figure>
                        <div class="product-meta">
                            <p class="product-title"><a href="#!">{product.name} </a></p>
                            <div class="product-price">
                            <span>${product.price}</span>
                            </div>
                            <a href="#!" class="product-like"></a>
                        </div>
                        </div>
                    </div>
                    )
                        
                    }
                    <div
                    ref={loadingRef => (this.loadingRef = loadingRef)}
                    style={loadingCSS}
                    >
                    <span style={loadingTextCSS}>Loading... <Skeleton width={300}/></span>
                    </div>
                    
                    </div>
                    {/* <div class="row">
                    <div class="col">
                        <nav class="d-inline-block">
                        <ul class="pagination">
                            <li class="page-item active"><a class="page-link" href="#!">1 <span class="sr-only">(current)</span></a></li>
                            <li class="page-item" aria-current="page"><a class="page-link" href="#!">2</a></li>
                            <li class="page-item"><a class="page-link" href="#!">3</a></li>
                            <li class="page-item"><a class="page-link" href="#!">4</a></li>
                        </ul>
                        </nav>
                    </div>
                    </div> */}
                </div>
                </section>
                {/* <!-- listing --> */}


                
                {/* <!-- latest products --> */}
                {/* <section className="pt-0">
                <div className="container">
                    <div className="row">
                    <div className="col text-center">
                            <h4>Latest Products from {seller.name} store</h4>
                    </div>
                    </div>
                    <div className="row gutter-2 gutter-md-3">

                    {products.map((product, i)=>
                    <div key={product.id} className="col-3 col-lg-2">
                        <div className="product">
                        <figure className="product-image">
                            <Link to={"product/"+product.id}>
                            <img src="https://neomall.herokuapp.com/assets/images/demo/product-1.jpg" alt="Image" />
                            <img src="https://neomall.herokuapp.com/assets/images/demo/product-1-2.jpg" alt="Image" />
                            </Link>
                        </figure>
                        <div className="product-meta">
                            <h3 className="product-title"><Link to={"product/"+product.id}>{product.name} </Link></h3>
                            <div className="product-price">
                            <span>${product.price}</span>
                            <span className="product-action">
                                <a href="api/storecart/{product.id.toString()}">Add to cart</a>
                            </span>
                            </div>
                            <a href="api/storewish/{product.id.toString()}" className="product-like"></a>
                        </div>
                        </div>
                    </div>
                    )} */}
                    

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
                    
                    {/* </div>

                    <div
                    ref={loadingRef => (this.loadingRef = loadingRef)}
                    style={loadingCSS}
                    >
                    <span style={loadingTextCSS}>Loading... <Skeleton width={300}/></span>
                    </div>

                    <div className="row">
                    <div className="col text-center"> */}
                        {/* <Link to="#!" className="btn btn-outline-secondary">Load More</Link> */}
                    {/* </div>
                    </div>
                </div>
                </section> */}
                <div>
                    {/* <Footer /> */}
                </div>
                
            </div>
        )
    }
}

// if (document.getElementById('products')) {
//     ReactDOM.render(<Products />, document.getElementById('products'));
// }
