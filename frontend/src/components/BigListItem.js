import React, { useState, useEffect } from 'react';

import '../styles/global.css'
import './styles/BigListItem.css'

function BigListItem({ data }) {

	const [priorityColor, setPriorityColor] = useState('');
	const [priorityName, setPriorityName] = useState('');

	useEffect(() => {
		if(data.priority !== "Não definido") {
			switch(data.priority) {
				case 1:
					setPriorityColor('red');
					setPriorityName('Emergência');
					break;
				case 2:
					setPriorityColor('orange');
					setPriorityName('Urgente');
					break;
				case 3:
					setPriorityColor('yellow');
					setPriorityName('Pouco Urgente');
					break;
				case 4:
					setPriorityColor('blue');
					setPriorityName('Não Urgente');
					break;
				default:
					break;
			}
		}
	}, [])

	return (
		<div className="list-item" id="big-list-item">
			<div className="imagem"></div>
			<div className="list-item-content">
				<h3>Solicitação de {data.type}</h3>
				<div className="infos">
					<p className="body">{data.description}</p>
					<span className="subtitle">Endereço: {data.address}</span>
					<span className="subtitle">Data: {data.date}</span>
					<a><u>Ver solicitação completa</u></a>
					{data.priority != "Não definido" &&
						<div className="priority" style={{border: `1px solid ${priorityColor}`}}>
							<span className="subtitle">{priorityName}</span>
						</div>
					}
				</div>
			</div>
		</div>
	);
}

export default BigListItem;