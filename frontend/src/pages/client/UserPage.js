import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import axios from 'axios';
import Mapa from '../../components/Maps';
import RequestItem from '../../components/RequestItem';
import UserNav from '../../components/UserNav';
import ReactLoading from 'react-loading';
import Solicitation from './Solicitation.js';

import '../../styles/global.css';
import "./styles/UserPage.css";
import back from './assets/chevron-left-solid.svg';
import forw from './assets/forward_icon.png';

class UserPage extends Component{
    constructor(){
        super()
        this.state = {
            name:"",
            sectionDisplay:"flex",
            buttonDisplay:"none",
            isLoading: true,
            solicitations: []
        }
    }

    componentDidMount(){
        axios.get('http://localhost:8082/api/users/isLogged',{withCredentials: true, credentials: 'include'})
        .then(res =>{
            if(res.data.code === 1){
                let name = res.data.user.name
                axios.get('http://localhost:8082/api/solicitations/userSolicitations',
                {withCredentials: true, credentials: 'include'}).then(
                    res =>{
                        this.setState({...this.state, name, isLoading:false, solicitations: res.data.solicitations})
                    }
                )
            } else this.props.history.replace("/login")
        })
    }

    hideSection = () =>{ 
        this.setState({...this.state, sectionDisplay:"none",buttonDisplay:"flex"})
    }

    showSection = () =>{
        this.setState({...this.state, sectionDisplay:"flex",buttonDisplay:"none"})
    }

    render(){
        if(this.state.isLoading == false){
            return(
                <div id="user-page-content">
                    <Route path="/" component={UserNav} />
                    
                    <div className="page-container" id="user-page-container">
                        
                        <section style={{"display": this.state.sectionDisplay}}>
                            <div className="icon">
                                <img src={back} onClick={this.hideSection} alt="Voltar"/>
                            </div>
                            <h3>
                                Olá, {this.state.name}!
                            </h3>
                            <p className="introduction">Aqui você poderá acompanhar a arborização de Sorocaba e solicitar cortes, podas ou substituições de árvores.</p>
                            <h4>Suas solicitações</h4>
                            <div className="item-header">
                                <p>Detalhes</p>
                                <p>Status</p>
                            </div>
                            {   this.state.solicitations.map((solicitation) =>{
                                    return(
                                        <Link to={"/solicitation/"+solicitation._id}>
                                            <RequestItem status={solicitation.status} date={solicitation.date} type={solicitation.type} address ={solicitation.address} report={solicitation.report} />
                                        </Link>
                                    )
                                }) 
                            }
                            {(this.state.solicitations.length == 0) ? <h4>Você não possui solicitações</h4> :<div></div>}
                          
                            <p>Clique no mapa para criar uma nova solicitação no endereço desejado</p>

                        </section>
                        
                        <aside>
                            <div className="button-max" style={{"display": this.state.buttonDisplay}}>
                                <img src={forw} onClick={this.showSection} alt="Mostrar"/>
                            </div>  

                            <div className='map'>
                                <Mapa {...this.props} />
                            </div>
                        </aside>
                    </div>

                    <Switch>
                        <Route path='/solicitation'>
                            <Solicitation />
                        </Route>
                    </Switch>
                </div>
            )
        }  else return(<ReactLoading className="loading" type={"spin"} color={"green"} height={'20%'} width={'20%'} />)
    }
}

export default UserPage;