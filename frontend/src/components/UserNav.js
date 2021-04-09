import React, {Component} from 'react';
import MenuItems from './MenuItems';

import "./styles/UserNav.css"
import "../styles/global.css"
import logo from './assets/logo.png'

class UserNav extends Component{
    render(){
        return(
            <nav>
                <div className="logo-container">
                    <img src={logo} width={25} height={25} alt="" style={{marginRight:10}} />
                    <div className="title"><a href="#">Sorocaba Verde</a></div>
                </div>
                <ul className="menu-items">
                  { MenuItems.map((item) =>{
                      return(<li><a className={item.cName} href={item.url}>{item.title}</a></li>)
                    })
                  }
                </ul>
                <div className="login-nav"><a href="#">Login</a></div>
            </nav>
        )
    }
}

export default UserNav;