const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
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
    
    password:{
        type: String,
        required: true
    }

})

const Admin = mongoose.model('admin',AdminSchema,'admins')

module.exports = { Admin, AdminSchema }