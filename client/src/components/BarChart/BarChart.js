import React from 'react';
import {Bar} from 'react-chartjs-2';
import './BarChart.css';

const BarChart = (props) => {
    return (
        <div className="bar-chart">
            <Bar 
                data={props.data}
                options={props.options}
            />
        </div>
    )
};

export default BarChart;
