// components/charts/ChartComponent.jsx
import React from 'react';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Pie, Bar, Line, Doughnut } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(
    ArcElement,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ChartDataLabels
);

const ChartComponent = ({ type = 'pie', data, options }) => {
    const chartProps = {
        data,
        options,
    };

    switch (type.toLowerCase()) {
        case 'bar':
            return <Bar {...chartProps} />;
        case 'line':
            return <Line {...chartProps} />;
        case 'doughnut':
            return <Doughnut {...chartProps} />;
        default:
            return <Pie {...chartProps} />;
    }
};

export default ChartComponent;
