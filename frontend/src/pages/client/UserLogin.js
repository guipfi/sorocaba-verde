import React, {Component} from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Login from '../../components/Login';
import './styles/UserLogin.css';
import '../../styles/global.css'
import UserNav from '../../components/UserNav';

class UserLogin extends Component{
    render(){
        return(
            <Router>
                <Route path='/' component={UserNav} />
                <div className="page-background">
                    <div className="page-container">
                        <div className="page-content">
                            <h2>Bem vindo ao Portal de Gestão de Aborização de Sorocaba,</h2>
                            <h5>Aqui você poderá requisitar cortes, podas e substituições de árvores, além de acompanhar o progresso de arborização da cidade de Sorocaba.</h5>
                            <br/>
                            <h5>#SorocabaVerde</h5>
                        </div>
                        <Route path='/' component={Login} />
                    </div>
                </div>
            </Router>
        )
    }
}

export default UserLogin;