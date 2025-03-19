import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions, MenuItem, Select, FormControl, InputLabel, Snackbar, Alert } from '@mui/material';
import { Add } from '@mui/icons-material';
import axios from 'axios';

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
  { kind: 'header', title: 'Main items' },
  { segment: 'dashboard', title: 'Dashboard', icon: <DashboardIcon /> },
  { segment: 'Alerts', title: 'Alerts', icon: <NotificationImportantIcon /> },
  { kind: 'divider' },
  { kind: 'header', title: 'Analytics' },
  { segment: 'logs', title: 'Logs', icon: <BarChartIcon /> },
  { segment: 'Ruleset', title: 'Manage Rules', icon: <LayersIcon /> },
  { segment: 'integrations', title: 'Integrations', icon: <DescriptionIcon /> },
];

const Ruleset = () => {
  const [rules, setRules] = useState([]);
  const [open, setOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editingRuleId, setEditingRuleId] = useState(null);
  const [newRule, setNewRule] = useState({
    id: '',
    level: '',
    description: '',
    matches: '',
    action: '',
    tags: ''
  });

  useEffect(() => {
    axios.get('http://localhost:5000/api/rules')
      .then(response => {
        console.log("Fetched Rules:", response.data);
        
        // The backend now returns an array with 'id' directly at the top level.
        const formattedRules = response.data.map(rule => ({
          id: rule.id,
          level: rule.level,
          description: rule.description,
          matches: rule.matches.join(", "),
          action: rule.action,
          tags: rule.tags
        }));
  
        setRules(formattedRules);
      })
      .catch(error => console.error('Error fetching rules:', error));
  }, []);
  

  const handleInputChange = (e) => {
    setNewRule({ ...newRule, [e.target.name]: e.target.value });
  };

  const handleOpen = () => {
    setEditMode(false);
    setNewRule({ id: '', level: '', description: '', matches: '', action: '', tags: '' });
    setOpen(true);
  };

  const handleClose = () => setOpen(false);
  const handleAlertClose = () => setAlertOpen(false);

  const addOrUpdateRule = () => {
    if (!newRule.description.trim() || !newRule.matches.trim()) return;

    const url = editMode 
      ? `http://localhost:5000/api/rules/${editingRuleId}`
      : 'http://localhost:5000/api/rules';

    const method = editMode ? 'put' : 'post';

    axios[method](url, newRule)
      .then(response => {
        setRules(response.data);
        setAlertOpen(true);
      })
      .catch(error => console.error(`Error ${editMode ? 'updating' : 'adding'} rule:`, error));

    setNewRule({ id: '', level: '', description: '', matches: '', action: '', tags: '' });
    handleClose();
  };

  const editRule = (rule) => {
    setNewRule(rule);
    setEditingRuleId(rule.id);
    setEditMode(true);
    setOpen(true);
  };

  const deleteRule = (id) => {
    axios.delete(`http://localhost:5000/api/rules/${id}`)
      .then(response => {
        setRules(response.data);
      })
      .catch(error => console.error('Error deleting rule:', error));
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

          <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
            <DialogTitle>{editMode ? 'Edit Rule' : 'Create New Rule'}</DialogTitle>
            <DialogContent>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
                <TextField label="Rule ID" name="id" value={newRule.id} onChange={handleInputChange} fullWidth />
                <TextField label="Level" name="level" value={newRule.level} onChange={handleInputChange} fullWidth />
                <TextField label="Description" name="description" value={newRule.description} onChange={handleInputChange} fullWidth multiline rows={2} />
                <TextField label="Matches (Comma-separated)" name="matches" value={newRule.matches} onChange={handleInputChange} fullWidth />
                <TextField label="Actions (e.g., log, alert)" name="action" value={newRule.action} onChange={handleInputChange} fullWidth />
                <TextField label="Tags (Comma-separated)" name="tags" value={newRule.tags} onChange={handleInputChange} fullWidth />
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="error">Cancel</Button>
              <Button onClick={addOrUpdateRule} color="primary">{editMode ? 'Update Rule' : 'Create Rule'}</Button>
            </DialogActions>
          </Dialog>

          <RulesTable rules={rules} deleteRule={deleteRule} editRule={editRule} />
        </Box>
      </DashboardLayout>
    </AppProvider>
  );
};

export default Ruleset;
