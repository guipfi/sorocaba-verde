const express = require ('express');
const {createNewAdmin,loginAdmin,isAdminLogged, logoutAdmin} = require('../../controllers/AdminController')
const verifyLogin = require('../../middleware/loginAdmin')


const router = express.Router()

// New Admin Account Registration
router.post('/register',createNewAdmin)

// Login
router.post('/login',loginAdmin)

// Verify if the admin is logged in
router.get('/isLogged', verifyLogin ,isAdminLogged)

// Logout
router.get('/logout', logoutAdmin)


module.exports = router