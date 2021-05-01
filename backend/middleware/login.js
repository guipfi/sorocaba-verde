const jwt = require('jsonwebtoken')
const {JWT_KEY} = require('../config/jwt.json')

module.exports = (req,res,next) =>{
    try{
        jwt.verify(req.cookies.auth,JWT_KEY,(err, decoded) =>{
            if(err){
                res.user = undefined
            } else{
                res.user = decoded._doc;
            }
            next();
        })
    } catch(err){
        res.json({message:err})
        next();
    }
}