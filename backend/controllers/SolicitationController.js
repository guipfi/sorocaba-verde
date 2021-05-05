const Solicitation = require('../models/Solicitation');
const ObjectId = require('mongoose').Types.ObjectId;

const getSolicitations = async (req, res) => {

	if(req.query.filters) {
		filters = JSON.parse(req.query.filters);
		hasFilters = true;
		search_param = {
			type: { $in: filters.type }
		};
	} else {
		hasFilters = false;
		search_param = {};
	}

	if (req.params.type == "queue") {
		if(hasFilters) {
			search_param = { 
				...search_param,
				priority: { $in: filters.priority },
			};
		} else {
			search_param = { 
				...search_param,
				priority: { $ne: "Não definido" },
			};
		}		
	} else if (req.params.type == "new") {
		search_param = {
			...search_param,
			priority: "Não definido" 
		};
	} 

	let limit = 10;

	if(req.query.limit) {
		limit = Number(req.query.limit);
	}

	try {	
		const solicitationsNumber = await Solicitation
			.countDocuments(search_param);

		var solicitationsList = await Solicitation
			.find(search_param)
			.sort({date: "desc"})
			.limit(limit)
			.skip(Number(req.params.page * limit));

		if(req.params.type == "queue") {
			var emergencia = [];
			var urgente = [];
			var poucoUrgente = [];
			var naoUrgente = [];

			solicitationsList.forEach(solicitation => {
				switch(solicitation.priority) {
					case "Emergência":
						emergencia.push(solicitation);
						break;
					case "Urgente":
						urgente.push(solicitation);
						break;
					case "Pouco Urgente":
						poucoUrgente.push(solicitation);
						break;
					case "Não Urgente":
						naoUrgente.push(solicitation);
						break;
					default:
				}
			});

			solicitationsList = [...emergencia, ...urgente, ...poucoUrgente, ...naoUrgente];
		}
		
		let response = {
			total: solicitationsNumber,
			solicitationsList
		}

		res.status(200).json(response);
		
	} catch (err) {
		res.status(400).json({ error: err });
	}
}

const getSolicitationById = async (req,res) =>{
	try{
		Solicitation.findOne({_id:ObjectId(req.params.id)})
		.then((solicitation) => {
			res.json({
				code:1,
				solicitation
			})
		})
	} catch(err){
		res.status(400).json({code:0, error:err});
	}
}

const getUserSolicitations = async (req,res) =>{
	if(typeof res.user != 'undefined'){
		Solicitation.find({solicitator: ObjectId(res.user._id)})
		.sort({date: "desc"})
		.then((solicitations) =>{
			if(solicitations){
				res.json({
					code:1,
					solicitations:solicitations
				})
			} else res.json({code:2, solicitations:[]})
		})
	} else{
		res.json({code:0, solicitation:[]})
	}
}

const editSolicitation = async (req,res) => {
	try{
		const filter = { _id: req.params.id};
		const update = {priority: req.body.priority};
		const doc = await Solicitation.findOneAndUpdate(filter,update);
		res.status(200).json({code:1, update:doc})
	} catch(err){
		res.status(400).json({code:0, error: err });
	}
}

const postSolicitation = async (req, res) => {
	try{
		const type = req.body.type;
		const description = req.body.description;
		const address = req.body.address;
		const solicitator = req.body.solicitator;

		const newSolicitation = new Solicitation({
			solicitator,
			type,
			description,
			address
		});

		newSolicitation.save()
		.then(() => res.json("Solicitação adicionada!"))
		.catch(err => res.status(400).json('Erro: ' + err));
		
	} catch(err) {
		res.status(400).json({ error: err });
	}
}

module.exports = { getSolicitations, postSolicitation, getUserSolicitations, getSolicitationById, editSolicitation}