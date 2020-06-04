import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom'

export default class Footer extends Component{
    render(){
        return(
            <div>
                {/* <!-- footer --> */}
                <footer className="bg-dark text-white py-0">
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
                            <li className="list-group-item"><a href="about.html">About</a></li>
                            <li className="list-group-item"><a href="contact.html">Contact Us</a></li>
                            <li className="list-group-item"><a href="faq.html">FAQ</a></li>
                            <li className="list-group-item"><a href="blog.html">Blog</a></li>
                            <li className="list-group-item"><a href="text.html">Terms of Use</a></li>
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
                </footer>

            </div>
        )
    }
}
