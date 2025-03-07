import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { Add } from '@mui/icons-material';

import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';

import RulesTable from '../components/RulesTable';
import DashboardIcon from '@mui/icons-material/Dashboard';
import NotificationImportantIcon from '@mui/icons-material/NotificationImportant';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import LayersIcon from '@mui/icons-material/Layers';
import logo1 from '../components/logo1.png';

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

const Ruleset = () => {
  const [rules, setRules] = useState([
    { id: 1, name: 'Unauthorized Access', description: 'Detects unauthorized access attempts', conditions: 'IF login_attempts > 5 THEN alert' },
    { id: 2, name: 'Malware Detection', description: 'Detects malware activity in logs', conditions: 'IF process_name == "malware.exe" THEN alert' },
  ]);

  const [open, setOpen] = useState(false);
  const [newRule, setNewRule] = useState({ name: '', description: '', field: '', operator: '', value: '' });

  const handleInputChange = (e) => {
    setNewRule({ ...newRule, [e.target.name]: e.target.value });
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addRule = () => {
    if (!newRule.name.trim() || !newRule.field.trim() || !newRule.operator.trim() || !newRule.value.trim()) return;

    const condition = `IF ${newRule.field} ${newRule.operator} ${newRule.value} THEN alert`;
    const newEntry = { id: rules.length + 1, name: newRule.name, description: newRule.description, conditions: condition };
    setRules([...rules, newEntry]);
    setNewRule({ name: '', description: '', field: '', operator: '', value: '' });
    handleClose();
  };

  return (
    <AppProvider
      logo={logo1}
      navigation={NAVIGATION}
      branding={{
        logo: <img src={logo1} alt="Emit Logo" style={{ height: '70px', width: '50px' }} />,
        title: '',
      }}
    >
      <DashboardLayout>
        <Box sx={{ p: 4 }}>
          <Typography variant="h4" gutterBottom>
            Custom Rule Set
          </Typography>

          <Button variant="contained" color="primary" startIcon={<Add />} onClick={handleOpen}>
            Create Rule
          </Button>

          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Create New Rule</DialogTitle>
            <DialogContent>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
                <TextField label="Rule Name" name="name" value={newRule.name} onChange={handleInputChange} fullWidth />
                <TextField label="Description (Optional)" name="description" value={newRule.description} onChange={handleInputChange} fullWidth multiline rows={2} />
                <FormControl fullWidth>
                  <InputLabel>Field</InputLabel>
                  <Select name="field" value={newRule.field} onChange={handleInputChange}>
                    <MenuItem value="login_attempts">Login Attempts</MenuItem>
                    <MenuItem value="process_name">Process Name</MenuItem>
                    {/* Add more fields as needed */}
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel>Operator</InputLabel>
                  <Select name="operator" value={newRule.operator} onChange={handleInputChange}>
                    <MenuItem value=">">{'>'}</MenuItem>
                    <MenuItem value="==">{'=='}</MenuItem>
                    <MenuItem value="<">{'<'}</MenuItem>
                    {/* Add more operators as needed */}
                  </Select>
                </FormControl>
                <TextField label="Value" name="value" value={newRule.value} onChange={handleInputChange} fullWidth />
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={addRule} color="primary">Create</Button>
            </DialogActions>
          </Dialog>

          <RulesTable rules={rules} setRules={setRules} />
        </Box>
      </DashboardLayout>
    </AppProvider>
  );
};

export default Ruleset;