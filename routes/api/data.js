const express = require('express');
const router = express.Router();
const request = require('request');
const config = require('config');


//@ Get request for Uber
//Default for NYSE page
router.get('/uber', (req, res) => {
    try {
        const options = {
            // uri: `https://cloud.iexapis.com/stable/stock/market/batch?symbols=uber&types=quote,news,chart&token=sk_8b7f58173b6647e4896a613af9b6b06f`,
            uri: `https://cloud.iexapis.com/stable/stock/market/batch?symbols=uber&types=quote,news,chart&token=${config.get('secret')}`,
            method: 'GET',
            headers: { 'user-agent': 'node.js'}
        };

        request(options, (error, response, body) => {
            if(error) console.error(error);

            if(response.statusCode !== 200) {
                return res.status(404).json({ msg: 'Stock not found'});
            }

            res.json(JSON.parse(body));
        });
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//@ Get request for Amazon
//Default for Nasdaq page
router.get('/amzn', (req, res) => {
    try {
        const options = {
            // uri: `https://cloud.iexapis.com/stable/stock/market/batch?symbols=uber&types=quote,news,chart&token=sk_8b7f58173b6647e4896a613af9b6b06f`,
            uri: `https://cloud.iexapis.com/stable/stock/market/batch?symbols=AMZN&types=quote,news,chart&token=${config.get('secret')}`,
            method: 'GET',
            headers: { 'user-agent': 'node.js'}
        };

        request(options, (error, response, body) => {
            if(error) console.error(error);

            if(response.statusCode !== 200) {
                return res.status(404).json({ msg: 'Stock not found'});
            }

            res.json(JSON.parse(body));
        });
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//@ GET request for stock querry
router.get('/:stock', (req, res) => {
    try {
        const options = {
            // uri: `https://cloud.iexapis.com/stable/stock/market/batch?symbols=uber&types=quote,news,chart&token=sk_8b7f58173b6647e4896a613af9b6b06f`,
            uri: `https://cloud.iexapis.com/stable/stock/market/batch?symbols=${req.params.stock}&types=quote,news,chart&token=${config.get('secret')}`,
            method: 'GET',
            headers: { 'user-agent': 'node.js'}
        };

        request(options, (error, response, body) => {
            if(error) console.error(error);

            if(response.statusCode !== 200) {
                return res.status(404).json({ msg: 'Stock not found'});
            }

            res.json(JSON.parse(body));
        });
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//@ GET request for home page stocks
router.get('/', (req, res) => {
    try {
        const options = {
            uri:`https://cloud.iexapis.com/v1/stock/market/batch?symbols=uber,amzn,nflx,twtr&types=quote&filter=latestPrice,open&token=${config.get('secret')}`,
            method: 'GET',
            headers: { 'user-agent': 'node.js'}
        };

        request(options, (error, response, body) => {
            if(error) console.error(error);

            if(response.statusCode !== 200) {
                return res.status(404).json({ msg: 'Stocks not found'});
            }

            res.json(JSON.parse(body));
        });
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});




module.exports = router;