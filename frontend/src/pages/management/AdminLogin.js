import React, {Component} from 'react';
import {Redirect, Route} from 'react-router-dom';
import axios from 'axios';
import Login from '../../components/Login';
import './styles/AdminLogin.css';
import '../../styles/global.css';
import AdminNav from '../../components/AdminNav';
import ReactLoading from 'react-loading';

class AdminLogin extends Component{
    constructor(){
        super()
        this.state = {
            isLogged: false,
            isLoading: true,
        }
    }

    componentDidMount(){
        axios.get('http://localhost:8082/api/admin/isLogged',{withCredentials: true, credentials: 'include'})
        .then((res) =>{
          if(res.data.code === 1){
            this.setState({
              isLogged: true,
              isLoading:false
            })
          } else{
            this.setState({
              isLogged: false,
              isLoading: false
            })
          }
        })
    }

    render(){
        if(this.state.isLoading === false && this.state.isLogged === false){
            return(
                <div>
                    <Route component={AdminNav} />
                    <div className='pageAdmin-background'>
                        <div className="pageAdmin-container">
                            <h2>Painel Administrativo</h2>
                            <Route path="/sistema/login" render={() => (<Login {...this.props} isAdmin={true} />)} />
                        </div>
                    </div>
                </div>
            )
        } 
        else if(this.state.isLoading === false && this.state.isLogged === true) return (<Redirect to="/sistema/home"/>)
        else return(<ReactLoading className="loading" type={"spin"} color={"green"} height={'20%'} width={'20%'} />)
    }
}

export default AdminLogin;