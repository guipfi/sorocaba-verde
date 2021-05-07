const express = require('express');
const { getSolicitations, postSolicitation, getUserSolicitations, getSolicitationById, editSolicitation} = require('../../controllers/SolicitationController');
const verifyLogin = require('../../middleware/login')
const verifyAdminLogin = require('../../middleware/loginAdmin');

const upload = require('../../middleware/upload.js');
const imageValidation = require("../../middleware/imageValidation.js");

const router = express.Router();

router.get('/:type/:page', verifyAdminLogin, getSolicitations);
router.post('/new', verifyAdminLogin, upload, postSolicitation);
router.get('/userSolicitations', verifyLogin, getUserSolicitations);
router.get('/solicitation/content/:id', getSolicitationById);
router.post('/solicitation/content/:id', editSolicitation);

module.exports = router;