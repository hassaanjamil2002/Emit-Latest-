import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

export default function LogsBarChart() {
  return (
    <BarChart
      series={[
        {
          label: 'Logs Received',
          data: [120, 95, 130, 110, 80, 140, 105, 90], // Replace with actual log counts per agent
          
        },
      ]}
      height={300}
      xAxis={[
        {
          data: [
            'Agent-1',
            'Agent-2',
            'Agent-3',
            'Agent-4',
            'Agent-5',
            'Agent-6',
            'Agent-7',
            'Agent-8',
          ],
          scaleType: 'band',
        },
      ]}
      margin={{ top: 10, bottom: 80, left: 50, right: 10 }} // Adjust margins for better spacing
    />
  );
}
