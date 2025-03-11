import React, { useState, useEffect  } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import NotificationImportantIcon from '@mui/icons-material/NotificationImportant';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import LayersIcon from '@mui/icons-material/Layers';
import axios from 'axios';

import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';

import AlertsTable from '../components/AlertsTable';
import ChartsOverviewDemo from '../components/BarChart.js';
import BasicPie from '../components/PieChart.js';
import ConnectedPC from '../components/ConnectedPC';
import { rows as allAlerts } from './Alerts';
import logo1 from '../components/logo1.png';
import LogsBarChart from '../components/AgentsLogs.js';


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
function DemoPageContent() {
  const [logsCount, setLogsCount] = useState(0);
  const [alertsCount, setAlertsCount] = useState(0);
  const [criticalAlertsCount, setCriticalAlertsCount] = useState(0);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/logs');
        console.log('Raw Response Data:', response.data);
    
        // Make sure response data is a string
        if (typeof response.data !== 'string') {
          console.error('Response data is not a string. Please check your backend.');
          return;
        }
    
        // Split the response data by newlines
        const logsArray = response.data.trim().split('\n').filter(line => line.trim() !== "");
    
        // Parse each line into a JSON object
        const parsedLogs = logsArray.map(line => {
          try {
            return JSON.parse(line);
          } catch (error) {
            console.error('Error parsing log line:', line, error);
            return null; // Ignore invalid logs
          }
        }).filter(log => log !== null);
    
        console.log('Parsed Logs:', parsedLogs);
    
        // Update state
        setLogsCount(parsedLogs.length);
    
        const alerts = parsedLogs.filter(log => log.rule && log.rule.description);
        setAlertsCount(alerts.length);
    
        const criticalAlerts = alerts.filter(alert => alert.rule.level >= 10);
        setCriticalAlertsCount(criticalAlerts.length);
    
      } catch (error) {
        console.error('Error fetching logs data:', error.message);
      }
    };
    
    
  
    fetchLogs();
  }, []);
  

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
      {/* SIEM Information Box */}
      <Box
        sx={{
          width: '100%',
          px: 4,
          mb: 4,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {[{ title: 'Logs Received', value: logsCount }, { title: 'Alerts Generated', value: alertsCount }, { title: 'Critical Alerts', value: criticalAlertsCount }].map((stat, index) => (
          <Box
            key={index}
            sx={{
              flex: 1,
              textAlign: 'center',
              border: '1px solid #ddd',
              borderRadius: 4,
              padding: 6,
            }}
          >
            <Typography variant="h6">{stat.title}</Typography>
            <Typography variant="h4">{stat.value}</Typography>
          </Box>
        ))}
      </Box>

      {/* Graphs Section */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: 2,
          width: '100%',
          px: 4,
          mb: 4,
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

      {/* Agents Logs Bar Chart */}
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
      <Box sx={{ mb: 4, width: '100%', px: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Connected PCs
        </Typography>
        <ConnectedPC />
      </Box>

      {/* Alerts Table */}
      <Box sx={{ mb: 4, width: '100%', px: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Alerts
        </Typography>
        <AlertsTable />
      </Box>
    </Box>
  );
}

function DashboardLayoutBasic(props) {
  const { window } = props;
  const [activeSection, setActiveSection] = useState('dashboard');
  const demoWindow = window !== undefined ? window() : undefined;
  
  const handleNavigation = (section) => {
    setActiveSection(section);
  };

  const renderContent = () => {
    return activeSection === 'dashboard' ? <DemoPageContent /> : <Typography>Page Not Found</Typography>;
  };

  return (
    <AppProvider
      logo={logo1}
      navigation={NAVIGATION.map((item) => ({
        ...item,
        onClick: item.segment
          ? (event) => {
              event.preventDefault();
              handleNavigation(item.segment);
            }
          : undefined,
      }))}
      theme={demoTheme}
      window={demoWindow}
      branding={{
        logo: <img src={logo1} alt="Emit Logo" style={{ height: '70px', width: '50px' }} />,
        title: '',
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
