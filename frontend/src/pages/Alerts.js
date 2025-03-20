import React, { useState, useEffect } from 'react';
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
import { Modal, Button } from '@mui/material';
import axios from 'axios';
import logo from '../components/logo.jpeg';

// Sample data for the alerts table
const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'alertName', headerName: 'Alert Name', width: 200 },
  { field: 'ruleName', headerName: 'Triggered Rule', width: 250 },
  { field: 'status', headerName: 'Status', width: 150 },
  { field: 'timestamp', headerName: 'Timestamp', width: 200 },
  { field: 'severity', headerName: 'Severity', width: 150 },
  { field: 'actionTaken', headerName: 'Action Taken', width: 250 },
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
    segment: 'Ruleset',
    title: 'Manage Rules',
    icon: <LayersIcon />,
  },
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

// Modal Component for Alert Details
const AlertDetailsModal = ({ open, handleClose, alert, onMarkAsSeen }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-details-modal-title"
      aria-describedby="alert-details-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography id="alert-details-modal-title" variant="h6" component="h2">
          Alert Details
        </Typography>
        <Typography id="alert-details-modal-description" sx={{ mt: 2 }}>
          <strong>Alert Name:</strong> {alert.alertName}
        </Typography>
        <Typography sx={{ mt: 2 }}>
          <strong>Rule Name:</strong> {alert.ruleName}
        </Typography>
        <Typography sx={{ mt: 2 }}>
          <strong>Status:</strong> {alert.status}
        </Typography>
        <Typography sx={{ mt: 2 }}>
          <strong>Timestamp:</strong> {alert.timestamp}
        </Typography>
        <Typography sx={{ mt: 2 }}>
          <strong>Severity:</strong> {alert.severity}
        </Typography>
        <Typography sx={{ mt: 2 }}>
          <strong>Action Taken:</strong> {alert.actionTaken}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            onMarkAsSeen(alert.id);
            handleClose();
          }}
          sx={{ mt: 2 }}
        >
          Mark as Seen
        </Button>
      </Box>
    </Modal>
  );
};

// Alerts Content Component
function AlertsContent() {
  const [pageSize, setPageSize] = useState(10);
  const [rows, setRows] = useState([]);
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/enforce-rules')
      .then((response) => {
        console.log('Fetched alerts:', response.data);

        const formattedRows = response.data.map((alert, index) => ({
          id: index + 1,
          alertName: alert.rule.description || 'Unknown Alert',
          ruleName: alert.rule.id || 'Unknown Rule',
          status: 'Active',
          timestamp: alert.log.timestamp || 'Unknown',
          severity: alert.rule.level || 'Unknown',
          actionTaken: 'Alert Sent',
        }));

        setRows(formattedRows);
      })
      .catch((error) => console.error('Error fetching alerts:', error));
  }, []);

  const handleRowClick = (params) => {
    setSelectedAlert(params.row);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleMarkAsSeen = (alertId) => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === alertId ? { ...row, actionTaken: 'Seen/Processed' } : row
      )
    );
  };

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
          onRowClick={handleRowClick}
        />
      </Box>
      {selectedAlert && (
        <AlertDetailsModal
          open={modalOpen}
          handleClose={handleCloseModal}
          alert={selectedAlert}
          onMarkAsSeen={handleMarkAsSeen}
        />
      )}
    </Box>
  );
}

// Logs Page (Placeholder)
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

// Main Layout Component
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
      logo={logo}
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
        logo: (
          <Typography
            variant="h3"
            sx={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 'bold',
              padding: '5px 10px',
              marginTop: '-10px',
            }}
          >
            emit.
          </Typography>
        ),
        title: '',
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