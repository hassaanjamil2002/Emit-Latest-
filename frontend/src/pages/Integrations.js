import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { createTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import NotificationImportantIcon from '@mui/icons-material/NotificationImportant';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import LayersIcon from '@mui/icons-material/Layers';

const NAVIGATION = [
  { kind: 'header', title: 'Main items' },
  { segment: 'dashboard', title: 'Dashboard', icon: <DashboardIcon /> },
  { segment: 'Alerts', title: 'Alerts', icon: <NotificationImportantIcon /> },
  { kind: 'divider' },
  { kind: 'header', title: 'Analytics' },
  { segment: 'logs', title: 'Logs', icon: <BarChartIcon /> },
  { segment: 'Ruleset', title: 'Manage Rules', icon: <LayersIcon /> },
  { segment: 'integrations', title: 'Integrations', icon: <DescriptionIcon /> },
];

const integrationsData = [
  { name: 'Wazuh REST API', apiIp: '192.168.1.100:55000', purpose: 'Fetching information of the users connected to Wazuh and sending to the application.' }
];

const demoTheme = createTheme({
  cssVariables: { colorSchemeSelector: 'data-toolpad-color-scheme' },
  colorSchemes: { light: true, dark: true }
});

function IntegrationsPage() {
  return (
    <Box sx={{ py: 4, px: 4 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>Integrations</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>API IP</TableCell>
              <TableCell>Purpose</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {integrationsData.map((integration, index) => (
              <TableRow key={index}>
                <TableCell>{integration.name}</TableCell>
                <TableCell>{integration.apiIp}</TableCell>
                <TableCell>{integration.purpose}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

function DashboardLayoutBasic(props) {
  const { window } = props;
  const [activeSection, setActiveSection] = useState('integrations');

  const renderContent = () => {
    switch (activeSection) {
      case 'integrations':
        return <IntegrationsPage />;
      default:
        return <IntegrationsPage />;
    }
  };

  return (
    <AppProvider navigation={NAVIGATION} theme={demoTheme}>
      <DashboardLayout>{renderContent()}</DashboardLayout>
    </AppProvider>
  );
}

DashboardLayoutBasic.propTypes = {
  window: PropTypes.func,
};

export default DashboardLayoutBasic;
