import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import StockCard from './StockCard';
import NFLX from '../../img/Netflix.png';
import UBER from '../../img/Uber.png';
import AMZN from '../../img/Amazon.png';
import TWTR from '../../img/Twitter1.png';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  paperSub: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: 'white',
    border: 'none',
    backgroundColor: 'rgba(255,255,255,.1)'
  },
  paperTop: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: '540px',
    
  },
}));

const greenStyle = {
    color: 'green'
};

const redStyle = {
    color: 'red'
};


const Landing = () => {
    const [trendingPrices, setTrendingPrices] = useState({
        uber: '',
        uberOpen: '',
        amzn: '',
        amznOpen: '',
        nflx: '',
        nflxOpen: '',
        twtr: '',
        twtrOpen: '',
        redirect: false
    });

    const { 
        uber,
        uberOpen,
        amzn,
        amznOpen,
        nflx,
        nflxOpen,
        twtr,
        twtrOpen,
        redirect
    } = trendingPrices;

    useEffect(() => {
        getTrending();
        
    },[]);

    const getTrending = async () => {
        let res = await axios.get('/api/data/');
    
        await setTrendingPrices({ 
            uber: res.data.UBER.quote.latestPrice.toFixed(2),
            uberOpen: res.data.UBER.quote.open,
            amzn: res.data.AMZN.quote.latestPrice.toFixed(2),
            amznOpen: res.data.AMZN.quote.open,
            nflx: res.data.NFLX.quote.latestPrice.toFixed(2),
            nflxOpen: res.data.NFLX.quote.open,
            twtr: res.data.TWTR.quote.latestPrice.toFixed(2),
            twtrOpen: res.data.TWTR.quote.open
         })
    };

    const classes = useStyles();

    const bodyStyle = {
        width: '99vw',
        textAlign: 'center'
    };

    const getFullReportHandler = async (e) => {
        let params = [e.target.name];
        redirectPage(params);
        let res = await axios.get(`/api/data/${params}`);
        console.log(res);
    }

    const redirectPage = (params) => {
        setTrendingPrices({ ...trendingPrices, redirect: true });
        console.log(params);
    }

    if(redirect === true) {
        return (
            <Redirect to="/dashboard"/>
        )
    } else {
        return (
            <div className={classes.root} style={bodyStyle}>
                <Grid container spacing={3} justify='center'>
                    
                    <Grid item xs={5}>
                        <Paper className={classes.paperTop} elevation={24}>xs=5</Paper>
                    </Grid>
                    
                    <Grid item xs={11}>
                        <Paper className={classes.paperSub} elevation={0} component='h1'>Trending Companies</Paper>
                    </Grid>
    
                    {/* {Landing.defaultProps.stocks.map(stock => (
                        <Grid item xs={2}>
                        <Paper elevation={24}>
                            <StockCard 
                                // company='UBER'
                                src={stock.toUpperCase()}
                                price={stock}
                                style={stock >= uberOpen ? greenStyle : redStyle}
                                rotate={stock >= uberOpen ? 0 : 180}
                                arrowColor={stock >= uberOpen ? 'green' : 'red'}
                            />
                        </Paper>
                    </Grid>
                    ))} */}
                    
                    <Grid item xs={2}>
                        <Paper elevation={24}>
                            <StockCard 
                                company='UBER'
                                name='uber'
                                src={UBER}
                                price={uber}
                                style={uber >= uberOpen ? greenStyle : redStyle}
                                rotate={uber >= uberOpen ? 0 : 180}
                                arrowColor={uber >= uberOpen ? 'green' : 'red'}
                                onClick={(e) => getFullReportHandler(e)}
                            />
                        </Paper>
                    </Grid>
                    <Grid item xs={2}>
                        <Paper elevation={24}>
                            <StockCard 
                                company='AMZN'
                                name='amzn'
                                src={AMZN}
                                price={amzn}
                                style={amzn >= amznOpen ? greenStyle : redStyle}
                                rotate={amzn >= amznOpen ? 0 : 180}
                                arrowColor={amzn >= amznOpen ? 'green' : 'red'}
                                onClick={(e) => getFullReportHandler(e)}
                            />
                        </Paper>
                    </Grid>
                    
                    <Grid item xs={2}>
                        <Paper elevation={24}>
                            <StockCard 
                                company='NFLX'
                                name='nflx'
                                src={NFLX}
                                price={nflx}
                                style={nflx >= nflxOpen ? greenStyle : redStyle}
                                rotate={nflx >= nflxOpen ? 0 : 180}
                                arrowColor={nflx >= nflxOpen ? 'green' : 'red'}
                                onClick={(e) => getFullReportHandler(e)}
                            />
                        </Paper>
                    </Grid>
    
                    <Grid item xs={2}>
                        <Paper elevation={24}>
                            <StockCard 
                                company='TWTR'
                                name='twtr'
                                src={TWTR}
                                price={twtr}
                                style={twtr >= twtrOpen ? greenStyle : redStyle}
                                rotate={twtr >= twtrOpen ? 0 : 180}
                                arrowColor={twtr >= twtrOpen ? 'green' : 'red'}
                                onClick={(e) => getFullReportHandler(e)}
                            />
                        </Paper>
                    </Grid>
                    
    
    
                </Grid>
        </div>
        )
    }

    
    
    
}



export default Landing;
