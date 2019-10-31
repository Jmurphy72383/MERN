import React from "react";
import "./SellModal.css";

const SellModal = props => (
    <div className="modal-wrapper">
        <div className="modal">
            <h1 className="modal-h1">Confirm Sale</h1>
            <h3 className="modal-h3">Sell all shares of {props.company} for ${props.total}?</h3>
            {props.net >= 0 &&
                <h3 className="modal-h3">A profit of ${props.net}</h3>
            }

            {props.net < 0 &&
                <h3 className="modal-h3">A loss of ${props.net}</h3>
            }

            <div className="button_cont" align="center">
                <a 
                    className="example_c" 
                    value={props._id}
                    href="javascript:void(0)" 
                    rel="nofollow noopener"
                    onClick={props.sellStockHandler}>
                        Sell
                </a>
                
                <a 
                    className="example_d" 
                    href="javascript:void(0)" 
                    rel="nofollow noopener"
                    onClick={props.cancelOrderHandler}>
                        Cancel
                </a>
            </div>

        </div>
    </div>
    
);

export default SellModal;