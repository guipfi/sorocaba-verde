import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

import UserLogin from './pages/client/UserLogin';
import AdminLogin from './pages/management/AdminLogin';
import HomeSistema from './pages/management/Home';
import SolicitacoesSistema from './pages/management/Solicitations';

class App extends Component {
  render() {
    return (
      <Router>
        {/* <Route exact path='/' component={ShowBookList} />
        <Route path='/create-book' component={CreateBook} />
        <Route path='/edit-book/:id' component={UpdateBookInfo} />
        <Route path='/show-book/:id' component={ShowBookDetails} /> */}
        <Route path='/login' component= {UserLogin} />
        
        <Route path='/sistema/home' component= {HomeSistema} />
        <Route path='/sistema/novas-solicitacoes' component={() => <SolicitacoesSistema type={"new"} />} />
        <Route path='/sistema/solicitacoes' component={() => <SolicitacoesSistema type={"queue"} />}/>
        <Route path='/sistema/login' component={AdminLogin}/>
      </Router>
    );
  }
}

export default App;