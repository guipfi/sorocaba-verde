const Tree = require('../models/Tree');
const ObjectId = require('mongoose').Types.ObjectId;

function date_format(date) {

	let day  = date.getDate().toString().padStart(2, '0');
	let month  = (date.getMonth() +1).toString().padStart(2, '0');
	let year  = date.getFullYear();

	let formated_date = day + "/" + month + "/" + year;

	return formated_date;
}

const getTrees = async (req, res) => {

	let limit = 0;

	if(req.query?.limit) {
		limit = Number(req.query.limit);
	}

	try {	
		const treesNumber = await Tree
			.countDocuments();

		var treesList = await Tree
			.find()
			.sort({date: "desc"})
			.limit(limit)
			.skip(Number(req.params.page * limit));

		let trees = treesList.map(item => {
			let formated_date = date_format(item.date);
			let result = {
				...item._doc,
				date: formated_date
			}
			return result;
		});
			
		let response = {
			total: treesNumber,
			treesList: trees
		}

		res.status(200).json(response);
		
	} catch (err) {
		res.status(400).json({ error: err });
	}
}

const getTreeById = async (req,res) =>{
	try{
		Tree.findOne({_id:ObjectId(req.params.id)})
		.then((tree) => {
			let treeFormated = {...tree._doc, date:date_format(tree.date)}
			res.status(200).json({
				code:1,
				tree: treeFormated
			})
		})
	} catch(err){
		res.status(400).json({code:0, error:err});
	}
}

const editTree = async (req,res) => {
	try{
		const filter = { _id: req.params.id};
		const update = {quantity: req.body.quantity, height: req.body.height, age: req.body.age};
		const doc = await Tree.findOneAndUpdate(filter,update);
		res.status(200).json({code:1, update:doc})
	} catch(err){
		res.status(400).json({code:0, error: err });
	}
}

const postTree = async (req, res) => {

	try{

		const address = req.body.address;
		const lat = req.body.lat;
		const lng = req.body.lng;
		const quantity = req.body.quantity;
		const name = req.body.name;
		const description = req.body.description;
		const height = req.body.height;
		const age = req.body.age;
		const photosURL = req.files.photoURL;

		if(quantity > 1) {
			newTree = new Tree({
				name,
				description,
				quantity,
				address,
				lat,
				lng,
				photosURL,
				age,
				height
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

module.exports = { postTree, getTrees, editTree, getTreeById }
