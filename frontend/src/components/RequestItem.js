import { useState } from "react";

import './styles/RequestItem.css';

function RequestItem(){
    
    const [type, setType] = useState("Poda");
    const [street, setStreet] = useState("Rua Abraão Pereira, 530");
    const [date, setDate] = useState("12/01/2021");
    const [status, setStatus] = useState("Na fila de espera");
    
    return(
        <div className="item-container">
            <div className="details">
                <p className="item-title">{type} | {street}</p>
                <p>Data de solicitação: {date}</p>
            </div>
            <div className="status">
                <p>{status}</p>
            </div>
        </div>
    )
}

export default RequestItem;