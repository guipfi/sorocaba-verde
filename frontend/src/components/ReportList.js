import React, {Component} from 'react';
import axios from 'axios';

import {Link} from 'react-router-dom';

import "../styles/global.css"
import "./styles/ReportList.css"

class ReportList extends Component{
    constructor(){
        super();
        this.state={
            reports: [],
        }
    }

    componentDidMount(){

        if(this.props.isTree === true){
            axios.get(`${process.env.REACT_APP_API_URL}/reports/tree/`+this.props.id)
            .then(res =>{
                this.setState({reports:res.data.reports});
            })
        } else{
            axios.get(`${process.env.REACT_APP_API_URL}/reports/solicitation/`+this.props.id)
            .then(res =>{
                this.setState({reports:res.data.reports});
            })
        }

        this.state.reports.map((value) =>{
            let name = value.docName.split('.')[0]
            let result ={
                ...value,
                docName: name
            }
            return result;
        })
    }

    render(){
        return(
            <div>
                {   
                this.state.reports.length != 0 ?
                this.state.reports.map((value) =>{
                        let name = value.docName.split('.')[0]
                        return (
                            <div class="reportItem">
                                <div class="reportItem-info">
                                    <div class="title">{name}</div>    
                                    <div class="subtitle">Data: {value.date}</div>
                                </div>
                                <Link style={{color:'black'}} to={{pathname:"/laudo/"+value._id, isAdmin: true}}>
                                    <div class="reportItem-button">Ver Laudo</div>
                                </Link>
                            </div>
                        )
                    }): <h6>Não há laudos disponíveis.</h6>
                
                }
            </div>
        )
    }


}

export default ReportList