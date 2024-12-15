import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { Typography, Button, TextField, useTheme, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../redux/userHandle';
import { useSelector, useDispatch } from 'react-redux';

const Registration = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [message, setMessage] = useState('');
  const { status,currentUser,currentRole,Navigate,error,response} = useSelector((state) => state.user);

  // Responsiveness hooks
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm')); // Adjust for small screens


  useEffect(() => {
    console.log("Status: ", status);
  console.log("Response: ", response);
  console.log("Current User: ", currentUser);
    if (status === "success") {
      navigate('/Adminhome');
    } else if (status === 'failed') {
      setMessage(response);
      setTimeout(() => setMessage(''), 5000);
    } else if (status === 'error') {
      setMessage('Server is busy, try again later.');
      setTimeout(() => setMessage(''), 5000);
    }
  }, [status,currentUser,currentRole,Navigate,error,response]);

  // State for form inputs
  const [formData, setFormData] = useState({
    username: '',
    hospitalname: '',
    email: '',
    password: '',
    role: 'Admin', // Default role
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(formData));
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        backgroundColor: 'lightblue',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 2,
      }}
    >
      <Box
        sx={{
          width: isSmallScreen ? '90%' : '50%',
          backgroundColor: 'white',
          borderRadius: 2,
          boxShadow: 3,
          padding: isSmallScreen ? 2 : 4,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 'bold',
            color: 'primary.main',
            textAlign: 'center',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginBottom: 2,
            fontFamily: 'Arial, sans-serif',
            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)',
          }}
        >
          Please Enter Your Details
        </Typography>

        <Typography variant="h5" sx={{ textAlign: 'center', marginBottom: 2 }}>
          Sign Up Admin
        </Typography>

        <form onSubmit={handleSubmit}>
          {/* Input Fields */}
          <TextField
            fullWidth
            required
            label="Enter your Name"
            name="username"
            value={formData.username}
            onChange={handleChange}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            fullWidth
            required
            label="Enter your Hospital Name"
            name="hospitalname"
            value={formData.hospitalname}
            onChange={handleChange}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            fullWidth
            required
            label="Enter your Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            fullWidth
            required
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            sx={{ marginBottom: 3 }}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: 'primary.main',
              color: 'white',
              borderRadius: 2,
              fontWeight: 'bold',
              '&:hover': { backgroundColor: 'primary.dark' },
            }}
          >
            Sign Up
          </Button>
        </form>

        {/* Login Link */}
        <Box sx={{ marginTop: 3, textAlign: 'center' }}>
          <Typography variant="body2" sx={{ marginBottom: 1 }}>
            If already registered
          </Typography>
          <Button
            onClick={() => navigate('/adminlogin')}
            variant="outlined"
            sx={{
              textTransform: 'capitalize',
            }}
          >
            Login
          </Button>
        </Box>

        {/* Error/Message Display */}
        {message && (
          <Typography
            variant="body2"
            sx={{
              color: 'error.main',
              textAlign: 'center',
              marginTop: 2,
            }}
          >
            {message}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default Registration;
