import * as React from 'react';
import { useEffect, useState } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import axios from 'axios';

export default function LogsBarChart() { // This will now display Alerts
  const [alertData, setAlertData] = useState([]);
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    const fetchAlertData = async () => {
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

        const alertCounts = {};
        
        parsedLogs.forEach(log => {
          if (log.rule?.level >= 8) {  // Taking level >= 8 as critical
            const description = log.rule.description;
            alertCounts[description] = (alertCounts[description] || 0) + 1;
          }
        });

        console.log('High-Severity Alert Counts:', alertCounts);

        const alertLabels = Object.keys(alertCounts);
        const alertValues = Object.values(alertCounts);

        setLabels(alertLabels);
        setAlertData(alertValues);

      } catch (error) {
        console.error('Error fetching alert data for bar chart:', error.message);
      }
    };

    fetchAlertData();
  }, []);

  return (
    <BarChart
      series={[
        {
          label: 'Critical Alert Counts',
          data: alertData,
        },
      ]}
      height={400}
      xAxis={[
        {
          data: labels,
          scaleType: 'band',
        },
      ]}
      margin={{ top: 10, bottom: 80, left: 50, right: 10 }}
    />
  );
}
