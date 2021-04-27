import React from 'react';

import '../styles/global.css'
import './styles/BigListItem.css'

function BigListItem({ data }) {
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
					{data.priority &&
						<div className="priority">
							<span className="subtitle">{data.priority}</span>
						</div>
					}
				</div>
			</div>
		</div>
	);
}

export default BigListItem;