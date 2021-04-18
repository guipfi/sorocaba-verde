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

	try {	
		const solicitationsNumber = await Solicitation
			.countDocuments(search_param);
		const solicitationsList = await Solicitation
			.find(search_param)
			.limit(Number(req.params.perPage))
			.skip(Number(req.params.page * req.params.perPage));

		let response = {
			total: solicitationsNumber,
			solicitationsList
		}

		res.status(200).json(response);
		
	} catch (err) {
		res.status(400).json({ error: err });
	}
}

module.exports = { getSolicitations }