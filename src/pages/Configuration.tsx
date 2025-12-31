import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Switch,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Card,
  CardContent,
  Alert as MuiAlert,
  CircularProgress,
} from '@mui/material';
import { Edit as EditIcon, Save as SaveIcon } from '@mui/icons-material';
import { Rule } from '../types';

const Configuration: React.FC = () => {
  const [rules, setRules] = useState<Rule[]>([
    {
      id: 'RULE_001',
      name: 'Transaction Amount Threshold',
      description: 'Alert when transaction amount exceeds 3x average for customer',
      enabled: true,
      threshold: 3000,
      riskLevel: 'High',
    },
    {
      id: 'RULE_003',
      name: 'New Device Login',
      description: 'Alert on first login from new device',
      enabled: true,
      riskLevel: 'Medium',
    },
    {
      id: 'RULE_005',
      name: 'High Transaction Velocity',
      description: 'Alert when more than 5 transactions in 10 minutes',
      enabled: true,
      riskLevel: 'High',
    },
    {
      id: 'RULE_007',
      name: 'Unusual Location',
      description: 'Alert on transaction from unusual geographic location',
      enabled: false,
      riskLevel: 'Medium',
    },
    {
      id: 'RULE_009',
      name: 'Card Not Present Transaction',
      description: 'Alert on high-value card-not-present transactions',
      enabled: true,
      threshold: 500,
      riskLevel: 'Medium',
    },
  ]);

  const [riskScoreBoundaries, setRiskScoreBoundaries] = useState({
    highRiskThreshold: 80,
    mediumRiskThreshold: 50,
  });

  const [loading, setLoading] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedRule, setSelectedRule] = useState<Rule | null>(null);
  const [editedRule, setEditedRule] = useState<Rule | null>(null);
  const [saveMessage, setSaveMessage] = useState('');

  const handleToggleRule = (ruleId: string) => {
    setRules(
      rules.map((rule) =>
        rule.id === ruleId ? { ...rule, enabled: !rule.enabled } : rule
      )
    );
    setSaveMessage('');
  };

  const handleEditRule = (rule: Rule) => {
    setSelectedRule(rule);
    setEditedRule({ ...rule });
    setEditDialogOpen(true);
  };

  const handleSaveRule = () => {
    if (editedRule) {
      setRules(
        rules.map((rule) => (rule.id === editedRule.id ? editedRule : rule))
      );
      setEditDialogOpen(false);
      setSaveMessage(`Rule "${editedRule.name}" updated successfully`);
      setTimeout(() => setSaveMessage(''), 3000);
    }
  };

  const handleSaveConfiguration = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSaveMessage('Configuration saved successfully');
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (error) {
      setSaveMessage('Error saving configuration');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ mb: 3, fontWeight: 600 }}>
        Configuration
      </Typography>

      {saveMessage && (
        <MuiAlert severity="success" onClose={() => setSaveMessage('')} sx={{ mb: 2 }}>
          {saveMessage}
        </MuiAlert>
      )}

      {/* Risk Score Boundaries */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
          Risk Score Boundaries
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ backgroundColor: '#ffebee', borderLeft: '4px solid #f44336' }}>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  High Risk Threshold
                </Typography>
                <TextField
                  fullWidth
                  type="number"
                  value={riskScoreBoundaries.highRiskThreshold}
                  onChange={(e) =>
                    setRiskScoreBoundaries({
                      ...riskScoreBoundaries,
                      highRiskThreshold: Number(e.target.value),
                    })
                  }
                  inputProps={{ min: 0, max: 100 }}
                  sx={{ mt: 1 }}
                />
                <Typography variant="caption" color="textSecondary" sx={{ mt: 1, display: 'block' }}>
                  Scores at or above this value are marked as "High Risk"
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ backgroundColor: '#fff3e0', borderLeft: '4px solid #ff9800' }}>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Medium Risk Threshold
                </Typography>
                <TextField
                  fullWidth
                  type="number"
                  value={riskScoreBoundaries.mediumRiskThreshold}
                  onChange={(e) =>
                    setRiskScoreBoundaries({
                      ...riskScoreBoundaries,
                      mediumRiskThreshold: Number(e.target.value),
                    })
                  }
                  inputProps={{ min: 0, max: 100 }}
                  sx={{ mt: 1 }}
                />
                <Typography variant="caption" color="textSecondary" sx={{ mt: 1, display: 'block' }}>
                  Scores between Medium and High thresholds are "Medium Risk"
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleSaveConfiguration}
              disabled={loading}
              sx={{ height: '100%' }}
            >
              {loading ? <CircularProgress size={24} /> : 'Save Configuration'}
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Rules Management */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
          Rules Management
        </Typography>

        <TableContainer>
          <Table>
            <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>Rule ID</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Description</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Risk Level</TableCell>
                <TableCell align="center" sx={{ fontWeight: 600 }}>
                  Enabled
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 600 }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rules.map((rule) => (
                <TableRow key={rule.id} hover>
                  <TableCell sx={{ fontWeight: 500 }}>{rule.id}</TableCell>
                  <TableCell sx={{ fontWeight: 500 }}>{rule.name}</TableCell>
                  <TableCell>
                    <Typography variant="body2">{rule.description}</Typography>
                    {rule.threshold && (
                      <Typography variant="caption" color="textSecondary">
                        Threshold: {rule.threshold}
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 500,
                        color:
                          rule.riskLevel === 'High'
                            ? '#f44336'
                            : rule.riskLevel === 'Medium'
                            ? '#ff9800'
                            : '#4caf50',
                      }}
                    >
                      {rule.riskLevel}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Switch
                      checked={rule.enabled}
                      onChange={() => handleToggleRule(rule.id)}
                      color="primary"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      size="small"
                      variant="outlined"
                      startIcon={<EditIcon />}
                      onClick={() => handleEditRule(rule)}
                    >
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ mt: 3 }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<SaveIcon />}
            onClick={handleSaveConfiguration}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Save All Changes'}
          </Button>
        </Box>
      </Paper>

      {/* Edit Rule Dialog */}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} fullWidth>
        <DialogTitle>Edit Rule</DialogTitle>
        {editedRule && (
          <>
            <DialogContent sx={{ pt: 2 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                  fullWidth
                  label="Rule Name"
                  value={editedRule.name}
                  onChange={(e) =>
                    setEditedRule({ ...editedRule, name: e.target.value })
                  }
                />
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Description"
                  value={editedRule.description}
                  onChange={(e) =>
                    setEditedRule({ ...editedRule, description: e.target.value })
                  }
                />
                {editedRule.threshold !== undefined && (
                  <TextField
                    fullWidth
                    type="number"
                    label="Threshold"
                    value={editedRule.threshold}
                    onChange={(e) =>
                      setEditedRule({
                        ...editedRule,
                        threshold: Number(e.target.value),
                      })
                    }
                  />
                )}
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleSaveRule} variant="contained">
                Save Rule
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default Configuration;
