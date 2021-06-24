import React, {useState} from 'react';
import axios from 'axios';

import './styles/Login.css';
import '../styles/global.css'

const Login = (props) =>{
    const [data,setData] = useState({
        cpf:'',
        password:''
    })

    const [message, setMessage] = useState(null)
    
    const onCPFChange = (e) => setData({...data, cpf:e.target.value})
    const onPasswordChange= (e) => setData({...data,password:e.target.value})
    
    const onSubmit = (e) => {
        e.preventDefault();
        if(props.isAdmin !== true){
            axios.post(`${process.env.REACT_APP_API_URL}/users/login`, data,{withCredentials: true, credentials: 'include'}).then(res => {
                switch(res.data.code){
                    case 1:
                        props.history.replace('/user')
                        break;
                    case 2:
                        setMessage("CPF ou senha estão incorretos.")
                        break;
                    case 3:
                        setMessage("Usuário não encontrado.")
                        break;
                    default:
                        setMessage("Algum erro aconteceu. Tente Novamente!")
                }
                
            }).catch(err => console.log(err))
        } else{
            axios.post(`${process.env.REACT_APP_API_URL}/admin/login`, data,{withCredentials: true, credentials: 'include'}).then(res=>{
                switch(res.data.code){
                    case 1:
                        props.history.replace('/sistema/home')
                        break;
                    case 2:
                        setMessage("CPF ou senha estão incorretos.")
                        break;
                    case 3:
                        setMessage("Administrador não encontrado.")
                        break;
                    default:
                        setMessage("Algum erro aconteceu. Tente Novamente!")
                }
            })
            
        }
    }
    
    return(
        <div className="card-login" id="login-component">
            <h3>Faça o Login</h3>
            <form onSubmit={(e) => onSubmit(e)}>
                <input type="text" placeholder="CPF" value={data.cpf} name="cpf" onChange={(e) => onCPFChange(e)}/>
                <input type="password" value={data.password} placeholder="Senha" name="password" onChange={(e) => onPasswordChange(e)}/>
                {message ? <div style={{color:"red", marginTop:"1px", marginBottom:"0px"}}>{message}</div>:<div></div>}
                <button type="submit">Entrar</button>
            </form>
                {   props.isAdmin != true &&
                    <div>
                        <div className="link">Esqueci minha senha</div>
                        <div className="register-area">
                            <div className="register-button" onClick={() => props.setRenderLogin(false)}>Fazer Cadastro</div>
                        </div>
                    </div>
                }
        </div>
    );
}

export default Login;