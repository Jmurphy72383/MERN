import React from "react";
import "./StockTable.css";

const StockTable = props => (
    <div className="table-div">
        <table className="stock-list">
            <thead className="stock-thead">
                <tr>
                    <th>Symbol</th>
                    <th className="cname">Company</th>
                </tr>
            </thead>
            <tbody className="stock-tbody">
                {props.stocks.map(stocks => (
                    <tr key={stocks._id}>
                        <button className="table-btn" onClick={props.stockQueryHandler} value={stocks.Symbol}>{stocks.Symbol}</button>
                        <td className="cname">{stocks.CompanyName}</td>
                    </tr>
                ))}
            </tbody>
        </table>

    </div>
    
);

export default StockTable;