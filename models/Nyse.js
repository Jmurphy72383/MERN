const mongoose = require('mongoose');

const NyseSchema = new mongoose.Schema({
    Symbol: {
        type: String
    },
    CompanyName: {
        type: String
    }
}, { collection : 'nyse' });

module.exports = Nyse = mongoose.model('nyse', NyseSchema); 