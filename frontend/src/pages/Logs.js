import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import NotificationImportantIcon from '@mui/icons-material/NotificationImportant';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { DataGridPro } from '@mui/x-data-grid-pro';
import axios from 'axios';
import logo1 from '../components/logo1.png';
import DescriptionIcon from '@mui/icons-material/Description';

// Columns for the Logs table, added Agent Name column
const logColumns = [
  { field: 'logId', headerName: 'Log ID', width: 90 },
  { field: 'logDetail', headerName: 'Log Details', width: 600 },
  { field: 'timestamp', headerName: 'Timestamp', width: 200 },
  { field: 'agentName', headerName: 'Agent Name', width: 200 },  // New column for Agent Name
];

// Sample NAVIGATION structure (unchanged)
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
    segment: 'Ruleset',
    title: 'Manage Rules',
    icon: <LayersIcon />,
  },
  { segment: 'integrations', title: 'Integrations', icon: <DescriptionIcon /> },
];

// Define theme for the UI
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

// Function to fetch logs from the server
const fetchLogs = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/logs'); // Replace with actual endpoint
    console.log("API Response:", response.data);

    let logsData = [];

    if (Array.isArray(response.data)) {
      logsData = response.data;
    } else if (typeof response.data === "string") {
      logsData = response.data
        .split("\n")
        .filter((line) => line.trim() !== "")
        .map((line) => {
          try {
            return JSON.parse(line);
          } catch (parseError) {
            console.error("Error parsing log line:", line, parseError);
            return null;
          }
        })
        .filter((log) => log !== null);
    } else {
      console.error("Unexpected API response format:", response.data);
    }

    return logsData;
  } catch (error) {
    console.error("Error fetching logs:", error);
    return []; // Return empty array in case of error
  }
};

// Function to render the Logs Table content
function LogsContent() {
  const [pageSize, setPageSize] = useState(10);
  const [logs, setLogs] = useState([]);

  // Fetch logs when the component is mounted
  useEffect(() => {
    const getLogs = async () => {
      const logsData = await fetchLogs();
      const formattedLogs = logsData.map((log, index) => ({
        id: index + 1, // Assign unique ID for DataGridPro
        logDetail: log.rule?.description || 'No Description', // Assuming rule.description contains the log details
        timestamp: log.timestamp || 'No Timestamp', // Assuming timestamp is already in a suitable format
        agentName: log.agent?.name || 'No Agent', // Added agent name to be displayed in the table
      }));
      setLogs(formattedLogs);
    };

    getLogs();
  }, []); // Empty dependency array means this runs once when component mounts

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
          rows={logs}
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
      branding={{
        logo: <img src={logo1} alt="Emit Logo" style={{ height: '70px', width: '50px' }} />, // Render image with styling
        title: '', // Remove text if not needed
      }}
    >
      <DashboardLayout>{renderContent()}</DashboardLayout>
    </AppProvider>
  );
}

LogsPageLayout.propTypes = {
  window: PropTypes.func,
};

export default LogsPageLayout;
