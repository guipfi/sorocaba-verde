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
<<<<<<< HEAD
    type: {
        type: String
    },
=======
>>>>>>> 74b5caf0bf8a51e65f862c74a8019cdf05c035a0
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
    }, 
    lat: {
        type: Double
    },
    long: {
        type: Double
    }
});

const Solicitation = mongoose.model('solicitation',SolicitationSchema,'solicitations');

module.exports = Solicitation