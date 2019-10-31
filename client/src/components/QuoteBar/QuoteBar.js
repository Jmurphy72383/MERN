import React from 'react';
import './QuoteBar.css';

const QuoteBar = (props) => {
    return (
        <div className="quote-container">
            <div>
                <div className="quote-div">
                    <h3>Exchange: {props.exchange}</h3>
                    <h3>Symbol: {props.symbol}</h3>
                    <h3>As of: {props.time}</h3>
                </div>
                <div className="quote-div">
                    <h3>Latest Price: ${props.latestPrice}</h3>
                    <h3>Opening Price: ${props.close}</h3>
                    <h3>Change: ${props.change}</h3>
                </div>
                <div className="quote-div">
                    <h3>Yearly High: ${props.high}</h3>
                    <h3>Yearly Low: ${props.low}</h3>
                    <h3>Average Volume: {props.volume}</h3>
                </div>
                
                
            </div>
            
        </div>
    )
}

export default QuoteBar;
