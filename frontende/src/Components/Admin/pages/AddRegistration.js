import { Box, Button, TextField, Grid, Typography, Paper, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // Import Redux hooks
import { AdminDetails } from '../../../redux/userHandle'; // Action to fetch admin details

const AddRegistration = () => {
  // Declare state variables for each field
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const role = "Doctor";

  // Access adminDetails from Redux store
  const dispatch = useDispatch();
  const { adminDetail,currentUser } = useSelector((state) => state.user);
  console.log(currentUser);

  console.log(adminDetail);

  // Fetch admin details when the component mounts
  useEffect(() => {
    dispatch(AdminDetails()); // Fetch admin details from the backend
  }, [dispatch]);

  // Set the hospital name from the fetched admin details
  const [hospitalName, setHospitalName] = useState("");

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // For now, just log the form data
    console.log({
      name,
      hospitalName,
      email,
      password,
      role
    });

    const field = { name, hospitalName, email, password, role };
    // You can replace the console log with actual form submission logic (e.g., API call)
  };

  return (
    <>
      {/* Main Container with center alignment */}
      <Box 
        sx={{
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh', 
          padding: 2
        }}
      >
        {/* Paper Container for a neat card-like design */}
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            borderRadius: 2,
            width: '100%',
            maxWidth: 600, // Maximum width for a smaller form
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
          }}
        >
          {/* Form Header */}
          <Typography variant="h5" align="center" sx={{ marginBottom: 3 }}>
            Add Registration
          </Typography>

          {/* Grid Layout for responsive form */}
          <Grid container spacing={3}>
            {/* Name Input */}
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="name"
                label="Name"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
                sx={{ borderRadius: 1 }}
              />
            </Grid>

            {/* Hospital Name Dropdown */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required variant="outlined">
                <InputLabel id="hospital-name-label">Hospital Name</InputLabel>
                <Select
                  labelId="hospital-name-label"
                  id="hospital-name"
                  value={hospitalName}
                  onChange={(e) => setHospitalName(e.target.value)}
                  label="Hospital Name"
                  sx={{ borderRadius: 1 }}
                >
                  {/* Dynamically populate hospital names from adminDetail */}
                  {adminDetail?.map((admin) => (
                    <MenuItem key={admin._id} value={admin.hospitalName}>
                      {admin.hospitalName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Email Input */}
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email"
                variant="outlined"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ borderRadius: 1 }}
              />
            </Grid>

            {/* Password Input */}
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="password"
                label="Password"
                variant="outlined"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{ borderRadius: 1 }}
              />
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                sx={{
                  padding: 1.5,
                  borderRadius: 1,
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  '&:hover': {
                    backgroundColor: '#1976d2',
                    boxShadow: '0 6px 10px rgba(0, 0, 0, 0.15)',
                  },
                }}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </>
  );
};

export default AddRegistration;
