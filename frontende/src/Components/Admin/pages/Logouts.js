// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { logout } from "../../../redux/userSlice"; // Adjust path as needed
// import Button from "@mui/material/Button";
// import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";
// import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
// import DialogTitle from "@mui/material/DialogTitle";

// const Logouts = () => {
//   const [open, setOpen] = useState(false);
//   const dispatch = useDispatch();

//   // Open confirmation dialog
//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   // Close confirmation dialog
//   const handleClose = () => {
//     setOpen(false);
//   };

//   // Handle logout action
//   const handleLogout = () => {
//     dispatch(logout()); // Dispatch logout action from the Redux slice
//     setOpen(false);
//     // Redirect to login page or perform any other logout actions
//     window.location.href = "/login"; // Example redirect
//   };

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         height: "100vh",
//         backgroundColor: "#f5f5f5",
//       }}
//     >
//       <Box
//         sx={{
//           padding: 3,
//           backgroundColor: "white",
//           borderRadius: 2,
//           boxShadow: 3,
//           textAlign: "center",
//         }}
//       >
//         <Typography variant="h6" gutterBottom>
//           Are you sure you want to log out?
//         </Typography>
//         <Button variant="contained" color="primary" onClick={handleClickOpen}>
//           Logout
//         </Button>

//         {/* Confirmation Dialog */}
//         <Dialog open={open} onClose={handleClose}>
//           <DialogTitle>{"Confirm Logout"}</DialogTitle>
//           <DialogContent>
//             <DialogContentText>
//               Are you sure you want to log out? You will need to log in again to access your account.
//             </DialogContentText>
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={handleClose} color="secondary">
//               Cancel
//             </Button>
//             <Button onClick={handleLogout} color="primary" variant="contained">
//               Logout
//             </Button>
//           </DialogActions>
//         </Dialog>
//       </Box>
//     </Box>
//   );
// };

// export default Logouts;
