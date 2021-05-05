const express = require('express');
const { getSolicitations, postSolicitation, getUserSolicitations, getSolicitationById, editSolicitation} = require('../../controllers/SolicitationController');
const verifyLogin = require('../../middleware/login')


const router = express.Router();

router.get('/:type/:page', getSolicitations);
router.post('/new', postSolicitation);
router.get('/userSolicitations', verifyLogin, getUserSolicitations);
router.get('/solicitation/content/:id', getSolicitationById);
router.post('/solicitation/content/:id', editSolicitation);

module.exports = router;