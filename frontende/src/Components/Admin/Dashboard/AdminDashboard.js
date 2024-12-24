import React, { useEffect } from 'react';
import { Box, Typography, Grid, Card, CardContent, CircularProgress } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import AssessmentIcon from "@mui/icons-material/Assessment";
import MedicationIcon from "@mui/icons-material/Medication";
import { useSelector, useDispatch } from "react-redux";
import { fetchPharmaDetail, fetchDoctorDetail, fetchRegisterUsers, fetchLabDetail } from "../../../redux/userHandle";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AdminDashboard = () => {
  const dispatch = useDispatch();

  const { pharmaDetail, labDetail, DoctorDetail, tempRegisterDetail, loading, error, currentUser } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    dispatch(fetchPharmaDetail(currentUser)); // Fetch pharmacist details
    dispatch(fetchDoctorDetail(currentUser)); // Fetch doctor details
    dispatch(fetchRegisterUsers(currentUser)); // Fetch registered users
    dispatch(fetchLabDetail(currentUser)); // Fetch lab details
  }, [dispatch, currentUser]);

  if (loading) {
    return <CircularProgress />; // Show loading spinner if data is still being fetched
  }

  if (error) {
    return <Typography color="error">{error.message || "An error occurred"}</Typography>; // Handle errors
  }

  // Data for combined graphs
  const combinedDoctorLabData = [
    { name: 'Doctors', value: DoctorDetail?.length || 0 },
    { name: 'Lab Tests', value: labDetail?.length || 0 },
  ];

  const combinedPharmaRegistrationData = [
    { name: 'Pharmacists', value: pharmaDetail?.length || 0 },
    { name: 'Registration Officers', value: tempRegisterDetail?.length || 0 },
  ];

  return (
    <>
      <Box sx={{ flexGrow: 1, p: 3 }}>
        {/* Welcome Section */}
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome, Admin
        </Typography>
        <Typography variant="body1" gutterBottom>
          Here is an overview of the hospital's operations and statistics.
        </Typography>

        {/* Statistics or Features Grid */}
        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ display: "flex", alignItems: "center", p: 2 }}>
              <CardContent>
                <Typography variant="h5" component="div">
                  {DoctorDetail?.length || 0} {/* Display number of doctors */}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Doctors
                </Typography>
              </CardContent>
              <LocalHospitalIcon color="primary" fontSize="large" />
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ display: "flex", alignItems: "center", p: 2 }}>
              <CardContent>
                <Typography variant="h5" component="div">
                  {tempRegisterDetail?.length || 0} {/* Display number of registered users */}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Registration Officers
                </Typography>
              </CardContent>
              <PeopleIcon color="secondary" fontSize="large" />
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ display: "flex", alignItems: "center", p: 2 }}>
              <CardContent>
                <Typography variant="h5" component="div">
                  {labDetail?.length || 0} {/* Display number of lab tests */}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lab Tests
                </Typography>
              </CardContent>
              <MedicationIcon color="success" fontSize="large" />
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ display: "flex", alignItems: "center", p: 2 }}>
              <CardContent>
                <Typography variant="h5" component="div">
                  {pharmaDetail?.length || 0} {/* Display number of pharmacists */}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Pharmacists
                </Typography>
              </CardContent>
              <AssessmentIcon color="error" fontSize="large" />
            </Card>
          </Grid>
        </Grid>

        {/* Graphs Section */}
        <Grid container spacing={3} sx={{ mt: 4 }}>
          {/* Doctor and Lab Details Chart */}
          <Grid item xs={12} sm={6} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6">Doctors & Lab Tests</Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={combinedDoctorLabData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>

          {/* Pharma and Registration Details Chart */}
          <Grid item xs={12} sm={6} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6">Pharmacists & Registration Officers</Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={combinedPharmaRegistrationData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default AdminDashboard;
