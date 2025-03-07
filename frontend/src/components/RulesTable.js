import React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { IconButton } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

// Define columns for the rules table
const columns = (handleDelete) => [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'name', headerName: 'Rule Name', width: 200 },
  { field: 'description', headerName: 'Description', width: 300 },
  { field: 'conditions', headerName: 'Conditions', width: 300 },
  {
    field: 'actions',
    headerName: 'Actions',
    width: 150,
    renderCell: (params) => (
      <>
        <IconButton color="primary">
          <Edit />
        </IconButton>
        <IconButton color="error" onClick={() => handleDelete(params.row.id)}>
          <Delete />
        </IconButton>
      </>
    ),
  },
];

export default function RulesTable({ rules, setRules }) {
  const handleDelete = (id) => {
    setRules(rules.filter((rule) => rule.id !== id));
  };

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rules}
        columns={columns(handleDelete)}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}
