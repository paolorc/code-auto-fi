const mongoose = require('mongoose');
// var uniqueValidator = require('mongoose-unique-validator');

const CarSchema = new mongoose.Schema({
    uuid: {
        type: String,
        unique: false,
        required: false,
        default: ''
    },
    vin: {
        type: String,
        unique: false,
        required: false,
        default: ''
    },
    make: {
        type: String,
        required: false,
        default: ''
    },
    model: {
        type: String,
        required: false,
        default: ''
    },
    mileage: {
        type: String,
        required: false,
        default: ''
    },
    year: {
        type: String,
        required: false,
        default: ''
    },
    price: {
        type: String,
        required: false,
        default: ''
    },
    zip_code: {
        type: String,
        required: false,
        default: ''
    },
    create_date: {
        type: String,
        required: false,
        default: ''
    },
    update_date: {
        type: String,
        required: false,
        default: ''
    }
}, { timestamps: false });

module.exports = mongoose.model('Car', CarSchema);