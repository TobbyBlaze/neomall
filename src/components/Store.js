import React, { Component } from 'react'
import axios from 'axios'
import ReactDOM from 'react-dom'
import { Link, useParams } from 'react-router-dom'

import Header from './Header';
import Footer from './Footer';

export default class Store extends Component{
    // _isMounted = false;
    constructor(props){
        super(props);

        this.state = {
            goods: [],
            good: {
                file : '',
                name : '',
                description : '',
                price : '',
                category : '',
            },
            errorMsg: ''
            
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

    componentDidMount(){
        var a=localStorage.getItem("authen");
        axios

            // .get('http://localhost/yummypizza/public/api/auth', {
            .get('https://neomallapi.herokuapp.com/api/auth', {
                headers: {
                    // 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+a,
                    // 'withCredentials': true
                }
            })
            .then(response => {
                // console.log(response.data.goods.data)
                this.setState({ goods: response.data.goods.data })
            })
            .catch(error => {
                // console.log(error)
                this.setState({errorMsg: 'Error retrieving data'})
            })

    }

    getOne(good){
        this.setState({
            goods:{
            id : good.id,
            file : good.file,
            name : good.name,
            description : good.description,
            price : good.price,
            category : good.category
            }
        })
    }

    componentWillUnmount() {
        // fix Warning: Can't perform a React state update on an unmounted component
        this.setState = (state,callback)=>{
            return;
        };
    }

    render(){
        const { goods, errorMsg } = this.state;

        return(
            
            <div>
                <Header />

                {/* <!-- categories --> */}
                <section className="pt-1">
                <div className="container-full">
                    <div className="row masonry gutter-1">
                    <div className="col-md-4">
                        <Link to="#" className="card card-equal equal-50 equal-md-100 card-scale">
                        <span className="image image-overlay" style={{backgroundImage: 'url(assets/images/card-1.jpg)'}}></span>
                        <span className="image image-overlay" ></span>
                        <div className="card-body text-center text-white">
                            <h3>Kitchen &amp; Dining</h3>
                        </div>
                        </Link>
                    </div>
                    <div className="col-md-4">
                        <Link to="#" className="card card-equal equal-50 equal-md-100 card-scale">
                        <span className="image image-overlay" style={{backgroundImage: 'url(assets/images/card-2.jpg)'}}></span>
                        <span className="image image-overlay" ></span>
                        <div className="card-body text-center text-white">
                            <h3>Living Room</h3>
                        </div>
                        </Link>
                    </div>
                    <div className="col-md-4">
                        <Link to="#" className="card card-equal equal-50 equal-md-100 card-scale">
                        <span className="image image-overlay" style={{backgroundImage: 'url(assets/images/card-3.jpg)'}}></span>
                        <span className="image image-overlay" ></span>
                        <div className="card-body text-center text-white">
                            <h3>Bathroom</h3>
                        </div>
                        </Link>
                    </div>
                    <div className="col-md-4">
                        <Link to="#" className="card card-equal equal-50 equal-md-100 card-scale">
                        <span className="image image-overlay" style={{backgroundImage: 'url(assets/images/card-3.jpg)'}}></span>
                        <span className="image image-overlay" ></span>
                        <div className="card-body text-center text-white">
                            <h3>Bathroom</h3>
                        </div>
                        </Link>
                    </div>
                    <div className="col-md-4">
                        <Link to="#" className="card card-equal equal-50 equal-md-100 card-scale">
                        <span className="image image-overlay" style={{backgroundImage: 'url(assets/images/card-3.jpg)'}}></span>
                        <span className="image image-overlay" ></span>
                        <div className="card-body text-center text-white">
                            <h3>Bathroom</h3>
                        </div>
                        </Link>
                    </div>
                    <div className="col-md-4">
                        <Link to="#" className="card card-equal equal-50 equal-md-100 card-scale">
                        <span className="image image-overlay" style={{backgroundImage: 'url(assets/images/card-3.jpg)'}}></span>
                        <span className="image image-overlay" ></span>
                        <div className="card-body text-center text-white">
                            <h3>Bathroom</h3>
                        </div>
                        </Link>
                    </div>
                    <div className="col-md-4">
                        <Link to="#" className="card card-equal equal-50 equal-md-100 card-scale">
                        <span className="image image-overlay" style={{backgroundImage: 'url(assets/images/card-3.jpg)'}}></span>
                        <span className="image image-overlay" ></span>
                        <div className="card-body text-center text-white">
                            <h3>Bathroom</h3>
                        </div>
                        </Link>
                    </div>
                    <div className="col-md-4">
                        <Link to="#" className="card card-equal equal-50 equal-md-100 card-scale">
                        <span className="image image-overlay" style={{backgroundImage: 'url(assets/images/card-3.jpg)'}}></span>
                        <span className="image image-overlay" ></span>
                        <div className="card-body text-center text-white">
                            <h3>Bathroom</h3>
                        </div>
                        </Link>
                    </div>
                    <div className="col-md-4">
                        <Link to="#" className="card card-equal equal-50 equal-md-100 card-scale">
                        <span className="image image-overlay" style={{backgroundImage: 'url(assets/images/card-3.jpg)'}}></span>
                        <span className="image image-overlay" ></span>
                        <div className="card-body text-center text-white">
                            <h3>Bathroom</h3>
                        </div>
                        </Link>
                    </div>
                    </div>
                </div>
                </section>

                <div>
                    <Footer />
                </div>
                
            </div>
        )
    }
}

// if (document.getElementById('home')) {
//     ReactDOM.render(<Home />, document.getElementById('home'));
// }
