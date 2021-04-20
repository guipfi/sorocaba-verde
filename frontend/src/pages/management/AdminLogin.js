import React, {Component} from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Login from '../../components/Login';
import './styles/AdminLogin.css';
import '../../styles/global.css';
import AdminNav from '../../components/AdminNav';

class AdminLogin extends Component{
    render(){
        return(
            <Router>
                <Route component={AdminNav} />
                <div className='pageAdmin-background'>
                    <div className="pageAdmin-container">
                        <h2>Painel Administrativo</h2>
                        <Route path="/" render={() => (<Login isAdmin={true} />)} />
                    </div>
                </div>
            </Router>
        )
    }
}

export default AdminLogin;