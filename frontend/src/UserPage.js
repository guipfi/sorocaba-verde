import React, {Component} from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import UserNav from './components/UserNav';

class UserPage extends Component {
    render(){
        return(
            <Router>
                <Route path="/" component={UserNav} />
                <h1>Página do Usuário</h1>
            </Router>
        )
    }
}

export default UserPage;