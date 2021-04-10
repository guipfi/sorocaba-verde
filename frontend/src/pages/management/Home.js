import React, { useState } from 'react';
import ListItem from '../../components/ListItem';
import UserNav from '../../components/UserNav';

import map from './assets/map-example.png';

import '../../styles/global.css'
import './styles/Home.css'

function HomeSistema() {

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

	return (
		<div className="home-sistema">
			<UserNav></UserNav>
			<div className="home-content">
				<h1>Painel Administrativo</h1>
				<div className="page-sections">
					<section className="new-solicitations">
						<h3>Novas solicitações (12)</h3>
						<div className="solicitations-list">
							{newSolicitations.map(item => 
								<ListItem data={item}></ListItem>)}
						</div>
						<button>Acessar solicitações</button>
					</section>
					<section className="solicitations-queue">
						<h3>Solicitações na fila (15)</h3>
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