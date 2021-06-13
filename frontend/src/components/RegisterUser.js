import React, {Component} from 'react';
import axios from 'axios';
import back from './assets/chevron-left-solid.svg'

import './styles/RegisterUser.css'
import '../styles/global.css'

class RegisterUser extends Component{
    constructor(){
        super();
        this.state = {
            name:"",
            email:"",
            cpf:"",
            password:"",
            passwordConfirm:"",
            message:""
        }
    }

    onCPFChange = (e) =>{
        this.setState({...this.state, cpf:e.target.value});
    }

    onNameChange = (e) =>{
        this.setState({...this.state, name:e.target.value});
    }

    onEmailChange = (e) =>{
        this.setState({...this.state, email:e.target.value});
    }

    onPasswordChange = (e) =>{
        this.setState({...this.state, password:e.target.value});
    }

    onPasswordConfirmChange = (e) =>{
        this.setState({...this.state, passwordConfirm:e.target.value});
    }

    onSubmit = (e) =>{
        e.preventDefault();
        axios.post('http://localhost:8082/api/users/register',this.state)
        .then((res) =>{
            switch(res.data.code){
                case 0:
                    this.setState({...this.state, message:"Os campos senha e de confirmação de senha devem ser iguais."})
                    break;
                case 1:
                    axios.post('http://localhost:8082/api/users/login',this.state,{withCredentials: true, credentials: 'include'})
                    .then(res =>{
                        if(res.data.code === 1){
                            this.props.history.replace('/user');
                        } else{
                            this.setState({...this.state, message:"Algum erro aconteceu. Tente Novamente!"})
                        }
                    })
                    break;
                case 2:
                    this.setState({...this.state, message:"Já há uma conta com esse cpf cadastrado."})
                    break;
                case 3:
                    this.setState({...this.state, message:"Já há uma conta com esse email cadastrado."})
                    break;
                default:
                    this.setState({...this.state, message:"Algum erro aconteceu. Tente Novamente!"})
            }
        })
    }

    render(){
        return(
            <div class="register-card">
                <div id="title-register">
                    <img onClick={()=>this.props.setRenderLogin(true)}  src={back} alt="Voltar"/>
                    <h3>Faça seu Cadastro</h3>
                </div>
                <form onSubmit={(e) => this.onSubmit(e)}>
                    <input type="text" value={this.state.name} placeholder="Nome Completo"  name="name" onChange={(e) => this.onNameChange(e)}/>
                    <input type="text" value={this.state.cpf}  placeholder="CPF" name="cpf" onChange={(e) => this.onCPFChange(e)}/>
                    <input type="email" value={this.state.email}  placeholder="E-mail" name="email" onChange={(e) => this.onEmailChange(e)} />
                    <input type="password" value={this.state.password}  placeholder="Senha" name="password" onChange={(e) => this.onPasswordChange(e)} />
                    <input type="password" value={this.state.passwordConfirm}  placeholder="Confirme sua senha" name="passwordConfirm" onChange={(e) => this.onPasswordConfirmChange(e)} />
                    {this.state.message ? <div style={{color:"red", marginTop:"1px", marginBottom:"0px"}}>{this.state.message}</div>:<div></div>}
                    <button type="submit">Cadastrar</button>
                </form>
                <div id="back-register">
                   <div onClick={()=>this.props.setRenderLogin(true)} class="title">Já possuo uma conta</div> 
                </div>
            </div>
        );
    }


}

export default RegisterUser;