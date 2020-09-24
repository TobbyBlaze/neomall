import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { Lines } from 'react-preloaders'

export default class ForgotPassword extends Component {

    constructor(props) {
        super(props)

        this.state = {
            email: '',
            loading: false,
            msg: ''
        }
    }

    changeHandler = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    emailHandler = e => {
        e.preventDefault()
        console.log(this.state)
        this.setState({ loading: true })

        axios
            .post('https://neomallapi.herokuapp.com/api/password/create', this.state.email)
            .then(response => {
                console.log("All responses from email handler")
                console.log(response);
                // this.setState({ msg: false })
                this.setState({ loading: false })
                // window.location.href = "https://neomall.herokuapp.com"
            })
            .catch(error => {
                console.log("All errors from email handler")
                console.log(error)
                // this.setState({ msg: false })
                this.setState({ loading: false })
            })
    }

    render() {
        const {email, msg, loading } = this.state
        return (
            <div>
                {/* <Lines customLoading={loading} color={'#ffffff'} background="blur" animation="slide-down" /> */}
                            
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
                                Enter your email address
                                </button>
                            </h2>
                            </div>

                            <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                            <div className="card-body">
                                <form onSubmit={this.emailHandler}>
                                <div className="row mt-2">
                                <div className="form-group col-12">
                                    <label htmlFor="exampleInputEmail1">Email address</label>
                                    <input type="email" name="email" className="form-control" id="exampleInputEmail1"  value={email} onChange={this.changeHandler}   />
                                </div>
                                
                                <div className="col-12 mt-2">
                                    <button type="submit" className="btn btn-block btn-primary">Log In</button>
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

if (document.getElementById('forgot-password')) {
    ReactDOM.render(<ForgotPassword />, document.getElementById('forgot-password'));
}