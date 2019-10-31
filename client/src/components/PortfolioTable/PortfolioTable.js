import React from 'react';
import './PortfolioTable.css';

const PortfolioTable = (props) => {
    
    return (
        <div className="port-table-div">
            <table className="port-table">
                <thead>
                    <tr>
                        <th>Symbol</th>
                        <th className="remove">Company Name</th>
                        <th className="remove">Market</th>
                        <th>Shares</th>
                        <th className="remove">Buy Date</th>
                        <th>Buy Price</th>
                        <th>Current Price</th>
                        <th>Total Invested</th>
                        <th>Net Gain/Loss</th>
                        <th>Update</th>
                        <th>Sell</th>
                    </tr>
                </thead>
                <tbody>
                    {props.owns.map(owns => {
                        const net = ((owns.currentPrice - owns.buyPrice) * owns.shares).toFixed(2);
                        const saleTotal = (owns.currentPrice * owns.shares).toFixed(2);
                        return(
                        <tr className="port-rows" key={owns._id}>
                            <td>{owns.symbol}</td>
                            <td className="remove">{owns.companyName}</td>
                            <td className="td-center remove">{owns.market === "New York Stock Exchange" ? 'NYSE' : 'NASDAQ'}</td>
                            <td className="td-center">{owns.shares}</td>
                            <td className="td-center remove">{owns.buyDate.slice(0,10)}</td>
                            <td className="td-center">{owns.buyPrice}</td>
                            <td className="td-center">{(owns.currentPrice * 1).toFixed(2)}</td>
                            <td className="td-center">{(owns.buyPrice * owns.shares).toFixed(2)}</td>
                            <td className={net >= 0 ? "net-pos" : "net-neg"}>{net}</td>
                            <td className="td-center">
                                <button 
                                    onClick={props.updatePriceHandler} 
                                    value={owns._id} name={owns.symbol}
                                    className="port-btn">
                                        Update
                                </button>
                            </td>
                            <td className="td-center">
                                <button 
                                    onClick={props.showSellModalHandler} 
                                    value={owns._id}
                                    name={owns.companyName}
                                    data-sale={(owns.currentPrice * owns.shares).toFixed(2)}
                                    data-net={((owns.currentPrice - owns.buyPrice) * owns.shares).toFixed(2)}
                                    className="port-btn">
                                        Sell
                                </button>
                            </td>
                        </tr>)
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default PortfolioTable;
