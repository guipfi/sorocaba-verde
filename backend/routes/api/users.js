const express = require ('express');
const {createNewUser,loginUser, logoutUser, isLogged} = require('../../controllers/UserController')
const verifyLogin = require('../../middleware/login')

const router = express.Router()
// New User Account Registration
router.post('/register',createNewUser)

// Login
router.post('/login', loginUser)

// Verify if the user is logged in
router.get('/isLogged', verifyLogin ,isLogged)

// Logout
router.get('/logout', logoutUser)

module.exports = router