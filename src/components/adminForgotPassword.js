import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { Lines } from 'react-preloaders'

export default class adminForgotPassword extends Component {

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
            .post('https://neomallapi.herokuapp.com/api/password/create', this.state,{
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': 'Bearer '+a,
            }})
            .then(response => {
                console.log("All responses from email handler")
                console.log(response);
                // this.setState({ msg: false })
                this.setState({ loading: false })
                this.setState({ msg: 'Pls, check your email for reset password link' })
                // window.location.href = "https://neomall.herokuapp.com"
            })
            .catch(error => {
                console.log("All errors from email handler")
                console.log(error)
                // this.setState({ msg: false })
                this.setState({ loading: false })
                this.setState({ msg: 'Pls, try again' })
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
                                    <button type="submit" className="btn btn-block btn-primary">Get reset link</button>
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

            </div>
        );
    }
}
