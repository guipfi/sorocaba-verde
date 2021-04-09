import React, {Component} from 'react';

import '../../styles/global.css'
import './styles/Home.css'

class HomeSistema extends Component{
    render(){
        return(
            <div className="container">
                <h1>Painel Administrativo</h1>
                <div className="page-sections">
                    <section className="new-solicitations">
                        <h3>Novas solicitações (12)</h3>
                        <div className="solicitations-list"></div>
                        <button>Acessar solicitações</button>
                    </section>    
                    <section className="solicitations-queue">
                        <h3>Solicitações na fila (15)</h3>
                        <div className="solicitations-list"></div>
                        <button>Acessar solicitações</button>
                    </section>
                    <section className="map"></section> 
                </div>
            </div>
        )
    }
}

export default HomeSistema;