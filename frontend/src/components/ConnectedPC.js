import React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

// Define the columns for the Connected PC table
const columns = [
  { field: 'pc_id', headerName: 'PC ID', width: 150 },
  { field: 'machine_name', headerName: 'Machine Name', width: 200 },
  { field: 'machine_ip', headerName: 'Machine IP', width: 150 },
];

// Sample rows for demonstration
const rows = [
  {
    id: 1,
    pc_id: 'PC001',
    machine_name: 'Workstation-1',
    machine_ip: '192.168.1.101',
  },
  {
    id: 2,
    pc_id: 'PC002',
    machine_name: 'Workstation-2',
    machine_ip: '192.168.1.102',
  },
  {
    id: 3,
    pc_id: 'PC003',
    machine_name: 'Workstation-3',
    machine_ip: '192.168.1.103',
  },
  {
    id: 4,
    pc_id: 'PC004',
    machine_name: 'Workstation-4',
    machine_ip: '192.168.1.104',
  },
  {
    id: 5,
    pc_id: 'PC005',
    machine_name: 'Workstation-5',
    machine_ip: '192.168.1.105',
  },
];

// Component to render the Connected PC table
export default function ConnectedPC() {
  return (
    <Box sx={{ height: 300, width: '100%' }}>
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
