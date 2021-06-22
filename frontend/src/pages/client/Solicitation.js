import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import RequestItem from '../../components/RequestItem';
import UserNav from '../../components/UserNav';

import '../../styles/global.css';
import "./styles/UserPage.css";
import './styles/Solicitation.css';
import back from './assets/chevron-left-solid.svg';
import forw from './assets/forward_icon.png';
import FormSolicitation from '../../components/FormSolicitation';


function Solicitation(props){

    useEffect(() => {
        const params = new URLSearchParams(props.location.search); 
        setAddress(params.get('address'));
        setCoords([params.get('lat'), params.get('lng')]);
    }, [props.location.search]);


    const [address, setAddress] = useState('');
    const [coords, setCoords] = useState([]);


    return(
        <div>
            <Route path="/" component={UserNav} />
            
            <div className="page-container" id="client-solicitation">
                
                {/* <section style={{"display": sectionDisplay}}>
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

                </section>
                 */}
                <aside>
        
                    {/* <div className="button-max" style={{"display": buttonDisplay}}>
                        <img src={forw} onClick={showSection} alt="Mostrar"/>
                    </div>   */}

                    <FormSolicitation {...props} address={address} lat={coords[0]} lng={coords[1]}/>

                </aside>
            </div>
        </div>
    )
}

export default Solicitation;