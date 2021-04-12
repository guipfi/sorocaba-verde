const Solicitation = require('../models/Solicitation');

const getSolicitations = (req, res) => {
    if(req.params.type == "new") {
        search_param = {priority: { "$ne": null }};
    } else if(req.params.type == "queue") {
        search_param = {priority: null};
    } else {
        search_param = {};
    }

    const solicitationsList = Solicitation
    .find(search_param)
    .limit(Number(req.params.perPage))
    .skip(Number(req.params.page * req.params.perPage))
    .then((data) => {
        res.status(200).json(data);
    })
    .catch((err) => {
        console.log("testando");
        res.status(400).json({error: err});
    });
}

module.exports = { getSolicitations } 