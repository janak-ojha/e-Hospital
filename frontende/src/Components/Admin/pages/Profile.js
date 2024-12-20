import React from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import { deepOrange } from "@mui/material/colors";

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);

  // Extract the first two letters from the user's name
  const getAvatarLetters = (name) => {
    return name
      ? name
          .split(" ")
          .map((word) => word[0]?.toUpperCase())
          .slice(0, 2)
          .join("")
      : "NA"; // Default to "NA" if no name is provided
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", // Full-screen height
        backgroundColor: "#f5f5f5", // Light background color
        padding: 2,
      }}
    >
      <Box
        sx={{
          maxWidth: 400,
          width: "100%",
          padding: 4,
          backgroundColor: "white",
          borderRadius: 4,
          boxShadow: 3,
          textAlign: "center",
        }}
      >
        {/* Avatar and User Details */}
        <Stack spacing={2} alignItems="center">
          {/* Avatar with user's initials */}
          <Avatar sx={{ bgcolor: deepOrange[500], width: 72, height: 72 }}>
            {getAvatarLetters(currentUser?.name)}
          </Avatar>

          {/* User Details */}
          <Stack spacing={1} alignItems="center" width="100%">
            <Typography variant="body1">
              <strong>Name:</strong> {currentUser?.name || "Name not available"}
            </Typography>
            <Typography variant="body1">
              <strong>Email:</strong> {currentUser?.email || "Email not available"}
            </Typography>
            <Typography variant="body1">
              <strong>Hospital Name:</strong> {currentUser?.hospitalname || "Hospital not available"}
            </Typography>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}
