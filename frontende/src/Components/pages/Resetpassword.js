import React, { useEffect, useState } from 'react';
import Box from "@mui/material/Box";
import { Button, TextField, Typography, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { cancelDelete, handleResetPassword } from '../../redux/userHandle';
import { Link, useParams } from 'react-router-dom';

const Resetpassword = () => {
const {response,loading} = useSelector((state) => state.user); 
  const [email, setEmail] = useState(''); // State to manage the email input
  const[loader,setLoader]=useState(false);
  const[message,setMessage]=useState(false);
  const[message1,setMessage1]=useState(false);
  const[loginClicked,setLoginClicked]=useState(false);
  const dispatch=useDispatch();
  const {role} = useParams();

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault(); 
    setLoginClicked(true);
    if(email === "" || email === null){

    }else{
        dispatch(handleResetPassword(email,role));
    }
   
  };

  useEffect(() =>{
    if(response === "Email sent successfully."){
        setMessage(true);
        setMessage1(false);
        dispatch(cancelDelete());
        const timeout=setTimeout(() =>{
            setMessage1(false);
            dispatch(cancelDelete());
        },60000)
        return ()=>clearTimeout(timeout);
    }else if(response === "email doesn't exist."){
        setMessage(false);
        setMessage1(true);
        const timeout=setTimeout(() =>{
            setMessage1(false);
            dispatch(cancelDelete());
        },2500)
        return () => clearTimeout(timeout);
    }
  },[response]);

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',  // Full viewport height
          backgroundColor: '#f4f6f8',  // Light background color
        }}
      >
        <Box
          sx={{
            backgroundColor: 'white',
            padding: 4,
            borderRadius: 2,
            boxShadow: 3,
            width: { xs: '90%', sm: '60%', md: '40%' }, // Responsive width
          }}
        >
          <Grid container spacing={3}>
            {/* Title */}
            <Grid item xs={12}>
              <Typography variant="h4" align="center" sx={{ fontWeight: 'bold' }}>
                Enter Your Email
              </Typography>
            </Grid>

            {/* Email Input Field */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                id="email"
                label="Email Address"
                variant="outlined"
                placeholder="Enter your email"
                value={email} // Bind the state to the value
                onChange={(e) => setEmail(e.target.value)} // Update the state with the input value
                sx={{
                  borderRadius: 1,
                  backgroundColor: '#f7f7f7',
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#ccc',
                    },
                  },
                }}
              />
            </Grid>

            {/* Send Button */}
            <Grid item xs={12}>
            {message?<p className='courseDetail' style={{color:"green"}}>The password reset link has been successfully sent to your Gmail.</p>:""}
            {message1?<p className='courseDetail' style={{color:"red"}}>User with this email doesn't exist.</p>:""}
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleSubmit} // Attach handleSubmit function to button
                sx={{
                  padding: '12px',
                  fontSize: '16px',
                  '&:hover': {
                    backgroundColor: '#3b5bdb',  // Darker shade for hover effect
                  },
                }}
              >
                {loading?"loading...":"Send"}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default Resetpassword;
