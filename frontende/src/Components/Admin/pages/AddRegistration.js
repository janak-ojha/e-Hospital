import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Grid,
  Typography,
  Paper,
  Select,
  MenuItem,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { cancelDelete, registerUser } from "../../../redux/userHandle";
import { useNavigate } from "react-router-dom";

const AddRegistration = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [officerLevel, setOfficerLevel] = useState("");
  const [message, setMessage] = useState("");
  
  const role = "RegisterOffice"; // Defined role

  const dispatch = useDispatch();
  const navigate=useNavigate();
  const { status, response, currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    // Display appropriate messages based on the status or response
    if (status === "added") {
      setMessage("Registration successful!");
      setTimeout(() => setMessage(""), 3000); // Clear message after 3 seconds
      dispatch(cancelDelete());
      navigate("/showRegistration");
    } else if (response === "Email already exists") {
      setMessage("Email already exists. Please try again.");
      setTimeout(() => setMessage(""), 3000); // Clear message after 3 seconds
    } else if (status === "error") {
      setMessage(response || "Email already exist.");
      setTimeout(() => setMessage(""), 3000); // Clear message after 3 seconds
    }
  }, [status, response, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Ensure all fields are filled
    if (!name || !email || !password || !officerLevel) {
      setMessage("All fields are required.");
      setTimeout(() => setMessage(""), 3000);
      return;
    }

    // Ensure user is authenticated
    if (!currentUser || !currentUser.token) {
      setMessage("You are not authenticated. Please log in.");
      setTimeout(() => setMessage(""), 3000);
      return;
    }

    // Dispatch registration action
    const fields = { name, email, password, role, officerLevel };
    dispatch(registerUser(fields, currentUser)); // Pass fields and token
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        padding: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          borderRadius: 2,
          width: "100%",
          maxWidth: 600,
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography variant="h5" align="center" sx={{ marginBottom: 3 }}>
          Add Registration
        </Typography>

        <Typography
  align="center"
  sx={{
    color: message === "Registration successful!" ? "green" : "red",
    marginBottom: 2,
  }}
>
  {message}
</Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3} direction="column">
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="name"
                label="Name"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email"
                variant="outlined"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="username"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="password"
                label="Password"
                variant="outlined"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
              />
            </Grid>

            <Grid item xs={12}>
              <Select
                required
                fullWidth
                id="officerLevel"
                value={officerLevel}
                onChange={(e) => setOfficerLevel(e.target.value)}
                displayEmpty
              >
                <MenuItem value="" disabled>
                  Select Officer Level
                </MenuItem>
                <MenuItem value="Level 1">Level 1</MenuItem>
                <MenuItem value="Level 2">Level 2</MenuItem>
                <MenuItem value="Level 3">Level 3</MenuItem>
              </Select>
            </Grid>

            <Grid item xs={12}>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                color="primary"
                sx={{
                  padding: 1.5,
                  borderRadius: 1,
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  "&:hover": {
                    backgroundColor: "#1976d2",
                    boxShadow: "0 6px 10px rgba(0, 0, 0, 0.15)",
                  },
                }}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default AddRegistration;
