import React, {Component} from 'react';
import axios from 'axios';
import AdminNav from '../../components/AdminNav';
import ReactLoading from 'react-loading';

import '../../styles/global.css'
import './styles/reportRegister.css'
import back from './assets/chevron-left-solid.svg';

class ReportRegister extends Component{
    constructor(){
        super()
        this.state ={
            isLoading: false,
            address:"",
            docs:[],
            adminName:"",
            adminId:""
        }
    }

    componentDidMount(){
        if(this.props.location.address != undefined){
            this.setState({...this.state,address:this.props.location.address})
        }
    }
    
    back(){
        this.props.history.goBack()
    }

    render(){
        if(this.state.isLoading == false){
            return(
                <div class="editSolicitation" id="reportRegister">
                    <AdminNav {...this.props} ></AdminNav>
                    <div class="editSolicitation-content" id="reportRegister-content">
                        <div class="editSolicitation-title" id="reportRegister-title">
                            <div class="edit-back">
                                <img src={back} onClick={this.back.bind(this)} alt="Voltar"/>
                            </div>
                            <h2>Cadastrar Laudo</h2>
                        </div>

                        <div id="reportRegister-infos">
                            <div class="editSolicitation-info">
                                <h5>Endereço</h5>
                                <h6>{this.state.address}</h6>
                            </div>
                            <div class="editSolicitation-info">
                                <h5>Técnico responsável</h5>
                                <h6>{this.state.adminName} (ID #{this.state.adminId})</h6>
                            </div>
                        </div>

                        <div class="editSolicitation-info" id="reportDocuments">
                            <h5>Documentos</h5>

                            <div class = "confirm-edit" id="insert-document">
                                Adicionar documento
                                <input type="file" id="insert-document-input"/>
                            </div>
                        </div>
                    
                        <div class="editSolicitation-options">
                                <div class = "cancel-edit" onClick={()=> this.props.history.goBack()}>Cancelar</div>
                                <div class = "confirm-edit" >Confirmar</div>
                        </div>

                        <div class="editSolicitation-info">
                            <h4>[!] Atenção: O laudo não poderá ser alterado após a  confirmação.</h4>
                        </div>
                    </div>
                </div>
            )
        } else return(<ReactLoading className="loading" type={"spin"} color={"green"} height={'20%'} width={'20%'} />)
    }
}
export default ReportRegister;