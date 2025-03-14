import React, { Component } from 'react'
import axios from 'axios'
import ReactDOM from 'react-dom'
import { Link, useParams } from 'react-router-dom'
import { Lines, Circle2 } from 'react-preloaders'

import Header from './Header';
import Footer from './Footer';

export default class SellerDashboard extends Component{
    // _isMounted = false;
    constructor(props){
        super(props);

        this.state = {
            user: '',
            name: '',
            last_name: '',
            email: '',
            old_password: '',
            password: '',
            confirm_password: '',
            city: '',
            country: '',
            location: '',
            errorMsg: '',
            loading: true
            
        }
    }

    changeHandler = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    logoutHandler = e => {
        e.preventDefault()
        // console.log(this.state)
        // console.log($('meta[name="csrf-token"]').attr('content'))
        var a=localStorage.getItem("sauthen");
        this.setState({ loading: true })
        

        axios
            // .get('http://localhost/yummypizza/public/api/auth/logout',{
            .get('https://neomallapi.herokuapp.com/api/auth/s-logout',{
                headers: {

                    // 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+a,
                    // 'withCredentials': true
                }
            })
            .then(response => {
                // console.log(response);
                localStorage.clear("sauthen");
                var a=null;
                console.log(a);
                window.location.href = "https://neomall.herokuapp.com"

            })
            .catch(error => {
                // console.log(error)
                this.setState({ loading: false })
            })
    }

    profileHandler = e => {
        e.preventDefault()
        var a=localStorage.getItem("sauthen");
        console.log(this.state)
        this.setState({ loading: true })

        axios
            // .post('localhost/yummypizza/public/api/auth/signup', this.state)
            // .post('http://localhost/yummypizza/public/api/auth/signup', this.state
            .post('https://neomallapi.herokuapp.com/api/auth/updateSeller', this.state
            , {
                headers: {

                    // 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+a,
                }
            })
            .then(response => {
                // this.loginHandler();
                console.log(response)
                // window.location.href = "https://neomall.herokuapp.com/portal"
            })
            .catch(error => {
                console.log(error)
                this.setState({ loading: false })
            })
    }

    passwordHandler = e => {
        e.preventDefault()
        var a=localStorage.getItem("sauthen");
        console.log(this.state)
        this.setState({ loading: true })

        axios
            // .post('localhost/yummypizza/public/api/auth/signup', this.state)
            // .post('http://localhost/yummypizza/public/api/auth/signup', this.state
            .post('https://neomallapi.herokuapp.com/api/auth/updateSellerPassword', this.state
            , {
                headers: {

                    // 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+a,
                }
            })
            .then(response => {
                // this.loginHandler();
                console.log(response)
                // window.location.href = "https://neomall.herokuapp.com/portal"
            })
            .catch(error => {
                console.log(error)
                this.setState({ loading: false })
            })
    }

    componentDidMount(){
        var a=localStorage.getItem("sauthen");
        if(a){
            var one = "https://neomallapi.herokuapp.com/api/auth"
            var two = "https://neomallapi.herokuapp.com/api/auth/shcart"
            var three = "https://neomallapi.herokuapp.com/api/auth/getadmin"
            var four = "https://neomallapi.herokuapp.com/api/location"
    
            axios.defaults.headers.get['Accept'] = 'application/json'
    
            // if(a){
            const options = {
                // headers: {'X-Custom-Header': 'value'}
                headers: {
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

            function request4() {
                return axios.get(four, options);
            }
    
            axios.all([request1(), request2(), request3(), request4()]).then(axios.spread((...responses) => {
            const responseOne = responses[0]
            const responseTwo = responses[1]
            const responseThree = responses[2]
            const responseFour = responses[3]
            console.log(responseOne.data.newGoods.data)
            this.setState({ goods: responseOne.data.newGoods.data })
            console.log(responseTwo.data.carts.data)
            this.setState({ carts: responseTwo.data.carts.data })
            console.log(responseTwo.data.cartsNum)
            this.setState({ cartsNum: responseTwo.data.cartsNum })
            console.log(responseThree.data)
            this.setState({ user: responseThree.data })
            this.setState({ location: responseFour.data })
            this.setState({ loading: false })
            console.log("All responses")
            console.log(responseOne)
            console.log(responseTwo)
            console.log(responseThree)
            console.log(responseFour)
            // use/access the results 
            })).catch(errors => {
                console.log(errors)
                this.setState({errorMsg: 'Error retrieving data'})
                this.setState({ loading: false })
            })
        }else{
            window.location.href = "https://neomall.herokuapp.com/admin-portal";
        }

    }

    componentWillUnmount() {
        // fix Warning: Can't perform a React state update on an unmounted component
        this.setState = (state,callback)=>{
            return;
        };
    }

    render(){
        const { user, location, goods, carts, cartsNum, delcart, errorMsg, loading, old_password, password, confirm_password } = this.state;
        // const { name, last_name, email, old_password, password, confirm_password, city, country, street, zip, phone } = this.state.user;

        var a=localStorage.getItem("sauthen");
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

                </div>
                
                  
                {/* <!-- hero --> */}
                <section className="hero hero-small bg-purple text-white">
                    <div className="container">
                        <div className="row gutter-2 gutter-md-4 align-items-end">
                        <div className="col-md-6 text-center text-md-left">
                            <h1 className="mb-0">User {user.name} {user.last_name}</h1>
                            <span className="text-muted">{user.city || location.cityName}, {user.country || location.countryName}</span>
                        </div>
                        <div className="col-md-6 text-center text-md-right">
                            <Link className="btn btn-sm btn-outline-white" onClick={this.logoutHandler}>Sign out</Link>
                        </div>
                        </div>
                    </div>
                </section>



                {/* <!-- listing --> */}
               <section className="pt-5">
                    <div className="container">
                        <div className="row gutter-4 justify-content-between">


                        {/* <!-- sidebar --> */}
                        <aside className="col-lg-3">
                            <div className="nav nav-pills flex-column lavalamp" id="sidebar-1" role="tablist">
                            <a className="nav-link active" data-toggle="tab" href="#sidebar-1-1" role="tab"  aria-controls="sidebar-1" aria-selected="true">Profile</a>
                            <a className="nav-link" data-toggle="tab" href="#sidebar-1-2" role="tab" aria-controls="sidebar-1-2" aria-selected="false">Orders</a>
                            {/* <a className="nav-link" data-toggle="tab" href="#sidebar-1-3" role="tab" aria-controls="sidebar-1-3" aria-selected="false">Addresses</a> */}
                            {/* <a className="nav-link" data-toggle="tab" href="#sidebar-1-4" role="tab" aria-controls="sidebar-1-4" aria-selected="false">Payments</a> */}
                            <a className="nav-link" data-toggle="tab" href="#sidebar-1-5" role="tab" aria-controls="sidebar-1-5" aria-selected="false">Wishlist</a>
                            </div>
                        </aside>
                        {/* <!-- / sidebar --> */}

                        {/* <!-- content --> */}
                        <div className="col-lg-9">
                            <div className="row">
                            <div className="col">
                                <div className="tab-content" id="myTabContent">

                                {/* <!-- profile --> */}
                                <div className="tab-pane fade show active" id="sidebar-1-1" role="tabpanel" aria-labelledby="sidebar-1-1">
                                    <div className="row mb-2">
                                    <div className="col-12">
                                        <h3>Personal Data</h3>
                                    </div>
                                    </div>
                                    <form onSubmit={this.profileHandler}>
                                    <div className="row gutter-1">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                        <label htmlFor="exampleInput1">First Name</label>
                                        <input id="exampleInput1" type="text" className="form-control" placeholder="First name" name="name"  value={user.name} onChange={this.changeHandler} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                        <label htmlFor="exampleInput2">Last Name</label>
                                        <input id="exampleInput2" type="text" className="form-control" placeholder="Last name" name="last_name"  value={user.last_name} onChange={this.changeHandler} />
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="form-group">
                                        <label htmlFor="exampleInput3">City</label>
                                        <input id="exampleInput3" type="text" className="form-control" placeholder={location.cityName} name="city"  value={user.city} onChange={this.changeHandler} />
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="form-group">
                                        <label htmlFor="exampleInput33">Country</label>
                                        <input id="exampleInput33" type="text" className="form-control" placeholder={location.countryName} name="country"  value={user.country} onChange={this.changeHandler} />
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="form-group">
                                        <label htmlFor="exampleInput4">Street</label>
                                        <input id="exampleInput4" type="text" className="form-control" placeholder="Street" name="address1"  value={user.address1} onChange={this.changeHandler} />
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="form-group">
                                        <label htmlFor="exampleInput5">Zip</label>
                                        <input id="exampleInput5" type="text" className="form-control" placeholder="Zip" name="zip"  value={user.zip} onChange={this.changeHandler} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                        <label htmlFor="exampleInput6">Telephone</label>
                                        <input id="exampleInput6" type="text" className="form-control" placeholder="Telephone" name="phone" value={user.phone} onChange={this.changeHandler} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                        <label htmlFor="exampleInput7">Email</label>
                                        <input id="exampleInput7" type="text" className="form-control" placeholder="Email" name="email"  value={user.email}/>
                                        </div>
                                    </div>
                                    </div>
                                    <div className="row">
                                    <div className="col">
                                        <button type="submit" className="btn btn-primary">Save Changes</button>
                                    </div>
                                    </div>
                                    </form>


                                    <form onSubmit={this.passwordHandler}>
                                    <div className="row mb-2 mt-6">
                                    <div className="col-12">
                                        <h3>Password</h3>
                                    </div>
                                    </div>
                                    <div className="row gutter-1">
                                    <div className="col-12">
                                        <div className="form-group">
                                        <label htmlFor="exampleInput8">Old Password</label>
                                        <input id="exampleInput8" type="password" className="form-control" placeholder="Old Password" name="old_password" value={old_password}  onChange={this.changeHandler} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                        <label htmlFor="exampleInput9">New Password</label>
                                        <input id="exampleInput9" type="password" className="form-control" placeholder="New Password" name="password" value={password}  onChange={this.changeHandler} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                        <label htmlFor="exampleInput10">Retype New Password</label>
                                        <input id="exampleInput10" type="password" className="form-control" placeholder="Confirm Password" name="confirm_password" value={confirm_password}  onChange={this.changeHandler} />
                                        </div>
                                    </div>
                                    </div>

                                    <div className="row">
                                    <div className="col">
                                        <button type="submit" className="btn btn-primary">Change Password</button>
                                    </div>
                                    </div>
                                    </form>
                                </div>

                                {/* <!-- orders --> */}
                                <div className="tab-pane fade" id="sidebar-1-2" role="tabpanel" aria-labelledby="sidebar-1-2">
                                    <div className="row">
                                        <div className="col-12">
                                            <h3 className="mb-0">Orders</h3>
                                        <span className="eyebrow">8 Items</span>
                                        </div>
                                    </div>
                                    <div className="row gutter-2">
                                    <div className="col-12">
                                        <div className="order">
                                        <div className="row align-items-center">
                                            <div className="col-lg-4">
                                            <h3 className="order-number">Order 451534</h3>
                                            <a href="#!" className="action eyebrow underline">View Order</a>
                                            </div>
                                            <div className="col-lg-4">
                                            <span className="order-status sent">Shipped on 15 Apr, 2019</span>
                                            </div>
                                            <div className="col-lg-4">
                                            <ul className="order-preview justify-content-end">
                                                <li><a href="product-1.html" title="Fawn Wool / Natural Mammoth Chair" data-toggle="tooltip" data-placement="top"><img src="https://neomall.herokuapp.com/assets/images/demo/product-1.jpg" alt="Fawn Wool / Natural Mammoth Chair" /></a></li>
                                                <li><a href="product-1.html" title="Dark Stained NY11 Dining Chair" data-toggle="tooltip" data-placement="top"><img src="https://neomall.herokuapp.com/assets/images/demo/product-2.jpg" alt="Dark Stained NY11 Dining Chair" /></a></li>
                                            </ul>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="order">
                                        <div className="row align-items-center">
                                            <div className="col-lg-4">
                                            <h3 className="order-number">Order 165342</h3>
                                            <a href="#!" className="action eyebrow underline">View Order</a>
                                            </div>
                                            <div className="col-lg-4">
                                            <span className="order-status canceled">Canceled</span>
                                            </div>
                                            <div className="col-lg-4">
                                            <ul className="order-preview justify-content-end">
                                                <li><a href="product-1.html" title="Red Analog Magazine Rack" data-toggle="tooltip" data-placement="top"><img src="https://neomall.herokuapp.com/assets/images/demo/product-4.jpg" alt="Red Analog Magazine Rack" /></a></li>
                                                <li><a href="product-1.html" title="Black Piani Table Lamp" data-toggle="tooltip" data-placement="top"><img src="https://neomall.herokuapp.com/assets/images/demo/product-5.jpg" alt="Black Piani Table Lamp" /></a></li>
                                                <li><a href="product-1.html" title="Grey Pendant Bell Lamp" data-toggle="tooltip" data-placement="top"><img src="https://neomall.herokuapp.com/assets/images/demo/product-6.jpg" alt="Grey Pendant Bell Lamp" /></a></li>
                                            </ul>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="order">
                                        <div className="row align-items-center">
                                            <div className="col-lg-4">
                                            <h3 className="order-number">Order 524312</h3>
                                            <a href="#!" className="action eyebrow underline">View Order</a>
                                            </div>
                                            <div className="col-lg-4">
                                            <span className="order-status">In Progress</span>
                                            </div>
                                            <div className="col-lg-4">
                                            <ul className="order-preview justify-content-end">
                                                <li><a href="product-1.html" title="Black Low Curve Iceman Trimix Sneakers" data-toggle="tooltip" data-placement="top"><img src="https://neomall.herokuapp.com/assets/images/demo/product-11.jpg" alt="Black Low Curve Iceman Trimix Sneakers" /></a></li>
                                            </ul>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                    </div>
                                    <div className="row">
                                    <div className="col">
                                        <ul className="pagination">
                                        <li className="page-item active"><a className="page-link" href="#!">1 <span className="sr-only">(current)</span></a></li>
                                        <li className="page-item" aria-current="page"><a className="page-link" href="#!">2</a></li>
                                        <li className="page-item"><a className="page-link" href="#!">3</a></li>
                                        <li className="page-item"><a className="page-link" href="#!">4</a></li>
                                        </ul>
                                    </div>
                                    </div>
                                </div>
                                </div>

                                {/* <!-- wishlist --> */}
                                <div className="tab-pane fade" id="sidebar-1-5" role="tabpanel" aria-labelledby="sidebar-1-5">
                                    <div className="row">
                                    <div className="col">
                                        <h3 className="mb-0">Wishlist</h3>
                                        <span className="eyebrow">3 Product</span>
                                    </div>
                                    </div>
                                    <div className="row gutter-2">
                                    <div className="col-md-6 col-lg-4">
                                        <div className="product">
                                        <div className="product-options">
                                            <select id="inputState" className="custom-select">
                                            <option selected>Color</option>
                                            <option>Black</option>
                                            <option>Blue</option>
                                            </select>
                                            <select id="inputState2" className="custom-select">
                                            <option selected>Size</option>
                                            <option>Large</option>
                                            <option>Small</option>
                                            </select>
                                        </div>
                                        <figure className="product-image">
                                            <a href="#!" className="btn btn-ico btn-rounded btn-white"><i className="icon-x"></i></a>
                                            <a href="#!">
                                            <img src="https://neomall.herokuapp.com/assets/images/demo/product-1.jpg" alt="Image" />
                                            <img src="https://neomall.herokuapp.com/assets/images/demo/product-1-2.jpg" alt="Image" />
                                            </a>
                                        </figure>
                                        <div className="product-meta">
                                            <h3 className="product-title"><a href="#!">Fawn Wool / Natural Mammoth Chair </a></h3>
                                            <div className="product-price">
                                            <span>$2,268</span>
                                            <span className="product-action">
                                                <a href="#!">Add to cart</a>
                                            </span>
                                            </div>
                                            <a href="#!" className="product-like"></a>
                                        </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-lg-4">
                                        <div className="product">
                                        <div className="product-options">
                                            <select id="inputState3" className="custom-select">
                                            <option selected>Color</option>
                                            <option>Black</option>
                                            <option>Blue</option>
                                            </select>
                                            <select id="inputState4" className="custom-select">
                                            <option selected>Size</option>
                                            <option>Large</option>
                                            <option>Small</option>
                                            </select>
                                        </div>
                                        <figure className="product-image">
                                            <a href="#!" className="btn btn-ico btn-rounded btn-white"><i className="icon-x"></i></a>
                                            <div className="owl-carousel" data-nav="true" data-loop="true">
                                            <a href="#!">
                                                <img src="https://neomall.herokuapp.com/assets/images/demo/product-2.jpg" alt="Image" />
                                            </a>
                                            <a href="#!">
                                                <img src="https://neomall.herokuapp.com/assets/images/demo/product-2-2.jpg" alt="Image" />
                                            </a>
                                            <a href="#!">
                                                <img src="https://neomall.herokuapp.com/assets/images/demo/product-2-3.jpg" alt="Image" />
                                            </a>
                                            </div>
                                        </figure>
                                        <div className="product-meta">
                                            <h3 className="product-title"><a href="#!">Dark Stained NY11 Dining Chair</a></h3>
                                            <div className="product-price">
                                            <span>$504</span>
                                            <span className="product-action">
                                                <a href="#!">Add to cart</a>
                                            </span>
                                            </div>
                                            <a href="#!" className="product-like"></a>
                                        </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-lg-4">
                                        <div className="product">
                                        <div className="product-options">
                                            <select id="inputState5" className="custom-select">
                                            <option selected>Color</option>
                                            <option>Black</option>
                                            <option>Blue</option>
                                            </select>
                                            <select id="inputState6" className="custom-select">
                                            <option selected>Size</option>
                                            <option>Large</option>
                                            <option>Small</option>
                                            </select>
                                        </div>
                                        <figure className="product-image">
                                            <a href="#!" className="btn btn-ico btn-rounded btn-white"><i className="icon-x"></i></a>
                                            <a href="#!">
                                            <img src="https://neomall.herokuapp.com/assets/images/demo/product-3.jpg" alt="Image" />
                                            <img src="https://neomall.herokuapp.com/assets/images/demo/product-3-2.jpg" alt="Image" />
                                            </a>
                                        </figure>
                                        <div className="product-meta">
                                            <h3 className="product-title"><a href="#!">Black IC Pendant Light</a></h3>
                                            <div className="product-price">
                                            <span>$410</span>
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
                        </div>
                        {/* <!-- / content --> */}

                        {/* </div> */}
                    </div>
                </section>
                {/* <!-- listing --> */}

                {/* <div>
                    <Footer />
                </div>
                 */}
            </div>
        )
    }
}