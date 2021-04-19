import React, {useState} from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import RequestItem from '../../components/RequestItem';
import UserNav from '../../components/UserNav';

import '../../styles/global.css';
import "./styles/UserPage.css";
import './styles/Solicitation.css';
import back from './assets/chevron-left-solid.svg';
import forw from './assets/forward_icon.png';
import FormSolicitation from '../../components/FormSolicitation';

function Solicitation(){

    const [name, setName] = useState("José Augusto");
    const [sectionDisplay, setSectionDisplay] = useState("block");
    const [buttonDisplay, setButtonDisplay] = useState("none");

    function hideSection() {
        setSectionDisplay("none");
        setButtonDisplay("flex");
    }

    function showSection(){
        setSectionDisplay("block");
        setButtonDisplay("none");
    }

    return(
        <Router>
            <Route path="/" component={UserNav} />
            
            <div className="page-container">
                
                <section style={{"display": sectionDisplay}}>
                    <div className="icon">
                        <img src={back} onClick={hideSection} alt="Voltar"/>
                    </div>
                    <h3>
                        Olá, {name}!
                    </h3>
                    <p className="introduction">Aqui você poderá acompanhar a arborização de Sorocaba e solicitar cortes, podas ou substituições de árvores.</p>
                    <h4>Suas solicitações</h4>
                    <div className="item-header">
                        <p>Detalhes</p>
                        <p>Status</p>
                    </div>
                    <RequestItem />
                    <RequestItem />
                    <RequestItem />
                    <div className="button-container">
                        <button>
                            Nova solicitação
                        </button>
                    </div>

                </section>
                
                <aside>

                    <div className="button-max" style={{"display": buttonDisplay}}>
                        <img src={forw} onClick={showSection} alt="Mostrar"/>
                    </div>  
                    
                    <FormSolicitation />

                </aside>
            </div>
            
        </Router>
    )
}

export default Solicitation;