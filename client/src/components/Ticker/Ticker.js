import React from 'react';
import './Ticker.css';

const Ticker = (props) => {
    return (
        <div className="ticker-wrap">
            <div className="ticker">
                {props.news.map(news => (
                    <div className="ticker__item" key={news.datetime}>
                        <a href={news.url} target="_blank" rel="noopener noreferrer"><h5>{news.headline}</h5></a>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Ticker;
