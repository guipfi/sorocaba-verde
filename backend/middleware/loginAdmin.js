const jwt = require('jsonwebtoken')
const {JWT_KEY} = require('../config/jwt.json')

module.exports = (req,res,next) =>{
    try{
        jwt.verify(req.cookies.authAdmin,JWT_KEY,(err, decoded) =>{
            if(err){
                res.admin = undefined
            } else{
                res.admin = decoded._doc;
            }
            next();
        })
    } catch(err){
        res.json({message:err})
        next();
    }
}