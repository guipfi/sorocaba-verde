const express = require('express');
const { getSolicitations, postSolicitation, getUserSolicitations, getSolicitationById, editSolicitation} = require('../../controllers/SolicitationController');
const verifyLogin = require('../../middleware/login')
const verifyAdminLogin = require('../../middleware/loginAdmin');
const multer = require('multer');
const multerConfig = require('../../config/multer');
const imageValidation = require("../../middleware/imageValidation.js");
const {uploadPhotos} = require('../../services/firebase');

const router = express.Router();

router.get('/:type/:page', verifyAdminLogin, getSolicitations);
router.post('/new', multer(multerConfig).array('files',5), uploadPhotos,  postSolicitation);
router.get('/userSolicitations', verifyLogin, getUserSolicitations);
router.get('/solicitation/content/:id', getSolicitationById);
router.post('/solicitation/content/:id', editSolicitation);

module.exports = router;