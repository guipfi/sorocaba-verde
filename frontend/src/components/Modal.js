import React,{useState, useEffect} from "react";
import "./styles/Modal.css";

const Modal = props => {
    const { className, modalRef, location } = props;
    const [show, setShow] = useState(className);

    

    return(
        <div className={`modal-${className}`}>
            <div id="modal-message">
                <h4>Solicitação realizada com sucesso.</h4>
                <div id="modal-message-regular">Muito Obrigado pela sua solicitação! A equipe do Sorocaba Verde tentará atender o mais rápido o possível.</div>
            </div>
            <button onClick={() => {window.location.href = location ;}}>Voltar para a página Inicial</button>
        </div>
    )
}

export default Modal;