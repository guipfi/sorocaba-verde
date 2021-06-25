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
import TreeBase from './pages/management/TreeBase';
import UserPage from './pages/client/UserPage';
import Solicitation from './pages/client/Solicitation';
import EditSolicitation from './pages/management/editSolicitation';
import TreeRegister from './pages/management/TreeRegister';
import ReportRegister from './pages/management/reportRegister';
import ViewReport from './pages/ViewReport';
import ViewSolicitation from './pages/client/viewSolicitation';
import ViewTree from './pages/client/viewTree';
import EditTree from './pages/management/editTree';

class App extends Component {
  constructor () {
    super()
    this.state = {
      isLogged: false,
      isLoading: true
    };
  }
  
  componentDidMount(){
    axios.get(`${process.env.REACT_APP_API_URL}/users/isLogged`,{withCredentials: true, credentials: 'include'})
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
            <Route path='/sistema/banco-arvores' component={(props) => <TreeBase {...props} type={"new"} />} />
            <Route path='/sistema/solicitacoes' component={(props) => <SolicitacoesSistema {...props} type={"queue"} />}/>
            <Route path='/sistema/login' component={AdminLogin}/>
            <Route path='/sistema/cadastrar-laudo/:id' component={ReportRegister} />
            <Route path='/sistema/edit/:id' component={EditSolicitation}/>
            <Route path='/sistema/tree-page/:id' component={EditTree}/>
            <Route path='/laudo/:id' component={ViewReport} />
            <Route path='/user' component={UserPage} />
            <Route path='/solicitationRegister' render={(props) => <Solicitation {...props} />} />
            <Route path='/sistema/treeRegister' render={(props) => <TreeRegister {...props} />} />
            <Route path='/solicitation/:id' component={ViewSolicitation} />
            <Route path='/tree/:id' component={ViewTree} />
          </Router>
        );
      }  
      else return(<ReactLoading className="loading" type={"spin"} color={"green"} height={'20%'} width={'20%'} />)
    }
  }
}

export default App;