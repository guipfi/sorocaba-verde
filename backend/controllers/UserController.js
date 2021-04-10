const User = require('../models/User')
const bcrypt = require('bcryptjs')
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
        .then( _ => res.json({msg:'User Registered with success'}))
        .catch(err => res.status(400).json({error:err}))
    })
    .catch((err)=> res.status(400).json({error:err}))
}

const loginUser = (req,res) =>{
    const user = req.body

    User.findOne({cpf:user.cpf}).then((user) =>{
        // check if the user exists
        if(user){
            bcrypt.compare(req.body.password, user.password, (err, result) =>{
                if(err) res.json({error: err})

                if(result){
                    let token = jwt.sign({name:user.name},'verySecretValue',{expiresIn:'1h'})
                    res.json({
                        message:"Login Sucessful!",
                        token
                    })
                } 
                else res.json({error:"Wrong Password!"})
            })
        } else res.json({error: 'No user found!'})
    })
}

module.exports ={createNewUser, loginUser}