import React from 'react';
import './styles/Login.css';

const Login = (props) =>{
    return(
        <div className="card-login">
            <h3>Faça o Login</h3>
            <form>
                <input type="text" placeholder="CPF" name="cpf"/>
                <input type="password" placeholder="Senha" name="senha"/>
            </form>
            <div className="button">Entrar</div>
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