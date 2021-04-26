const Solicitation = require('../models/Solicitation');

const getSolicitations = async (req, res) => {

	var totalSolicitations = 0;

	if (req.params.type == "new") {
		search_param = { priority: { "$ne": null } };
	} else if (req.params.type == "queue") {
		search_param = { priority: null };
	} else {
		search_param = {};
	}

	let limit = 10;

	if(req.query.limit) {
		limit = Number(req.query.limit);
	}

	try {	
		const solicitationsNumber = await Solicitation
			.countDocuments(search_param);

		const solicitationsList = await Solicitation
			.find(search_param)
			.limit(limit)
			.skip(Number(req.params.page * limit));

		let response = {
			total: solicitationsNumber,
			solicitationsList
		}

		res.status(200).json(response);
		
	} catch (err) {
		res.status(400).json({ error: err });
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

module.exports = { getSolicitations, postSolicitation }