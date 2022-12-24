const mongoose = require('mongoose');

const recipientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    newsletters: {
        type: Array,
        default: [],
        required: false
    }
}, {collection: 'recipients'});

module.exports = mongoose.model('Recipient', recipientSchema);