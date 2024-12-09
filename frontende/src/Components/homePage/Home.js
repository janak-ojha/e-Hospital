import React from 'react';
import { Link } from "react-router-dom";
import { Box, Typography, Button } from '@mui/material';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import MedicationIcon from '@mui/icons-material/Medication';
import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import Hospital1 from '../../Assets/Hospital2.jpg';

const Homes = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: 'center',
        justifyContent: 'center',
        height: "100vh", // Full viewport height
        width: "100%",
        padding: '20px',
        gap: '20px', // Spacing between sections
      }}
    >
      <Box
        sx={{
          flex: 1,
          width: { xs: '100%', sm: '50%' },
        }}
      >
        <img
          src={Hospital1}
          alt="Hospital"
          style={{
            width: '100%',
            height: 'auto',
            borderRadius: '8px', // Rounded corners
          }}
        />
      </Box>

      <Box sx={{ flex: 1, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ marginBottom: '20px' }}>
          Login as:
        </Typography>
        {[
          { to: "/adminlogin", icon: <AdminPanelSettingsIcon />, label: 'Admin' },
          { to: "/registrationlogin", icon: <AppRegistrationIcon />, label: 'Registration' },
          { to: "/doctorlogin", icon: <MedicationIcon />, label: 'Doctor' },
          { to: "/labtechnicianlogin", icon: <VaccinesIcon />, label: 'Lab Technician' },
          { to: "/pharmalogin", icon: <LocalPharmacyIcon />, label: 'Pharmacist' },
        ].map((button, index) => (
          <Button
            key={index}
            component={Link}
            to={button.to}
            variant="contained"
            sx={{
              margin: '10px',
              fontSize: '1.2rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '12px 20px',
              textTransform: 'none',
            }}
          >
            {button.icon}
            <span style={{ marginLeft: '10px' }}>{button.label}</span>
          </Button>
        ))}
      </Box>
    </Box>
  );
};

export default Homes;
