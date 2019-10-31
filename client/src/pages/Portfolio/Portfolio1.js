import React, { Component } from 'react';
import axios from 'axios';
import PortfolioTable from '../../components/PortfolioTable/PortfolioTable';
import Summary from '../../components/Summary/Summary';
import SellModal from '../../components/SellModal/SellModal';
import SuccessModal from '../../components/SuccessModal/SuccessModal';
import './Portfolio.css';

class Portfolio1 extends Component {
    state = {
        stocksOwned: [],
        totalInvested: '',
        totalNet: '',
        worstPerfNum: '',
        bestPerfNum: '',
        bestPerfCompany: '',
        worstPerfCompany: '',
        showSellModal: false,
        showSuccessModal: false,
        company: '',
        total: '',
        net: '',
        id: ''
    }

    componentDidMount() {
        this.showPortfolioHandler();
    }

    showPortfolioHandler = async () => {
        let res = await axios.get('/api/portfolio/portfolio');
        const stocks = Object.values(res.data);
        //console.log(stocks);
        const totalMoney = [];
        const netNum = [];
        let gainNum = []; 
        let companies = [];

        stocks.map(stock => {
            //console.log(stock.totalInvested);
            totalMoney.push(stock.totalInvested);
            companies.push(stock.companyName);
            let num = ((stock.currentPrice - stock.buyPrice) * stock.shares).toFixed(2);
            netNum.push(parseFloat(num));
            gainNum.push(num)
            
        });
        //console.log(totalMoney);
        //Add up all of the numbers in the array and stores the number in variable
        let sum = totalMoney.reduce((x, y) => x + y);
        let net = netNum.reduce((x, y) => x + y);
        //Finds the highest and lowest numbers in the gainNum array
        let bestGain = Math.max.apply(null, gainNum);
        let worstGain = Math.min.apply(null, gainNum);

        //Finds the index of the best/worst gains in netNum array and matches them to the companies array
        let cmpIndex1 = netNum.indexOf(bestGain);
        let bestComp = companies[cmpIndex1];
        let cmpIndex2 = netNum.indexOf(worstGain);
        let worstComp = companies[cmpIndex2];

        
        
        this.setState({ 
            stocksOwned: res.data,
            totalInvested: sum.toFixed(2),
            totalNet: net.toFixed(2),
            worstPerfNum: worstGain.toFixed(2),
            bestPerfNum: bestGain.toFixed(2),
            bestPerfCompany: bestComp,
            worstPerfCompany: worstComp
        });
    }

    updatePriceHandler = (e) => {
        const params = e.target.name;
        const stockId = e.target.value;
        axios.get(`/api/data/${params}`)
            .then(res => {
                const newPrice = res.data[params].quote.latestPrice;
                //console.log(newPrice);
                const updatedData = {currentPrice: newPrice}
                
                axios.put(`/api/portfolio/${stockId}`, updatedData)
                    .then(res => {
                        console.log(res);
                        this.showPortfolioHandler();
                    })
            })
    }

    showSellModalHandler = (e) => {
        const soldCompany = e.target.name;
        const soldId = e.target.value
        const soldTotal = e.target.getAttribute('data-sale');
        const netTotal = e.target.getAttribute('data-net');
        console.log(netTotal);
        this.setState({
            company: soldCompany,
            total: soldTotal,
            net: netTotal,
            id: soldId,
            showSellModal: true
        })
        
    }

    sellStockHandler = () => {
        const soldStock = this.state.id;
        axios.delete(`/api/portfolio/stocks/${soldStock}`)
            .then(res => {
                //console.log(res);
                this.showPortfolioHandler();
            });

            this.setState({
                showSellModal: false,
                showSuccessModal: true 
            });
    }

    cancelOrderHandler = () => {
        this.setState({
            showSellModal: false,
            showSuccessModal: false
        });
    }

    render() {
        return (
            <div className="grid-container">

                {this.state.showSellModal === true ?
                    <SellModal 
                    sellStockHandler={this.sellStockHandler}
                    cancelOrderHandler={this.cancelOrderHandler}
                    company={this.state.company}
                    total={this.state.total}
                    net={this.state.net}
                    /> : null}

                {this.state.showSuccessModal === true ? 
                    <SuccessModal 
                        cancelOrderHandler={this.cancelOrderHandler}
                    /> : null
                }
                


                <div className="portfolio port-item">
    
                    <PortfolioTable 
                        owns={this.state.stocksOwned}
                        updatePriceHandler={this.updatePriceHandler}
                        showSellModalHandler={this.showSellModalHandler}
                    />
                        
                </div>
                <div className="port-chart port-summ">
                    
                    <Summary 
                        total={this.state.totalInvested}
                        net={this.state.totalNet}
                        best={this.state.bestPerfCompany}
                        bestAmt={this.state.bestPerfNum}
                        worst={this.state.worstPerfCompany}
                        worstAmt={this.state.worstPerfNum}
                        lifetime={this.state.lifetime}
                    />
                    
                </div>
            </div>
        )
    }
}

export default Portfolio1;
