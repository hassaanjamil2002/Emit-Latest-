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
import logo1 from '../components/logo1.png';
// Sample data for the alerts table
const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'alertName', headerName: 'Alert Name', width: 200 },
  { field: 'status', headerName: 'Status', width: 150 },
  { field: 'timestamp', headerName: 'Timestamp', width: 200 },
  { field: 'severity', headerName: 'Severity', width: 150 },
  { field: 'actionTaken', headerName: 'Action Taken', width: 250 },
];

const rows = [
    { id: 1, alertName: 'Suspicious Login', status: 'Active', timestamp: '2024-12-07 10:45', severity: 'High', actionTaken: 'Alert sent' },
    { id: 2, alertName: 'Data Exfiltration', status: 'Resolved', timestamp: '2024-12-06 14:30', severity: 'Critical', actionTaken: 'Investigation completed' },
    { id: 3, alertName: 'Unauthorized Access', status: 'Active', timestamp: '2024-12-07 09:15', severity: 'Medium', actionTaken: 'Access revoked' },
    { id: 4, alertName: 'Phishing Attempt', status: 'Resolved', timestamp: '2024-12-05 16:00', severity: 'Low', actionTaken: 'User educated' },
    { id: 5, alertName: 'Malware Detected', status: 'Active', timestamp: '2024-12-06 11:20', severity: 'Critical', actionTaken: 'Quarantine initiated' },
    { id: 6, alertName: 'Brute Force Attack', status: 'Resolved', timestamp: '2024-12-04 23:45', severity: 'High', actionTaken: 'IP blocked' },
    { id: 7, alertName: 'Suspicious Email', status: 'Active', timestamp: '2024-12-06 13:50', severity: 'Medium', actionTaken: 'Alert sent' },
    { id: 8, alertName: 'Data Breach', status: 'Resolved', timestamp: '2024-12-03 10:00', severity: 'Critical', actionTaken: 'Incident reported' },
    { id: 9, alertName: 'Insider Threat', status: 'Active', timestamp: '2024-12-07 07:30', severity: 'High', actionTaken: 'Access restricted' },
    { id: 10, alertName: 'DDoS Attack', status: 'Resolved', timestamp: '2024-12-02 20:15', severity: 'Critical', actionTaken: 'Traffic mitigated' },
    { id: 11, alertName: 'VPN Misuse', status: 'Active', timestamp: '2024-12-07 08:10', severity: 'Medium', actionTaken: 'Alert sent' },
    { id: 12, alertName: 'Suspicious File Upload', status: 'Resolved', timestamp: '2024-12-05 17:45', severity: 'High', actionTaken: 'File deleted' },
    { id: 13, alertName: 'Privilege Escalation', status: 'Active', timestamp: '2024-12-06 15:00', severity: 'Critical', actionTaken: 'Access revoked' },
    { id: 14, alertName: 'Abnormal Traffic', status: 'Resolved', timestamp: '2024-12-04 09:30', severity: 'Medium', actionTaken: 'Traffic analyzed' },
    { id: 15, alertName: 'Password Sharing', status: 'Active', timestamp: '2024-12-07 12:00', severity: 'Low', actionTaken: 'Policy reminder sent' },
    { id: 16, alertName: 'Failed Login Attempts', status: 'Resolved', timestamp: '2024-12-06 19:20', severity: 'Medium', actionTaken: 'Password reset' },
    { id: 17, alertName: 'Policy Violation', status: 'Active', timestamp: '2024-12-07 14:25', severity: 'High', actionTaken: 'Notification sent' },
    { id: 18, alertName: 'Software Vulnerability', status: 'Resolved', timestamp: '2024-12-03 13:50', severity: 'Critical', actionTaken: 'Patch applied' },
    { id: 19, alertName: 'Network Scan Detected', status: 'Active', timestamp: '2024-12-07 11:30', severity: 'Medium', actionTaken: 'IP blacklisted' },
    { id: 20, alertName: 'Suspicious Behavior', status: 'Resolved', timestamp: '2024-12-04 18:40', severity: 'High', actionTaken: 'User monitored' },
  ];
  
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

// Function to render the Alerts Table content
function AlertsContent() {
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
        Alerts
      </Typography>
      <Box
        sx={{
          height: '100%',
          width: '90%',
        }}
      >
        <DataGridPro
          columns={columns}
          rows={rows}
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

// Logs Page (Placeholder for another section)
function LogsPage() {
  return (
    <Box
      sx={{
        py: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <Typography variant="h4" sx={{ mb: 2 }}>
        Log Report
      </Typography>
      <Typography variant="body1">
        This is the log report content section. Add your table or log details here.
      </Typography>
    </Box>
  );
}

// Main layout for Alerts Page
function AlertsPageLayout(props) {
  const { window } = props;

  const [activeSection, setActiveSection] = useState('alerts'); // Track active section
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
        return <LogsPage />;
      default:
        return <AlertsContent />;
    }
  };

  return (
    <AppProvider
      navigation={NAVIGATION.map((item) => (item.segment ? { ...item, onClick: () => handleNavigation(item.segment) } : item))}
      theme={demoTheme}
      window={demoWindow}
      branding={{
        logo: <img src={logo1} alt="Emit Logo" style={{ height: '70px', width: '50px' }} />, // Render image with styling
        title: '', // Remove text if not needed
      }}
    >
      <DashboardLayout>{renderContent()}</DashboardLayout>
    </AppProvider>
  );
}

AlertsPageLayout.propTypes = {
  window: PropTypes.func,
};

export default AlertsPageLayout;
