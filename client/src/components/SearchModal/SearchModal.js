import React from "react";
import "./SearchModal.css";

const SearchModal = (props) => (
    <div className="modal-wrapper">
        <div className="success-modal">
        <h1 className="sm-h1">0 Results Found</h1>
        <p className="sm-p">Please Check Spelling or Switch Markets</p>
        {/* <button onClick={props.cancelOrderHandler}>Close</button> */}
        <div className="button_cont" align="center">
            <a 
                className="example_c" 
                href="javascript:void(0)" 
                rel="nofollow noopener"
                onClick={props.cancelOrderHandler}>
                    Close
            </a>
        </div>
    </div>
    </div>
    
);

export default SearchModal;