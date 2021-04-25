const mongoose = require('mongoose');
const { UserSchema } = require('./User');

const SolicitationSchema = new mongoose.Schema({
    solicitator: {
        type: UserSchema,
        required: true 
    },
    description: {
        type: String,
        required: true
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
        default: []
    },
    date: {
        type: Date,
        default: Date.now()
    },
    priority: {
        type: String
    },
    status: {
        type: String
    }
});

const Solicitation = mongoose.model('solicitation',SolicitationSchema,'solicitations');

module.exports = Solicitation