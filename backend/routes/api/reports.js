const express = require ('express');
const multer = require('multer');
const multerConfig = require('../../config/multer');
const {createReport, getReportBySolicitation,getReportByTree, getReportById} = require('../../controllers/ReportController');
const {uploadFile} = require('../../services/firebase');

const router = express.Router();

// Create a report
router.post('/upload', multer(multerConfig).single('file'), uploadFile, createReport)

// Get all reports by solicitation id
router.get('/solicitation/:id', getReportBySolicitation);

// Get all reports by tree id
router.get('/tree/:id', getReportByTree);

// Get report by id
router.get('/report/:id', getReportById);

module.exports = router