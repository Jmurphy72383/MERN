const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PortfolioSchema = new Schema({
    symbol: {
        type: String
    },
    companyName: {
        type: String
    },
    market: {
        type: String
    },
    shares: {
        type: Number
    },
    buyDate: {
        type: Date,
        default: Date.now,
        required: true
    },
    buyPrice: {
        type: Number
    },
    currentPrice: {
        type: Number
    },
    totalInvested: {
        type: Number
    },
    netTotal: {
        type: Number,
        default: 0
    }

});

module.exports = Portfolio = mongoose.model('portfolio', PortfolioSchema); 