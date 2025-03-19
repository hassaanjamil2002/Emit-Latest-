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
import logo from '../components/logo.jpeg';
import LogsBarChart from '../components/AgentsLogs.js';
import SuspicionLevelsChart from '../components/SusLevelCharts.js';

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
    const fetchDashboardData = async () => {
      try {
        // Fetching Logs
        const logsResponse = await axios.get('http://localhost:5000/api/logs');
        console.log('Raw Response Data:', logsResponse.data);
  
        if (typeof logsResponse.data !== 'string') {
          console.error('Response data is not a string. Please check your backend.');
          return;
        }
  
        const logsArray = logsResponse.data.trim().split('\n').filter(line => line.trim() !== "");
  
        const parsedLogs = logsArray.map(line => {
          try {
            return JSON.parse(line);
          } catch (error) {
            console.error('Error parsing log line:', line, error);
            return null;
          }
        }).filter(log => log !== null);
  
        console.log('Parsed Logs:', parsedLogs);
  
        setLogsCount(parsedLogs.length);
  
        const alerts = parsedLogs.filter(log => log.rule && log.rule.description);
        setCriticalAlertsCount(alerts.filter(alert => alert.rule.level >= 10).length);
  
        // Fetching Alerts Count from Backend
        const alertsResponse = await axios.get('http://localhost:5000/api/enforce-rules/count');
        console.log('Fetched Alert Count:', alertsResponse.data.alertCount);
        setAlertsCount(alertsResponse.data.alertCount);
  
      } catch (error) {
        console.error('Error fetching dashboard data:', error.message);
      }
    };
  
    fetchDashboardData();
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
        {[{ title: 'Logs Received', value: logsCount }, { title: 'Alerts Generated', value: alertsCount }, { title: 'Critical Alerts', value: criticalAlertsCount }]
          .map((stat, index) => (
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

      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, width: '100%', px: 4, mb: 4 }}>
        <Box sx={{ flex: 1, border: '1px solid #ddd', borderRadius: 2, padding: 2 }}>
          <BasicPie />
        </Box>
        <Box sx={{ flex: 1, border: '1px solid #ddd', borderRadius: 2, padding: 2 }}>
          <ChartsOverviewDemo />
        </Box>
      </Box>

      {/* Place LogsBarChart and SuspicionLevelsChart Side by Side */}
      <Box 
  sx={{ 
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center', // Center charts vertically
    gap: 2, 
    width: '100%', 
    px: 4, 
    mb: 4 
  }}
>
  <Box 
    sx={{ 
      flex: 1, 
      border: '1px solid #ddd', 
      borderRadius: 2, 
      padding: 2,
      
    }}
  >
    <LogsBarChart />
  </Box>
  
  <Box 
    sx={{ 
      flex: 1, 
      border: '1px solid #ddd', 
      borderRadius: 2, 
      padding: 2,
      
      display: 'flex', // Adding this for vertical centering
      alignItems: 'center', // Centering chart vertically
      justifyContent: 'center' // Centering chart horizontally
    }}
  >
    <SuspicionLevelsChart />
  </Box>
</Box>

      <Box sx={{ mb: 4, width: '100%', px: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Connected PCs</Typography>
        <ConnectedPC />
      </Box>

      <Box sx={{ mb: 4, width: '100%', px: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Alerts</Typography>
        <AlertsTable />
      </Box>
    </Box>
  );
} 
function DashboardLayoutBasic(props) {
  const { window } = props;
  const [activeSection, setActiveSection] = useState('dashboard');
  const demoWindow = window !== undefined ? window() : undefined;

  const handleNavigation = (section) => setActiveSection(section);

  const renderContent = () => activeSection === 'dashboard' ? <DemoPageContent /> : <Typography>Page Not Found</Typography>;

  return (
<AppProvider
  logo={logo}
  navigation={NAVIGATION.map(item => ({
    ...item,
    onClick: item.segment ? (event) => { event.preventDefault(); handleNavigation(item.segment); } : undefined,
  }))}
  theme={demoTheme}
  window={demoWindow}
  branding={{ 
    logo: (
      <Typography 
        variant="h3" 
        sx={{ 
          fontFamily: "'Poppins', sans-serif", 
          fontWeight: 'bold', 
          padding: '5px 10px',  // Reduced padding from the top
          marginTop: '-10px'    // Moves the text upward
        }}
      >
        emit.
      </Typography>
    ), 
    title: '' 
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
