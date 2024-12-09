import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import { Typography, Button, TextField, Grid, FormControlLabel, Checkbox, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { loginUser,cancelDelete } from '../../redux/userHandle';
import { useDispatch, useSelector } from 'react-redux';

const StyledLink = styled(Link)`
  margin-top: 9px;
  text-decoration: none;
  color: #7f56da;
`;

const Login = ({ role }) => {
  const navigate = useNavigate();
  const dispatch= useDispatch();
  const [loader,setLoader] =useState(false);
  const [message,setMessage]= useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const updatedRole= role.charAt(0).toLowerCase()+role.slice(1);
  const {status,response,currentUser,currentRole,error}=useSelector(state=>state.user);
  
  useEffect(() =>{
    console.log("login status:",status);
    console.log("currentloginrole",currentRole);
    if(status === "success"){
      setLoader(false);
      navigate(`/${updatedRole}home`);
    }else if(status === "failed"){
      setLoader(false);
      setMessage(response);
      setTimeout(() =>{
        setMessage("");
        dispatch(cancelDelete());
      },5000)
    }else if (status === "error"){
      setLoader(false);
      setMessage("busy server try again later");
      setTimeout(() => {
        setMessage("")
        dispatch(cancelDelete());
      }, 5000);
    }
  },[status,currentRole,currentUser,navigate,error,response,dispatch,updatedRole]);


 
  const fields={email,password};
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(updatedRole);
    setLoader(true);
    // console.log('Logging in with:', email, password);
    dispatch(loginUser(fields,updatedRole));
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
      }}
    >
      <Box
        sx={{
          width: { xs: '90%', sm: '70%', md: '50%', lg: '40%' }, // Responsive widths
          backgroundColor: 'white',
          padding: { xs: '16px', sm: '24px', md: '32px' },
          borderRadius: '8px',
          boxShadow: 3,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 'bold',
            color: 'primary.main',
            textAlign: 'center',
            textTransform: 'uppercase',
            marginBottom: '16px',
            fontFamily: 'Arial, sans-serif',
          }}
        >
          Please Enter Your Details
        </Typography>

        <Typography variant="h5" sx={{ textAlign: 'center', marginBottom: '16px' }}>
          {role} Login
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            required
            fullWidth
            label="Enter your Email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ marginBottom: '16px' }}
          />

          <TextField
            required
            fullWidth
            label="Password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ marginBottom: '16px' }}
          />
          {message&&<p className='errorlogin courseDetail' style={{ color: "red", marginTop: "5px" }}>{message}</p>}
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={6}>
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
            </Grid>
            <Grid item xs={6} sx={{ textAlign: 'right' }}>
              <StyledLink to={`/resetpassword/${role}`}>
                Forgot password?
              </StyledLink>
            </Grid>
          </Grid>

          <Button
            fullWidth
            sx={{
              marginTop: '16px',
              backgroundColor: 'primary.main',
              color: 'white',
              borderRadius: '8px',
              '&:hover': {
                backgroundColor: 'primary.dark',
              },
              fontWeight: 'bold',
            }}
            type="submit"
          >
            {loader ? <CircularProgress size={24} color='inherit'/>:"Sign In"}
        
          </Button>
        </form>

        {role === 'Admin' && (
          <Box
            sx={{
              marginTop: '16px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <Typography variant="body2">
              If not registered yet
            </Typography>
            <Button
              onClick={() => navigate('/registerAdmin')}
              sx={{ marginTop: '8px' }}
              variant="contained"
            >
              Register
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Login;
