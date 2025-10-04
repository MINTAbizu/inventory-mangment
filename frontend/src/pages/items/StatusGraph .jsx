import React, { useContext } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, CategoryScale } from 'chart.js';
import { StatusContext } from '../../context/StatusContext';
import ChartDataLabels from 'chartjs-plugin-datalabels';
Chart.register(ArcElement, CategoryScale);
Chart.register(ChartDataLabels);

const StatusGraph = () => {
    const { statusData } = useContext(StatusContext);
    console.log('Status Data:', statusData); // Log status data

    const totalItems = Object.values(statusData).reduce((acc, count) => acc + count, 0);

    const data = {
        labels: Object.keys(statusData),
        datasets: [
            {
                label: 'Item Status',
                data: Object.values(statusData),
                backgroundColor: [
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                ],
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: (tooltipItem) => {
                        const label = tooltipItem.label;
                        const value = tooltipItem.raw;
                        const percentage = ((value / totalItems) * 100).toFixed(2);
                        return `${label}: ${value} (${percentage}%)`;
                    },
                },
            },
            datalabels: {
                anchor: 'end',
                align: 'end',
                formatter: (value, context) => {
                    const percentage = ((value / totalItems) * 100).toFixed(2);
                    return `${percentage}%`;
                },
            },
        },
    };

    return (
        <div style={{ height: '400px', position: 'relative' }}>
            <h2>Item Status Overview</h2>
            {data.labels.length > 0 ? (
                <Pie data={data} options={options} />
            ) : (
                <p>No data available to display.</p>
            )}
        </div>
    );
};

export default StatusGraph;