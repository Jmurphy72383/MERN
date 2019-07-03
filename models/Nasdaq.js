const mongoose = require('mongoose');

const NasdaqSchema = new mongoose.Schema({
    symbol: {
        type: String
    },
    companyName: {
        type: String
    }
}, { collection : 'nasdaq' });

module.exports = Nasdaq = mongoose.model('nasdaq', NasdaqSchema); 