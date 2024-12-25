import React, { useState } from 'react';
import { Card, CardContent, Grid, Typography, IconButton } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';  // Importing Recharts components
import { Group, EventNote } from '@mui/icons-material';

const DoctorHome = () => {
  // Sample data for graph
  const numberOfPatientsToday = 12;
  const numberOfMeetings = 5;

  // Data for the bar chart
  const chartData = [
    {
      name: 'Patients',
      value: numberOfPatientsToday,
    },
    {
      name: 'Meetings',
      value: numberOfMeetings,
    },
  ];

  return (
    <div style={{ padding: '20px', height: '100vh' }}>
      {/* Full Screen Layout for Doctor's Dashboard */}
      <Grid container spacing={2} style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Grid item xs={12}>
          {/* Card for Doctor's Information */}
          <Card style={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h5" component="div" gutterBottom>
                Doctor's Information
              </Typography>
              <Grid container spacing={2}>
                {/* Patients Icon and Data */}
                <Grid item xs={4}>
                  <IconButton color="primary" aria-label="patients">
                    <Group fontSize="large" />
                  </IconButton>
                  <Typography variant="body2" color="text.secondary">
                    {numberOfPatientsToday} Patients
                  </Typography>
                </Grid>
                {/* Meetings Icon and Data */}
                <Grid item xs={4}>
                  <IconButton color="primary" aria-label="meetings">
                    <EventNote fontSize="large" />
                  </IconButton>
                  <Typography variant="body2" color="text.secondary">
                    {numberOfMeetings} Meetings
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} style={{ flex: 1 }}>
          {/* Card with Bar Chart */}
          <Card style={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h5" component="div" gutterBottom>
                Today's Data Overview
              </Typography>
              {/* Bar chart to display data graphically using Recharts */}
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#42a5f5" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          {/* Today's Patients and Meetings Breakdown */}
          <Card>
            <CardContent>
              <Typography variant="h6" style={{ marginBottom: '20px' }}>
                Today's Breakdown
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Patients Today: {numberOfPatientsToday}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Meetings Today: {numberOfMeetings}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default DoctorHome;
