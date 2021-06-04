const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
    adminName:{
        type: String,
        required: true
    },
    adminId:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    },
    
    size: Number,
    docName: String,
    url:{
        type: String,
        default: null
    },
    tree:{
        type: ObjectId,
        default: null
    },
    solicitation:{
        type: ObjectId,
        default: null,
    },
    key: String
})

const Report = mongoose.model('report',ReportSchema,'reports')

module.exports = Report