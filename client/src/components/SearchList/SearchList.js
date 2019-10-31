import React from 'react';
import './SearchList.css';

const SearchList = props => (
    <div className="list-div">
        <input
            onChange={props.inputChangeHandler}
            value={props.search}
            name="search"
            type="text"
            placeholder="Search for company..."
            id="search"
            className="search-input"
        />
        <a href="javascript:void(0)" className="button1 btnfnt" id="sbtn" onClick={props.stockSearchHandler}>Search</a>
        
        <a href="javascript:void(0)" className="allBtn button1 btnfnt" onClick={props.allStocks}>Browse All {props.exchange} Stocks</a>
    </div>
    
);

export default SearchList;