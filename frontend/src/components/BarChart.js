import * as React from 'react';
import { useEffect, useState } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import axios from 'axios';

export default function LogsBarChart() {
  const [agentData, setAgentData] = useState([]);
  const [agentLabels, setAgentLabels] = useState([]);
  const colors = ['#1E90FF', '#FF69B4', '#32CD32', '#FFA500', '#8A2BE2', '#FF6347', '#20B2AA', '#FFD700'];

  useEffect(() => {
    const fetchAgentData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/logs');
        
        if (typeof response.data !== 'string') {
          console.error('Response data is not a string. Please check your backend.');
          return;
        }
        
        const logsArray = response.data.trim().split('\n').filter(line => line.trim() !== "");
        
        const parsedLogs = logsArray.map(line => {
          try {
            return JSON.parse(line);
          } catch (error) {
            console.error('Error parsing log line:', line, error);
            return null;
          }
        }).filter(log => log !== null);

        console.log('Parsed Logs for Graph:', parsedLogs);

        // Count logs for each agent
        const agentCounts = {};
        
        parsedLogs.forEach(log => {
          const agentName = log.agent?.name || 'Unknown Agent';
          agentCounts[agentName] = (agentCounts[agentName] || 0) + 1;
        });

        console.log('Agent Logs Counts:', agentCounts);

        // Prepare data for the bar chart
        setAgentLabels(Object.keys(agentCounts));
        setAgentData(Object.values(agentCounts));

      } catch (error) {
        console.error('Error fetching agent data for bar chart:', error.message);
      }
    };

    fetchAgentData();
  }, []);

  return (
<BarChart
  series={agentLabels.map((label, index) => ({
    label: label,
    data: agentData.map((value, i) => (i === index ? value : 0)),
    color: colors[index % colors.length],
  }))}
  height={300}
  xAxis={[
    {
      data: agentLabels,
      scaleType: 'band',
    },
  ]}
  barWidth={30}  // Adjust this value to make the bars wider
  margin={{ top: 10, bottom: 80, left: 50, right: 10 }}
/>

  );
}
