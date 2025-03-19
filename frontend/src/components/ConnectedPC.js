import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';

// Define the columns for the Connected PC table
const columns = [
  { field: 'pc_id', headerName: 'PC ID', width: 150 },
  { field: 'machine_name', headerName: 'Machine Name', width: 200 },
  { field: 'machine_ip', headerName: 'Machine IP', width: 150 },
  { field: 'status', headerName: 'Status', width: 150 },
  { field: 'suspicion_level', headerName: 'Suspicion Level (%)', width: 200 },
];

// Fetch Agents function
const fetchAgents = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/agents');
    if (response.data?.data?.affected_items) {
      console.log(response.data.data.affected_items);
      return response.data.data.affected_items;
    } else {
      console.error('Unexpected response format from agents API:', response.data);
      return [];
    }
  } catch (error) {
    console.error('Error fetching agents:', error);
    return [];
  }
};

// Fetch Suspicion Levels function
// Fetch Suspicion Levels function
const fetchSuspicionLevels = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/suspicion-levels');
    if (response.data && typeof response.data === 'object') {
      return response.data;  // Returns the object containing agent names as keys
    } else {
      console.warn('Received unexpected format for suspicion levels:', response.data);
      return {};
    }
  } catch (error) {
    console.error('Error fetching suspicion levels:', error);
    return {};
  }
};

export default function ConnectedPC() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);

      // Fetch agents and suspicion levels simultaneously
      const [agents, suspicionLevels] = await Promise.all([fetchAgents(), fetchSuspicionLevels()]);

      const connectedPCs = agents.map(agent => {
        const suspicionInfo = suspicionLevels[agent.name] || { level: 0, hitCount: 0 };
        return {
          id: agent.id,
          pc_id: agent.id,
          machine_name: agent.name,
          machine_ip: agent.ip,
          status: agent.status,
          suspicion_level: suspicionInfo.level || 0,  // Safely extract the level value
        };
      });

      setRows(connectedPCs);
    } catch (error) {
      console.error('Error fetching data for Connected PCs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      )}
    </Box>
  );
}
