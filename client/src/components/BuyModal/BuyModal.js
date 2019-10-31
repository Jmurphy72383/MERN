import React from "react";
import "./BuyModal.css";

const BuyModal = props => (
    <div className="modal-wrapper">
        <div className="modal">
            <h1 className="modal-h1">Confirm Order</h1>
            <h3 className="modal-h3">Buy <input 
                        type="number"
                        name="shares"
                        min="1"
                        max="100"
                        placeholder="Shares"
                        value={props.shares}
                        onChange={props.sharesInputHandler}
                    /> 
                &nbsp;shares of {props.company} for ${props.total}?</h3>
            {/* <button className="modal-btn" onClick={props.buyStockHandler}>BUY!</button>
            <button onClick={props.cancelOrderHandler}>Cancel</button> */}
            <div className="button_cont" align="center">
                <a 
                    className="example_c" 
                    href="javascript:void(0)" 
                    rel="nofollow noopener"
                    onClick={props.buyStockHandler}>
                        Buy Now!
                </a>
                
                <a 
                    className="example_d" 
                    href="javascript:void(0)" 
                    rel="nofollow noopener"
                    onClick={props.cancelOrderHandler}>
                        Cancel Order
                </a>
            </div>

        </div>
    </div>
    
);

export default BuyModal;