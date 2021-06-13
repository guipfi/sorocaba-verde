const Report = require('../models/Report')
const ObjectId = require('mongoose').Types.ObjectId;

function date_format(date) {

	let day  = date.getDate().toString().padStart(2, '0');
	let month  = (date.getMonth() +1).toString().padStart(2, '0');
	let year  = date.getFullYear();

	let formated_date = day + "/" + month + "/" + year;

	return formated_date;
}

const createReport = async (req, res) =>{
    try{
        const {originalname: docName, size,filename: key,firebaseURL: url} = req.file
        const {tree, solicitation, adminName, adminId,address} = req.body

        const newReport = await Report.create({
            docName,
            size,
            key,
            url,
            tree,
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

const getReportBySolicitation = async (req,res) =>{
    try{
        Report.find({solicitation: ObjectId(req.params.id)})
        .then((reports) =>{
            let reportsFormated = reports.map(item => {
                let formated_date = date_format(item.date);
                let result = {
                    ...item._doc,
                    date: formated_date
                }
                return result;
            })
            res.json({
                code:1,
                reports: reportsFormated
            })
        })
    } catch(err){
        res.status(400).json({error:err})
    }

}

const getReportByTree = async (req,res) =>{
    try{
        Report.find({tree:ObjectId(req.params.id)})
        .then((reports) =>{
            let reportsFormated = reports.map(item => {
                let formated_date = date_format(item.date);
                let result = {
                    ...item._doc,
                    date: formated_date
                }
                return result;
            })
            res.json({
                code:1,
                reports: reportsFormated
            })
        })
    } catch(err){
        res.status(400).json({error:err})
    }

}

const getReportById = async (req,res) =>{
    try{
        Report.findOne({_id:ObjectId(req.params.id)})
        .then((report) =>{
            let reportFormated = {...report._doc, date:date_format(report.date)}
            res.json({
                code:1,
                report: reportFormated
            })
        })
    } catch(err){
        res.status(400).json({error:err})
    }
}

module.exports = {createReport, getReportBySolicitation, getReportByTree, getReportById}