const {User} = require('../models/User')
const bcrypt = require('bcryptjs')
const {JWT_KEY} = require('../config/jwt.json')
const jwt = require('jsonwebtoken')

const createNewUser = (req,res) => {
    bcrypt.hash(req.body.password, 10).then((hashedPass) =>{
        
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            cpf: req.body.cpf,
            phone: req.body.phone,
            address: req.body.address,
            password: hashedPass      
        })

        User.create(newUser)
        .then( _ => res.json({code:1, message:'User Registered with success'}))
        .catch(err => res.status(400).json({code:2, message:err}))
    })
    .catch((err)=> res.status(400).json({code:3, message:err}))
}

const loginUser = (req,res) =>{
    const user = req.body

    User.findOne({cpf:user.cpf}).then((user) =>{
        // check if the user exists
        if(user){
            bcrypt.compare(req.body.password, user.password, (err, result) =>{
                if(err) res.json({code:0, message: err})
    
                if(result){
                    const token = jwt.sign({...user},JWT_KEY,{expiresIn:"1h"})
                    
                    res.cookie('auth',token, {
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
        } else res.json({code:3, message: 'No user found!'})
    })
}

const isLogged = (req,res) =>{
    if(typeof res.user != 'undefined'){
        res.json({code:1, email:res.user.email})
    }
    else res.json({code:0, email:undefined})
}

const logoutUser = (req,res) =>{
    res.clearCookie('auth')
    res.json({code:1, message:"logout"})
}

module.exports ={createNewUser, loginUser, isLogged, logoutUser}