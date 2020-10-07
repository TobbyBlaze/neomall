import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// import Header from './Header';
import Home from './components/Home';
import Cart from './components/Cart';
import Product from './components/Product';
import Ad from './components/Ad';
import Products from './components/Products';
import Checkout from './components/Checkout';
import Portal from './components/Portal';
import SellerPortal from './components/SellerPortal';
import AdminPortal from './components/AdminPortal';
import CourierPortal from './components/CourierPortal';
import Store from './components/Store';
import Profile from './components/Profile';
import AdminDashboard from './components/AdminDashboard';
import CourierDashboard from './components/CourierDashboard';
import SellerDashboard from './components/SellerDashboard';
import Shop from './components/Shop';
import C2C from './components/C2C';
import Footer from './components/Footer';
import Thanks from './components/Thanks';
import Admine from './components/Admine';
import CreateAds from './components/CreateAds';
import Checks from './components/Checks';
import CheckoutForm from './components/CheckoutForm';
import ActivateUser from './components/ActivateUser';
import ActivateSeller from './components/ActivateSeller';
import ActivateAdmin from './components/ActivateAdmin';
import ActivateCourier from './components/ActivateCourier';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import adminForgotPassword from './components/adminForgotPassword';
import adminResetPassword from './components/adminResetPassword';
import courierForgotPassword from './components/courierForgotPassword';
import courierResetPassword from './components/courierResetPassword';
import sellerForgotPassword from './components/sellerForgotPassword';
import sellerResetPassword from './components/sellerResetPassword';
import Error from './components/Error';
import Category from './components/Category';
import Dictaphone from './components/Dictaphone';

export default class App extends Component{
  render(){
    const eventhandler = data => console.log(data)

    
    const callbackFunction = (childData) => {
      this.setState({message: childData})
    }

    return (
      <BrowserRouter>
        <div>
            {/* <Header /> */}
            <Switch>
                
                <Route exact path='/' component={Home} />
                <Route exact path='/product/:id' component={Product} />
                <Route exact path='/ad/:id' component={Ad} />
                <Route exact path='/products/product/:id' component={Product} />
                <Route exact path='/products/:id' component={Products} />
                <Route exact path='/cat/:id' component={Category} />
                <Route exact path='/cart' component={Cart} />
                <Route exact path='/checkout' component={Checkout} />
                <Route exact path='/thanks' component={Thanks} />
                <Route exact path='/add-good' component={Admine} />
                <Route exact path='/create-ads' component={CreateAds} />
                <Route exact path='/portal' component={Portal} />
                <Route exact path='/seller-portal' component={SellerPortal} />
                <Route exact path='/admin-portal' component={AdminPortal} />
                <Route exact path='/courier-portal' component={CourierPortal} />
                <Route exact path='/store' component={Store} />
                <Route exact path='/profile' component={Profile} />
                <Route exact path='/admin-dashboard' component={AdminDashboard} />
                <Route exact path='/courier-dashboard' component={CourierDashboard} />
                <Route exact path='/seller-dashboard' component={SellerDashboard} />
                <Route exact path='/shop' component={Shop} />
                <Route exact path='/c2c' component={C2C} />
                <Route exact path='/activateUser/:id' component={ActivateUser} />
                <Route exact path='/activateSeller/:id' component={ActivateSeller} />
                <Route exact path='/activateAdmin/:id' component={ActivateAdmin} />
                <Route exact path='/activateCourier/:id' component={ActivateCourier} />
                <Route exact path='/forgotPassword' component={ForgotPassword} />
                <Route exact path='/resetPassword/:id' component={ResetPassword} />
                <Route exact path='/adminForgotPassword' component={adminForgotPassword} />
                <Route exact path='/adminResetPassword/:id' component={adminResetPassword} />
                <Route exact path='/courierForgotPassword' component={courierForgotPassword} />
                <Route exact path='/courierResetPassword/:id' component={courierResetPassword} />
                <Route exact path='/sellerForgotPassword' component={sellerForgotPassword} />
                <Route exact path='/sellerResetPassword/:id' component={sellerResetPassword} />
                <Route component={Error} />
                {/* <Route exact path='/checkout' component={Checks} /> */}
            </Switch>
            <Dictaphone onChange={eventhandler}/>
            <Footer />
        </div>
    </BrowserRouter>
    );
  }
}

// export default App;
