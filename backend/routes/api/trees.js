const express = require('express');
const { postTree, getTrees, getTreeById, editTree } = require('../../controllers/TreeController');
const verifyAdminLogin = require('../../middleware/loginAdmin');
const multer = require('multer');
const multerConfig = require('../../config/multer');
const {uploadPhotos} = require('../../services/firebase');

const router = express.Router();

router.post('/new', multer(multerConfig).array('files',5), uploadPhotos, postTree);
router.get('/:page', getTrees);
router.get('/tree/content/:id', getTreeById);
router.post('/tree/content/:id', editTree);

module.exports = router;