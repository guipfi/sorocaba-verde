const express = require('express');
const { getSolicitations, postSolicitation, getUserSolicitations  } = require('../../controllers/SolicitationController');
const verifyLogin = require('../../middleware/login')


const router = express.Router();

router.get('/:type/:page', getSolicitations);
router.post('/new', postSolicitation);
router.get('/userSolicitations', verifyLogin, getUserSolicitations);

module.exports = router;