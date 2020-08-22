import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Link } from 'react-router-dom'

export default class Admine extends Component {

    constructor(props) {
        super(props)

        this.state = {
            file: null,
            name: '',
            description: '',
            price: '',
            category: '',
            quantity: '',
        }
    }

    changeHandler = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    // goodHandler = (event) => {
    //     this.setState({file: URL.createObjectURL(event.target.files[0])});
    // }

    good_picsHandler = (event) => {
        this.setState({good_pics1: URL.createObjectURL(event.target.files[0])});
        this.setState({good_pics2: URL.createObjectURL(event.target.files[1])});
    }

    submitHandler = e => {
        var a=localStorage.getItem("sauthen");
        e.preventDefault()
        console.log(this.state)

        axios
            // .post('http://localhost/yummypizza/public/api/auth/login', this.state)
            .post('https://neomallapi.herokuapp.com/api/auth', this.state, {
                headers: {
                    // 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+a,
                    // 'withCredentials': true
                }
            })
            .then(response => {
                console.log(response);
                // var sauthe = response.data.token;
                // localStorage.setItem("sauthen",sauthe);
                // console.log(authe);
                window.location.href = "https://neomall.herokuapp.com"
                // var sub = true;
            })
            .catch(error => {
                console.log(error)
            })
    }

    render() {
        const { file, name, description, price, category, quantity } = this.state;
        return (
            <div>
                <div className="limiter">
                    <div className="container-login100">
                        <div className="wrap-login100 p-t-30 p-b-50">
                            <span className="login100-form-title p-b-41">
                                Add goods here
                            </span>
                            <form onSubmit={this.submitHandler} className="login100-form validate-form p-b-33 p-t-5">

                            <input type="file" name="file" onChange={this.fileHandler} class="btn btn-default text-center active form-control-file" title="Click to upload file"/>

                                <div className="wrap-input100 validate-input" data-validate = "Enter email">
                                    
                                    <input className="input100" type="text" name="name" placeholder="name" value={name} onChange={this.changeHandler}  />
                                    <span className="focus-input100" data-placeholder="&#xe82a;"></span>
                                </div>

                                <div className="wrap-input100 validate-input" data-validate="Enter password">
                                    <input className="input100" type="text" name="description" placeholder="description" value={description} onChange={this.changeHandler}  />
                                    <span className="focus-input100" data-placeholder="&#xe80f;"></span>
                                </div>

                                <div className="wrap-input100 validate-input" data-validate = "Enter email">
                                    <input className="input100" type="number" name="price" placeholder="price" value={price} onChange={this.changeHandler}  />
                                    <span className="focus-input100" data-placeholder="&#xe82a;"></span>
                                </div>

                                <div className="wrap-input100 validate-input" data-validate="Enter password">
                                    <input className="input100" type="text" name="category" placeholder="category" value={category} onChange={this.changeHandler}  />
                                    <span className="focus-input100" data-placeholder="&#xe80f;"></span>
                                </div>

                                <div className="container-login100-form-btn m-t-32">
                                    <button type="submit" className="login100-form-btn">
                                        Add good
                                    </button>
                                </div>
                                
                            </form>
                        </div>
                    </div>
                </div>



                <section className="py-md-0">
                <div className="image image-overlay" style={{backgroundImage:'url(assets/images/background-2.jpg)'}}></div>
                <div className="container">
                    <div className="row justify-content-center align-items-center vh-md-100">
                    <div className="col-md-10 col-lg-5">
                        <div className="accordion accordion-portal" id="accordionExample">

                        <div className="card active">
                            <div className="card-header" id="headingTwo">
                                <h2 className="mb-0">
                                    <button className="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                    Add good
                                    </button>
                                </h2>
                            </div>
                            <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
                                <div className="card-body">
                                    <form onSubmit={this.submitHandler} enctype="multipart/form-data">
                                        <div className="accordion accordion-portal" id="accordionExample2">
                                            <div className="card-header" id="seller-signup-1">
                                                <h2 className="mb-0">
                                                    <button className="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#seller-acct" aria-expanded="false" aria-controls="seller-acct">
                                                    ADD GOOD <span style={{ marginLeft: '.5rem' }} /><span style={{ marginLeft: '.5rem' }} /><span style={{ marginLeft: '.5rem' }} /><span style={{ marginLeft: '.5rem' }} /><span style={{ marginLeft: '.5rem' }} />
                                                    </button>
                                                </h2>
                                            </div>
                                            <div className="form-group col-12 collapse show" id="seller-acct" aria-labelledby="seller-signup-1" data-parent="#accordionExample2">
                                                <div className="form-group col-12">
                                                    <label htmlFor="name">Name</label>
                                                    <input type="text" name="name" className="form-control" id="name"  value={name} onChange={this.changeHandler}  />
                                                </div>
                                                <div className="form-group col-12">
                                                    <label htmlFor="category">Category</label>
                                                    <input type="text" name="category" className="form-control" id="category"  value={category} onChange={this.changeHandler}  />
                                                </div>
                                                <div className="form-group col-12">
                                                    <label htmlFor="description">Description</label>
                                                    <input type="text" name="description" className="form-control" id="description"  value={description} onChange={this.changeHandler}  />
                                                </div>

                                            </div>
                                            <div className="card-header" id="seller-signup-2">
                                                <h2 className="mb-0">
                                                    <button className="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#seller-business" aria-expanded="false" aria-controls="seller-business">
                                                    ADD GOOD <span style={{ marginLeft: '.5rem' }} /><span style={{ marginLeft: '.5rem' }} /><span style={{ marginLeft: '.5rem' }} /><span style={{ marginLeft: '.5rem' }} /><span style={{ marginLeft: '.5rem' }} />
                                                    </button>
                                                </h2>
                                            </div>
                                            <div className="form-group col-12 collapse" id="seller-business" aria-labelledby="seller-signup-2" data-parent="#accordionExample2">
                                                <div className="form-group col-12">
                                                    <label htmlFor="price">Price</label>
                                                    <input type="text" name="price" className="form-control" id="price"  value={price} onChange={this.changeHandler}  />
                                                </div>
                                                <div className="form-group col-12">
                                                    <label htmlFor="quantity">Quantity</label>
                                                    <input type="text" name="quantity" className="form-control" id="quantity"  value={quantity} onChange={this.changeHandler}  />
                                                </div>

                                                <div className="form-group col-12">
                                                    <label htmlFor="good_pics">Good pics</label>
                                                    <input type="file" name="good_pics[]" className="form-control" id="good_pics" onChange={this.good_picsHandler} multiple />
                                                </div>
                                                <img class="img-responsive" src={this.state.good_pics1} />
                                                <br />
                                                <br />
                                                <img class="img-responsive" src={this.state.good_pics2} />

                                                <div className="col-12 mt-2">
                                                    <button type="submit" className="btn btn-block btn-primary">Add good</button>
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
                

                <div id="dropDownSelect1"></div>
            </div>
        );
    }
}

if (document.getElementById('admine')) {
    ReactDOM.render(<Admine />, document.getElementById('admine'));
}