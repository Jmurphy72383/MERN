import React from 'react';
import './Summary.css';

const Summary = (props) => {

    const profit = props.bestAmt;
    const loss = props.worstAmt;
    return (
        <div className="summ-container">
            <div className="summ-div title">
                <h2 className="summ-h2">Portfolio Summary</h2>
            </div>
            
            <div className="summ-item total">
                <h3 className="sh3">Total Money Invested</h3>
                <p>${props.total}</p>
            </div>
            <div className="summ-item totalNet">
                <h3 className="sh3">Total Net Gain/Loss</h3>
                <p className={props.net > 0 ? 'green' : 'crimson'}>${props.net}</p>
            </div>
            <div className="summ-item best">
                <h3 className="sh3">Best Performing Stock</h3>
                <p>{props.best}</p>
                {/* <p className={props.bestAmt > 0 ? 'green' : 'red'}>{props.bestAmt}</p> */}
                {profit >= 0 && 
                    <p className={'green'}>Profit of ${profit}</p>
                }
                {profit < 0 && 
                    <p className={'crimson'}>Loss of ${profit}</p>
                }
            </div>
            <div className="summ-item worst">
                <h3 className="sh3">Worst Performing Stock</h3>
                <p>{props.worst}</p>
                {/* <p className={props.worstAmt > 0 ? 'green' : 'red'}>{props.worstAmt}</p> */}
                {loss >= 0 && 
                    <p className={'green'}>Profit of ${loss}</p>
                }
                {loss < 0 && 
                    <p className={'crimson'}>Loss of ${loss}</p>
                }
            </div>
            {/* <div className="summ-item lifetime">
                <h3 className="sh3">Sold Stock Lifetime Earnings</h3>
                {lifetime >= 0 && 
                    <p className={'green'}>${lifetime}</p>
                }
                {lifetime < 0 && 
                    <p className={'red'}>${lifetime}</p>
                }
            </div> */}
        </div>
        
    )
}

export default Summary;

