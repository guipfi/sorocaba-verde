import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactLoading from 'react-loading';

import ListItem from '../../components/ListItem';
import AdminNav from '../../components/AdminNav';

import map from './assets/map-example.png';

import '../../styles/global.css'
import './styles/Home.css'

function HomeSistema(props) {

	const [isLoading, setIsloading] = useState(true);
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

		async function verifyLogin() {
			axios.get('http://localhost:8082/api/admin/isLogged',{withCredentials: true, credentials: 'include'})
			.then(res =>{
				if(res.data.code !== 1){
					props.history.replace('/sistema/login');
				}
			})
		}

		async function loadNewSolicitations() {
			axios.get('http://localhost:8082/api/solicitations/new/0?limit=6')
			.then(res => {
				setNewSolicitations(res.data.solicitationsList);
				setNewSolicitationsTotal(res.data.total);
			})
			.catch(err => console.log(err));
		}

		async function loadSolicitationsQueue() {
			axios.get('http://localhost:8082/api/solicitations/queue/0?limit=6')
			.then(res => {
				setSolicitationsQueue(res.data.solicitationsList);
				setSolicitationsQueueTotal(res.data.total);
			})
			.catch(err => console.log(err));
		}

		verifyLogin();
		loadNewSolicitations();
		loadSolicitationsQueue();
		setIsloading(false);

	}, [props.history]);

	if(isLoading) {
		return (
			<ReactLoading 
				className="loading" 
				type={"spin"} 
				color={"green"} 
				height={'20%'} 
				width={'20%'} 
			/>
		)
	}

	return (
		<div className="home-sistema">
			<AdminNav {...props} ></AdminNav>
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