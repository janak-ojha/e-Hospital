import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Grid,
  Typography,
  Paper,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, cancelDelete } from "../../../redux/userHandle";
import { useNavigate } from "react-router-dom";

const LabTechnicianForm = () => {
  const [formData, setFormData] = useState({
    labTechnicianName: "",
    labTechnicianEmail: "",
    password: "",
    role: "LabTechnician", // Default role
  });
  const [message, setMessage] = useState("");
  const [loader, setLoader] = useState(false); // Loader state
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, response, currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    if (status === "added") {
      setMessage("Registration successful!");
      setLoader(false); // Stop loader
      setTimeout(() => {
        setMessage("");
        dispatch(cancelDelete());
        navigate("/showLabTechnician");
      }, 3000);
    } else if (response === "Email already exists") {
      setMessage("Email already exists. Please try again.");
      setLoader(false); // Stop loader
      setTimeout(() => setMessage(""), 2000);
    } else if (status === "error") {
      setMessage(response || "An error occurred.");
      setLoader(false); // Stop loader
      setTimeout(() => setMessage(""), 2000);
    }
  }, [status, response, dispatch, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate input fields
    if (!formData.labTechnicianName || !formData.labTechnicianEmail || !formData.password) {
      setMessage("All fields are required.");
      setTimeout(() => setMessage(""), 2000);
      return;
    }
    // Ensure user is authenticated
    if (!currentUser || !currentUser.token) {
      setMessage("You are not authenticated. Please log in.");
      setTimeout(() => setMessage(""), 3000);
      return;
    }
    // Dispatch registration action
    setLoader(true); // Start loader
    dispatch(registerUser(formData, currentUser)); // Pass fields and token
    setFormData({
      labTechnicianName: "",
      labTechnicianEmail: "",
      password: "",
      role: "LabTechnician",
    });
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
          Add Lab Technician
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
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Lab Technician Name"
                name="labTechnicianName"
                value={formData.labTechnicianName}
                onChange={handleChange}
                fullWidth
                required
                autoComplete="name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Lab Technician Email"
                name="labTechnicianEmail"
                type="email"
                value={formData.labTechnicianEmail}
                onChange={handleChange}
                fullWidth
                required
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                fullWidth
                required
                autoComplete="new-password"
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{
                  padding: 1.5,
                  borderRadius: 1,
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  "&:hover": {
                    backgroundColor: "#1976d2",
                    boxShadow: "0 6px 10px rgba(0, 0, 0, 0.15)",
                  },
                }}
                disabled={loader} // Disable button while loading
              >
                {loader ? "Processing..." : "Submit"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default LabTechnicianForm;
