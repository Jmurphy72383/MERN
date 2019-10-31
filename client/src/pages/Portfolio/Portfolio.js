import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import axios from 'axios';
import PortfolioTable from '../../components/PortfolioTable/PortfolioTable';

import './Portfolio.css';


const Portfolio = () => {

    const [ownedStock, setOwnedStock] = useState({
        owns: []
    });

    const { owns } = ownedStock;

    
    
    const getPortfolio = async () => {
        console.log('fetching');
        let res = await axios.get('/api/portfolio/portfolio');
        //console.log(res.data);
        setOwnedStock({
            owns: res.data,
            updated: false
        });
    }

    const updatePriceHandler = async (e) => {
        console.log('clicked')
        let params = e.target.name;
        let stockId = e.target.value;
        let res = await axios.get(`/api/data/${params}`);
        let updatedPrice = res.data[params].quote.latestPrice;
        await axios.put(`/api/portfolio/${stockId}`, {
            currentPrice: updatedPrice
        });
        let response = await axios.get('/api/portfolio/portfolio');
        setOwnedStock({
            owns: response.data,
            updated: true
        });
        console.log('completed');
    };


    const sellStockHandler = async (e) => {
        let stockId = e.target.value;
        await axios.delete(`/api/portfolio/stocks/${stockId}`);
    }

    useEffect(() => {
        getPortfolio();
    },[]);
    
    
    return (
        <div className="grid-container">
            <div className="port-header item">header</div>

            <div className="portfolio item">

                <PortfolioTable 
                    owns={owns}
                    updatePriceHandler={(e) => updatePriceHandler(e)}
                    sellStockHandler={(e) => sellStockHandler(e)}
                />
                
            </div>
            <div className="port-chart item">port chart</div>
        </div>
    )
}

export default Portfolio;