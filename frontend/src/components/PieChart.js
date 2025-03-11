import React, { useState, useEffect } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import axios from 'axios';

export default function BasicPie() {
  const [agentData, setAgentData] = useState([]);

  const fetchLogs = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/logs');
      console.log('Raw Response Data:', response.data);

      if (typeof response.data !== 'string') {
        console.error('Response data is not a string. Please check your backend.');
        return;
      }

      // Split the logs by newline and parse each log line
      const logsArray = response.data.trim().split('\n').filter(line => line.trim() !== "");
      const parsedLogs = logsArray.map(line => {
        try {
          return JSON.parse(line);
        } catch (error) {
          console.error('Error parsing log line:', line, error);
          return null;
        }
      }).filter(log => log !== null);

      console.log('Parsed Logs:', parsedLogs);

      // Count logs by each agent
      const agentCountMap = {};
      parsedLogs.forEach(log => {
        const agentName = log.agent?.name || 'Unknown Agent';
        if (!agentCountMap[agentName]) {
          agentCountMap[agentName] = 0;
        }
        agentCountMap[agentName] += 1;
      });

      console.log('Agent Count Map:', agentCountMap);

      // Convert the agent data to a format compatible with PieChart
      const pieChartData = Object.keys(agentCountMap).map((agent, index) => ({
        id: index,
        value: agentCountMap[agent],
        label: agent,
      }));

      setAgentData(pieChartData);

    } catch (error) {
      console.error('Error fetching logs data:', error.message);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <PieChart
      series={[{ data: agentData }]}
      width={400}
      height={200}
    />
  );
}
