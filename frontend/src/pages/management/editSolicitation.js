import React, {Component} from 'react';
import axios from 'axios';
import AdminNav from '../../components/AdminNav';
import ReactLoading from 'react-loading';

import ReportList from '../../components/ReportList'
import {Link} from 'react-router-dom';
import './styles/EditSolicitation.css';
import '../../styles/global.css'

import back from './assets/chevron-left-solid.svg';
import editSVG from './assets/edit.svg';

class EditSolicitation extends Component{
    constructor(){
        super()
        this.state = {
            isLoading: true,
            type:"",
            address:"",
            date:"",
            description:"",
            photos:[],
            status:"",
            priority:"",
            tree:"",
            treeInput:false
        }
    }
    
    componentDidMount(){
        const verifyLogin = async () => {
			axios.get(`${process.env.REACT_APP_API_URL}/admin/isLogged`,{withCredentials: true, credentials: 'include'})
			.then(res =>{
				if(res.data.code !== 1){
					this.props.history.replace('/sistema/login');
				}
			})
		}

        const getSolicitationById = async (id) => {
            axios.get(`${process.env.REACT_APP_API_URL}/solicitations/solicitation/content/`+id)
            .then(res =>{
                if(res.data.code !==1){
                    this.props.history.goBack();
                } else{
                    this.setState({...this.state,
                        type:res.data.solicitation.type,
                        address: res.data.solicitation.address,
                        status: res.data.solicitation.status,
                        date:res.data.solicitation.date,
                        description:res.data.solicitation.description,
                        priority: res.data.solicitation.priority,
                        photos: res.data.solicitation.photosURL,
                        tree:res.data.solicitation.tree})
                }
            })
        }

        const loadAll = async () => {
			await verifyLogin();
            await getSolicitationById(this.props.match.params.id)
			this.setState({...this.state,isLoading:false});
		}

        loadAll();
    }

    renderSwitch = () =>{
        switch(this.state.priority){
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

    renderSwitchStatus = () =>{
        switch(this.state.status){
            case 1:
                return(<h6>Na fila de espera</h6>)
            case 2:
                return(<h6>Em atendimento</h6>)
            case 3:
                return(<h6>Concluído</h6>)
            default:
                return(<h6>Não Definido</h6>)
        }
    }

    back(){
        this.props.history.goBack()
    }

    handlePriority(newPriority){
        this.setState({...this.state, priority:newPriority})
    }

    handleStatus(newStatus){
        this.setState({...this.state, status:newStatus})
    }

    confirmEdit(){
        axios.post(`${process.env.REACT_APP_API_URL}/solicitations/solicitation/content/`+this.props.match.params.id, {priority:this.state.priority, status: this.state.status, tree:this.state.tree})
        .then(res =>{
            if(res.data.code == 1){
                this.props.history.goBack()
            }
        })
    }

    salvarTree = () =>{
        const input = document.getElementById('editTreeInput').value
        this.setState({...this.state, tree:input, treeInput:false})
    }
    
    treeIdentification = () =>{
        if(this.state.treeInput == false){
            return(
                <div onClick={() => this.setState({...this.state,treeInput:true})} class="flex-container">
                    <h6> {this.state.tree!==null ? this.state.tree:"Não especificada"}</h6>
                    <img id="editSVG" src={editSVG} height={15} width={15} alt="editar"/>
                </div>
            );
        } else{
            return(
                <div class="flex-container">
                    <input placeholder={this.state.tree} type="text" id="editTreeInput" />
                        <div onClick={this.salvarTree} class="salvarButton">✓</div>
                        <div onClick={() => this.setState({...this.state,treeInput:false})} class="cancelarButton">X</div>
                </div>
            )
        }  
    }

    render(){
        if(this.state.isLoading === false){
            return(
                <div class="editSolicitation">
                    <AdminNav {...this.props} ></AdminNav>
                    <div class="editSolicitation-content">
                        <div class="editSolicitation-title">
                            <div class="edit-back">
                                <img src={back} onClick={this.back.bind(this)} alt="Voltar"/>
                            </div>
                            <h2>{this.state.type} | {this.state.address}</h2>
                        </div>
                        <div id="editSolicitation-infos">

                            <div class="editSolicitation-info">
                                <h5>Identificação da Árvore</h5>
                                {this.treeIdentification()}
                            </div>

                            <div class="editSolicitation-info">
                                <h5>Grau de Prioridade</h5>
                                {this.renderSwitch()}
                            </div>

                            <div class="editSolicitation-info">
                                <h5>Status de atendimento</h5>
                                {this.renderSwitchStatus()}
                            </div>

                            <div class="editSolicitation-info">
                                <h5>Data</h5>
                                <h6>{this.state.date}</h6>
                            </div>

                            <div class="editSolicitation-info">
                                <h5>Endereço</h5>
                                <h6>{this.state.address}</h6>
                            </div>

                            <div class="editSolicitation-info">
                                <h5>Tipo de solicitação</h5>
                                <h6>{this.state.type}</h6>
                            </div>

                            <div class="editSolicitation-info">
                                <h5>Descrição</h5>
                                <h6>{this.state.description}</h6>
                            </div>
                        </div>
                        <div id="editSolicitation-photos">
                            <h5>Fotos</h5>
                            {<div class="photos-list">
                            {this.state.photos.length === 0 ? <h6>Não há fotos nessa solicitação</h6> : this.state.photos.map((value) =>{
                                return (<div class="img-view-container"><div class="img-view"><img src={value} height={300} width={300} /></div></div>)
                            })}
                            </div>}
                        </div>                   
                        <div id="editSolicitation-priority">
                            <h5>Definir grau de prioridade</h5>
                            <div id="priority-buttons">
                                {
                                    ["Emergência","Urgente","Pouco Urgente","Não Urgente"].map((element,index) => {
                                        if(index+1 != this.state.priority)
                                            return(<div onClick={() => this.handlePriority(index+1)} class="priority-button">{element}</div>)
                                        else
                                        return(<div class="priority-button-select">{element}</div>)
                                    })
                                }
                            </div>
                        </div>
                        <div id="editSolicitation-status">
                            <h5>Definir o status da atendimento</h5>
                            <div id="status-buttons">
                                {
                                    ["Na fila de espera","Em atendimento","Concluído"].map((element,index) => {
                                        if(index+1 != this.state.status)
                                            return(<div onClick={() => this.handleStatus(index+1)} class="priority-button">{element}</div>)
                                        else
                                        return(<div class="priority-button-select">{element}</div>)
                                    })
                                }
                            </div>
                        </div>
                        <div class="report-list" id="report-edit">
                            <h5>Laudos</h5>
                            <ReportList id={this.props.match.params.id} isTree={false} />
                            
                            <Link to={{pathname:"/sistema/cadastrar-laudo/"+this.props.match.params.id, address:this.state.address}}> 
                                <div class = "confirm-edit" id="insert-report">
                                    Inserir novo laudo
                                </div>
                            </Link>
                        </div>

                        <div class="editSolicitation-options">
                            <div class = "cancel-edit" onClick={()=> this.props.history.goBack()}>Cancelar</div>
                            <div class = "confirm-edit" onClick={this.confirmEdit.bind(this)} >Confirmar</div>
                        </div>
                    </div>
                </div>
            )
        } 
        else return(<ReactLoading className="loading" type={"spin"} color={"green"} height={'20%'} width={'20%'} />)
    }
}

export default EditSolicitation;    