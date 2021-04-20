import React, {Component} from 'react';
import axios from 'axios';

import "../styles/global.css"
import "./styles/AdminNav.css"
import logo from './assets/logo.png'

class AdminNav extends Component{
    constructor(){
        super()
        this.state = {
            isLogged: false
        }
    }
    render(){
        return(
            <nav className="admin-nav">
                <div className="logo-container">
                    <img src={logo} width={25} height={25} alt="" style={{marginRight:10}} />
                    <div className="title"><a href="#">Sorocaba Verde</a></div>
                </div>             
            </nav>
        )
    }
}

export default AdminNav;