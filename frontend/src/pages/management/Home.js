import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactLoading from 'react-loading';

import {Link} from 'react-router-dom';
import ListItem from '../../components/ListItem';
import AdminNav from '../../components/AdminNav';

import map from './assets/map-example.png';

import '../../styles/global.css'
import './styles/Home.css'

function HomeSistema(props) {

	const [isLoading, setIsloading] = useState(true);

	const [newSolicitationsTotal, setNewSolicitationsTotal] = useState(0);
	const [solicitationsQueueTotal, setSolicitationsQueueTotal] = useState(0);

	const [newSolicitations, setNewSolicitations] = useState([]);
	const [solicitationsQueue, setSolicitationsQueue] = useState([]);

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
			try {
				const response = await axios.get('http://localhost:8082/api/solicitations/new/0?limit=6');
				setNewSolicitations(response.data.solicitationsList);
				setNewSolicitationsTotal(response.data.total);
			} catch(err) {
				throw new Error(err);
			}
		}
	
		async function loadSolicitationsQueue() {
			try {
				const response = await axios.get('http://localhost:8082/api/solicitations/queue/0?limit=6');
				setSolicitationsQueue(response.data.solicitationsList);
				setSolicitationsQueueTotal(response.data.total);
			} catch(err) {
				throw new Error(err);
			}
		}

		async function loadAll() {
			await verifyLogin();
			await loadNewSolicitations();
			await loadSolicitationsQueue();
			setIsloading(false);
		}

		loadAll();
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
		<div className="home-sistema" id="home-sistema">
			<AdminNav {...props} ></AdminNav>
			<div className="home-content">
				<h1>Painel Administrativo</h1>
				<div className="page-sections">
					<section className="new-solicitations">
						<h3>Novas solicitações ({newSolicitationsTotal})</h3>
						<div className="solicitations-list">
							{newSolicitations.map(item =>
								<Link style={{color:'black'}} to={"/sistema/edit/"+item._id}>
									<ListItem key={item._id} data={item} />
								</Link>)
							}
						</div>
						<button>Acessar solicitações</button>
					</section>
					<section className="solicitations-queue">
						<h3>Solicitações na fila ({solicitationsQueueTotal})</h3>
						<div className="solicitations-list">
							{solicitationsQueue.map(item =>
								<Link style={{color:'black'}}  to={"/sistema/edit/"+item._id}>
									<ListItem key={item._id} data={item} />
								</Link>)
							}
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