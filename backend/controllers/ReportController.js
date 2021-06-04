const Report = require('../models/Report')
const ObjectId = require('mongoose').Types.ObjectId;

const createReport = async (req, res) =>{
    try{
        const {originalname: docName, size,filename: key,firebaseURL: url} = req.file
        const {treeId, solicitation, adminName, adminId,address} = req.body
        const newReport = await Report.create({
            docName,
            size,
            key,
            url,
            treeId,
            solicitation,
            adminName,
            adminId,
            address,
        })

        newReport.save()
        .then(() => res.status(200).json("Laudo Inserido!"))
        .catch(err =>res.status(400).json('Erro: ' + err));

    } catch(err){
        res.status(400).json({ error: err });
    }
}

module.exports = {createReport}