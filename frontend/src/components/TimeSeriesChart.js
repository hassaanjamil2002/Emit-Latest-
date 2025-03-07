import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

// Sample alert data (Replace this with real data from your state or props)
const alertData = [
  { time: '10:00', alerts: 2 },
  { time: '10:30', alerts: 5 },
  { time: '11:00', alerts: 8 },
  { time: '11:30', alerts: 3 },
  { time: '12:00', alerts: 6 },
  { time: '12:30', alerts: 9 },
  { time: '13:00', alerts: 4 },
  { time: '13:30', alerts: 7 },
  { time: '14:00', alerts: 10 },
];

const TimeSeriesChart = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={alertData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="alerts" stroke="#8884d8" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default TimeSeriesChart;
