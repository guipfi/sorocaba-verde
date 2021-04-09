import React, {Component} from 'react';

import '../styles/global.css'
import './styles/ListItem.css'

function ListItem({hasPriority}) {
    return(
        <div className="list-item">
            <div className="list-item-content">
                <span className="subtitle">Poda | Rua Abraão Pereira, 530 - Parque Campolim</span><br/>
                <div className="infos">
                    <span>Data: 12/01/2021</span>
                    {hasPriority && <span className="priority">Prioridade: <b>POUCO URGENTE</b></span>}
                </div>
            </div>
        </div>
    );
}

export default ListItem;