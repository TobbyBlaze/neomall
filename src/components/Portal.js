import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { Lines } from 'react-preloaders'

export default class Portal extends Component {

    constructor(props) {
        super(props)

        this.state = {
            id: '',
            name: '',
            last_name: '',
            email: '',
            password: '',
            confirm_password: '',
            loading: false
        }
    }

    changeHandler = e => {
        // this.setState({[e.target.name]: e.target.value})
        this.setState({ [e.target.name]: e.target.value })
    }

    loginHandler = e => {
        e.preventDefault()
        console.log(this.state)
        this.setState({ loading: true })

        axios
            // .post('http://localhost/yummypizza/public/api/auth/login', this.state)
            .post('https://neomallapi.herokuapp.com/api/auth/login', this.state)
            .then(response => {
                // console.log(response);
                var authe = response.data.token;
                localStorage.setItem("authen",authe);
                // console.log(authe);
                window.location.href = "https://neomall.herokuapp.com"
                // window.history.pushState({}, null, '/shop')
                // var sub = true;
            })
            .catch(error => {
                // console.log(error)
                this.setState({ loading: false })
            })
    }

    signupHandler = e => {
        e.preventDefault()
        console.log(this.state)
        this.setState({ loading: true })

        axios
            // .post('localhost/yummypizza/public/api/auth/signup', this.state)
            // .post('http://localhost/yummypizza/public/api/auth/signup', this.state
            .post('https://neomallapi.herokuapp.com/api/auth/signup', this.state
            , {
                headers: {

                    // 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
                    'Content-Type': 'application/json',
                }
            })
            .then(response => {
                // this.loginHandler();
                // console.log(response)
                window.location.href = "https://neomall.herokuapp.com/portal"
            })
            .catch(error => {
                // console.log(error)
                this.setState({ loading: false })
            })
    }

    render() {
        const { id, name, last_name, email, password, confirm_password, loading } = this.state
        return (
            <div>
                <Lines customLoading={loading} color={'#ffffff'} background="blur" />
                            
                {/* <!-- header --> */}
                <header className="header header-dark header-sticky separator-bottom">
                <div className="container">
                    <div className="row">
                    <nav className="navbar navbar-expand-lg navbar-dark">
                        <Link to="/" className="navbar-brand order-1 order-lg-2"><img src="https://neomall.herokuapp.com/assets/images/logo.svg" alt="Neomall" /></Link>
                    </nav>
                    </div>
                </div>
                </header>


                <section className="py-md-0">
                <div className="image image-overlay" style={{backgroundImage:'url(https://neomall.herokuapp.com/assets/images/background-2.jpg)'}}></div>
                <div className="container">
                    <div className="row justify-content-center align-items-center vh-md-100">
                    <div className="col-md-10 col-lg-5">
                        <div className="accordion accordion-portal" id="accordionExample">
                        <div className="card active">
                            <div className="card-header" id="headingOne">
                            <h2 className="mb-0">
                                <button className="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                Sign In
                                </button>
                            </h2>
                            </div>

                            <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                            <div className="card-body">
                                <form onSubmit={this.loginHandler}>
                                <div className="row mt-2">
                                <div className="form-group col-12">
                                    <label htmlFor="exampleInputEmail1">Email address</label>
                                    <input type="email" name="email" className="form-control" id="exampleInputEmail1"  value={email} onChange={this.changeHandler}   />
                                </div>
                                <div className="form-group col-12 mt-1">
                                    <label htmlFor="exampleInputPassword1">Password</label>
                                    <input type="password" name="password" className="form-control" id="exampleInputPassword1"  value={password} onChange={this.changeHandler}  />
                                </div>
            {/* <!--
                                <div className="col-12 mt-1">
                                    <div className="custom-control custom-switch mb-2">
                                    <input type="checkbox" className="custom-control-input" id="customSwitch1" />
                                    <label className="custom-control-label" for="customSwitch1">Toggle this switch element</label>
                                    </div>
                                </div>
            --> */}
                                <div className="col-12 mt-2">
                                    <button type="submit" className="btn btn-block btn-primary">Log In</button>
                                </div>
                                    <div>
                                        <Link to="">Forgot password</Link>
                                    </div>
                                </div>
                                </form>
                            </div>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-header" id="headingTwo">
                            <h2 className="mb-0">
                                <button className="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                Create Account
                                </button>
                            </h2>
                            </div>
                            <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
                            <div className="card-body">
                                <form onSubmit={this.signupHandler}>
                                <div className="row mt-2">
                                <div className="form-group col-12">
                                    <label htmlFor="exampleInputEmail2">Email address</label>
                                    <input type="email" name="email" className="form-control" id="exampleInputEmail2"  value={email} onChange={this.changeHandler}  />
                                </div>
                                <div className="form-group col-12 mt-1">
                                    <label htmlFor="exampleInputPassword3">Password</label>
                                    <input type="password" name="password" className="form-control" id="exampleInputPassword3"  value={password} onChange={this.changeHandler}  />
                                </div>
                                <div className="form-group col-12 mt-1">
                                    <label htmlFor="exampleInputPassword4">Repeat Password</label>
                                    <input type="password" name="confirm_password" className="form-control" id="exampleInputPassword4"  value={confirm_password} onChange={this.changeHandler}  />
                                </div>
                                <div className="col-12 mt-2">
                                    <button type="submit" className="btn btn-block btn-primary">Register</button>
                                </div>
                                </div>
                                </form>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </section>

                {/* <!-- footer --> */}
                {/* <footer className="bg-dark text-white py-0">
                <div className="container">
                    <div className="row separated">
                    <div className="col-lg-6 py-10">
                        <div className="row">
                        <div className="col-md-8">
                            <p>Neomall</p>
                        </div>
                        </div>
                        <div className="row">
                        <div className="col-md-10">
                            <h4 className="eyebrow mb-2">Quick Links</h4>
                            <ul className="list-group list-group-columns">
                            <li className="list-group-item"><Link to="about.html">About</Link></li>
                            <li className="list-group-item"><Link to="contact.html">Contact Us</Link></li>
                            <li className="list-group-item"><Link to="faq.html">FAQ</Link></li>
                            <li className="list-group-item"><Link to="text.html">Terms of Use</Link></li>
                            </ul>
                        </div>
                        </div>
                    </div>
                    <div className="col-lg-6 py-10">
                        <div className="row justify-content-end">
                        <div className="col-lg-10">
                            <h4 className="eyebrow mb-2">Subscribe</h4>
                            <div className="input-group">
                            <input type="text" className="form-control form-control-lg" placeholder="Email" aria-label="Subscribe" aria-describedby="button-addon2" />
                            <div className="input-group-append">
                                <button className="btn btn-white" type="button" id="button-addon2">Subscribe</button>
                            </div>
                            </div>
                        </div>
                        </div>
                        <div className="row justify-content-end">
                        <div className="col-lg-10">
                            <h4 className="eyebrow mb-2">Follow us</h4>
                            <nav className="nav nav-icons">
                            <a className="nav-link" href="#!"><i className="icon-facebook-o"></i></a>
                            <a className="nav-link" href="#!"><i className="icon-twitter-o"></i></a>
                            <a className="nav-link" href="#!"><i className="icon-youtube-o"></i></a>
                            </nav>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </footer> */}
                {/* <!-- / footer --> */}


            </div>
        );
    }
}

if (document.getElementById('portal')) {
    ReactDOM.render(<Portal />, document.getElementById('portal'));
}