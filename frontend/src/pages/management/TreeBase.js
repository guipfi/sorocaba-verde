import React, { useState, useEffect, useRef } from 'react';
import ReactLoading from 'react-loading';
import axios from 'axios';
import {Link} from 'react-router-dom';

import AdminNav from '../../components/AdminNav';
import BigListItem from '../../components/BigListItem';
import TreeItem from '../../components/TreeItem';

import '../../styles/global.css'
import './styles/Trees.css'

import back_icon from './assets/back_icon.webp';

function TreeBase(props) {

	const [isLoading, setIsloading] = useState(true);
	const [treeTotal, setTreeTotal] = useState(0);
	const [trees, setTrees] = useState([]);
	const [page, setPage] = useState(0);

	const isFirstRun = useRef(true);

	const [filters, setFilters] = useState({
		type: ["Corte", "Poda", "Substituição"],
		priority: [1,2,3,4],
		location: []
	});

	function updateFilters(category, value) {
		let newFilters = {};
		let filterChanged = [];
		if(category == "location") {
			filterChanged.push(value);
		} else {
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
		}
		newFilters = {
			...filters,
			[category]: filterChanged
		}
		setPage(0);
		setFilters(newFilters);
		console.log(filters);
	}

	function loadMore() {
		setPage(page+1);
	}

	useEffect(() => {
		if(!isFirstRun.current) {
			async function loadTrees() {
				try {
					const response = await axios.get(`http://localhost:8082/api/trees/${page}`);
					let newtrees = response.data.treesList;
					setTrees(newtrees);
					setTreeTotal(response.data.total);
				} catch(err) {
					throw new Error(err);
				}
			}
			loadTrees();
		}
	}, [filters]);

	useEffect(() => {

		async function verifyLogin() {
			axios.get('http://localhost:8082/api/admin/isLogged',{withCredentials: true, credentials: 'include'})
			.then(res =>{
				if(res.data.code !== 1){
					props.history.replace('/sistema/login');
				}
			})
		}

		async function loadTrees() {

			try {
				const response = await axios.get(`http://localhost:8082/api/trees/${page}`);
				let newTrees = [...trees, ...response.data.treesList];
				setTrees(newTrees);
				setTreeTotal(response.data.total);
			} catch(err) {
				throw new Error(err);
			}
		}

		async function loadAll() {
			await loadTrees();
			setIsloading(false);
		}

		if(isFirstRun.current) {
			verifyLogin();
			loadAll();
			isFirstRun.current = false;
		} else if(page > 0) {
			loadTrees();
		}

	}, [props.history, props.type, page]);

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
		<div className="trees-sistema" id="trees-sistema">
			<AdminNav />
			<div className="trees-content">
				<header>
					<img className="icone-voltar" src={back_icon} onClick={() => props.history.replace('/sistema/home')}></img>
					<h1>Banco de Árvores</h1> 
				</header>
				<div className="page-sections">
					<section className="trees">
						<h6>São {treeTotal} árvores cadastradas.</h6>
						{trees.map(item =>
							<div className="tree">
								<Link to={"/sistema/tree-page/"+item._id}>
									<TreeItem key={item._id} data={item} />
								</Link>
							</div>
						)}
						<button disabled={treeTotal === trees.length} onClick={loadMore}>Carregar mais</button>
					</section>
				</div>
			</div>
		</div>
	);
}

export default TreeBase;