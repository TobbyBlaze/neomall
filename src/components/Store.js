import React, { Component } from 'react'
import axios from 'axios'
import ReactDOM from 'react-dom'
import { Link, useParams } from 'react-router-dom'
// import { Lines, Circle2 } from 'react-preloaders'
import Skeleton from 'react-loading-skeleton';

import Header from './Header';
import Footer from './Footer';

export default class Store extends Component{
    constructor(props){
        super(props);

        this.state = {
            goods: [],
            carts: [],
            cartsNum: '',
            delcart: '',
            sellers: [],
            storesPage: null,
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

    fetchData = (page) => {
        this.setState({ load: true });
        // this.setState({ loading: true })
        console.log("All states")
        console.log(this.state)
        axios
            .get('https://neomallapi.herokuapp.com/api/stores?page='+page, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(response => {
                console.log("All responses from fetch data")
                console.log(response)
                console.log("All stores")
                console.log(response.data.sellers.data)
                this.setState({ sellers: [...this.state.sellers, ...response.data.sellers.data] })
                this.setState({ storesPage: response.data.sellers.current_page })
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

    searchStoresHandler = e => {
        e.preventDefault()
        console.log("All states")
        console.log(this.state)
        axios
            .get('https://neomallapi.herokuapp.com/api/searchStores', {
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
                console.log("All searched stores")
                console.log(response.data.sellers.data)
                this.setState({ sellers: response.data.sellers.data })
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
                window.location.href = "https://neomall.herokuapp.com/store"
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
        var curPage = this.state.storesPage + 1;
          this.fetchData(curPage);
          this.setState({ page: curPage });
        }
        this.setState({ prevY: y });
      }

      componentDidMount(){
        var a=localStorage.getItem("authen");
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

    componentWillUnmount() {
        // fix Warning: Can't perform a React state update on an unmounted component
        this.setState = (state,callback)=>{
            return;
        };
    }

    render(){
        const { goods, sellers, carts, cartsNum, errorMsg, loading } = this.state;

        var a=localStorage.getItem("authen");
        if(a == null){
            var auth = false;
        }else{
            var auth = true;
        }

        return(
            
            <div>
                {/* <Circle2 customLoading={loading} color={'#ffffff'} background="#000000" animation="slide-right" /> */}
                <div className="container">
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

                <br />
                <br />
                <br />


                {/* <!-- categories --> */}
                <section className="pt-1">
                <div className="container-full">
                    <div className="row masonry gutter-1">
                    {loading?
                    <div>
                        <Skeleton width={1000} height={1000}/>
                    </div>
                    :
                    sellers.map((seller, i)=>
                    <div key={seller.id} className="col-md-3">
                        <Link to={"products/"+seller.id} className="card card-equal equal-50 equal-md-100 card-scale">
                        <span className="image image-overlay" style={{backgroundImage: 'url(https://neomall.herokuapp.com/assets/images/card-1.jpg)'}}></span>
                        <span className="image image-overlay" ></span>
                        <div className="card-body text-center text-white">
                            <h3>{seller.name}</h3>
                        </div>
                        </Link>
                    </div>
                    )
                    
                    }
                    </div>
                </div>
                </section>
                <br />

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
