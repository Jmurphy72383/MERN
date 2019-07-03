const express = require('express');
const router = express.Router();

const Nyse = require('../../models/Nyse');
const Nasdaq = require('../../models/Nasdaq');

//@route GET all NYSE stock symbols

router.get('/nyse', async (req, res) => {
    try {
        const symbols = await Nyse.find({});

        res.json(symbols);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//@route GET all Nasdaq stock symbols

router.get('/nasdaq', async (req, res) => {
    try {
        const symbols = await Nasdaq.find({});

        res.json(symbols);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//@route GET single Nyse stock symbols
//Search by company name

router.get('/nyse/:singlestock', async (req, res) => {
    try {
        const stock = await Nyse.find({ CompanyName: { $regex: req.params.singlestock, $options: 'i'} });

        res.json(stock);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//@route GET single Nasdaq stock symbols
//Search by company name

router.get('/nasdaq/:singlestock', async (req, res) => {
    try {
        const stock = await Nasdaq.find({ CompanyName: { $regex: req.params.singlestock, $options: 'i'} });

        res.json(stock);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;