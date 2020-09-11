import React, { Component } from 'react'
import axios from 'axios'
import ReactDOM from 'react-dom'
import { Link, useParams } from 'react-router-dom'
// import { Lines, Circle2 } from 'react-preloaders'
import Skeleton from 'react-loading-skeleton';

import Header from './Header';
import Footer from './Footer';

export default class Store extends Component{
    // _isMounted = false;
    constructor(props){
        super(props);

        this.state = {
            goods: [],
            carts: [],
            cartsNum: '',
            delcart: '',
            sellers: [],
            storesPage: null,
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
        axios

            // .post('http://localhost/yummypizza/public/api/auth/storecart', this.state.good, {
            .post('https:neomallapi.herokuapp.com/api/auth/storecart', this.state.good, {
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

    fetchData = (page) => {
        var a=localStorage.getItem("authen");
        this.setState({ load: true });
        // this.setState({ loading: true })
        axios

                // .get('https://cors-anywhere.herokuapp.com/http://localhost/Neomallapi/public/api/', {
                .get('https://neomallapi.herokuapp.com/api?page='+page, {
                    headers: {
                        // 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
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
    }

    logoutHandler = e => {
        e.preventDefault()
        // console.log(this.state)
        // console.log($('meta[name="csrf-token"]').attr('content'))
        var a=localStorage.getItem("authen");
        this.setState({ loading: true })
        

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
                this.setState({ loading: false })
            })
    }

    componentDidMount(){
        var a=localStorage.getItem("authen");

        var one = "https://neomallapi.herokuapp.com/api/auth"
        var two = "https://neomallapi.herokuapp.com/api/auth/shcart"
        var three = "https://neomallapi.herokuapp.com/api/auth"

        // const requestOne = axios.get(one);
        // const requestTwo = axios.get(two);
        // const requestThree = axios.get(three);

        axios.defaults.headers.get['Accept'] = 'application/json'

        if(a){
        var options = {
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
        console.log(responseOne)
        console.log(responseOne.data.sellers)
        this.setState({ sellers: responseOne.data.sellers })
        console.log(responseTwo.data.carts.data)
        this.setState({ carts: responseTwo.data.carts.data })
        console.log(responseTwo.data.cartsNum)
        this.setState({ cartsNum: responseTwo.data.cartsNum })
        this.setState({ loading: false })
        // use/access the results 
        })).catch(errors => {
            // console.log(error)
            this.setState({errorMsg: 'Error retrieving data'})
            this.setState({ loading: false })
        })
    }else{

        axios

            // .get('http://localhost/yummypizza/public/api/auth', {
            .get('https://neomallapi.herokuapp.com/api', {
                headers: {
                    // 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
                    'Content-Type': 'application/json',
                    // 'Authorization': 'Bearer '+a,
                    // 'withCredentials': true
                }
            })
            .then(response => {
                console.log(response.data.sellers)
                this.setState({ sellers: response.data.sellers })
                this.setState({ loading: false })
            })
            .catch(error => {
                // console.log(error)
                this.setState({errorMsg: 'Error retrieving data'})
                this.setState({ loading: false })
            })
    }

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
