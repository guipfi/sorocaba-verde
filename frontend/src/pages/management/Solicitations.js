import React, { useState, useEffect } from 'react';
import UserNav from '../../components/UserNav';
import BigListItem from '../../components/BigListItem';

import '../../styles/global.css'
import './styles/Solicitations.css'
import axios from 'axios';

function SolicitacoesSistema({ type }) {

	const [solicitationsTotal, setSolicitationsTotal] = useState(6);

	const [solicitations, setSolicitations] = useState([{
		type: "Poda",
		adress: "Rua Abraão Pereira, 530 - Parque Campolim",
		date: "12/01/2021",
		priority: "POUCO URGENTE"
	},{
		type: "Poda",
		adress: "Rua Abraão Pereira, 530 - Parque Campolim",
		date: "12/01/2021",
		priority: "POUCO URGENTE"
	},{
		type: "Poda",
		adress: "Rua Abraão Pereira, 530 - Parque Campolim",
		date: "12/01/2021",
		priority: "POUCO URGENTE"
	},{
		type: "Poda",
		adress: "Rua Abraão Pereira, 530 - Parque Campolim",
		date: "12/01/2021",
		priority: "POUCO URGENTE"
	},{
		type: "Poda",
		adress: "Rua Abraão Pereira, 530 - Parque Campolim",
		date: "12/01/2021",
		priority: "POUCO URGENTE"
	},{
		type: "Poda",
		adress: "Rua Abraão Pereira, 530 - Parque Campolim",
		date: "12/01/2021",
		priority: "POUCO URGENTE"
	},]);

	// useEffect(() => {
	// 	if (type == "new") {
	// 		axios.get('http://localhost:8082/api/solicitations/new/0/6')
	// 			.then(res => {
	// 				setSolicitations(res.data.solicitationsList);
	// 				setSolicitationsTotal(res.data.total);
	// 			})
	// 			.catch(err => console.log(err));
	// 	} else {
	// 		axios.get('http://localhost:8082/api/solicitations/queue/0/6')
	// 			.then(res => {
	// 				setSolicitations(res.data.solicitationsList);
	// 				setSolicitationsTotal(res.data.total);
	// 			})
	// 			.catch(err => console.log(err));
	// 	}
	// }, [type]);

	return (
		<div className="solicitations-sistema" id="solicitations-sistema">
			<UserNav></UserNav>
			<div className="solicitations-content">
				<header>
					<div className="icone-voltar"></div>
					{type == "new" ? <h1>Novas Solicitações</h1> : <h1>Solicitações na fila</h1>}
				</header>
				<div className="page-sections">
					<section className="filters">
						<div className="type">
							<h4>Tipo de solicitação</h4>
							<div className="option">
								<input type="checkbox" id="corte" name="corte" value="corte" defaultChecked />
								<label for="corte">Corte</label>
							</div>
							<div className="option">
								<input type="checkbox" id="poda" name="poda" value="poda" defaultChecked />
								<label for="poda">Poda</label>
							</div>
							<div className="option">
								<input type="checkbox" id="substituicao" name="substituicao" value="substituicao" defaultChecked />
								<label for="substituicao">Substituição</label>
							</div>
						</div>
						<div className="priority">
							<h4>Grau de prioridade</h4>
							<div className="option">
								<input type="checkbox" id="emergencia" name="emergencia" value="emergencia" defaultChecked />
								<label for="emergencia">Emergência</label>
							</div>
							<div className="option">
								<input type="checkbox" id="urgente" name="urgente" value="urgente" defaultChecked />
								<label for="urgente">Urgente</label>
							</div>
							<div className="option">
								<input type="checkbox" id="pouco-urgente" name="pouco-urgente" value="pouco-urgente" defaultChecked />
								<label for="pouco-urgente">Pouco urgente</label>
							</div>
							<div className="option">
								<input type="checkbox" id="nao-urgente" name="nao-urgente" value="nao-urgente" defaultChecked />
								<label for="nao-urgente">Não urgente</label>
							</div>
						</div>
						<div className="location">
							<h4>Localização</h4>
							<input type="text" id="location" name="location" placeholder="Digite a localidade..." />
						</div>
						<input type="button" id="redefinir" name="redefinir" value="Redefinir filtros" />
					</section>
					<section className="solicitations">
						{solicitations.map(item => <BigListItem data={item}></BigListItem>)}
					</section>
				</div>
			</div>
		</div>
	);
}

export default SolicitacoesSistema;