import React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

// Define the columns for the alerts table
const columns = [
  { field: 'alert_id', headerName: 'Alert ID', width: 150 },
  { field: 'alert_type', headerName: 'Alert Type', width: 200 },
  { field: 'alert_description', headerName: 'Description', width: 300 },
  { field: 'machine_ip', headerName: 'Machine IP', width: 150 },
  { field: 'timestamp', headerName: 'Timestamp', width: 200 },
];

// Sample rows for demonstration
const rows = [
  {
    id: 1,
    alert_id: 'A123',
    alert_type: 'Security Breach',
    alert_description: 'Unauthorized access detected',
    machine_ip: '192.168.1.10',
    timestamp: '2024-12-06 14:30:00',
  },
  {
    id: 2,
    alert_id: 'A124',
    alert_type: 'System Update',
    alert_description: 'Scheduled system update in progress',
    machine_ip: '192.168.1.20',
    timestamp: '2024-12-06 15:00:00',
  },
  {
    id: 3,
    alert_id: 'A125',
    alert_type: 'Malware Detected',
    alert_description: 'Potential malware activity found',
    machine_ip: '192.168.1.30',
    timestamp: '2024-12-06 15:15:00',
  },
  {
    id: 4,
    alert_id: 'A126',
    alert_type: 'Login Attempt',
    alert_description: 'Multiple failed login attempts',
    machine_ip: '192.168.1.40',
    timestamp: '2024-12-06 15:45:00',
  },
  {
    id: 5,
    alert_id: 'A127',
    alert_type: 'Disk Usage',
    alert_description: 'Disk usage exceeded 80%',
    machine_ip: '192.168.1.50',
    timestamp: '2024-12-06 16:00:00',
  },
];

// Component to render the alerts table
export default function AlertsTable() {
  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}
