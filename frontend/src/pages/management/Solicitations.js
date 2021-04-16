import React, { useState, useEffect } from 'react';
import UserNav from '../../components/UserNav';

import '../../styles/global.css'
import './styles/Home.css'
import axios from 'axios';

function SolicitacoesSistema({ type }) {

	console.log("aqui" + type);

	const [solicitationsTotal, setSolicitationsTotal] = useState(0);

	const [solicitations, setSolicitations] = useState([]);

	useEffect(() => {
		if (type == "new") {
			axios.get('http://localhost:8082/api/solicitations/new/0/6')
				.then(res => {
					setSolicitations(res.data.solicitationsList);
					setSolicitationsTotal(res.data.total);
				})
				.catch(err => console.log(err));
		} else {
			axios.get('http://localhost:8082/api/solicitations/queue/0/6')
				.then(res => {
					setSolicitations(res.data.solicitationsList);
					setSolicitationsTotal(res.data.total);
				})
				.catch(err => console.log(err));
		}
	}, [type]);

	return (
		<div className="solicitations-sistema">
			<UserNav></UserNav>
			<div className="solicitations-content">
				<header>
					<span>Icone voltar</span>
					{ type == "new" ? <h1>Novas Solicitações</h1> : <h1>Solicitações na fila</h1> }
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
							<input type="text" id="location" name="location" placeholder="Digite a localidade..." />
						</div>
						<input type="button" id="redefinir" name="redefinir" value="Redefinir filtros" />
					</section>
					<section className="solicitations">

					</section>
				</div>
			</div>
		</div>
	);
}

export default SolicitacoesSistema;