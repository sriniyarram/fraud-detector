import React, { useState } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  Button,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Typography,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { Alert } from '../types';

const AlertsList: React.FC = () => {
  const navigate = useNavigate();
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [riskLevelFilter, setRiskLevelFilter] = useState('');
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [bulkActionOpen, setBulkActionOpen] = useState(false);

  React.useEffect(() => {
    // Mock data - replace with actual API call
    const mockAlerts: Alert[] = [
      {
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
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        transaction: {
          id: 'TXN12345',
          customerId: 'CUST001',
          amount: 5000,
          currency: 'USD',
          merchant: 'Electronics Store',
          date: new Date().toISOString(),
          channel: 'web',
          location: 'Unknown Location',
        },
        riskFactors: ['Unusual Amount', 'New Device', 'High Velocity'],
        comments: [],
        auditLog: [],
      },
      {
        id: 'ALR002',
        transactionId: 'TXN12346',
        customerId: 'CUST002',
        customerName: 'Jane Smith',
        amount: 2500,
        currency: 'USD',
        riskScore: 65,
        riskLevel: 'Medium',
        status: 'Under Review',
        type: 'Account Takeover',
        createdAt: new Date(Date.now() - 3600000).toISOString(),
        updatedAt: new Date(Date.now() - 3600000).toISOString(),
        assignedTo: 'analyst@example.com',
        transaction: {
          id: 'TXN12346',
          customerId: 'CUST002',
          amount: 2500,
          currency: 'USD',
          merchant: 'Travel Agency',
          date: new Date(Date.now() - 3600000).toISOString(),
          channel: 'mobile',
        },
        riskFactors: ['New Location'],
        comments: [],
        auditLog: [],
      },
      {
        id: 'ALR003',
        transactionId: 'TXN12347',
        customerId: 'CUST003',
        customerName: 'Robert Johnson',
        amount: 150,
        currency: 'USD',
        riskScore: 25,
        riskLevel: 'Low',
        status: 'Resolved',
        type: 'Unusual Activity',
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        updatedAt: new Date(Date.now() - 86400000).toISOString(),
        transaction: {
          id: 'TXN12347',
          customerId: 'CUST003',
          amount: 150,
          currency: 'USD',
          merchant: 'Coffee Shop',
          date: new Date(Date.now() - 86400000).toISOString(),
          channel: 'pos',
        },
        riskFactors: [],
        comments: [],
        auditLog: [],
      },
    ];
    setAlerts(mockAlerts);
    setLoading(false);
  }, []);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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

  const filteredAlerts = alerts.filter((alert) => {
    const matchesSearch =
      !searchText ||
      alert.id.toLowerCase().includes(searchText.toLowerCase()) ||
      alert.transactionId.toLowerCase().includes(searchText.toLowerCase()) ||
      alert.customerName.toLowerCase().includes(searchText.toLowerCase());

    const matchesStatus = !statusFilter || alert.status === statusFilter;
    const matchesRiskLevel = !riskLevelFilter || alert.riskLevel === riskLevelFilter;

    return matchesSearch && matchesStatus && matchesRiskLevel;
  });

  const displayedAlerts = filteredAlerts.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ mb: 3, fontWeight: 600 }}>
        Alerts
      </Typography>

      {/* Filters */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              label="Search"
              placeholder="Alert ID, Transaction ID, Customer..."
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
                setPage(0);
              }}
              variant="outlined"
              size="small"
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Status</InputLabel>
              <Select
                value={statusFilter}
                label="Status"
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setPage(0);
                }}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="Open">Open</MenuItem>
                <MenuItem value="Under Review">Under Review</MenuItem>
                <MenuItem value="Resolved">Resolved</MenuItem>
                <MenuItem value="False Positive">False Positive</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Risk Level</InputLabel>
              <Select
                value={riskLevelFilter}
                label="Risk Level"
                onChange={(e) => {
                  setRiskLevelFilter(e.target.value);
                  setPage(0);
                }}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="High">High</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="Low">Low</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => {
                setSearchText('');
                setStatusFilter('');
                setRiskLevelFilter('');
                setPage(0);
              }}
            >
              Clear Filters
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>Alert ID</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Customer</TableCell>
              <TableCell align="right" sx={{ fontWeight: 600 }}>
                Amount
              </TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Risk Level</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Created</TableCell>
              <TableCell align="center" sx={{ fontWeight: 600 }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedAlerts.map((alert) => (
              <TableRow key={alert.id} hover>
                <TableCell sx={{ fontWeight: 500 }}>{alert.id}</TableCell>
                <TableCell>
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {alert.customerName}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      {alert.transactionId}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell align="right">
                  {alert.amount} {alert.currency}
                </TableCell>
                <TableCell>
                  <Chip
                    label={alert.riskLevel}
                    color={getRiskColor(alert.riskLevel) as any}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={alert.status}
                    color={getStatusColor(alert.status) as any}
                    size="small"
                    variant="outlined"
                  />
                </TableCell>
                <TableCell>
                  {formatDistanceToNow(new Date(alert.createdAt), { addSuffix: true })}
                </TableCell>
                <TableCell align="center">
                  <Button
                    size="small"
                    variant="contained"
                    onClick={() => navigate(`/alerts/${alert.id}`)}
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredAlerts.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      {filteredAlerts.length === 0 && (
        <Box sx={{ textAlign: 'center', p: 4 }}>
          <Typography color="textSecondary">No alerts found</Typography>
        </Box>
      )}
    </Box>
  );
};

export default AlertsList;
