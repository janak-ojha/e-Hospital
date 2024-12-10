import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Grid,
  Typography,
  Paper,
  CircularProgress,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../../redux/userHandle";
import { useNavigate } from "react-router-dom";
import Toast from "../../../Pages/Toast";
import AddedSuccesfully from "../../../Pages/Toastse/AddedSuccesfully";


const AddRegistration = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [addedRegister, setAddedRegister] = useState(false);
  const [loader, setLoader] = useState(false);

  const role = "RegisterOffice";

  const dispatch = useDispatch();
  const { status, response } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (status === "added") {
      setAddedRegister(true); // Trigger success toast
      setLoader(false);
      setTimeout(() => {
        setAddedRegister(false); // Hide success toast
        navigate("/"); // Redirect
      }, 2000);
    } else if (status === "failed") {
      setMessage(response || "Registration failed."); // Set failure message
      setLoader(false);
      setTimeout(() => setMessage(""), 5000); // Clear failure message
    } else if (status === "error") {
      setMessage("Server is busy, try again later."); // Set server error message
      setLoader(false);
      setTimeout(() => setMessage(""), 5000); // Clear error message
    }
  }, [status, response, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setMessage("All fields are required.");
      setTimeout(() => setMessage(""), 3000);
      return;
    }
    setLoader(true);
    const fields = { name, email, password, role };
    dispatch(registerUser(fields));
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
      {/* Render success toast only when addedRegister is true */}
      {addedRegister && <AddedSuccesfully/>}

      {/* Render error toast only when message is set */}
      {message && <Toast message={message} />}

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
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                color="primary"
                disabled={loader}
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
                {loader ? <CircularProgress size={24} /> : "Submit"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default AddRegistration;
