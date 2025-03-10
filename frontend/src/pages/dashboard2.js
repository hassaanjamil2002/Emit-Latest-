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

import AlertsTable from '../components/AlertsTable';
import ChartsOverviewDemo from '../components/BarChart.js';
import BasicPie from '../components/PieChart.js';
import BasicCard from '../components/Cards.js';
import ConnectedPC from '../components/ConnectedPC'; // Adjust the path as needed
import { rows as allAlerts } from './Alerts'; // Import all alerts data
import logo1 from '../components/logo1.png';
import LogsBarChart from '../components/AgentsLogs.js';

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
    segment: 'Alerts',
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
    segment: 'Ruleset',
    title: 'Manage Rules',
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
import AgentsLogs from '../components/AgentsLogs'; // Import the new chart component

function DemoPageContent() {
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
      {/* Graphs Section */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: 2,
          width: '100%',
          px: 4,
          mb: 4, // Add margin bottom to separate graphs from tables
        }}
      >
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            border: '1px solid #ddd',
            borderRadius: 2,
            padding: 2,
          }}
        >
          <BasicPie />
        </Box>
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            border: '1px solid #ddd',
            borderRadius: 2,
            padding: 2,
          }}
        >
          <ChartsOverviewDemo />
        </Box>
      </Box>

      {/* New Box for Agents Logs Bar Chart */}
      <Box
        sx={{
          width: '100%',
          px: 4,
          mb: 4,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          border: '1px solid #ddd',
          borderRadius: 2,
          padding: 2,
        }}
      >
        <LogsBarChart />
      </Box>

      {/* Connected PCs Table */}
      <Box
        sx={{
          mb: 4,
          width: '100%',
          px: 4,
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          Connected PCs
        </Typography>
        <ConnectedPC />
      </Box>

      {/* Alerts Table */}
      <Box
        sx={{
          mb: 4,
          width: '100%',
          px: 4,
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          Alerts
        </Typography>
        <AlertsTable />
      </Box>
    </Box>
  );
}

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

function DashboardLayoutBasic(props) {
  const { window } = props;

  const [activeSection, setActiveSection] = useState('dashboard'); // Track active section
  const demoWindow = window !== undefined ? window() : undefined;
  const logo= logo1;

  // Function to handle menu item click
  const handleNavigation = (section) => {
    setActiveSection(section); // Change the active section
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DemoPageContent />;
      case 'logs':
        return <LogsPage />;
      default:
        return <DemoPageContent />;
    }
  };

  return (
    <AppProvider
      logo={logo1}
      
      
      navigation={NAVIGATION.map((item) => ({
        ...item,
        onClick: item.segment
          ? (event) => {
              event.preventDefault(); // Prevent default navigation
              handleNavigation(item.segment);
            }
          : undefined, // Attach click handler only to segments
      }))}
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

DashboardLayoutBasic.propTypes = {
  window: PropTypes.func,
};

export default DashboardLayoutBasic;

