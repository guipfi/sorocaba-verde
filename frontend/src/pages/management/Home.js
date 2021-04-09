import React, {Component} from 'react';
import ListItem from '../../components/ListItem';
import UserNav from '../../components/UserNav';

import map from './assets/map-example.png';

import '../../styles/global.css'
import './styles/Home.css'

function HomeSistema() {
	return (
		<div className="home-sistema">
			<UserNav></UserNav>
			<div className="home-content">
				<h1>Painel Administrativo</h1>
				<div className="page-sections">
					<section className="new-solicitations">
						<h3>Novas solicitações (12)</h3>
						<div className="solicitations-list">
							<ListItem hasPriority={false}></ListItem>
							<ListItem hasPriority={false}></ListItem>
							<ListItem hasPriority={false}></ListItem>
							<ListItem hasPriority={false}></ListItem>
							<ListItem hasPriority={false}></ListItem>
							<ListItem hasPriority={false}></ListItem>
						</div>
						<button>Acessar solicitações</button>
					</section>
					<section className="solicitations-queue">
						<h3>Solicitações na fila (15)</h3>
						<div className="solicitations-list">
							<ListItem hasPriority={true}></ListItem>
							<ListItem hasPriority={true}></ListItem>
							<ListItem hasPriority={true}></ListItem>
							<ListItem hasPriority={true}></ListItem>
							<ListItem hasPriority={true}></ListItem>
							<ListItem hasPriority={true}></ListItem>
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