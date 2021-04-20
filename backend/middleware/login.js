const jwt = require('jsonwebtoken')
const {JWT_KEY} = require('../config/jwt.json')

module.exports = (req,res,next) =>{
    try{
        jwt.verify(req.cookies.auth,JWT_KEY,(err, decoded) =>{
            if(err){
                res.json({code:0, message:err})
                res.user = undefined
            } else{
                res.json({code:1, user:decoded._doc})
                res.user = decoded;
            }
            next();
        })
    } catch(err){
        res.json({code:2, message:err})
        next();
    }
}