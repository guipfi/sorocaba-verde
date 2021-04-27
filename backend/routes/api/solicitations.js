const express = require('express');
const { getSolicitations, postSolicitation } = require('../../controllers/SolicitationController');

const router = express.Router();

router.get('/:type/:page', getSolicitations);
router.post('/new', postSolicitation);

module.exports = router;