import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Alert as MuiAlert,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Edit as EditIcon,
  Flag as FlagIcon,
  Person as PersonIcon,
  CreditCard as TransactionIcon,
  VerifiedUser as VerifiedIcon,
  History as HistoryIcon,
  Comment as CommentIcon,
} from '@mui/icons-material';
import { formatDistanceToNow, format } from 'date-fns';
import { Alert } from '../types';

const AlertDetail: React.FC = () => {
  const { alertId } = useParams<{ alertId: string }>();
  const navigate = useNavigate();
  const [alert, setAlert] = useState<Alert | null>(null);
  const [loading, setLoading] = useState(true);
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const [assignDialogOpen, setAssignDialogOpen] = useState(false);
  const [commentDialogOpen, setCommentDialogOpen] = useState(false);
  const [newStatus, setNewStatus] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [newComment, setNewComment] = useState('');

  React.useEffect(() => {
    // Mock data - replace with actual API call
    const mockAlert: Alert = {
      id: 'ALR001',
      transactionId: 'TXN12345',
      customerId: 'CUST001',
      customerName: 'John Doe',
      amount: 5000,
      currency: 'USD',
      riskScore: 85,
      riskLevel: 'High',
      status: 'Open',
      type: 'Card Fraud',
      createdAt: new Date(Date.now() - 7200000).toISOString(),
      updatedAt: new Date().toISOString(),
      assignedTo: 'analyst1@example.com',
      transaction: {
        id: 'TXN12345',
        customerId: 'CUST001',
        amount: 5000,
        currency: 'USD',
        merchant: 'Electronics Store',
        date: new Date(Date.now() - 7200000).toISOString(),
        channel: 'web',
        location: 'New York, NY',
      },
      customerInfo: {
        segment: 'Premium',
        kycCompleted: true,
        accountAge: '5 years',
      },
      riskFactors: [
        'Unusual Amount - 3x average transaction',
        'New Device - First time from this device',
        'High Velocity - 5 transactions in 10 minutes',
        'Unusual Location - First transaction from this location',
      ],
      triggeredRules: [
        'RULE_001: Transaction Amount > 3x average',
        'RULE_003: New Device Login',
        'RULE_005: High Transaction Velocity',
      ],
      comments: [
        {
          id: 'CMT001',
          author: 'analyst1@example.com',
          content: 'Investigating customer purchase history. Looks suspicious.',
          createdAt: new Date(Date.now() - 3600000).toISOString(),
        },
      ],
      auditLog: [
        {
          id: 'AUD001',
          action: 'Alert Created',
          user: 'System',
          timestamp: new Date(Date.now() - 7200000).toISOString(),
        },
        {
          id: 'AUD002',
          action: 'Status Changed to Under Review',
          user: 'analyst1@example.com',
          timestamp: new Date(Date.now() - 5400000).toISOString(),
        },
        {
          id: 'AUD003',
          action: 'Comment Added',
          user: 'analyst1@example.com',
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          details: 'Investigating customer purchase history',
        },
      ],
    };

    setAlert(mockAlert);
    setNewStatus(mockAlert.status);
    setAssignedTo(mockAlert.assignedTo || '');
    setLoading(false);
  }, [alertId]);

  const handleStatusChange = () => {
    if (alert) {
      setAlert({ ...alert, status: newStatus as any });
      setStatusDialogOpen(false);
    }
  };

  const handleAssign = () => {
    if (alert) {
      setAlert({ ...alert, assignedTo });
      setAssignDialogOpen(false);
    }
  };

  const handleAddComment = () => {
    if (alert && newComment.trim()) {
      const comment = {
        id: `CMT${Date.now()}`,
        author: 'current@example.com',
        content: newComment,
        createdAt: new Date().toISOString(),
      };
      setAlert({
        ...alert,
        comments: [...alert.comments, comment],
      });
      setNewComment('');
      setCommentDialogOpen(false);
    }
  };

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'High':
        return 'error';
      case 'Medium':
        return 'warning';
      case 'Low':
        return 'success';
      default:
        return 'default';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open':
        return 'error';
      case 'Under Review':
        return 'warning';
      case 'Resolved':
        return 'success';
      case 'False Positive':
        return 'info';
      default:
        return 'default';
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!alert) {
    return (
      <Box>
        <MuiAlert severity="error">Alert not found</MuiAlert>
      </Box>
    );
  }

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
            Alert {alert.id}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <Chip
              label={alert.riskLevel}
              color={getRiskColor(alert.riskLevel) as any}
            />
            <Chip
              label={alert.status}
              color={getStatusColor(alert.status) as any}
              variant="outlined"
            />
            <Chip
              icon={<FlagIcon />}
              label={`Risk Score: ${alert.riskScore}`}
              variant="outlined"
            />
          </Box>
        </Box>
        <Button variant="outlined" onClick={() => navigate('/alerts')}>
          Back to Alerts
        </Button>
      </Box>

      {/* Alert Summary */}
      <Paper sx={{ p: 3, mb: 3, backgroundColor: '#f9f9f9' }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="caption" color="textSecondary">
              Alert ID
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {alert.id}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="caption" color="textSecondary">
              Created
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {format(new Date(alert.createdAt), 'MMM dd, yyyy HH:mm:ss')}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="caption" color="textSecondary">
              Alert Type
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {alert.type}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="caption" color="textSecondary">
              Assigned To
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {alert.assignedTo || 'Unassigned'}
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      {/* Transaction Summary */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <TransactionIcon sx={{ mr: 1, color: '#1976d2' }} />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Transaction Summary
              </Typography>
            </Box>
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="caption" color="textSecondary">
                  Transaction ID
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {alert.transaction.id}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="caption" color="textSecondary">
                  Amount
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {alert.amount} {alert.currency}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="caption" color="textSecondary">
                  Merchant
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {alert.transaction.merchant}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="caption" color="textSecondary">
                  Channel
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 500, textTransform: 'capitalize' }}>
                  {alert.transaction.channel}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="caption" color="textSecondary">
                  Location
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {alert.transaction.location || 'N/A'}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="caption" color="textSecondary">
                  Date & Time
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {format(new Date(alert.transaction.date), 'MMM dd, yyyy HH:mm:ss')}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Customer Information */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <PersonIcon sx={{ mr: 1, color: '#1976d2' }} />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Customer Information
              </Typography>
            </Box>
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="caption" color="textSecondary">
                  Customer ID
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {alert.customerId}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="caption" color="textSecondary">
                  Name
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {alert.customerName}
                </Typography>
              </Grid>
              {alert.customerInfo && (
                <>
                  <Grid item xs={6}>
                    <Typography variant="caption" color="textSecondary">
                      Segment
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {alert.customerInfo.segment}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="caption" color="textSecondary">
                      Account Age
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {alert.customerInfo.accountAge}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="caption" color="textSecondary">
                      KYC Status
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                      <Chip
                        icon={<VerifiedIcon />}
                        label={alert.customerInfo.kycCompleted ? 'Completed' : 'Pending'}
                        color={alert.customerInfo.kycCompleted ? 'success' : 'warning'}
                        size="small"
                      />
                    </Box>
                  </Grid>
                </>
              )}
            </Grid>
          </Paper>
        </Grid>
      </Grid>

      {/* Risk & Detection Explanation */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
          Risk & Detection Explanation
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
              Risk Factors
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {alert.riskFactors.map((factor, idx) => (
                <Typography key={idx} variant="body2">
                  • {factor}
                </Typography>
              ))}
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
              Triggered Rules
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {alert.triggeredRules?.map((rule, idx) => (
                <Chip key={idx} label={rule} variant="outlined" size="small" />
              ))}
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Action Buttons */}
      <Paper sx={{ p: 3, mb: 3, backgroundColor: '#f0f4ff' }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>
          Actions
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<EditIcon />}
            onClick={() => setStatusDialogOpen(true)}
          >
            Change Status
          </Button>
          <Button
            variant="contained"
            color="primary"
            startIcon={<PersonIcon />}
            onClick={() => setAssignDialogOpen(true)}
          >
            Assign Alert
          </Button>
          <Button
            variant="contained"
            color="primary"
            startIcon={<CommentIcon />}
            onClick={() => setCommentDialogOpen(true)}
          >
            Add Comment
          </Button>
        </Box>
      </Paper>

      {/* Comments */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
          Comments & Notes
        </Typography>
        {alert.comments.length === 0 ? (
          <Typography variant="body2" color="textSecondary">
            No comments yet
          </Typography>
        ) : (
          <List>
            {alert.comments.map((comment) => (
              <ListItem key={comment.id} alignItems="flex-start">
                <ListItemIcon>
                  <CommentIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        {comment.author}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                      </Typography>
                    </Box>
                  }
                  secondary={comment.content}
                />
              </ListItem>
            ))}
          </List>
        )}
      </Paper>

      {/* Audit Log */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
          Audit Log
        </Typography>
        <TableContainer>
          <Table size="small">
            <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>Action</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>User</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Timestamp</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Details</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {alert.auditLog.map((log) => (
                <TableRow key={log.id}>
                  <TableCell>{log.action}</TableCell>
                  <TableCell>{log.user}</TableCell>
                  <TableCell>
                    {format(new Date(log.timestamp), 'MMM dd, yyyy HH:mm:ss')}
                  </TableCell>
                  <TableCell>{log.details || '-'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Status Change Dialog */}
      <Dialog open={statusDialogOpen} onClose={() => setStatusDialogOpen(false)}>
        <DialogTitle>Change Alert Status</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <FormControl fullWidth>
            <InputLabel>New Status</InputLabel>
            <Select
              value={newStatus}
              label="New Status"
              onChange={(e) => setNewStatus(e.target.value)}
            >
              <MenuItem value="Open">Open</MenuItem>
              <MenuItem value="Under Review">Under Review</MenuItem>
              <MenuItem value="Resolved">Resolved</MenuItem>
              <MenuItem value="False Positive">False Positive</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setStatusDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleStatusChange} variant="contained">
            Update
          </Button>
        </DialogActions>
      </Dialog>

      {/* Assign Dialog */}
      <Dialog open={assignDialogOpen} onClose={() => setAssignDialogOpen(false)}>
        <DialogTitle>Assign Alert</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <TextField
            fullWidth
            label="Assign To"
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
            placeholder="analyst@example.com"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAssignDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleAssign} variant="contained">
            Assign
          </Button>
        </DialogActions>
      </Dialog>

      {/* Comment Dialog */}
      <Dialog open={commentDialogOpen} onClose={() => setCommentDialogOpen(false)} fullWidth>
        <DialogTitle>Add Comment</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Comment"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add your internal notes..."
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCommentDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleAddComment} variant="contained">
            Add Comment
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AlertDetail;
