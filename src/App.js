import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// import Header from './Header';
import Home from './components/Home';
import Cart from './components/Cart';
import Product from './components/Product';
import Checkout from './components/Checkout';
import Portal from './components/Portal';
import SellerPortal from './components/SellerPortal';
import AdminPortal from './components/AdminPortal';
import Store from './components/Store';
import Profile from './components/Profile';
import Shop from './components/Shop';
// import Footer from './Footer';
// import Error from './Error';
import Thanks from './components/Thanks';
import Admine from './components/Admine';

export default class App extends Component{
  render(){
    return (
      <BrowserRouter>
        <div>
            {/* <Header /> */}
            <Switch>
                
                <Route exact path='/' component={Home} />
                <Route exact path='/product/:id' component={Product} />
                <Route exact path='/product' component={Product} />
                <Route exact path='/cart' component={Cart} />
                <Route exact path='/checkout' component={Checkout} />
                <Route exact path='/thanks' component={Thanks} />
                <Route exact path='/admine' component={Admine} />
                <Route exact path='/portal' component={Portal} />
                <Route exact path='/seller-portal' component={SellerPortal} />
                <Route exact path='/admin-portal' component={AdminPortal} />
                <Route exact path='/store' component={Store} />
                <Route exact path='/profile' component={Profile} />
                <Route exact path='/shop' component={Shop} />
            </Switch>
            {/* <Footer /> */}
        </div>
    </BrowserRouter>
    );
  }
}

// export default App;
