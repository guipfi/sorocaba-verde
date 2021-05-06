const mongoose = require('mongoose');
const { UserSchema } = require('./User');
const ObjectId = mongoose.Schema.Types.ObjectId;

function date_formated(){
    var date = new Date;

    day  = date.getDate().toString().padStart(2, '0'),
    month  = (date.getMonth() + 1).toString().padStart(2, '0'), 
    year  = date.getFullYear();
    
    return day + "/" + month + "/" +year;
}

const SolicitationSchema = new mongoose.Schema({
    solicitator: {
        type: ObjectId,
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
        type: String,
        default: date_formated()
    },
    priority: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        default: 'Na fila de espera'
    }
});

const Solicitation = mongoose.model('solicitation', SolicitationSchema, 'solicitations');

module.exports = Solicitation