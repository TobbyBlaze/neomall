import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Link } from 'react-router-dom'
// import { Lines, Circle2 } from 'react-preloaders'

export default class CreateAds extends Component {

    constructor(props) {
        super(props)

        this.state = {
            file: [],
            name: '',
            description: '',
            price: '',
            discount: '',
            category: '',
            quantity: '',
            // goodPics: null,
            loading: false,
            form: ''
        }

    }

    changeHandler = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    goodPicsHandler = (event) => {
        this.setState({file1: URL.createObjectURL(event.target.files[0])});
        this.setState({file2: URL.createObjectURL(event.target.files[1])});

        this.setState({ file: [...this.state.file, ...event.target.files] })
    }

    submitHandler = e => {
        var a=localStorage.getItem("authen");
        e.preventDefault()
        console.log(this.state)
       
        const formData = new FormData();
        for(let i = 0; i< 2; i++) {
            formData.append('image[]', this.state.file[i]);
        }
        formData.append('name', this.state.name);
        formData.append('description', this.state.description);
        formData.append('price', this.state.price);
        formData.append('category', this.state.category);
        // formData.append('file', this.state.file, this.state.file.name);
        console.log(this.state.file[0]); 
        console.log(this.state.file[1]); 
        console.log(formData)
        this.setState({ form: formData })
        for(var pair of formData.entries()) {
            console.log(pair[0]+', '+pair[1]);
        }
        console.log(formData.get("name"))

        axios
            // .post('http://localhost/yummypizza/public/api/auth/login', this.state)
            .post('https://neomallapi.herokuapp.com/api/auth/adsCreate', formData, {
                // body: formData,
                headers: {
                    // 'Content-Type': 'application/json',
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Bearer '+a,
                    // 'withCredentials': true
                }
            })
            .then(response => {
                console.log(response);
                // this.setState({ loading: true })
                // var sauthe = response.data.token;
                // localStorage.setItem("sauthen",sauthe);
                // console.log(authe);
                window.location.href = "https://neomall.herokuapp.com"
                // var sub = true;
            })
            .catch(error => {
                console.log(error)
                this.setState({ loading: false })
            })
    }

    logoutHandler = e => {
        e.preventDefault()
        // console.log(this.state)
        // console.log($('meta[name="csrf-token"]').attr('content'))
        var a=localStorage.getItem("authen");
        // this.setState({ loading: true })
        

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

    render() {
        const { file, name, description, price, discount, category, quantity, goodPics, loading } = this.state;

        var a=localStorage.getItem("authen");
        if(a == null){
            var auth = false;
        }else{
            var auth = true;
        }
        return (
            <div>
                
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
                                        <Link className="nav-link" to="/seller-portal">Log In</Link>
                                    </li>
                                }
                                
                                <li className="nav-item">
                                <Link data-toggle="modal" to="" data-target="#search" className="nav-link"><i className="icon-search"></i></Link>
                                </li>
                                <li className="nav-item cart">
                                <Link data-toggle="modal" to="" data-target="#cart" className="nav-link"><span>Cart</span><span>2</span></Link>
                                </li>
                            </ul>
                            </div>
                        </nav>
                        </div>
                    </div>
                    </header>

                    <br />
                    <br />
                    <br />


                <section className="py-md-0">
                <div className="image image-overlay" style={{backgroundImage:'url(https://neomall.herokuapp.com/assets/images/background-2.jpg)'}}></div>
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
                                    <form onSubmit={this.submitHandler} enctype="multipart/form-data" files="true">
                                        <div className="accordion accordion-portal" id="accordionExample2">
                                            <div className="card-header" id="seller-signup-1">
                                                <h2 className="mb-0">
                                                    <button className="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#seller-acct" aria-expanded="false" aria-controls="seller-acct">
                                                    CREATE AD <span style={{ marginLeft: '.5rem' }} /><span style={{ marginLeft: '.5rem' }} /><span style={{ marginLeft: '.5rem' }} /><span style={{ marginLeft: '.5rem' }} /><span style={{ marginLeft: '.5rem' }} />
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
                                                    {/* <input type="text" name="category" className="form-control" id="category"  value={category} onChange={this.changeHandler}  /> */}
                                                    <select name="category" id="category" className="form-control" value={category} onChange={this.changeHandler} >
                                                        <option value="" disabled selected >Category</option>
                                                        <option value="None">Not at all -- 0</option>
                                                        <option value="Barely">Barely -- 1</option>
                                                        <option value="Mild">Mildly -- 2</option>
                                                        <option value="Moderate">More often -- 3</option>
                                                        <option value="Severe">Severely -- 4</option>
                                                    </select>
                                                </div>
                                                <div className="form-group col-12">
                                                    <label htmlFor="description">Description</label>
                                                    <input type="text" name="description" className="form-control" id="description"  value={description} onChange={this.changeHandler}  />
                                                </div>

                                            </div>
                                            <div className="card-header" id="seller-signup-2">
                                                <h2 className="mb-0">
                                                    <button className="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#seller-business" aria-expanded="false" aria-controls="seller-business">
                                                    CREATE AD <span style={{ marginLeft: '.5rem' }} /><span style={{ marginLeft: '.5rem' }} /><span style={{ marginLeft: '.5rem' }} /><span style={{ marginLeft: '.5rem' }} /><span style={{ marginLeft: '.5rem' }} />
                                                    </button>
                                                </h2>
                                            </div>
                                            <div className="form-group col-12 collapse" id="seller-business" aria-labelledby="seller-signup-2" data-parent="#accordionExample2">
                                            <div className="form-group col-12">
                                                    <label htmlFor="goodPics">Good pics</label>
                                                    <input type="file" name="file[]" className="form-control" id="goodPics" onChange={this.goodPicsHandler} multiple required />
                                                </div>
                                                <img class="img-responsive" src={this.state.file1} />
                                                <br />
                                                <br />
                                                <img class="img-responsive" src={this.state.file2} />

                                                <div className="form-group col-12">
                                                    <label htmlFor="price">Price</label>
                                                    <input type="text" name="price" className="form-control" id="price"  value={price} onChange={this.changeHandler}  />
                                                </div>
                                                
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