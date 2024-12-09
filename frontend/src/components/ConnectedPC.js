import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';

// Define the columns for the Connected PC table
const columns = [
  { field: 'pc_id', headerName: 'PC ID', width: 150 },
  { field: 'machine_name', headerName: 'Machine Name', width: 200 },
  { field: 'machine_ip', headerName: 'Machine IP', width: 150 },
  { field: 'status', headerName: 'Status', width: 150 }, // Added Status Column
];

// Fetch Agents function
const fetchAgents = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/agents', {
      headers: {
        'Authorization': 'Bearer your-api-key',  // Replace with your actual API key
        'Content-Type': 'application/json',
      },
    });

    // Returning the affected_items array from the response
    return response.data.data.affected_items;  // Assuming response contains affected_items array
  } catch (error) {
    console.error('Error fetching agents:', error);
    return [];  // Return empty array in case of error
  }
};

export default function ConnectedPC() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConnectedPCs = async () => {
      try {
        // Fetch agents from the backend API
        const agents = await fetchAgents();

        // Map the agents data to match the required format for DataGrid
        const connectedPCs = agents.map(agent => ({
          id: agent.id, // Unique ID for each row
          pc_id: agent.id, // ID of the PC
          machine_name: agent.name, // Machine name
          machine_ip: agent.ip, // Machine IP
          status: agent.status, // Status of the agent
        }));

        setRows(connectedPCs);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching connected PCs:', error);
        setLoading(false);
      }
    };

    fetchConnectedPCs();
  }, []);

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
        loading={loading} // Show loading spinner while fetching data
      />
    </Box>
  );
}
