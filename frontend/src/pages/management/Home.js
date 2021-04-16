import React, { useState, useEffect } from 'react';
import ListItem from '../../components/ListItem';
import UserNav from '../../components/UserNav';

import map from './assets/map-example.png';

import '../../styles/global.css'
import './styles/Home.css'
import axios from 'axios';

function HomeSistema() {

	const [newSolicitationsTotal, setNewSolicitationsTotal] = useState(0);
	const [solicitationsQueueTotal, setSolicitationsQueueTotal] = useState(0);

	const [newSolicitations, setNewSolicitations] = useState([{
		type: "Poda",
		adress: "Rua Abraão Pereira, 530 - Parque Campolim",
		date: "12/01/2021",
	},{
		type: "Poda",
		adress: "Rua Abraão Pereira, 530 - Parque Campolim",
		date: "12/01/2021",
	},{
		type: "Poda",
		adress: "Rua Abraão Pereira, 530 - Parque Campolim",
		date: "12/01/2021",
	},{
		type: "Poda",
		adress: "Rua Abraão Pereira, 530 - Parque Campolim",
		date: "12/01/2021",
	},{
		type: "Poda",
		adress: "Rua Abraão Pereira, 530 - Parque Campolim",
		date: "12/01/2021",
	},{
		type: "Poda",
		adress: "Rua Abraão Pereira, 530 - Parque Campolim",
		date: "12/01/2021",
	},]);
	
	const [solicitationsQueue, setSolicitationsQueue] = useState([{
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

	useEffect(() => {
		axios.get('http://localhost:8082/api/solicitations/new/0/6')
		.then(res => {
			console.log("aqui");
			console.log(res);
			setNewSolicitations(res.data.solicitationsList);
			setNewSolicitationsTotal(res.data.total);
		})
		.catch(err => console.log(err));

		axios.get('http://localhost:8082/api/solicitations/queue/0/6')
		.then(res => {
			console.log("aqui");
			console.log(res);
			setSolicitationsQueue(res.data.solicitationsList);
			setSolicitationsQueueTotal(res.data.total);
		})
		.catch(err => console.log(err));
	}, []);

	return (
		<div className="home-sistema">
			<UserNav></UserNav>
			<div className="home-content">
				<h1>Painel Administrativo</h1>
				<div className="page-sections">
					<section className="new-solicitations">
						<h3>Novas solicitações ({newSolicitationsTotal})</h3>
						<div className="solicitations-list">
							{newSolicitations.map(item => 
								<ListItem data={item}></ListItem>)}
						</div>
						<button>Acessar solicitações</button>
					</section>
					<section className="solicitations-queue">
						<h3>Solicitações na fila ({solicitationsQueueTotal})</h3>
						<div className="solicitations-list">
							{solicitationsQueue.map(item =>
								<ListItem data={item}></ListItem>)}
						</div>
						<button>Acessar solicitações</button>
					</section>
					<section className="map">
						<img src={map}></img>
					</section>
				</div>
			</div>
		</div>
	);
}

export default HomeSistema;