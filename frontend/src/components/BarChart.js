import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

export default function AlertsBarChart() {
  return (
    <BarChart
      series={[
        {
          label: 'Alert Counts',
          data: [10, 15, 8, 5, 7, 12, 6, 9], // Replace with actual counts for each alert
        },
      ]}
      height={300}
      xAxis={[
        {
          data: [
            'VPN Misuse',
            'Unauthorized Access',
            'Suspicious Login',
            'Suspicious File Upload',
            'Phishing Attempt',
            'Malware Detected',
            'Policy Violation',
            'Insider Threat',
          ],
          scaleType: 'band',
        },
      ]}
      margin={{ top: 10, bottom: 80, left: 50, right: 10 }} // Adjust margins for better spacing
    />
  );
}
