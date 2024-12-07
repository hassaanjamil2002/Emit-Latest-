import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import NotificationImportantIcon from '@mui/icons-material/NotificationImportant';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import LayersIcon from '@mui/icons-material/Layers';

import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { DataGridPro } from '@mui/x-data-grid-pro';

// Columns and rows for the Logs table
const logColumns = [
  { field: 'logId', headerName: 'Log ID', width: 90 },
  { field: 'logDetail', headerName: 'Log Details', width: 600 },
  { field: 'timestamp', headerName: 'Timestamp', width: 200 },
];

const logRows = [
  { id: 1, logDetail: 'User login detected from IP 192.168.1.1', timestamp: '2024-12-07 08:30' },
  { id: 2, logDetail: 'Failed login attempt on Admin account', timestamp: '2024-12-06 23:15' },
  { id: 3, logDetail: 'Data upload started by user User123', timestamp: '2024-12-06 16:45' },
  { id: 4, logDetail: 'File download completed: secure_document.pdf', timestamp: '2024-12-06 10:00' },
  { id: 5, logDetail: 'Password change request initiated by user User456', timestamp: '2024-12-05 21:10' },
  { id: 6, logDetail: 'Email sent to user User789', timestamp: '2024-12-05 14:30' },
  { id: 7, logDetail: 'Malware scan completed on uploaded file', timestamp: '2024-12-05 11:05' },
  { id: 8, logDetail: 'Database query executed by Admin', timestamp: '2024-12-05 09:20' },
  { id: 9, logDetail: 'Session expired for user User123', timestamp: '2024-12-04 19:00' },
  { id: 10, logDetail: 'New user account created: User999', timestamp: '2024-12-04 12:45' },
];
// Navigation structure
const NAVIGATION = [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    segment: 'alerts',
    title: 'Alerts',
    icon: <NotificationImportantIcon />,
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Analytics',
  },
  {
    segment: 'logs',
    title: 'Logs',
    icon: <BarChartIcon />,
   
  },
  {
    segment: 'integrations',
    title: 'Integrations',
    icon: <LayersIcon />,
  },
];

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

// Function to render the Logs Table content
function LogsContent() {
  const [pageSize, setPageSize] = useState(10);

  return (
    <Box
      sx={{
        py: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        width: '100%',
      }}
    >
      <Typography variant="h4" sx={{ mb: 2 }}>
        Logs
      </Typography>
      <Box
        sx={{
          height: '100%',
          width: '90%',
        }}
      >
        <DataGridPro
          columns={logColumns}
          rows={logRows}
          pageSize={pageSize}
          rowHeight={38}
          checkboxSelection
          disableRowSelectionOnClick
          pagination
          pageSizeOptions={[5, 10, 25, 50]}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          sortingOrder={['asc', 'desc']}
        />
      </Box>
    </Box>
  );
}

// Main layout for Logs Page
function LogsPageLayout(props) {
  const { window } = props;

  const [activeSection, setActiveSection] = useState('logs'); // Default to Logs section
  const demoWindow = window !== undefined ? window() : undefined;

  // Function to handle menu item click
  const handleNavigation = (section) => {
    setActiveSection(section); // Change the active section
  };

  // Function to render content based on the active section
  const renderContent = () => {
    switch (activeSection) {
      case 'alerts':
        return <AlertsContent />;
      case 'logs':
        return <LogsContent />;
      default:
        return <LogsContent />;
    }
  };

  return (
    <AppProvider
      navigation={NAVIGATION.map((item) => (item.segment ? { ...item, onClick: () => handleNavigation(item.segment) } : item))}
      theme={demoTheme}
      window={demoWindow}
    >
      <DashboardLayout>{renderContent()}</DashboardLayout>
    </AppProvider>
  );
}

LogsPageLayout.propTypes = {
  window: PropTypes.func,
};

export default LogsPageLayout;
