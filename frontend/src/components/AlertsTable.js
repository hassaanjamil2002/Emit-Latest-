import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';

// Define the columns for the alerts table
const columns = [
  { field: 'alert_id', headerName: 'Rule ID', width: 150 },
  //{// field: 'alert_type', headerName: 'Alert Type', width: 200 },
  { field: 'alert_description', headerName: 'Description', width: 300 },
  { field: 'machine_ip', headerName: 'Machine IP', width: 150 },
  { field: 'timestamp', headerName: 'Timestamp', width: 200 },
];

export default function AlertsTable() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/enforce-rules')
      .then(response => {
        console.log("Fetched alerts:", response.data);
        
        const formattedRows = response.data.map((alert, index) => ({
          id: index + 1,
          alert_id: alert.rule.id,
          //alert_type: alert.rule.name,
          alert_description: alert.rule.description,
          machine_ip: alert.log.agent?.ip || "Unknown",
          timestamp: alert.log.timestamp
        }));

        setRows(formattedRows);
      })
      .catch(error => console.error('Error fetching enforced alerts:', error));
  }, []);

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
