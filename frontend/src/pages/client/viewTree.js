import React, {Component} from 'react';
import axios from 'axios';
import UserNav from '../../components/UserNav';
import ReactLoading from 'react-loading';

import ReportList from '../../components/ReportList'
import {Link} from 'react-router-dom';
import './styles/EditTree.css';
import '../../styles/global.css'

import back from './assets/chevron-left-solid.svg';

class ViewTree extends Component{
    constructor(){
        super()
        this.state = {
            isLoading: true,
            name:"",
            address:"",
            date:"",
            description:"",
            photos:[],
            lat: 0,
            long: 0,
            quantity: 0,
            height: 0,
            age: 0
        }
    }
    
    componentDidMount(){
        const verifyLogin = async () => {
			axios.get('http://localhost:8082/api/users/isLogged',{withCredentials: true, credentials: 'include'})
			.then(res =>{
				if(res.data.code !== 1){
					this.props.history.replace('/sistema/login');
				}
			})
		}

        const getTreeById = async (id) => {
            axios.get('http://localhost:8082/api/trees/tree/content/'+id)
            .then(res =>{
                if(res.data.code !==1){
                    this.props.history.goBack();
                } else{
                    this.setState({...this.state,
                        name:res.data.tree.name,
                        address: res.data.tree.address,
                        quantity: res.data.tree.quantity,
                        date:res.data.tree.date,
                        description:res.data.tree.description,
                        lat: res.data.tree.lat,
                        lng: res.data.tree.lng,
                        photos: res.data.tree.photosURL,
                        height: res.data.tree.height,
                        age: res.data.tree.age,
                        report:res.data.tree.report})
                }
            })
        }

        const loadAll = async () => {
			await verifyLogin();
            await getTreeById(this.props.match.params.id)
			this.setState({...this.state, isLoading:false});
		}

        loadAll();
    }

    back(){
        this.props.history.goBack()
    }

    renderHeight(){
        if(this.state.quantity == 1){
            return(
                <div class="editTree-info">
                    <h5>Altura</h5>
                    <h6>{this.state.height} metros.</h6>
                </div>
            )
        }
    }

    renderAge(){
        if(this.state.quantity == 1){
            return(
                <div class="editTree-info">
                    <h5>Idade</h5>
                    <h6>{this.state.age} anos.</h6>
                </div>
            )
        }
    }

    renderQuantity(){
        if(this.state.quantity == 1){
            return(<h6>{this.state.quantity} árvore.</h6>)
        } else if (this.state.quantity > 1) {
            return(<h6>{this.state.quantity} árvores.</h6>)
        }
    }

    handleNewSolicitation() {
      this.props.history.replace(`/solicitationRegister?lat=${this.state.lat}&lng=${this.state.lng}&address=${this.state.address}&tree=${this.props.match.params.id}`);
    }

    render(){
        if(this.state.isLoading === false){
            return(
                <div class="editTree">
                    <UserNav {...this.props} ></UserNav>
                    <div class="editTree-content">
                        <div class="editTree-title">
                            <div class="edit-back">
                                <img src={back} onClick={this.back.bind(this)} alt="Voltar"/>
                            </div>
                            <h2>{this.state.name}</h2>
                        </div>
                        <div id="editTree-infos">

                            <div class="editTree-info">
                                <h5>Identificação da Árvore</h5>
                                <h6>{this.props.match.params.id}</h6>
                            </div>

                            <div class="editTree-info">
                                <h5>Endereço</h5>
                                <h6>{this.state.address}</h6>
                            </div>

                            <div class="editTree-info">
                                <h5>Quantidade de Árvores</h5>
                                {this.renderQuantity()}
                            </div>

                            {this.renderHeight()}
                            {this.renderAge()}

                            <div class="editTree-info">
                                <h5>Descrição</h5>
                                <h6>{this.state.description}</h6>
                            </div>
                        </div>
                        <div id="editTree-photos">
                            <h5>Fotos</h5>
                            {<div class="photos-list">
                            {this.state.photos.length === 0 ? <h6>Essa árvore não tem fotos!</h6> : this.state.photos.map((value) =>{
                                return (<div class="img-view-container"><div class="img-view"><img src={value} height={300} width={300} /></div></div>)
                            })}
                            </div>}
                        </div>                   
                        
                        <div class="report-list" id="report-edit">
                            <h5>Laudos</h5>
                            <ReportList id={this.props.match.params.id} isTree={true} isAdmin={true} />
                        </div>

                        <div class="editTree-info">
                            <button onClick={() => this.handleNewSolicitation()}>Criar nova solicitação</button>
                        </div>

                    </div>
                </div>
            )
        } 
        else return(<ReactLoading className="loading" type={"spin"} color={"green"} height={'20%'} width={'20%'} />)
    }
}

export default ViewTree;    