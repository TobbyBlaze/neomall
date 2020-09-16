import React, { Component } from 'react'
import axios from 'axios'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'
import { Lines, Circle2 } from 'react-preloaders'

import Check from './Check';
// import Footer from './Footer';

export default class Checks extends Component{
    render(){
        return(
            <div>
                <React.StrictMode>
                    <Check />
                </React.StrictMode>,
            </div>

        )
    }
}