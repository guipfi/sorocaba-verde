const Tree = require('../models/Tree');

function date_format(date) {

	let day  = date.getDate().toString().padStart(2, '0');
	let month  = (date.getMonth() +1).toString().padStart(2, '0');
	let year  = date.getFullYear();

	let formated_date = day + "/" + month + "/" + year;

	return formated_date;
}

const postTree = async (req, res) => {

	try{

		const address = req.body.address;
		const lat = req.body.lat;
		const lng = req.body.lng;
		const quantity = req.body.quantity;
		const name = req.body.name;
		const description = req.body.description;
		
		const photo_paths = []
		req.files.forEach((file) => {
			photo_paths.push(file.filename)
		})

		const photosURL = photo_paths;

		var newTree;

		if(quantity > 1) {
			newTree = new Tree({
				name,
				description,
				quantity,
				address,
				lat,
				lng,
				photosURL
			});
		} else {
			const height = req.body.height;
			const age = req.body.age;
			newTree = new Tree({
				name,
				description,
				quantity,
				address,
				lat,
				lng,
				photosURL,
				height,
				age
			});
		}

		newTree.save()
		.then(() => res.status(200).json("Árvore adicionada' adicionada!"))
		.catch(err => res.status(400).json('Erro: ' + err));
		
	} catch(err) {
		res.status(400).json({ error: err });
	}
}

module.exports = { postTree }
