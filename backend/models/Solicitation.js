const mongoose = require('mongoose');
const { UserSchema } = require('./User');
const ObjectId = mongoose.Schema.Types.ObjectId;

const SolicitationSchema = new mongoose.Schema({
    solicitator: {
        type: ObjectId,
        required: true 
    },
    description: {
        type: String,
        default:'',
        required: false
    },
    type: {
        type: String
    },
    address: {
        type: String,
        required: true
    },
    photosURL: {
        type: [String],
        default: ["tree.jpg"]
    },
    date: {
        type: Date,
        default: Date.now()
    },
    priority: {
        type: Number,
        default: 0
    },
    status: {
        type: Number,
        default: 1
    },
    lat: {
        type: Number,
        required: true
    }, 
    lng: {
        type: Number,
        required: true
    },
    
    tree: {
        type:ObjectId,
        default: null
    }

});

const Solicitation = mongoose.model('solicitation', SolicitationSchema, 'solicitations');

module.exports = Solicitation