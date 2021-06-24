import React, {Component} from 'react';
import MenuItems from './MenuItems';
import axios from 'axios';

import "./styles/UserNav.css"
import "../styles/global.css"
import logo from './assets/logo.png'

class UserNav extends Component{
    constructor(){
        super()
        this.state = {
            isLogged: false
        }
    }

    goToHome = () =>{
      this.props.history.replace("/")
    }

    logout = () =>{
        axios.get(`${process.env.REACT_APP_API_URL}/users/logout`,{withCredentials: true, credentials: 'include'}).then((res) =>{
            if(res.data.code === 1){
              this.setState({
                isLogged: false
              }, () =>{
                this.props.history.replace("/login")
              })    
            }
        })
    }

    componentDidMount(){
        axios.get(`${process.env.REACT_APP_API_URL}/users/isLogged`,{withCredentials: true, credentials: 'include'})
        .then((res) =>{
          if(res.data.code === 1){
            this.setState({
              isLogged: true,
            })
          } else{
              this.setState({
                isLogged: false,
              })
          }
        })
      }
    
    render(){
        return(
            <nav id="user-nav">
                <div className="logo-container">
                    <img src={logo} width={25} height={25} alt="" style={{marginRight:10}} />
                    <div onClick={this.goToHome} className="title">Sorocaba Verde</div>
                </div>
                <ul className="menu-items">
                  { MenuItems.map((item) =>{
                      return(<li onClick={this.goToHome}>{item.title}</li>)
                    })
                  }
                </ul>
                {this.state.isLogged ? <div className='login-nav' onClick={this.logout}>Logout</div>:<div className="login-nav">Login</div>}
            </nav>
        )
    }
}

export default UserNav;