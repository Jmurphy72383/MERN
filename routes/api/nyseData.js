const express = require('express');
const router = express.Router();
const request = require('request');
const config = require('config');

//@ GET request for home page stocks
router.get('/', (req, res) => {
    try {
        const options = {
            uri:`https://cloud.iexapis.com/v1/stock/market/batch?symbols=ko,bac,wmt,wfc,f,ge&types=quote&filter=latestPrice,change&token=${config.get('secret')}`,
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