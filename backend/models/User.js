const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },

    email:{
        type: String,
        required: true
    },

    cpf:{
        type: String,
        required: true
    },

    phone:{
        type: String,
    },

    address:{
        type: String,
    },

    password:{
        type: String,
        required: true
    }

})

const User = mongoose.model('user',UserSchema,'users')

module.exports = { User, UserSchema }