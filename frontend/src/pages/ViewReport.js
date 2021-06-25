import React, {Component} from 'react';
import axios from 'axios';
import AdminNav from '../components/AdminNav';
import UserNav from '../components/UserNav';
import ReactLoading from 'react-loading';

import '../styles/global.css'
import './ViewReport.css'
import back from './management/assets/chevron-left-solid.svg';
import fileSVG from './management/assets/file.svg';

class ViewReport extends Component{
    constructor(){
        super()
        this.state ={
            isLoading: true,
        }
    }

    componentDidMount(){
        
        const getReportById = async (id) => {
            axios.get(`${process.env.REACT_APP_API_URL}/reports/report/`+id)
            .then((res) =>{
                let name = res.data.report.docName.split('.')[0]
                this.setState({...this.state, ...res.data.report, title: name})
            })
        }

        const loadAll = async () =>{
            await getReportById(this.props.match.params.id)
            this.setState({...this.state,isLoading:false});
        }

        loadAll();
    }
    
    back(){
        this.props.history.goBack()
    }

    openDocument = () =>{
        const newWindow = window.open(this.state.url,'_blank')
    }

    fileRender = () =>{
        return(
            <div onClick={this.openDocument} class="file-container">
                <div class="file-content">
                    <img src={fileSVG} height={100} width={100} alt="Arquivo"/>
                    <h6>{this.state.docName}</h6>
                </div>
            </div>
        )
    }

    render(){
        if(this.state.isLoading === false){
            return(
                <div class="viewReport">
                    {this.props.location.state.isAdmin === true ?  <AdminNav {...this.props} />: <UserNav {...this.props}/>}
                    <div class="viewReport-content">
                        <div class="viewReport-title">
                            <div class="edit-back">
                                <img src={back} onClick={this.back.bind(this)} alt="Voltar"/>
                            </div>
                            <h2>{this.state.title}</h2>
                        </div>

                        <div id="viewReport-infos">
                            <div class="viewReport-info">
                                <h5>Endereço</h5>
                                <h6>{this.state.address}</h6>
                            </div>
                            <div class="viewReport-info">
                                <h5>Técnico responsável</h5>
                                <h6>{this.state.adminName} (ID #{this.state.adminId})</h6>
                            </div>

                            <div class="viewReport-info">
                                <h5>Documento</h5>
                                {this.fileRender()}
                            </div>
                        </div>

                    </div>
                </div>
            )
        } else return(<ReactLoading className="loading" type={"spin"} color={"green"} height={'20%'} width={'20%'} />)
    }
}
export default ViewReport;