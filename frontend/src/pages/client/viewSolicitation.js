import React, {useState, useEffect} from 'react';
import axios from 'axios';
import UserNav from '../../components/UserNav';
import ReactLoading from 'react-loading';

import {Link} from 'react-router-dom';
import './styles/ViewSolicitation.css';
import '../../styles/global.css'
import backBtn from './assets/chevron-left-solid.svg';

const ViewSolicitation = (props) => {
    
    const [infos, setInfos] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const verifyLogin = async () => {
            axios.get('http://localhost:8082/api/users/isLogged',{withCredentials: true, credentials: 'include'})
            .then(res =>{
                if(res.data.code !== 1){
                    props.history.replace('/login');
                }
            })
        }
        const getSolicitationById = async (id) => {
            axios.get('http://localhost:8082/api/solicitations/solicitation/content/'+id)
            .then(res =>{
                if(res.data.code !==1){
                    props.history.goBack();
                } else{
                    setInfos({
                        type:res.data.solicitation.type,
                        address: res.data.solicitation.address,
                        status: res.data.solicitation.status,
                        date:res.data.solicitation.date,
                        description:res.data.solicitation.description,
                        priority: res.data.solicitation.priority,
                        photo: res.data.solicitation.photosURL
                    });
                }
            })
        }
    
        const loadAll = async () => {
            await verifyLogin();
            await getSolicitationById(props.match.params.id)
            setIsLoading(false);
        }
    
        if(isLoading) {
            loadAll();
        }
    },[]);

    const renderSwitch = () => {
        switch(infos.priority){
            case 1:
                return(<h6>Emergência</h6>)
            case 2:
                return(<h6>Urgente</h6>)
            case 3:
                return(<h6>Pouco Urgente</h6>)
            case 4:
                return(<h6>Não Urgente</h6>)
            default:
                return(<h6>Não Definido</h6>)
        }
    }

    const back = () => {
        this.props.history.goBack()
    }

    if(isLoading === false){
        return(
            <div class="editSolicitation">
                <UserNav {...props} ></UserNav>
                <div class="editSolicitation-content">
                    <div class="editSolicitation-title">
                        <div class="edit-back">
                            <img src={backBtn} onClick={() => back()} alt="Voltar"/>
                        </div>
                        <h2>{infos.type} | {infos.address}</h2>
                    </div>
                    <div id="editSolicitation-infos">
                        <div class="editSolicitation-info">
                            <h5>Grau de Prioridade</h5>
                            {renderSwitch()}
                        </div>

                        <div class="editSolicitation-info">
                            <h5>Data</h5>
                            <h6>{infos.date}</h6>
                        </div>

                        <div class="editSolicitation-info">
                            <h5>Endereço</h5>
                            <h6>{infos.address}</h6>
                        </div>

                        <div class="editSolicitation-info">
                            <h5>Tipo de solicitação</h5>
                            <h6>{infos.type}</h6>
                        </div>

                        <div class="editSolicitation-info">
                            <h5>Descrição</h5>
                            <h6>{infos.description}</h6>
                        </div>
                    </div>
                    <div id="editSolicitation-photos">
                        <h5>Fotos</h5>
                        {!infos.photos ? 
                            <h6>Não há fotos nessa solicitação</h6>:<h6>Tem fotos</h6>}
                    </div>                   
                    <div class="report-list" id="report-edit">
                        <h5>Laudos</h5>
                        {!infos.laudos ?
                         <h6>Não há laudos inseridos solicitação</h6>:<h6>Há Laudos</h6>
                        }
                    </div>
                </div>
            </div>
        )
    } 
    else return(<ReactLoading className="loading" type={"spin"} color={"green"} height={'20%'} width={'20%'} />)
}

export default ViewSolicitation;