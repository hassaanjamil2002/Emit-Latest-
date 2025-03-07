import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const StackedBarChart = () => {
  const data = {
    labels: ['Agent 1', 'Agent 2', 'Agent 3', 'Agent 4'],
    datasets: [
      {
        label: 'Info Logs',
        data: [10, 15, 20, 5],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'Warning Logs',
        data: [8, 12, 18, 6],
        backgroundColor: 'rgba(255, 206, 86, 0.6)',
      },
      {
        label: 'Error Logs',
        data: [5, 10, 15, 4],
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: true },
    },
    scales: {
      x: { stacked: true },
      y: { stacked: true },
    },
  };

  return <Bar data={data} options={options} />;
};

export default StackedBarChart;
