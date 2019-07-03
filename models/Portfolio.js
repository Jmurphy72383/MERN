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
        type: mongoose.Decimal128
    },
    currentPrice: {
        type: mongoose.Decimal128
    },
    totalInvested: {
        type: mongoose.Decimal128
    },
    netTotal: {
        type: mongoose.Decimal128,
        default: 0
    }

});

module.exports = Portfolio = mongoose.model('portfolio', PortfolioSchema); 