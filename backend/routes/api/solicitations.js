const express = require('express');
const { getSolicitations } = require('../../controllers/SolicitationController');

const router = express.Router();

router.get('/:type/:page', getSolicitations);

module.exports = router