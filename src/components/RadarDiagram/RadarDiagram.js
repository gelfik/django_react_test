import React from "react";
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
} from 'chart.js';
import {Radar} from 'react-chartjs-2';

ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
);

const getDataDiagram = (data) => {
    return {
        labels: ['ABC', 'CHL', 'POL'],
        max: 100,
        min: 0,
        datasets: [
            {
                label: 'Результат',
                data: [data?.abc, data?.pol, data?.chl],
                backgroundColor: 'rgba(225, 255, 189, 0.2)',
                borderColor: 'rgba(128, 255, 0, 1)',
                borderWidth: 1,
            },
            {
                label: `Порог`,
                data: [60, 60, 60],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
            },
        ],
    }
}

const RadarDiagram = ({data}) => {
    return <Radar data={getDataDiagram(data)} width='300px'
                  height='200px' options={{
        aspectRatio: false,
        responsive: false,
        scale: {
            display: false,
            ticks: {
                display: true,
                beginAtZero: true,
                max: 100,
                min: 0,
                stepSize: 100,
                showLabelBackdrop: false,
            },
        },
        plugins: {
            legend: {
                display: true,
                position: 'left'
            }
        }
    }}/>
}

export default RadarDiagram;
