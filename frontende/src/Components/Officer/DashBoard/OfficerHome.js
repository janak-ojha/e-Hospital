import React, { useEffect } from 'react';
import { Box, Typography, Grid, Card, CardContent, Button, Container, Divider } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { AllDoctorForSpecificHospitals } from "../../../redux/userHandle";

const OfficerHome = () => {
  const { currentUser, DoctorDetail } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const hospitalId = currentUser?.hospitalname;

  useEffect(() => {
    if (hospitalId) {
      dispatch(AllDoctorForSpecificHospitals(hospitalId, currentUser));
    }
  }, [dispatch, hospitalId, currentUser]);

  // Extract hospital name and details
  const hospitalName = DoctorDetail?.[0]?.hospitalname?.username || "Your Hospital";

  return (
    <>
      <Box sx={{ padding: '20px', backgroundColor: '#f4f6f8', minHeight: '100vh' }}>
        <Container maxWidth="lg">
          {/* Header Section */}
          <Box
            sx={{
              textAlign: 'center',
              mb: 6,
              backgroundColor: '#ffffff',
              borderRadius: 2,
              boxShadow: 3,
              padding: 4,
            }}
          >
            <Typography variant="h2" color="primary" fontWeight="bold">
              Welcome to {hospitalName}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              sx={{ marginTop: 2, fontSize: '1.2rem' }}
            >
              Providing Quality Care and Advanced Medical Facilities for Your Well-being
            </Typography>
          </Box>

          {/* Doctors Section */}
          <Box
            sx={{
              mb: 6,
              p: 4,
              backgroundColor: '#ffffff',
              borderRadius: 2,
              boxShadow: 3,
            }}
          >
            <Typography variant="h4" color="primary" gutterBottom>
              Doctors at {hospitalName}
            </Typography>
            <Divider sx={{ mb: 2 }} />
            {DoctorDetail && DoctorDetail.length > 0 ? (
              <Grid container spacing={3}>
                {DoctorDetail.map((doctor) => (
                  <Grid item xs={12} sm={6} md={4} key={doctor._id}>
                    <Card
                      sx={{
                        borderRadius: 2,
                        boxShadow: 3,
                        textAlign: 'center',
                        padding: 3,
                        '&:hover': {
                          transform: 'scale(1.02)',
                          transition: 'transform 0.3s',
                        },
                      }}
                    >
                      <CardContent>
                        <Typography variant="h5" color="primary">
                          {doctor.username}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                          {doctor.doctorType}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Typography variant="body1" color="text.secondary">
                No doctors available.
              </Typography>
            )}
          </Box>

          {/* About Hospital Section */}
          <Box
            sx={{
              mb: 6,
              p: 4,
              backgroundColor: '#ffffff',
              borderRadius: 2,
              boxShadow: 3,
            }}
          >
            <Typography variant="h4" color="primary" gutterBottom>
              About {hospitalName}
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ fontSize: '1rem', lineHeight: 1.8 }}
            >
              {hospitalName} has been at the forefront of medical excellence for over 10 years. Our
              state-of-the-art facilities, highly qualified doctors, and compassionate care make us
              a leader in healthcare. From routine check-ups to advanced surgeries, we are
              committed to providing the best possible care to our patients.
            </Typography>
          </Box>

          {/* Footer Section */}
          <Box
            sx={{
              mt: 6,
              textAlign: 'center',
              py: 3,
              backgroundColor: '#3f51b5',
              color: 'white',
              borderRadius: 2,
            }}
          >
            <Typography variant="body1">© 2024 {hospitalName}. All Rights Reserved.</Typography>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default OfficerHome;
