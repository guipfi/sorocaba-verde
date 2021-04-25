import React from 'react';

import '../styles/global.css'
import './styles/ListItem.css'

function ListItem({data}) {
    return(
        <div className="list-item" id="list-item">
            <div className="list-item-content">
                <span className="subtitle">{data.type} | {data.address}</span><br/>
                <div className="infos">
                    <span>Data: {data.date}</span>
                    {data.priority && 
                    <div className="priority">
                        <span>Prioridade: </span>
                        <span><b>{data.priority}</b></span>
                    </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default ListItem;