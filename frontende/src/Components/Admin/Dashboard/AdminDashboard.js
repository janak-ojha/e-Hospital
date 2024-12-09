import React from 'react'
import { Box, Typography, Grid, Card, CardContent } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import AssessmentIcon from "@mui/icons-material/Assessment";
import MedicationIcon from "@mui/icons-material/Medication";
const AdminDashboard = () => {
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
                120
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
                450
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Patients
              </Typography>
            </CardContent>
            <PeopleIcon color="secondary" fontSize="large" />
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ display: "flex", alignItems: "center", p: 2 }}>
            <CardContent>
              <Typography variant="h5" component="div">
                80
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
                50
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Reports
              </Typography>
            </CardContent>
            <AssessmentIcon color="error" fontSize="large" />
          </Card>
        </Grid>
      </Grid>
    </Box>  
            
    </>
  )
}

export default AdminDashboard