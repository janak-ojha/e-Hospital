import React, { useState, useEffect } from "react";
import {
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
import { useDispatch, useSelector } from "react-redux";
import { cancelDelete, registerUser } from "../../../redux/userHandle";
import { useNavigate } from "react-router-dom";

function DoctorForm() {
  const [doctorName, setDoctorName] = useState("");
  const [doctorEmail, setDoctorEmail] = useState("");
  const [doctorType, setDoctorType] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loader, setLoader] = useState(false); // Loader state

  const role = "Doctor"; // Defined role
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, response, currentUser } = useSelector((state) => state.user);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!doctorName || !doctorEmail || !doctorType || !password) {
      setMessage("All fields are required.");
      setTimeout(() => setMessage(""), 1000);
      return;
    }

    setLoader(true); // Start loader
    const fields = { doctorName, doctorEmail, password, doctorType, role };
    dispatch(registerUser(fields, currentUser));
  };

  useEffect(() => {
    if (status === "added") {
      setMessage("Registration successful!");
      setLoader(false); // Stop loader
      setTimeout(() => {
        setMessage("");
        dispatch(cancelDelete());
        navigate("/showDoctor");
      }, 2000);
    } else if (response === "Email already exists") {
      setMessage("Email already exists. Please try again.");
      setLoader(false); // Stop loader
      setTimeout(() => setMessage(""), 1000);
    } else if (status === "error") {
      setMessage(response || "An error occurred.");
      setLoader(false); // Stop loader
      setTimeout(() => setMessage(""), 1000);
    }
  }, [status, response, dispatch, navigate]);

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          width: "100%",
          padding: 3,
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: "background.paper",
        }}
      >
        <Typography
          variant="h5"
          component="h1"
          align="center"
          sx={{ marginBottom: 3 }}
        >
          Add Doctor
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
            {/* Doctor Name */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Doctor Name"
                value={doctorName}
                onChange={(e) => setDoctorName(e.target.value)}
                required
                autoComplete="doctorname"
              />
            </Grid>

            {/* Doctor Email */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Doctor Email"
                value={doctorEmail}
                onChange={(e) => setDoctorEmail(e.target.value)}
                type="email"
                required
                autoComplete="doctoremail"
              />
            </Grid>

            {/* Doctor Type */}
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Doctor Type</InputLabel>
                <Select
                  value={doctorType}
                  onChange={(e) => setDoctorType(e.target.value)}
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

            {/* Password */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                required
                autoComplete="new-password"
              />
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={loader} // Disable button while loading
              >
                {loader ? <div className="load"></div> : "Submit"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
}

export default DoctorForm;
