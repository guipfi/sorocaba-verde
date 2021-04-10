import React, {useState} from 'react';
import axios from 'axios';

import './styles/Login.css';
import '../styles/global.css'

const Login = (props) =>{
    
    const [data,setData] = useState({
        cpf:'',
        password:''
    })
    
    const onCPFChange = (e) => setData({...data, cpf:e.target.value})
    const onPasswordChange= (e) => setData({...data,password:e.target.value})
    
    const onSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8082/api/users/login', data).then(res => {
            if(res.data.token){
                alert('logado')
            } else{
                alert(res.data.error)
            }
        }).catch(err => console.log(err))
    
    }

    return(
        <div className="card-login">
            <h3>Faça o Login</h3>
            <form onSubmit={(e) => onSubmit(e)}>
                <input type="text" placeholder="CPF" value={data.cpf} name="cpf" onChange={(e) => onCPFChange(e)}/>
                <input type="password" value={data.password} placeholder="Senha" name="password" onChange={(e) => onPasswordChange(e)}/>
                <button type="submit">Entrar</button>
            </form>
            <div>
                <div className="link">Esqueci minha senha</div>
                <div className="register-area">
                    <div className="register-button">Fazer Cadastro</div>
                </div>
            </div>
        </div>
    );
}

export default Login;