import React, {Component} from 'react';
import axios from 'axios';
import AdminMenuItems from './AdminMenuItems';
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

    componentDidMount(){
        axios.get('http://localhost:8082/api/admin/isLogged',{withCredentials: true, credentials: 'include'})
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

    logout = () =>{
        axios.get('http://localhost:8082/api/admin/logout',{withCredentials: true, credentials: 'include'}).then((res) =>{
            if(res.data.code === 1){
              this.setState({
                isLogged: false
              }, () =>{
                this.props.history.replace("/sistema/login")
              })    
            }
        })
    }

    render(){
        if(this.state.isLogged == false){
            return(
                <nav className="admin-navLogin">
                    <div className="logo-container">
                        <img src={logo} width={25} height={25} alt="" style={{marginRight:10}} />
                        <div className="title"><a href="#">Sorocaba Verde</a></div>
                    </div>             
                </nav>
            )
        } else{
            return(
                <nav className="admin-nav">
                    <div className="logo-container">
                        <img src={logo} width={25} height={25} alt="" style={{marginRight:10}} />
                        <div className="title"><a href="/sistema">Sorocaba Verde</a></div>
                    </div>
                    <ul className="menu-items">
                        { AdminMenuItems.map((item) =>{
                            if(item.cName !== "dropdown-toggle"){
                                return(<li><a className={item.cName} href={item.url}>{item.title}</a></li>)
                            }
                            else{
                                return(
                                <div class="subnav">
                                     <div class="subnavbtn">{item.title}<i class="fa fa-caret-down"></i></div>
                                        <div class="subnav-content">
                                            <a href={item.items.novaSolicitacao.url}>{item.items.novaSolicitacao.title}</a>
                                            <a href={item.items.filaSolicitacao.url}>{item.items.filaSolicitacao.title}</a>
                                        </div>
                                </div>
                                )
                            }
                        })
                        }
                    </ul>
                    <div className='login-nav' onClick={this.logout}>Logout</div>       
                </nav>
            )
        }
    }
}

export default AdminNav;