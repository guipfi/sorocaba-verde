import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

import UserLogin from './pages/client/UserLogin';
import HomeSistema from './pages/management/Home';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          {/* <Route exact path='/' component={ShowBookList} />
          <Route path='/create-book' component={CreateBook} />
          <Route path='/edit-book/:id' component={UpdateBookInfo} />
          <Route path='/show-book/:id' component={ShowBookDetails} /> */}
          <Route path='/login' component= {UserLogin} />
          <Route path='/sistema/home' component= {HomeSistema} />
        </div>
      </Router>
    );
  }
}

export default App;