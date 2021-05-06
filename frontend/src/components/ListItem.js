import React, { useState, useEffect } from 'react';

import '../styles/global.css'
import './styles/ListItem.css'

function ListItem({data}) {

    const [convertedPriority, setConvertedPriority] = useState('');

    useEffect(() => {
        switch(data.priority) {
            case 1: setConvertedPriority("Emergência"); return;
            case 2: setConvertedPriority("Urgente"); return;
            case 3: setConvertedPriority("Pouco urgente"); return;
            case 4: setConvertedPriority("Não urgente"); return;
            default: setConvertedPriority("Não definido"); return;
        }
    }, []);

    return(
        <div className="list-item" id="list-item">
            <div className="list-item-content">
                <span className="subtitle">{data.type} | {data.address}</span><br/>
                <div className="infos">
                    <span>Data: {data.date}</span>
                    {data.priority !=0 && 
                    <div className="priority">
                        <span>Prioridade: </span>
                        <span><b>{convertedPriority}</b></span>
                    </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default ListItem;