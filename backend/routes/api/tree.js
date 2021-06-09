const express = require('express');
const { postTree } = require('../../controllers/SolicitationController');
const verifyLogin = require('../../middleware/login')
const verifyAdminLogin = require('../../middleware/loginAdmin');

const upload = require('../../middleware/upload.js');
const imageValidation = require("../../middleware/imageValidation.js");

const router = express.Router();

router.post('/new', verifyAdminLogin, upload, postTree);

module.exports = router;