import React from 'react';
import { dummydata } from '../data/dummy'; // update path as needed
import { Box, Typography, Grid, Paper } from '@mui/material';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const Userpage = () => {
  const totalUsers = dummydata.length;
  const unpaidUsers = dummydata.filter(user => user.status === 'Unpaid').length;
  const paidUsers = totalUsers - unpaidUsers;

  const pieData = [
    { name: 'Paid', value: paidUsers },
    { name: 'Unpaid', value: unpaidUsers },
  ];

  const COLORS = ['#4caf50', '#f44336']; // green for paid, red for unpaid

  return (
    <Box sx={{ p: 4, minHeight: '100vh' }}>
      {/* Welcome Header */}
      <Typography variant="h4" gutterBottom sx={{ color: '#8B0000' }}>
        Welcome to Gym Fee Tracker
      </Typography>
      <Typography variant="subtitle1" gutterBottom sx={{ color: '#B0B0B0' }}>
        Track your gym members and their payment status. Go digital — skip the register!
      </Typography>

      {/* Summary Section */}
      <Grid container spacing={3} my={3}>
        <Grid item xs={12} md={3}>
          <Paper
            elevation={4}
            sx={{
              p: 2,
              textAlign: 'center',
              backgroundColor: '#1a1a1a',
              color: '#ffffff',
              borderTop: '4px solid #8B0000',
            }}
          >
            <Typography variant="h6">Total Members</Typography>
            <Typography variant="h3" sx={{ color: '#B2ACAC' }}>{totalUsers}</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={9}>
          <Paper
            elevation={4}
            sx={{
              p: 3,
              textAlign: 'center',
              backgroundColor: '#1a1a1a',
              color: '#ffffff',
              borderTop: '4px solid #8B0000'
            }}
          >
            <Typography variant="h6" mb={2}>
              Payment Status Distribution
            </Typography>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    borderColor: '#8B0000',
                    color: '#fff',
                  }}
                />
                <Legend
                  wrapperStyle={{
                    color: '#fff',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Userpage;
