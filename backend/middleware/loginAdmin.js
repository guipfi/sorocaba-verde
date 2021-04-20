const jwt = require('jsonwebtoken')
const {JWT_KEY} = require('../config/jwt.json')

module.exports = (req,res,next) =>{
    try{
        jwt.verify(req.cookies.authAdmin,JWT_KEY,(err, decoded) =>{
            if(err){
                res.json({code:0, message:err})
                res.admin = undefined
            } else{
                res.json({code:1, admin:decoded._doc})
                res.admin = decoded;
            }
            next();
        })
    } catch(err){
        res.json({code:2, message:err})
        next();
    }
}