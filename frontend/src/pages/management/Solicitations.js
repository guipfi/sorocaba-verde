import React, { useState, useEffect } from 'react';
import ReactLoading from 'react-loading';
import axios from 'axios';

import UserNav from '../../components/UserNav';
import BigListItem from '../../components/BigListItem';

import '../../styles/global.css'
import './styles/Solicitations.css'

function SolicitacoesSistema(props) {

	const [isLoading, setIsloading] = useState(true);
	const [solicitationsTotal, setSolicitationsTotal] = useState(0);
	const [solicitations, setSolicitations] = useState([]);
	const [page, setPage] = useState(0);

	const [filters, setFilters] = useState({
		type: ["Corte", "Poda", "Substituição"],
		priority: ["Emergência", "Urgente", "Pouco urgente", "Não urgente"],
		location: []
	});

	function updateFilters(category, value) {
		let newFilters = {};
		let filterChanged = [];
		if(filters[category].includes(value)) {
			filterChanged = filters[category].filter(function(e) {
				if(e === value) {
					return false;
				} 
				return true;
			});
		} else {
			filterChanged = [...filters[category], value];
		}
		newFilters = {
			...filters,
			[category]: filterChanged
		}
		setFilters(newFilters);
	}

	function loadMore() {
		setPage(page+1);
	}

	useEffect(() => {

		async function verifyLogin() {
			axios.get('http://localhost:8082/api/admin/isLogged',{withCredentials: true, credentials: 'include'})
			.then(res =>{
				if(res.data.code !== 1){
					props.history.replace('/sistema/login');
				}
			})
		}

		async function loadSolicitations() {

			try {
				const response = await axios.get(`http://localhost:8082/api/solicitations/${props.type}/${page}?${JSON.stringify(filters)}&limit=6`);
				console.log(`http://localhost:8082/api/solicitations/${props.type}/${page}?${JSON.stringify(filters)}&limit=6`);
				let newSolicitations = [...solicitations, ...response.data.solicitationsList];
				setSolicitations(newSolicitations);
				setSolicitationsTotal(response.data.total);
			} catch(err) {
				throw new Error(err);
			}
		}

		async function loadAll() {
			await loadSolicitations();
			setIsloading(false);
		}

		verifyLogin();
		loadAll();

	}, [props.history, props.type, filters, page]);

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
		<div className="solicitations-sistema" id="solicitations-sistema">
			<UserNav></UserNav>
			<div className="solicitations-content">
				<header>
					<div className="icone-voltar"></div>
					{props.type === "new" ? <h1>Novas Solicitações</h1> : <h1>Solicitações na fila</h1>}
				</header>
				<div className="page-sections">
					<section className="filters">
						<div className="type">
							<h4>Tipo de solicitação</h4>
							<div className="option">
								<input type="checkbox" id="corte" name="corte" value="Corte" defaultChecked onChange={(e) => updateFilters("type", e.target.value)} />
								<label htmlFor="corte">Corte</label>
							</div>
							<div className="option">
								<input type="checkbox" id="poda" name="poda" value="Poda" defaultChecked onChange={(e) => updateFilters("type", e.target.value)} />
								<label htmlFor="poda">Poda</label>
							</div>
							<div className="option">
								<input type="checkbox" id="substituicao" name="substituicao" value="Substituição" defaultChecked onChange={(e) => updateFilters("type", e.target.value)} />
								<label htmlFor="substituicao">Substituição</label>
							</div>
						</div>
						<div className="priority">
							<h4>Grau de prioridade</h4>
							<div className="option">
								<input type="checkbox" id="emergencia" name="emergencia" value="Emergência" defaultChecked onChange={(e) => updateFilters("priority", e.target.value)} />
								<label htmlFor="emergencia">Emergência</label>
							</div>
							<div className="option">
								<input type="checkbox" id="urgente" name="urgente" value="Urgente" defaultChecked onChange={(e) => updateFilters("priority", e.target.value)} />
								<label htmlFor="urgente">Urgente</label>
							</div>
							<div className="option">
								<input type="checkbox" id="pouco-urgente" name="pouco-urgente" value="Pouco urgente" defaultChecked onChange={(e) => updateFilters("priority", e.target.value)} />
								<label htmlFor="pouco-urgente">Pouco urgente</label>
							</div>
							<div className="option">
								<input type="checkbox" id="nao-urgente" name="nao-urgente" value="Não urgente" defaultChecked onChange={(e) => updateFilters("priority", e.target.value)} />
								<label htmlFor="nao-urgente">Não urgente</label>
							</div>
						</div>
						<div className="location">
							<h4>Localização</h4>
							<input type="text" id="location" name="location" placeholder="Digite a localidade..." />
						</div>
						<input type="button" id="redefinir" name="redefinir" value="Redefinir filtros" />
					</section>
					<section className="solicitations">
						<h6>Exibindo {solicitations.length} de {solicitationsTotal} resultados.</h6>
						{solicitations.map(item => <BigListItem key={item._id} data={item}></BigListItem>)}
						<button disabled={solicitationsTotal === solicitations.length} onClick={loadMore}>Carregar mais</button>
					</section>
				</div>
			</div>
		</div>
	);
}

export default SolicitacoesSistema;