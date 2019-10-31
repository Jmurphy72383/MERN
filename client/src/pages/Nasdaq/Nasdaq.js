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

import NFLX from '../../img/NFLXtny.png';
import AMZN from '../../img/AMZNtny.png';
import TWTR from '../../img/TWTRtny.png';
import FB from '../../img/FBtny.png';
import MSFT from '../../img/MSFTtny.png';
import AAPL from '../../img/AAPLtny.png';
import './Nasdaq.css';

const Nasdaq = () => {

    const renderStockCards = useMediaQuery({ query: '(min-width: 1000px)' });

    const renderBigChart = useMediaQuery({ query: '(min-width: 1200px)' });

    const renderShortChart = useMediaQuery({ query: '(max-width: 1200px)' });

    // const renderShorterChart = useMediaQuery({ query: '(max-width: 1000px)' });


    const [trendingPrices, setTrendingPrices] = useState({
        aapl: '',
        aaplChange: '',
        amzn: '',
        amznChange: '',
        nflx: '',
        nflxChange: '',
        twtr: '',
        twtrChange: '',
        fb: '',
        fbChange: '',
        msft: '',
        msftChange: ''
    });

    const { 
        aapl,
        aaplChange,
        amzn,
        amznChange,
        nflx,
        nflxChange,
        twtr,
        twtrChange,
        fb,
        fbChange,
        msft,
        msftChange
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
        let res = await axios.get('/api/data/googl');
        
        //Pulls the Key:Value pairs from the res and stores them in dates
        const dates = Object.values(res.data.GOOGL.chart);
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
        const dateArray3 = dateArray.slice(13, dateArray.length);
        const dataArray3 = dataArray.slice(13, dataArray.length);
        const highArray3 = highArray.slice(13, highArray.length);
        const lowArray3 = lowArray.slice(13, lowArray.length);

        await setDefaultStock({
            change: res.data.GOOGL.quote.change,
            companyName: res.data.GOOGL.quote.companyName,
            latestPrice: res.data.GOOGL.quote.latestPrice.toFixed(2),
            latestTime: res.data.GOOGL.quote.latestTime,
            primaryExchange: res.data.GOOGL.quote.primaryExchange,
            symbol: res.data.GOOGL.quote.symbol,
            week52High: res.data.GOOGL.quote.week52High,
            week52Low: res.data.GOOGL.quote.week52Low,
            previousClose: res.data.GOOGL.quote.previousClose.toFixed(2),
            volume: res.data.GOOGL.quote.avgTotalVolume,
            news: res.data.GOOGL.news,
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
                            text: res.data.GOOGL.quote.companyName,
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
                                text: res.data.GOOGL.quote.companyName,
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
            //Setting state for smaller charts
            chartData3: {
                labels: dateArray3,
                datasets: [
                    {
                        label: 'Close Price',
                        data: dataArray3,
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
                        data: lowArray3,
                        backgroundColor: 'rgba(241, 35, 8)'
                    },
                    {
                        label: 'Daily High',
                        data: highArray3,
                        backgroundColor: 'rgba(102, 182, 93)'
                    }
                ]
            },
            options3: {
                        title: {
                            display: true,
                            text: res.data.GOOGL.quote.companyName,
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
                    }
        });
    };

    const getTrending = async () => {
        let res = await axios.get('/api/data/');
        //console.log(res)
        await setTrendingPrices({ 
            aapl: res.data.AAPL.quote.latestPrice.toFixed(2),
            aaplChange: res.data.AAPL.quote.change,
            amzn: res.data.AMZN.quote.latestPrice.toFixed(2),
            amznChange: res.data.AMZN.quote.change,
            nflx: res.data.NFLX.quote.latestPrice.toFixed(2),
            nflxChange: res.data.NFLX.quote.change,
            twtr: res.data.TWTR.quote.latestPrice.toFixed(2),
            twtrChange: res.data.TWTR.quote.change,
            fb: res.data.FB.quote.latestPrice.toFixed(2),
            fbChange: res.data.FB.quote.change,
            msft: res.data.MSFT.quote.latestPrice.toFixed(2),
            msftChange: res.data.MSFT.quote.change
         })
    };

    const allNasdaq = async (e) => {
        e.preventDefault();
        let res = await axios.get("/api/symbols/nasdaq");
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
        console.log(res);
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

        //Creating smaller data array for charts on smaller screens
        const dateArray2 = dateArray.slice(7, dateArray.length);
        const dataArray2 = dataArray.slice(7, dataArray.length);
        const highArray2 = highArray.slice(7, highArray.length);
        const lowArray2 = lowArray.slice(7, lowArray.length);

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
        let res = await axios.get("/api/symbols/nasdaq/" + search);
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
        });
        
        setShowModal({ buyModal: false, successModal: true });
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

            <div className="item header ">
                
                <Ticker 
                    news={news}
                />
            </div>
            <div className="sb2 sidebar-1">
                <h2 className="trend-h2">Nasdaq Stocks</h2>
                <SearchList 
                    search={search}
                    inputChangeHandler={(e) => inputChangeHandler(e)}
                    stockSearchHandler={(e) => stockSearchHandler(e)}
                    allStocks={(e) => allNasdaq(e)}
                    exchange={'Nasdaq'}
                />
                
                {showTable === true ? 
                    <StockTable 
                    stocks={stocks}
                    stockQueryHandler={(e) => stockQueryHandler(e)}
                /> : null}
                
            </div>
                
            <div className="chart-item chart" id="chart-adjust">
                <a 
                    href="javascript:void(0)"
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
            {renderStockCards &&
            <div className="sb2 sidebar-2">
                <h2 className="trend-h2">Trending Stocks</h2>

                
                <div className="trending-container">
                    <StockCard 
                        src={AMZN}
                        alt="Amazon"
                        value="Amzn"
                        currentPrice={amzn}
                        net={(amznChange * 1).toFixed(2)}
                        priceClass={amznChange >= 0 ? "priceGreen" : "priceRed"}
                        className={amznChange >= 0 ? "fas fa-arrow-up" : "fas fa-arrow-down"}
                        onClick={(e) => trendingStockQuery(e)}
                    />
                    <StockCard 
                        src={AAPL}
                        value="Aapl"
                        alt={aapl}
                        currentPrice={aapl}
                        net={(aaplChange * 1).toFixed(2)}
                        priceClass={aaplChange >= 0 ? "priceGreen" : "priceRed"}
                        className={aaplChange >= 0 ? "fas fa-arrow-up" : "fas fa-arrow-down"}
                        onClick={(e) => trendingStockQuery(e)}
                    />
                    <StockCard 
                        src={TWTR}
                        value="Twtr"
                        alt="Twitter"
                        currentPrice={twtr}
                        net={(twtrChange * 1).toFixed(2)}
                        priceClass={twtrChange >= 0 ? "priceGreen" : "priceRed"}
                        className={twtrChange >= 0 ? "fas fa-arrow-up" : "fas fa-arrow-down"}
                        onClick={(e) => trendingStockQuery(e)}
                    />
                    <StockCard 
                        src={NFLX}
                        value="Nflx"
                        alt="Netflix"
                        currentPrice={nflx}
                        net={(nflxChange * 1).toFixed(2)}
                        priceClass={nflxChange >= 0 ? "priceGreen" : "priceRed"}
                        className={nflxChange >= 0 ? "fas fa-arrow-up" : "fas fa-arrow-down"}
                        onClick={(e) => trendingStockQuery(e)}
                    />
                    <StockCard 
                        src={FB}
                        value="Fb"
                        alt="Facebook"
                        currentPrice={fb}
                        net={(fbChange * 1).toFixed(2)}
                        priceClass={fbChange >= 0 ? "priceGreen" : "priceRed"}
                        className={fbChange >= 0 ? "fas fa-arrow-up" : "fas fa-arrow-down"}
                        onClick={(e) => trendingStockQuery(e)}
                    />
                    <StockCard 
                        src={MSFT}
                        value="Msft"
                        alt="Microsoft"
                        currentPrice={msft}
                        net={(msftChange * 1).toFixed(2)}
                        priceClass={msftChange >= 0 ? "priceGreen" : "priceRed"}
                        className={msftChange >= 0 ? "fas fa-arrow-up" : "fas fa-arrow-down"}
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
            {/* <div className="item footer" id="none">footer</div> */}
        </div>
    )
};

export default Nasdaq;
