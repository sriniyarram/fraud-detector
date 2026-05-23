import React from 'react';
import { Box, Grid, Paper, Typography, Card, CardContent, CircularProgress } from '@mui/material';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { AlertsSummary } from '../types';

const Dashboard: React.FC = () => {
  const [summary, setSummary] = React.useState<AlertsSummary | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    // Mock data - replace with actual API call
    const mockSummary: AlertsSummary = {
      totalAlerts: 1250,
      openAlerts: 45,
      highRiskAlerts: 12,
      averageResolutionTime: 4.5, // hours
    };

    setSummary(mockSummary);
    setLoading(false);
  }, []);

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
        Dashboard
      </Typography>

      {/* KPI Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ backgroundColor: '#e3f2fd', borderLeft: '4px solid #1976d2' }}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Alerts
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 600, color: '#1976d2' }}>
                {summary?.totalAlerts}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                All time
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ backgroundColor: '#fff3e0', borderLeft: '4px solid #ff9800' }}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Open Alerts
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 600, color: '#ff9800' }}>
                {summary?.openAlerts}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                Requires action
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ backgroundColor: '#ffebee', borderLeft: '4px solid #f44336' }}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                High Risk
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 600, color: '#f44336' }}>
                {summary?.highRiskAlerts}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                Urgent review
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ backgroundColor: '#f3e5f5', borderLeft: '4px solid #9c27b0' }}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Avg Resolution
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 600, color: '#9c27b0' }}>
                {summary?.averageResolutionTime}h
              </Typography>
              <Typography variant="caption" color="textSecondary">
                Time to resolve
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Charts */}
      <Grid container spacing={3}>
        <Grid item xs={12} lg={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
              Alerts Over Time
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={[
                { date: 'Mon', count: 45 },
                { date: 'Tue', count: 52 },
                { date: 'Wed', count: 48 },
                { date: 'Thu', count: 61 },
                { date: 'Fri', count: 55 },
                { date: 'Sat', count: 35 },
                { date: 'Sun', count: 32 },
              ]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="count" stroke="#1976d2" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} lg={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
              Risk Level Distribution
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={[
                { name: 'High', value: 12, fill: '#f44336' },
                { name: 'Medium', value: 28, fill: '#ff9800' },
                { name: 'Low', value: 5, fill: '#4caf50' },
              ]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#1976d2" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
