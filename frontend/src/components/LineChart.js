import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChart = () => {
  const data = {
    labels: ['12:00', '12:05', '12:10', '12:15', '12:20', '12:25', '12:30'],
    datasets: [
      {
        label: 'Alerts Over Time',
        data: [5, 9, 4, 7, 10, 6, 8],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: true },
    },
  };

  return <Line data={data} options={options} />;
};

export default LineChart;
