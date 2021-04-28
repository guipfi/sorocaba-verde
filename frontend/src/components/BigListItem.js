import React, { useState, useEffect } from 'react';

import '../styles/global.css'
import './styles/BigListItem.css'

function BigListItem({ data }) {

	const [priorityColor, setPriorityColor] = useState('');

	useEffect(() => {
		if(data.priority !== "Não definido") {
			switch(data.priority) {
				case "Emergência":
					setPriorityColor('red');
					break;
				case "Urgente":
					setPriorityColor('orange');
					break;
				case "Pouco urgente":
					setPriorityColor('yellow');
					break;
				case "Não urgente":
					setPriorityColor('blue');
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
							<span className="subtitle">{data.priority}</span>
						</div>
					}
				</div>
			</div>
		</div>
	);
}

export default BigListItem;