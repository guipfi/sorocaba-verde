import React, { Component} from 'react';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import ReactLoading from 'react-loading';
import axios from 'axios';
import './App.css';

import UserLogin from './pages/client/UserLogin';
import Sistema from './sistema';
import AdminLogin from './pages/management/AdminLogin';
import HomeSistema from './pages/management/Home';
import SolicitacoesSistema from './pages/management/Solicitations';
import UserPage from './pages/client/UserPage';
import Solicitation from './pages/client/Solicitation';
import EditSolicitation from './pages/management/editSolicitation';

class App extends Component {
  constructor () {
    super()
    this.state = {
      isLogged: false,
      isLoading: true
    };
  }
  
  componentDidMount(){
    axios.get('http://localhost:8082/api/users/isLogged',{withCredentials: true, credentials: 'include'})
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

  initialPage = () => {
    if(this.state.isLogged === true) return <Redirect to="/user" />
    return <Redirect to="/login"/>
  }

  render() {
    { if(this.state.isLoading == false){
        return (
          <Router>
            <Route exact path='/' render={this.initialPage} />
            <Route exact path='/sistema' component={Sistema} />
            <Route path='/login' component= {UserLogin} />
            <Route path='/sistema/home' component= {HomeSistema} />
            <Route path='/sistema/novas-solicitacoes' component={(props) => <SolicitacoesSistema {...props} type={"new"} />} />
            <Route path='/sistema/solicitacoes' component={(props) => <SolicitacoesSistema {...props} type={"queue"} />}/>
            <Route path='/sistema/login' component={AdminLogin}/>
            <Route path='/sistema/edit/:id' component={EditSolicitation}/>
            <Route path='/user' component={UserPage} />
            <Route path='/solicitation' component={Solicitation} />
          </Router>
        );
      }  
      else return(<ReactLoading className="loading" type={"spin"} color={"green"} height={'20%'} width={'20%'} />)
    }
  }
}

export default App;