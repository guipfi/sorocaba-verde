const express = require ('express');
const {createNewUser,loginUser} = require('../../controllers/UserController')

const router = express.Router()

// New User Account Registration
router.post('/register',createNewUser)

// Login
router.post('/login', loginUser)

module.exports = router