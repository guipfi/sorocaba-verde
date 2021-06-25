const Solicitation = require('../models/Solicitation');
const ObjectId = require('mongoose').Types.ObjectId;

function date_format(date) {

	let day  = date.getDate().toString().padStart(2, '0');
	let month  = (date.getMonth() +1).toString().padStart(2, '0');
	let year  = date.getFullYear();

	let formated_date = day + "/" + month + "/" + year;

	return formated_date;
}

const getSolicitations = async (req, res) => {

	var search_param = {};

	if(req.query.filters) {
		filters = JSON.parse(req.query.filters);
		hasFilters = true;
		if(filters.type.length > 0) {
			search_param = {
				type: { $in: filters.type }
			};
		}
		if(filters.location.length > 0) {
			search_param = {
				...search_param,
				address: { $regex: filters.location[0] } 
			};
		}
	} else {
		hasFilters = false;
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
				priority: { $ne: 0 },
			};
		}
		sort_param = {priority: "asc", date: "desc"};
	} else if (req.params.type == "new") {
		search_param = {
			...search_param,
			priority: 0
		};
		sort_param = {date: "desc"};
	} 

	let limit = 0;

	if(req.query.limit) {
		limit = Number(req.query.limit);
	}

	try {	
		const solicitationsNumber = await Solicitation
			.countDocuments(search_param);

		var solicitationsList = await Solicitation
			.find(search_param)
			.sort(sort_param)
			.limit(limit)
			.skip(Number(req.params.page * limit));

		let solicitations = solicitationsList.map(item => {
			let formated_date = date_format(item.date);
			let result = {
				...item._doc,
				date: formated_date
			}
			return result;
		});
			
		let response = {
			total: solicitationsNumber,
			solicitationsList: solicitations
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
			let solicitationsFormated = {...solicitation._doc, date:date_format(solicitation.date)}
			res.json({
				code:1,
				solicitation: solicitationsFormated
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
				let solicitationsFormated = solicitations.map(item => {
					let formated_date = date_format(item.date);
					let result = {
						...item._doc,
						date: formated_date
					}
					return result;
				});
				res.json({
					code:1,
					solicitations:solicitationsFormated
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
		const update = {priority: req.body.priority, status: req.body.status, tree: ObjectId(req.body.tree)};
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
		const lat = req.body.lat;
		const lng = req.body.lng;
		const solicitator = req.body.solicitator;
		const photosURL = req.files.photoURL
		const tree = req.body.tree;

		var solicitationData;

		if(tree) {
			solicitationData = {
				solicitator,
				type,
				description,
				address,
				lat,
				lng,
				photosURL,
				tree
			}
		} else {
			solicitationData = {
				solicitator,
				type,
				description,
				address,
				lat,
				lng,
				photosURL,
			}
		}

		newSolicitation = new Solicitation(solicitationData);

		newSolicitation.save()
		.then(() => res.status(200).json("Solicitação adicionada!"))
		.catch(err => res.status(400).json('Erro: ' + err));
		
	} catch(err) {
		res.status(400).json({ error: err });
	}
}

module.exports = { getSolicitations, postSolicitation, getUserSolicitations, getSolicitationById, editSolicitation}
