import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import axios from 'axios';
import Ticker from '../../components/Ticker/Ticker';
import StockCard from '../../components/StockCard/StockCard';
import SearchList from '../../components/SearchList/SearchList';
import QuoteBar from '../../components/QuoteBar/QuoteBar';
import BarChart from '../../components/BarChart/BarChart';
import StockTable from '../../components/StockTable/StockTable';
import BuyModal from '../../components/BuyModal/BuyModal';
import SuccessModal from '../../components/SuccessModal/SuccessModal';
import SearchModal from '../../components/SearchModal/SearchModal';

import WMT from '../../img/WMTtny.png';
import BAC from '../../img/BOAtny.png';
import WFC from '../../img/WFCtny.png';
import F from '../../img/Ftny.png';
import GE from '../../img/GEtny.png';
import KO from '../../img/KOtny.png';
import './Nyse.css';

const Nyse = () => {

    const renderStockCards = useMediaQuery({ query: '(min-width: 1000px)' });

    const renderBigChart = useMediaQuery({ query: '(min-width: 1200px)' });

    const renderShortChart = useMediaQuery({ query: '(max-width: 1200px)' });


    const [trendingPrices, setTrendingPrices] = useState({
        ko: '',
        koChange: '',
        bac: '',
        bacChange: '',
        wmt: '',
        wmtChange: '',
        wfc: '',
        wfcChange: '',
        f: '',
        fChange: '',
        ge: '',
        geChange: ''
    });

    const { 
        ko,
        koChange,
        bac,
        bacChange,
        wmt,
        wmtChange,
        wfc,
        wfcChange,
        f,
        fChange,
        ge,
        geChange
    } = trendingPrices;

    const [defaultStock, setDefaultStock] = useState({
        change: '',
        companyName: '',
        latestPrice: '',
        latestTime: '',
        primaryExchange: '',
        symbol: '',
        week52High: '',
        week52Low: '',
        previousClose: '',
        volume: '',
        news: [],
        chartData: {},
        options: {},
        chartData2: {},
        options2: {}
    });

    const {
        change,
        companyName,
        latestPrice,
        latestTime,
        primaryExchange,
        symbol,
        week52High,
        week52Low,
        previousClose,
        volume,
        news,
        chartData,
        options,
        chartData2,
        options2
    } = defaultStock;

    const [tableList, setTableList] = useState({
        stocks: [],
        search: '',
        showTable: ''
    });

    const {
        stocks,
        search,
        showTable
    } = tableList;

    const [sharesAmt, setSharesAmt] = useState({
        shares: '',
        total: '0.00'
    });
    const { shares, total } = sharesAmt;

    const [showModal, setShowModal] = useState({
        buyModal: false,
        successModal: false,
        searchModal: false
    });

    const { buyModal, successModal, searchModal } = showModal;

    useEffect(() => {
        getTrending();
        getDefaultStock();
    },[]);

    const getDefaultStock = async () => {
        let res = await axios.get('/api/data/xom');
        //console.log(res);
        //Pulls the Key:Value pairs from the res and stores them in dates
        const dates = Object.values(res.data.XOM.chart);
        const dateArray = [];
        const dataArray = [];
        const highArray = [];
        const lowArray = [];

        // Maps through the dates array and pushes the values to their respective array
        dates.map(day => {
            dateArray.push(day.label);
            dataArray.push(day.close);
            highArray.push(day.high);
            lowArray.push(day.low);
            return dateArray && dataArray && highArray && lowArray
        });

        //Creating smaller data array for charts on smaller screens
        const dateArray2 = dateArray.slice(7, dateArray.length);
        const dataArray2 = dataArray.slice(7, dataArray.length);
        const highArray2 = highArray.slice(7, highArray.length);
        const lowArray2 = lowArray.slice(7, lowArray.length);

        //Creating even smaller data arrays
        // const dateArray3 = dateArray.slice(13, dateArray.length);
        // const dataArray3 = dataArray.slice(13, dataArray.length);
        // const highArray3 = highArray.slice(13, highArray.length);
        // const lowArray3 = lowArray.slice(13, lowArray.length);

        await setDefaultStock({
            change: res.data.XOM.quote.change,
            companyName: res.data.XOM.quote.companyName,
            latestPrice: res.data.XOM.quote.latestPrice.toFixed(2),
            latestTime: res.data.XOM.quote.latestTime,
            primaryExchange: res.data.XOM.quote.primaryExchange,
            symbol: res.data.XOM.quote.symbol,
            week52High: res.data.XOM.quote.week52High,
            week52Low: res.data.XOM.quote.week52Low,
            previousClose: res.data.XOM.quote.previousClose.toFixed(2),
            volume: res.data.XOM.quote.avgTotalVolume,
            news: res.data.XOM.news,
            chartData: {
                labels: dateArray,
                datasets: [
                    {
                        label: 'Close Price',
                        data: dataArray,
                        backgroundColor: 'rgba(255, 255, 255, 0.5)',
                        type: 'line',
                        pointBackgroundColor: 'rgba(28, 12, 247)',
                        pointBorderColor: 'rgba(5, 5, 4)',
                        pointBorderWidth: 5,
                        pointHoverRadius: 7,
                        borderColor: 'rgba(28, 12, 247)',
                        fill: false
                    },
                    {
                        label: 'Daily Low',
                        data: lowArray,
                        backgroundColor: 'rgba(241, 35, 8)',
                    },
                    {
                        label: 'Daily High',
                        data: highArray,
                        backgroundColor: 'rgba(102, 182, 93)'
                    }
                ]
            },
            options: {
                        title: {
                            display: true,
                            text: res.data.XOM.quote.companyName,
                            fontSize: 35,
                            fontColor: 'rgba(255, 255, 255)'
                        },
                        legend: {
                            display: true,
                            position: 'top',
                            labels: {
                                fontColor: 'black'
                            }
                        },
                        scales: {
                            yAxes: [{
                                ticks: {
                                    fontColor: 'white'
                                }
                            }],
                            xAxes: [{
                                ticks: {
                                    fontColor: 'white'
                                }
                            }]
                        }
                    },
                //Setting state for smaller charts
                chartData2: {
                    labels: dateArray2,
                    datasets: [
                        {
                            label: 'Close Price',
                            data: dataArray2,
                            backgroundColor: 'rgba(255, 255, 255, 0.5)',
                            type: 'line',
                            pointBackgroundColor: 'rgba(28, 12, 247)',
                            pointBorderColor: 'rgba(5, 5, 4)',
                            pointBorderWidth: 5,
                            pointHoverRadius: 7,
                            borderColor: 'rgba(28, 12, 247)',
                            fill: false
                        },
                        {
                            label: 'Daily Low',
                            data: lowArray2,
                            backgroundColor: 'rgba(241, 35, 8)'
                        },
                        {
                            label: 'Daily High',
                            data: highArray2,
                            backgroundColor: 'rgba(102, 182, 93)'
                        }
                    ]
                },
                options2: {
                            title: {
                                display: true,
                                text: res.data.XOM.quote.companyName,
                                fontSize: 25,
                                fontColor: 'rgba(255, 255, 255)'
                            },
                            legend: {
                                display: true,
                                position: 'top',
                                labels: {
                                    fontColor: 'black'
                                }
                            },
                            scales: {
                                yAxes: [{
                                    ticks: {
                                        fontColor: 'white'
                                    }
                                }],
                                xAxes: [{
                                    ticks: {
                                        fontColor: 'white'
                                    }
                                }]
                            }
                        },
            
            
        });
    };

    const getTrending = async () => {
        let res = await axios.get('/api/nyseData/');
        
        await setTrendingPrices({ 
            ko: res.data.KO.quote.latestPrice.toFixed(2),
            koChange: res.data.KO.quote.change,
            bac: res.data.BAC.quote.latestPrice.toFixed(2),
            bacChange: res.data.BAC.quote.change,
            wmt: res.data.WMT.quote.latestPrice.toFixed(2),
            wmtChange: res.data.WMT.quote.change,
            wfc: res.data.WFC.quote.latestPrice.toFixed(2),
            wfcChange: res.data.WFC.quote.change,
            f: res.data.F.quote.latestPrice.toFixed(2),
            fChange: res.data.F.quote.change,
            ge: res.data.GE.quote.latestPrice.toFixed(2),
            geChange: res.data.GE.quote.change
         })
    };

    const allNyse = async (e) => {
        e.preventDefault();
        let res = await axios.get("/api/symbols/nyse");
        // Make "Search all Stocks" button disappear after clicking it
        const btn = document.querySelector('.allBtn');
        btn.style.display = "none";
        // Fills the stock table with all Nasdaq stocks and sets showTable to true
        await setTableList({
            stocks: res.data,
            showTable: true
        });
    }

    // This function makes an API call when you click on a stock from the Stock Table
    const stockQueryHandler = async (e) => {
        let query = e.target.value;
        let res = await axios.get(`/api/data/${query}`);
        let dataPath = query.toUpperCase();
        //console.log(res);
        //Pulls the Key:Value pairs from the res and stores them in dates
        const dates = Object.values(res.data[dataPath].chart);
        const dateArray = [];
        const dataArray = [];
        const highArray = [];
        const lowArray = [];

        // Maps through the dates array and pushes the values to their respective array
        dates.map(day => {
            dateArray.push(day.label);
            dataArray.push(day.close);
            highArray.push(day.high);
            lowArray.push(day.low);
            return dateArray && dataArray && highArray && lowArray
        });

        //Creating smaller data array for charts on smaller screens
        const dateArray2 = dateArray.slice(7, dateArray.length);
        const dataArray2 = dataArray.slice(7, dataArray.length);
        const highArray2 = highArray.slice(7, highArray.length);
        const lowArray2 = lowArray.slice(7, lowArray.length);

        //Creating even smaller data arrays
        // const dateArray3 = dateArray.slice(13, dateArray.length);
        // const dataArray3 = dataArray.slice(13, dataArray.length);
        // const highArray3 = highArray.slice(13, highArray.length);
        // const lowArray3 = lowArray.slice(13, lowArray.length);

        await setDefaultStock({
            change: res.data[dataPath].quote.change,
            companyName: res.data[dataPath].quote.companyName,
            latestPrice: res.data[dataPath].quote.latestPrice.toFixed(2),
            latestTime: res.data[dataPath].quote.latestTime,
            primaryExchange: res.data[dataPath].quote.primaryExchange,
            symbol: res.data[dataPath].quote.symbol,
            week52High: res.data[dataPath].quote.week52High,
            week52Low: res.data[dataPath].quote.week52Low,
            previousClose: res.data[dataPath].quote.previousClose.toFixed(2),
            volume: res.data[dataPath].quote.avgTotalVolume,
            news: res.data[dataPath].news,
            chartData: {
                labels: dateArray,
                datasets: [
                    {
                        label: 'Close Price',
                        data: dataArray,
                        backgroundColor: 'rgba(255, 255, 255, 0.5)',
                        type: 'line',
                        pointBackgroundColor: 'rgba(28, 12, 247)',
                        pointBorderColor: 'rgba(5, 5, 4)',
                        pointBorderWidth: 5,
                        pointHoverRadius: 7,
                        borderColor: 'rgba(28, 12, 247)',
                        fill: false
                    },
                    {
                        label: 'Daily Low',
                        data: lowArray,
                        backgroundColor: 'rgba(241, 35, 8)'
                    },
                    {
                        label: 'Daily High',
                        data: highArray,
                        backgroundColor: 'rgba(102, 182, 93)'
                    }
                ]
            },
            options: {
                        title: {
                            display: true,
                            text: res.data[dataPath].quote.companyName,
                            fontSize: 35,
                            fontColor: 'rgba(255, 255, 255)'
                        },
                        legend: {
                            display: true,
                            position: 'top',
                            labels: {
                                fontColor: 'black'
                            }
                        },
                        scales: {
                            yAxes: [{
                                ticks: {
                                    fontColor: 'white'
                                }
                            }],
                            xAxes: [{
                                ticks: {
                                    fontColor: 'white'
                                }
                            }]
                        }
                    },
                    //Setting state for smaller charts
                chartData2: {
                    labels: dateArray2,
                    datasets: [
                        {
                            label: 'Close Price',
                            data: dataArray2,
                            backgroundColor: 'rgba(255, 255, 255, 0.5)',
                            type: 'line',
                            pointBackgroundColor: 'rgba(28, 12, 247)',
                            pointBorderColor: 'rgba(5, 5, 4)',
                            pointBorderWidth: 5,
                            pointHoverRadius: 7,
                            borderColor: 'rgba(28, 12, 247)',
                            fill: false
                        },
                        {
                            label: 'Daily Low',
                            data: lowArray2,
                            backgroundColor: 'rgba(241, 35, 8)'
                        },
                        {
                            label: 'Daily High',
                            data: highArray2,
                            backgroundColor: 'rgba(102, 182, 93)'
                        }
                    ]
                },
                options2: {
                            title: {
                                display: true,
                                text: res.data[dataPath].quote.companyName,
                                fontSize: 25,
                                fontColor: 'rgba(255, 255, 255)'
                            },
                            legend: {
                                display: true,
                                position: 'top',
                                labels: {
                                    fontColor: 'black'
                                }
                            },
                            scales: {
                                yAxes: [{
                                    ticks: {
                                        fontColor: 'white'
                                    }
                                }],
                                xAxes: [{
                                    ticks: {
                                        fontColor: 'white'
                                    }
                                }]
                            }
                        },
        });
    }


    // This function makes an API call when you click on one of the trending stocks on the dashboard page
    const trendingStockQuery = async (e) => {
        let params = e.currentTarget.value;
        // Turn the value all uppercase since the Object path is case sensitive
        let dataPath = params.toUpperCase();
        let res = await axios.get(`/api/data/${params}`);
        //Pulls the Key:Value pairs from the res and stores them in dates
        const dates = Object.values(res.data[dataPath].chart);
        const dateArray = [];
        const dataArray = [];
        const highArray = [];
        const lowArray = [];

        // Maps through the dates array and pushes the values to their respective array
        dates.map(day => {
            dateArray.push(day.label);
            dataArray.push(day.close);
            highArray.push(day.high);
            lowArray.push(day.low);
            return dateArray && dataArray && highArray && lowArray
        });

        await setDefaultStock({
            change: res.data[dataPath].quote.change,
            companyName: res.data[dataPath].quote.companyName,
            latestPrice: res.data[dataPath].quote.latestPrice.toFixed(2),
            latestTime: res.data[dataPath].quote.latestTime,
            primaryExchange: res.data[dataPath].quote.primaryExchange,
            symbol: res.data[dataPath].quote.symbol,
            week52High: res.data[dataPath].quote.week52High,
            week52Low: res.data[dataPath].quote.week52Low,
            previousClose: res.data[dataPath].quote.previousClose.toFixed(2),
            volume: res.data[dataPath].quote.avgTotalVolume,
            news: res.data[dataPath].news,
            chartData: {
                labels: dateArray,
                datasets: [
                    {
                        label: 'Close Price',
                        data: dataArray,
                        backgroundColor: 'rgba(255, 255, 255, 0.5)',
                        type: 'line',
                        pointBackgroundColor: 'rgba(28, 12, 247)',
                        pointBorderColor: 'rgba(5, 5, 4)',
                        pointBorderWidth: 5,
                        pointHoverRadius: 7,
                        borderColor: 'rgba(28, 12, 247)',
                        fill: false
                    },
                    {
                        label: 'Daily Low',
                        data: lowArray,
                        backgroundColor: 'rgba(241, 35, 8)'
                    },
                    {
                        label: 'Daily High',
                        data: highArray,
                        backgroundColor: 'rgba(102, 182, 93)'
                    }
                ]
            },
            options: {
                        title: {
                            display: true,
                            text: res.data[dataPath].quote.companyName,
                            fontSize: 35,
                            fontColor: 'rgba(255, 255, 255)'
                        },
                        legend: {
                            display: true,
                            position: 'top',
                            labels: {
                                fontColor: 'black'
                            }
                        },
                        scales: {
                            yAxes: [{
                                ticks: {
                                    fontColor: 'white'
                                }
                            }],
                            xAxes: [{
                                ticks: {
                                    fontColor: 'white'
                                }
                            }]
                        }
                    }
        });
    };

    const inputChangeHandler = e => {
        const name = e.target.name;
        const value = e.target.value;
        // Handles the search input 
        setTableList({
            [name]: value 
        });
    };

    const stockSearchHandler = async e => {
        e.preventDefault();
        let res = await axios.get("/api/symbols/nyse/" + search);
        // Making "Search All Stocks" button appear if it is hidden
        const btn = document.querySelector('.allBtn');
        btn.style.display = "inline";

        // If search results return an empty array show search modal
        if(res.data.length === 0) {
            setShowModal({ searchModal: true })
        }
        // Sets the state with the stocks pulled from DB that met search criteria
        setTableList({
            stocks: res.data,
            search: '',
            showTable: true
        });

    };

    const sharesInputHandler = e => {
        const value = e.target.value;
        
        setSharesAmt({
            shares: value,
            total: (value * latestPrice).toFixed(2)
        })
    };

    const cancelOrderHandler = () => {
        setShowModal({ buyModal: false, successModal: false, searchModal: false })
        setSharesAmt({ total: '0.00'})
    };

    const buyStockHandler = async () => {
        let todayDate = new Date().toISOString().slice(0,10);
        await axios.post('/api/portfolio/stocks', {
            symbol: symbol,
            companyName: companyName,
            market: primaryExchange,
            shares: shares,
            buyDate: todayDate,
            buyPrice: latestPrice,
            currentPrice: latestPrice,
            totalInvested: (shares * latestPrice).toFixed(2)
        })
        
        setShowModal({ buyModal: false, successModal: true })
    };


    return (
        <div className="container">
            {buyModal === true ? 
                <BuyModal 
                    company={companyName}
                    total={total}
                    sharesInputHandler={(e) => sharesInputHandler(e)}
                    buyStockHandler={() => buyStockHandler()}
                    cancelOrderHandler={() => cancelOrderHandler()}
                /> : null
            }

            {successModal === true ? 
                <SuccessModal 
                    cancelOrderHandler={() => cancelOrderHandler()}
                /> : null
            }

            {searchModal === true ?
                <SearchModal 
                    cancelOrderHandler={() => cancelOrderHandler()}
                /> : null
            }
            
            
            <div className="item header">
                <Ticker 
                    news={news}
                />
            </div>
            <div className="sb2 sidebar-1">
                <h2 className="trend-h2">NYSE Stocks</h2>
                <SearchList 
                    search={search}
                    inputChangeHandler={(e) => inputChangeHandler(e)}
                    stockSearchHandler={(e) => stockSearchHandler(e)}
                    allStocks={(e) => allNyse(e)}
                    exchange={'NYSE'}
                />
                
                {showTable === true ? 
                    <StockTable 
                    stocks={stocks}
                    stockQueryHandler={(e) => stockQueryHandler(e)}
                /> : null}
                
            </div>
                
            <div className="chart-item chart" id="chart-adjust">
                <a 
                    href="#"
                    className="buy-btn button1 size"
                    onClick={() => setShowModal({ buyModal: true })}
                >
                    BUY STOCK
                </a>
                {renderBigChart && 
                <BarChart 
                    data={chartData}
                    options={options}
                    height={100}
                    width={100}
                />}
                {renderShortChart &&
                    <BarChart 
                    data={chartData2}
                    options={options2}
                    height={100}
                    width={100}
                />
                }
            </div>
            {renderStockCards&&
            <div className="sb2 sidebar-2">
                <h2 className="trend-h2">Trending Stocks</h2>
                <div className="trending-container">
                    <StockCard 
                        src={BAC}
                        alt="Bank of America"
                        value="Bac"
                        currentPrice={bac}
                        net={(bacChange * 1).toFixed(2)}
                        priceClass={bacChange >= 0 ? "priceGreen" : "priceRed"}
                        className={bacChange >= 0 ? "fas fa-arrow-up" : "fas fa-arrow-down"}
                        onClick={(e) => trendingStockQuery(e)}
                    />
                    <StockCard 
                        src={KO}
                        value="Ko"
                        alt={ko}
                        currentPrice={ko}
                        net={(koChange * 1).toFixed(2)}
                        priceClass={koChange >= 0 ? "priceGreen" : "priceRed"}
                        className={koChange >= 0 ? "fas fa-arrow-up" : "fas fa-arrow-down"}
                        onClick={(e) => trendingStockQuery(e)}
                    />
                    <StockCard 
                        src={WFC}
                        value="Wfc"
                        alt="Wells Fargo"
                        currentPrice={wfc}
                        net={(wfcChange * 1).toFixed(2)}
                        priceClass={wfcChange >= 0 ? "priceGreen" : "priceRed"}
                        className={wfcChange >= 0 ? "fas fa-arrow-up" : "fas fa-arrow-down"}
                        onClick={(e) => trendingStockQuery(e)}
                    />
                    <StockCard 
                        src={WMT}
                        value="Wmt"
                        alt="WalMart"
                        currentPrice={wmt}
                        net={(wmtChange * 1).toFixed(2)}
                        priceClass={wmtChange >= 0 ? "priceGreen" : "priceRed"}
                        className={wmtChange >= 0 ? "fas fa-arrow-up" : "fas fa-arrow-down"}
                        onClick={(e) => trendingStockQuery(e)}
                    />
                    <StockCard 
                        src={F}
                        value="F"
                        alt="Ford"
                        currentPrice={f}
                        net={(fChange * 1).toFixed(2)}
                        priceClass={fChange >= 0 ? "priceGreen" : "priceRed"}
                        className={fChange >= 0 ? "fas fa-arrow-up" : "fas fa-arrow-down"}
                        onClick={(e) => trendingStockQuery(e)}
                    />
                    <StockCard 
                        src={GE}
                        value="Ge"
                        alt="General Electric"
                        currentPrice={ge}
                        net={(geChange * 1).toFixed(2)}
                        priceClass={geChange >= 0 ? "priceGreen" : "priceRed"}
                        className={geChange >= 0 ? "fas fa-arrow-up" : "fas fa-arrow-down"}
                        onClick={(e) => trendingStockQuery(e)}
                    />
                    {/* {props.map(c => (
                        <StockCard 
                            src={c.props.src}
                            alt={c.props.alt}
                            value={c.props.value}
                            currentPrice={`${trendingPrices}.${c.props.currentPrice}`}
                            priceClass={`${trendingPrices}.${c.props.currentPrice} >= ${trendingPrices}.${c.props.currentPrice}Open ? 'priceGreen' : 'priceRed'`}
                            className={`${trendingPrices}.${c.props.currentPrice} >= ${trendingPrices}.${c.props.currentPrice}Open ? 'fas fa-arrow-up' : 'fas fa-arrow-down`}
                            onClick={(e) => trendingStockQuery(e)}
                        />
                    ))} */}
                </div>
            </div>}
            <div className="item quote">
                <QuoteBar 
                    companyName={companyName}
                    exchange={primaryExchange}
                    symbol={symbol}
                    latestPrice={latestPrice}
                    time={latestTime}
                    change={(change * 1).toFixed(2)}
                    close={previousClose}
                    high={week52High}
                    low={week52Low}
                    volume={volume}
                />
            </div>
            {/* <div className="item footer">footer</div> */}
        </div>
    )
};

export default Nyse;
