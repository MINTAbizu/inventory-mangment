// SalesGraph.js
import React from 'react';
import { Bar } from 'react-chartjs-2';

const SalesGraph = ({ salesData }) => {
    const data = {
        labels: salesData.map(item => item.name),
        datasets: [
            {
                label: 'Sales',
                data: salesData.map(item => item.sales),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
        ],
    };

    return (
        <div>
            <h2>Sales Overview</h2>
            <Bar data={data} />
        </div>
    );
};

export default SalesGraph;