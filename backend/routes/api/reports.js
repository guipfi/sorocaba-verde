const express = require ('express');
const multer = require('multer');
const multerConfig = require('../../config/multer');
const {createReport} = require('../../controllers/ReportController');
const {uploadFile} = require('../../services/firebase');

const router = express.Router();

// Create a report
router.post('/upload', multer(multerConfig).single('file'), uploadFile, createReport)

module.exports = router