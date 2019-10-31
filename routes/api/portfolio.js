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
            buyDate: req.body.buyDate,
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

//@route GET all stocks from portfolio

router.get('/portfolio', async (req, res) => {
    try {
        const bought = await Portfolio.find({});

        res.json(bought);
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

//@Route PUT
//Update Current Price
router.put('/:id', async (req, res) => {
    try {
        // const stock = await Portfolio.findById(req.params.id);
        const stock = await Portfolio.findByIdAndUpdate(req.params.id, {$set:{currentPrice: req.body.currentPrice}});

        await stock.save();
        res.json({ msg: 'Stock Updated'});
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;