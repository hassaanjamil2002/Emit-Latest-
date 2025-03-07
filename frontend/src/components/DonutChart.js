import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const DonutChart = () => {
  const data = {
    labels: ['Info Logs', 'Warning Logs', 'Error Logs'],
    datasets: [
      {
        data: [50, 30, 20],
        backgroundColor: ['#36A2EB', '#FFCE56', '#FF6384'],
        hoverBackgroundColor: ['#36A2EB', '#FFCE56', '#FF6384'],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allows better control over the size
    plugins: {
      legend: { 
        position: 'bottom',
        labels: {
          font: {
            size: 14 // Adjust font size of legend
          }
        }
      },
    },
    cutout: '50%', // Makes the donut hole larger, reducing chart size
  };

  return (
    <div style={{ width: '300px', height: '300px', margin: 'auto' }}>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default DonutChart;
