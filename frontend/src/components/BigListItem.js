import React from 'react';

import '../styles/global.css'
import './styles/BigListItem.css'

function ListItem({data}) {
    return(
        <div className="list-item">
            <div className="list-item-content">
                <span className="subtitle">{data.type} | {data.adress}</span><br/>
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