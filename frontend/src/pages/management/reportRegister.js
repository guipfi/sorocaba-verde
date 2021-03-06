import React, {Component} from 'react';
import axios from 'axios';
import AdminNav from '../../components/AdminNav';
import ReactLoading from 'react-loading';

import '../../styles/global.css'
import './styles/reportRegister.css'
import back from './assets/chevron-left-solid.svg';
import fileSVG from './assets/file.svg';

class ReportRegister extends Component{
    constructor(){
        super()
        this.state ={
            isLoading: true,
            address:"",
            adminName:"",
            adminId:"",
            solicitation: "",
            tree:"",
            file:{}
        }
    }

    componentDidMount(){
        window.scrollTo(0, 0);

        const verifyLogin = async () =>{
            axios.get(`${process.env.REACT_APP_API_URL}/admin/isLogged`,{withCredentials: true, credentials: 'include'})
            .then(res =>{
                if(res.data.code !== 1){
                    this.props.history.replace('/sistema/login');
                } else{
                    this.setState({...this.state, adminName:res.data.admin.name, adminId:res.data.admin._id});
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
                     address:res.data.solicitation.address,
                     solicitation: res.data.solicitation._id,
                     tree: res.data.solicitation.tree})
                }
            })
        }

        const getTreeById = async (id) =>{
            axios.get(`${process.env.REACT_APP_API_URL}/trees/tree/content/`+id)
            .then(res=>{
                if(res.data.code !==1){
                    this.props.history.goBack();
                } else{
                    this.setState({...this.state,
                     address:res.data.tree.address,
                     tree: res.data.tree._id,
                     solicitation:null})
                }
            })
        }
        
        const loadAll = async () =>{
            await verifyLogin();
            if(this.props.location.state.isTree === true){
                await getTreeById(this.props.match.params.id)
            } else{
                await getSolicitationById(this.props.match.params.id)
            }

            this.setState({...this.state,isLoading:false});
        }

        loadAll();
    }
    
    back(){ 
        this.props.history.goBack()
    }

    addFileRender = () =>{
        return(
            <div class="fileAdd-container">
                <div onClick={this.onDeleteFile} id="deleteFile">X</div>
                <div class="fileAdd-content">
                    <img src={fileSVG} height={100} width={100} alt="Arquivo"/>
                    <h6>{this.state.file.name}</h6>
                </div>
            </div>
        )
    }

    onDeleteFile = () =>{
        this.setState({...this.state,file:{}})
    }

    handleFileInput = (e) => {
        const newFile = e.target.files[0]
        this.setState({...this.state, file:newFile})
    }

    submitFile = () =>{
        const data = new FormData();
        this.setState({...this.state,isLoading:true})
        data.append("file", this.state.file);
        data.append("address", this.state.address)
        data.append("adminName", this.state.adminName)
        data.append("adminId", this.state.adminId)
        if(!this.props.location.state.isTree)
            data.append("solicitation",this.state.solicitation)
        if(this.state.tree !== null)  data.append("tree", this.state.tree)
        axios.post(`${process.env.REACT_APP_API_URL}/reports/upload`, data)
        .then(res =>{
            this.back()
        }).catch(res =>{
            console.log(res)
        })
        
    }

    render(){
        if(this.state.isLoading === false){
            return(
                <div class="reportRegister">
                    <AdminNav {...this.props} ></AdminNav>
                    <div class="reportRegister-content">
                        <div class="reportRegister-title">
                            <div class="edit-back">
                                <img src={back} onClick={this.back.bind(this)} alt="Voltar"/>
                            </div>
                            <h2>Cadastrar Laudo</h2>
                        </div>

                        <div id="reportRegister-infos">
                            <div class="reportRegister-info">
                                <h5>Endere??o</h5>
                                <h6>{this.state.address}</h6>
                            </div>
                            <div class="reportRegister-info">
                                <h5>T??cnico respons??vel</h5>
                                <h6>{this.state.adminName} (ID #{this.state.adminId})</h6>
                            </div>
                        </div>

                        <div class="reportRegister-info">
                            <h5>Documentos</h5>
                            <div>
                                {this.state.file.name !== undefined ? this.addFileRender():<h5>Nenhum documento foi adicionado.</h5>}
                            </div>
                            <div class = "confirm-edit" id="insert-document">
                                Adicionar documento
                                <input type="file" id="insert-document-input" onChange={this.handleFileInput}/>
                            </div>
                        </div>
                    
                        <div class="reportRegister-options">
                                <div class = "cancel-edit" onClick={()=> this.props.history.goBack()}>Cancelar</div>
                                <div class = "confirm-edit" onClick={this.submitFile} >Confirmar</div>
                        </div>

                        <div class="reporterRegister-info">
                            <h4>[!] Aten????o: O laudo n??o poder?? ser alterado ap??s a  confirma????o.</h4>
                        </div>
                    </div>
                </div>
            )
        } else return(<ReactLoading className="loading" type={"spin"} color={"green"} height={'20%'} width={'20%'} />)
    }
}
export default ReportRegister;