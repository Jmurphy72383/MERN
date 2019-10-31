import React from "react";
import "./SuccessModal.css";

const SuccessModal = (props) => (
    <div className="modal-wrapper">
        <div className="success-modal">
        <h1 className="sm-h1">Transaction Successful!</h1>
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

export default SuccessModal;