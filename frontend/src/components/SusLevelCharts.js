import React, { useState, useEffect } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import axios from 'axios';

const SuspicionLevelsChart = () => {
  const [agentNames, setAgentNames] = useState([]);
  const [suspicionLevels, setSuspicionLevels] = useState([]);

  useEffect(() => {
    const fetchSuspicionData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/suspicion-levels');
        const suspicionData = response.data;

        if (typeof suspicionData === 'object') {
          const agents = Object.keys(suspicionData);
          const levels = agents.map(agent => suspicionData[agent].level || 0);

          setAgentNames(agents);
          setSuspicionLevels(levels);
        } else {
          console.error('Invalid suspicion data format:', suspicionData);
        }
      } catch (error) {
        console.error('Error fetching suspicion data:', error);
      }
    };

    fetchSuspicionData();
  }, []);

  return (
    <BarChart
      series={[{ label: 'Suspicion Levels', data: suspicionLevels, color: '#FF5733' }]}
      xAxis={[{ data: agentNames, scaleType: 'band' }]}
      height={300}
      margin={{ top: 20, bottom: 80, left: 50, right: 10 }}
    />
  );
};

export default SuspicionLevelsChart;
