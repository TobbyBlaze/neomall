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
            phone_number_1: '',
            phone_number_2: '',
            store_name: '',
            store_pics: '',
            address_1: '',
            address_2: '',
            city: '',
            country: '',
            zip: '',
            business_reg_no: '',
            business_reg_doc: '',
            tin: '',
            vat: '',
            vat_info_doc: '',
            company_name: '',
            bank_name: '',
            acct_holder_name: '',
            bank_acct_number: '',
            bank_code: '',
            iban: '',
            swift: '',
            bank_info: '',
            loading: false
        }
    }

    changeHandler = e => {
        // this.setState({[e.target.name]: e.target.value})
        this.setState({ [e.target.name]: e.target.value })
    }

    store_picsHandler = (event) => {
        this.setState({store_pics1: URL.createObjectURL(event.target.files[0])});
        this.setState({store_pics2: URL.createObjectURL(event.target.files[1])});
    }

    business_regHandler = (event) => {
        this.setState({business_reg_doc: URL.createObjectURL(event.target.files[0])});
    }

    vatHandler = (event) => {
        this.setState({vat_info_doc: URL.createObjectURL(event.target.files[0])});
    }

    loginHandler = e => {
        e.preventDefault()
        console.log(this.state)
        this.setState({ loading: true })

        axios
            // .post('http://localhost/yummypizza/public/api/auth/login', this.state)
            .post('https://neomallapi.herokuapp.com/api/auth/seller-login', this.state)
            .then(response => {
                // console.log(response);
                var sauthe = response.data.token;
                localStorage.setItem("sauthen",sauthe);
                console.log(sauthe);
                window.location.href = "https://neomall.herokuapp.com/admine"
                // var sub = true;
            })
            .catch(error => {
                console.log(error)
                this.setState({ loading: false })
            })
    }

    signupHandler = e => {
        e.preventDefault()
        console.log(this.state)
        this.setState({ loading: true })

        axios
            // .post('localhost/yummypizza/public/api/auth/signup', this.state)
            // .post('http://localhost/Neomallapi/public/api/auth/seller-signup', this.state
            .post('https://neomallapi.herokuapp.com/api/auth/seller-signup', this.state
            , {
                headers: {

                    // 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
                    'Content-Type': 'application/json',
                }
            })
            .then(response => {
                // this.loginHandler();
                // console.log(response)
                window.location.href = "https://neomall.herokuapp.com/seller-portal"
            })
            .catch(error => {
                // console.log(error)
                this.setState({ loading: false })
            })
    }

    render() {
        // const { id, name, last_name, email, password, confirm_password } = this.state
        const { id, name, last_name, email, password, confirm_password, phone_number_1, phone_number_2, store_name, store_pics, address_1, address_2, city, country, zip, business_reg_no, business_reg_doc, tin, vat, vat_info_doc, company_name, bank_name, acct_holder_name, bank_acct_number, bank_code, iban, swift, bank_info, loading } = this.state

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
                                    <form onSubmit={this.signupHandler} enctype="multipart/form-data">
                                        <div className="accordion accordion-portal" id="accordionExample2">
                                            <div className="card-header" id="seller-signup-1">
                                                <h2 className="mb-0">
                                                    <button className="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#seller-acct" aria-expanded="false" aria-controls="seller-acct">
                                                    SELLER ACCOUNT <span style={{ marginLeft: '.5rem' }} /><span style={{ marginLeft: '.5rem' }} /><span style={{ marginLeft: '.5rem' }} /><span style={{ marginLeft: '.5rem' }} /><span style={{ marginLeft: '.5rem' }} />
                                                    </button>
                                                </h2>
                                            </div>
                                            <div className="form-group col-12 collapse show" id="seller-acct" aria-labelledby="seller-signup-1" data-parent="#accordionExample2">
                                                <div className="form-group col-12">
                                                    <label htmlFor="name">First name</label>
                                                    <input type="text" name="name" className="form-control" id="name"  value={name} onChange={this.changeHandler}  />
                                                </div>
                                                <div className="form-group col-12">
                                                    <label htmlFor="last_name">Last name</label>
                                                    <input type="text" name="last_name" className="form-control" id="last_name"  value={last_name} onChange={this.changeHandler}  />
                                                </div>
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
                                                <div className="form-group col-12">
                                                    <label htmlFor="phone_number_1">Phone number</label>
                                                    <input type="text" name="phone_number_1" className="form-control" id="phone_number_1"  value={phone_number_1} onChange={this.changeHandler}  />
                                                </div>
                                                <div className="form-group col-12">
                                                    <label htmlFor="phone_number_2">Alternate phone number</label>
                                                    <input type="text" name="phone_number_2" className="form-control" id="phone_number_2"  value={phone_number_2} onChange={this.changeHandler}  />
                                                </div>
                                                <div className="form-group col-12">
                                                    <label htmlFor="store_name">Store name</label>
                                                    <input type="text" name="store_name" className="form-control" id="store_name"  value={store_name} onChange={this.changeHandler}  />
                                                </div>
                                                <div className="form-group col-12">
                                                    <label htmlFor="store_pics">Store pics</label>
                                                    <input type="file" name="store_pics[]" className="form-control" id="store_pics" onChange={this.store_picsHandler} multiple />
                                                </div>
                                                <img class="img-responsive" src={this.state.store_pics1} />
                                                <br />
                                                <br />
                                                <img class="img-responsive" src={this.state.store_pics2} />
                                            </div>
                                            <div className="card-header" id="seller-signup-2">
                                                <h2 className="mb-0">
                                                    <button className="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#seller-business" aria-expanded="false" aria-controls="seller-business">
                                                    BUSINESS INFORMATION <span style={{ marginLeft: '.5rem' }} /><span style={{ marginLeft: '.5rem' }} /><span style={{ marginLeft: '.5rem' }} /><span style={{ marginLeft: '.5rem' }} /><span style={{ marginLeft: '.5rem' }} />
                                                    </button>
                                                </h2>
                                            </div>
                                            <div className="form-group col-12 collapse" id="seller-business" aria-labelledby="seller-signup-2" data-parent="#accordionExample2">
                                                <div className="form-group col-12">
                                                    <label htmlFor="address_1">Address</label>
                                                    <input type="text" name="address_1" className="form-control" id="address_1"  value={address_1} onChange={this.changeHandler}  />
                                                </div>
                                                <div className="form-group col-12">
                                                    <label htmlFor="address_2">Alternate Address</label>
                                                    <input type="text" name="address_2" className="form-control" id="address_2"  value={address_2} onChange={this.changeHandler}  />
                                                </div>
                                                <div className="form-group col-12">
                                                    <label htmlFor="city">City</label>
                                                    <input type="text" name="city" className="form-control" id="city"  value={city} onChange={this.changeHandler}  />
                                                </div>
                                                {/* <div className="form-group col-12">
                                                    <label htmlFor="country">Country</label>
                                                    <input type="text" name="country" className="form-control" id="country"  value={country} onChange={this.changeHandler}  />
                                                </div> */}
                                                <div className="form-group col-12">
                                                    <label htmlFor="zip">Postal/ZIP code</label>
                                                    <input type="text" name="zip" className="form-control" id="zip"  value={zip} onChange={this.changeHandler}  />
                                                </div>
                                                {/* <div className="form-group col-12">
                                                    <label htmlFor="business_reg_no">Business registration number</label>
                                                    <input type="text" name="business_reg_no" className="form-control" id="business_reg_no"  value={business_reg_no} onChange={this.changeHandler}  />
                                                </div> */}
                                                {/* <div className="form-group col-12">
                                                    <label htmlFor="business_reg_doc">Business registration document</label>
                                                    <input type="file" name="business_reg_doc[]" className="form-control" id="business_reg_doc" onChange={this.business_regHandler} multiple />
                                                </div> */}
                                                {/* <img class="img-responsive" src={this.state.business_reg_doc} /> */}
                                                {/* <div className="form-group col-12">
                                                    <label htmlFor="tin">Tax Identification Number(tin)</label>
                                                    <input type="text" name="tin" className="form-control" id="tin"  value={tin} onChange={this.changeHandler}  />
                                                </div> */}
                                                {/* <div className="form-group col-12">
                                                    <label htmlFor="vat">VAT Registered?</label>
                                                    <input type="text" name="vat" className="form-control" id="vat"  value={vat} onChange={this.changeHandler}  />
                                                </div> */}
                                                {/* <div className="form-group col-12">
                                                    <label htmlFor="vat_info_doc">vat information document</label>
                                                    <input type="file" name="vat_info_doc[]" className="form-control" id="vat_info_doc" onChange={this.vatHandler} multiple />
                                                </div>
                                                <img class="img-responsive" src={this.state.vat_info_doc} /> */}
                                                <div className="form-group col-12">
                                                    <label htmlFor="company_name">Company name</label>
                                                    <input type="text" name="company_name" className="form-control" id="company_name"  value={company_name} onChange={this.changeHandler}  />
                                                </div>
                                            </div>
                                            <div className="card-header" id="seller-signup-3">
                                                <h2 className="mb-0">
                                                    <button className="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#seller-payment" aria-expanded="false" aria-controls="seller-payment">
                                                    PAYMENT DETAILS <span style={{ marginLeft: '.5rem' }} /><span style={{ marginLeft: '.5rem' }} /><span style={{ marginLeft: '.5rem' }} /><span style={{ marginLeft: '.5rem' }} /><span style={{ marginLeft: '.5rem' }} />
                                                    </button>
                                                </h2>
                                            </div>
                                            <div className="form-group col-12 collapse" id="seller-payment" aria-labelledby="seller-signup-3" data-parent="#accordionExample2">
                                                <div className="form-group col-12">
                                                    <label htmlFor="bank_name">Bank name</label>
                                                    <input type="text" name="bank_name" className="form-control" id="bank_name"  value={bank_name} onChange={this.changeHandler}  />
                                                </div>
                                                <div className="form-group col-12">
                                                    <label htmlFor="acct_holder_name">Account holder name</label>
                                                    <input type="text" name="acct_holder_name" className="form-control" id="acct_holder_name"  value={acct_holder_name} onChange={this.changeHandler}  />
                                                </div>
                                                <div className="form-group col-12">
                                                    <label htmlFor="bank_acct_number">Bank account number</label>
                                                    <input type="text" name="bank_acct_number" className="form-control" id="bank_acct_number"  value={bank_acct_number} onChange={this.changeHandler}  />
                                                </div>
                                                <div className="form-group col-12">
                                                    <label htmlFor="bank_code">Bank code</label>
                                                    <input type="text" name="bank_code" className="form-control" id="bank_code"  value={bank_code} onChange={this.changeHandler}  />
                                                </div>
                                                {/* <div className="form-group col-12">
                                                    <label htmlFor="iban">IBAN</label>
                                                    <input type="text" name="iban" className="form-control" id="iban"  value={iban} onChange={this.changeHandler}  />
                                                </div> */}
                                                {/* <div className="form-group col-12">
                                                    <label htmlFor="swift">SWIFT</label>
                                                    <input type="text" name="swift" className="form-control" id="swift"  value={swift} onChange={this.changeHandler}  />
                                                </div> */}
                                                <div className="form-group col-12">
                                                    <label htmlFor="bank_info">Bank information</label>
                                                    <input type="text" name="bank_info" className="form-control" id="bank_info"  value={bank_info} onChange={this.changeHandler}  />
                                                </div>
                                                <p>By clicking register, you agree with our <Link to="/privacy-policy">privacy policy</Link>.</p>
                                                <div className="col-12 mt-2">
                                                    <button type="submit" className="btn btn-block btn-primary">Register</button>
                                                </div>
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
                
                <br />

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

if (document.getElementById('seller-portal')) {
    ReactDOM.render(<SellerPortal />, document.getElementById('portal'));
}