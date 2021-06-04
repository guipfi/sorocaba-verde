const mongoose = require('mongoose');
const crypto = require('crypto')

const AdminSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },

    email:{
        type: String,
        required: true
    },

    id:{
      type: String,
      default: crypto.randomBytes(8)
    },
    cpf:{
        type: String,
        required: true
    },
    
    password:{
        type: String,
        required: true
    }

})

const Admin = mongoose.model('admin',AdminSchema,'admins')

module.exports = { Admin, AdminSchema }