const express = require('express');
const { getSolicitations, postSolicitation, getUserSolicitations  } = require('../../controllers/SolicitationController');

const verifyLogin = require('../../middleware/login');
const verifyAdminLogin = require('../../middleware/loginAdmin');


const router = express.Router();

router.get('/:type/:page', verifyAdminLogin, getSolicitations);
router.post('/new', verifyAdminLogin, postSolicitation);
router.get('/userSolicitations', verifyLogin, getUserSolicitations);

module.exports = router;