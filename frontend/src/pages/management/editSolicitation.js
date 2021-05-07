import React, {Component} from 'react';
import axios from 'axios';
import AdminNav from '../../components/AdminNav';
import ReactLoading from 'react-loading';

import './styles/EditSolicitation.css';
import back from './assets/chevron-left-solid.svg';

class EditSolicitation extends Component{
    constructor(){
        super()
        this.state = {
            isLoading: true,
            type:"",
            address:"",
            date:"",
            description:"",
            photos:"",
            status:"",
            priority:""
        }
    }

    componentDidMount(){
        const verifyLogin = async () => {
			axios.get('http://localhost:8082/api/admin/isLogged',{withCredentials: true, credentials: 'include'})
			.then(res =>{
				if(res.data.code !== 1){
					this.props.history.replace('/sistema/login');
				}
			})
		}

        const getSolicitationById = async (id) => {
            axios.get('http://localhost:8082/api/solicitations/solicitation/content/'+id)
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
                        photo: res.data.solicitation.photosURL})
                }
            })
        }

        const loadAll = async () => {
			await verifyLogin();
            console.log(this.props.match.params.id)
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

    back(){
        this.props.history.goBack()
    }

    handlePriority(newPriority){
        this.setState({...this.state, priority:newPriority})
    }

    confirmEdit(){
        axios.post('http://localhost:8082/api/solicitations/solicitation/content/'+this.props.match.params.id, {priority:this.state.priority})
        .then(res =>{
            if(res.data.code == 1){
                this.props.history.goBack()
            }
        })
    }
    
    render(){
        if(this.state.isLoading == false){
            return(
                <div id="editSolicitation">
                    <AdminNav {...this.props} ></AdminNav>
                    <div id="editSolicitation-content">
                        <div id="editSolicitation-title">
                            <div id="edit-back">
                                <img src={back} onClick={this.back.bind(this)} alt="Voltar"/>
                            </div>
                            <h2>{this.state.type} | {this.state.address}</h2>
                        </div>
                        <div id="editSolicitation-infos">
                            <div class="editSolicitation-info">
                                <h5>Grau de Prioridade</h5>
                                {this.renderSwitch()}
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
                            {this.state.photos.length === 0 ? 
                                <h4>Não há fotos nessa solicitação</h4>:<h4>Tem fotos</h4>}
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
                        <div id="editSolicitation-options">
                            <div id = "cancel-edit" onClick={()=> this.props.history.goBack()}>Cancelar</div>
                            <div id = "confirm-edit" onClick={this.confirmEdit.bind(this)} >Confirmar</div>
                        </div>
                    </div>
                </div>
            )
        } 
        else return(<ReactLoading className="loading" type={"spin"} color={"green"} height={'20%'} width={'20%'} />)
    }
}

export default EditSolicitation;    
