const {Admin} = require('../models/Admin')
const bcrypt = require('bcryptjs')
const {JWT_KEY} = require('../config/jwt.json')
const jwt = require('jsonwebtoken')

const createNewAdmin = (req,res) => {
    bcrypt.hash(req.body.password, 10).then((hashedPass) =>{
        
        const newAdmin = new Admin({
            name: req.body.name,
            email: req.body.email,
            cpf: req.body.cpf,
            password: hashedPass      
        })

        Admin.create(newAdmin)
        .then( _ => res.json({code:1, message:'Admin Registered with success'}))
        .catch(err => res.json({code:2, message:err}))
    })
    .catch((err)=> res.json({code:3, message:err}))
}

const loginAdmin = (req,res) =>{
    const admin = req.body

    Admin.findOne({cpf:admin.cpf}).then((admin) =>{
        // check if the admin exists
        if(admin){
            bcrypt.compare(req.body.password, admin.password, (err, result) =>{
                if(err) res.json({code:0, message: err})
    
                if(result){
                    const token = jwt.sign({...admin},JWT_KEY,{expiresIn:"1h"})
                    
                    res.cookie('authAdmin',token, {
                        secure:false, 
                        httpOnly:false,
                        maxAge:900000,
                    })

                    res.json({
                        code:1,
                        message:"Login Successful!",
                        token
                    })
                } 
                else res.json({code:2, message:"Wrong Password!"})
            })
        } else res.json({code:3, message: 'No Admin found!'})
    })
}

const isAdminLogged = (req,res) =>{
    if(typeof res.admin != 'undefined'){
        res.json({code:1, admin:res.admin})
    }
    else res.json({code:0, admin:undefined})
}

const logoutAdmin = (req,res) =>{
    res.clearCookie('authAdmin')
    res.json({code:1, message:"logout"})
}

module.exports ={createNewAdmin, loginAdmin,isAdminLogged,logoutAdmin}