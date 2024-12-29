import React, { useState } from 'react';
import {
    Paper,
    TextField,
    Grid,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Button,
    Box,
    Container,
    Typography,
  } from "@mui/material";

const RegisterPatient = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    address: '',
    phone: '',
    doctorType: '',
    // Add more fields as needed (e.g., email, date of birth, etc.)
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here (e.g., send data to an API)
    console.log(formData);
    // You would typically make an API call here to save the data
    alert("Patient Registered Successfully")
    setFormData({
        name: '',
        age: '',
        address: '',
        phone: '',
        doctorType: '',
        // Add more fields as needed (e.g., email, date of birth, etc.)
      });
  };

  return (
    <Container component="main" maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography component="h1" variant="h5">
            Register Patient
          </Typography>
        </Box>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                value={formData.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="age"
                label="Age"
                name="age"
                type="number"
                autoComplete="age"
                value={formData.age}
                onChange={handleChange}
              />
            </Grid>
             {/* Doctor Type */}
             <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Doctor Type</InputLabel>
                <Select
                  value={formData.doctorType}
                  onChange={handleChange}
                  required
                  inputProps={{
                    autoComplete: "doctor-type",
                  }}
                >
                  <MenuItem value="General Surgeon">General Practitioner</MenuItem>
                  <MenuItem value="Cardiologist">Cardiologist</MenuItem>
                  <MenuItem value="Dermatologist">Dermatologist</MenuItem>
                  <MenuItem value="Endocrinologist">Endocrinologist</MenuItem>
                  <MenuItem value="Hematologist">Hematologist</MenuItem>
                  <MenuItem value="Nephrologist">Nephrologist</MenuItem>
                  <MenuItem value="Neurologist">Neurologist</MenuItem>
                  <MenuItem value="Oncologist">Oncologist</MenuItem>
                  <MenuItem value="Gynecologist">Gynecologist</MenuItem>
                  <MenuItem value="Pediatricians">Pediatricians</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="address"
                label="Address"
                name="address"
                autoComplete="address"
                multiline
                rows={3}
                value={formData.address}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="phone"
                label="Phone Number"
                name="phone"
                type="tel"
                autoComplete="tel"
                value={formData.phone}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Register
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default RegisterPatient;