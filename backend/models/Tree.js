const mongoose = require('mongoose');

const TreeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }, 
    height: {
        type: Number,
    },
    age: {
        type: Number,
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
    lat: {
        type: Number,
        required: true
    }, 
    lng: {
        type: Number,
        required: true
    },

});

const Tree = mongoose.model('tree', TreeSchema, 'trees');

module.exports = Tree