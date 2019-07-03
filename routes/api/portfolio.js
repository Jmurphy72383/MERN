const express = require('express');
const router = express.Router();

const Portfolio = require('../../models/Portfolio');

//@Route PUT api/portfolio

router.post('/stocks', async (req, res) => {
    try {
        const newStock = new Portfolio ({
            symbol: req.body.symbol,
            companyName: req.body.companyName,
            market: req.body.market,
            shares: req.body.shares,
            buyPrice: req.body.buyPrice,
            currentPrice: req.body.currentPrice,
            totalInvested: req.body.totalInvested,
        });

        const stock = await newStock.save();

        res.json(stock);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//@Route DELETE 
//Delete a stock from portfolio
router.delete('/stocks/:id', async (req, res) => {
    try {
        const stock = await Portfolio.findById(req.params.id);

        if(!stock) {
            return res.status(404).json({ msg: 'Stock Not Found'});
        }

        await stock.remove();

        res.json({ msg: 'Stock Sold'});
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

module.exports = router;