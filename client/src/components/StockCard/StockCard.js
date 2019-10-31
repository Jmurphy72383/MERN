import React from 'react';
import './StockCard.css';

const StockCard = (props) => {
    return (

        <div className="stock-card">
            <div className="logo-div">
                <img  className="card-img" src={props.src} alt={props.alt} />
            </div>   
            <div className="price-div">
                <h4>
                    ${props.currentPrice}
                </h4>
                <h4 className={props.priceClass}>
                    ${props.net}
                    <span>
                        <i className={props.className}></i>
                    </span>
                </h4>
            </div>
            <div className="btn-div">
                
                <button 
                    className="chart-btn"
                    title="View Chart"
                    onClick={props.onClick}
                    value={props.value}  
                >
                    <i className="far fa-chart-bar fa-3x iconChart"/>
                </button>
            </div>
        </div>
    )
}

export default StockCard;