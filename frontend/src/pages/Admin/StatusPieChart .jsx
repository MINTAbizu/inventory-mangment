import React, { useContext } from 'react';
import ChartComponent from './ChartComponent';
import { StatusContext } from '../../context/StatusContext';

const StatusPieChart = () => {
    const { statusData } = useContext(StatusContext);

    const totalItems = Object.values(statusData).reduce((sum, val) => sum + val, 0);

    const data = {
        labels: Object.keys(statusData),
        datasets: [
            {
                label: 'Item Status',
                data: Object.values(statusData),
                backgroundColor: [
                    '#4dabf7',
                    '#ff6384',
                    '#ffc658',
                    '#36a2eb',
                    '#9966ff',
                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: (tooltipItem) => {
                        const value = tooltipItem.raw;
                        const percentage = ((value / totalItems) * 100).toFixed(2);
                        return `${tooltipItem.label}: ${value} (${percentage}%)`;
                    },
                },
            },
            datalabels: {
                color: '#fff',
                font: { weight: 'bold' },
                formatter: (value) => ((value / totalItems) * 100).toFixed(2) + '%',
            },
        },
    };

    return (
        <div style={{ height: '400px', marginBottom: '2rem' }}>
            <h3>Status Overview</h3>
            {data.labels.length > 0 ? (
                <ChartComponent type="pie" data={data} options={options} />
            ) : (
                <p>No data available</p>
            )}
        </div>
    );
};

export default StatusPieChart;
