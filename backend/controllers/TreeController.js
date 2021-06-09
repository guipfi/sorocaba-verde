const Tree = require('../models/Tree');
const ObjectId = require('mongoose').Types.ObjectId;

function date_format(date) {

	let day  = date.getDate().toString().padStart(2, '0');
	let month  = (date.getMonth() +1).toString().padStart(2, '0');
	let year  = date.getFullYear();

	let formated_date = day + "/" + month + "/" + year;

	return formated_date;
}

const postTree = async (req, res) => {

	try{
		const type = req.body.type;
		const description = req.body.description;
		const address = req.body.address;
		const lat = req.body.lat;
		const lng = req.body.lng;
		const solicitator = req.body.solicitator;
		

		const photo_paths = []
		req.files.forEach((file) => {
			photo_paths.push(file.filename)
		})

		const photosURL = photo_paths;

		const newSolicitation = new Solicitation({
			solicitator,
			type,
			description,
			address,
			lat,
			lng,
			photosURL
		});

		newSolicitation.save()
		.then(() => res.status(200).json("Solicitação adicionada!"))
		.catch(err => res.status(400).json('Erro: ' + err));
		
	} catch(err) {
		res.status(400).json({ error: err });
	}
}

module.exports = { postTree }
