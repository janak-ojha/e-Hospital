import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  fetchPharmaDetail,
  PharmahandleDelete,
  PharmahandleUpdate,
 
} from "../../../redux/userHandle"; // Import actions
import CircularProgress from "@mui/material/CircularProgress";
import {
  Typography,
  IconButton,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const PharmacistDetail = () => {
  const dispatch = useDispatch();
  const { pharmaDetail, loading, error, currentUser } = useSelector(
    (state) => state.user
  );

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedPharmacist, setSelectedPharmacist] = useState(null);
  const [updatedPharmacistData, setUpdatedPharmacistData] = useState({
    pharmacistName: "",
    pharmacistEmail: "",
  });

  useEffect(() => {
    if (currentUser) {
      dispatch(fetchPharmaDetail(currentUser)); // Fetch pharmacist details when component mounts
    }
  }, [dispatch, currentUser]);

  const handleEdit = (pharmacist) => {
    setSelectedPharmacist(pharmacist);
    setUpdatedPharmacistData({
      pharmacistName: pharmacist.pharmacistName,
      pharmacistEmail: pharmacist.pharmacistEmail,
    });
    setEditModalOpen(true);
  };

  const handleUpdate = async () => {
    if (selectedPharmacist) {
      await dispatch(PharmahandleUpdate(selectedPharmacist._id, updatedPharmacistData, currentUser));
      setEditModalOpen(false);
    }
  };

  const handleDelete = (pharmacistId) => {
    dispatch(PharmahandleDelete(pharmacistId, currentUser)); // Dispatch delete action with pharmacistId
  };

  if (loading) return <CircularProgress />; // Show a loader while fetching data

  if (error) {
    // Fix for rendering error message
    return <Typography color="error">{error.message || error.error || "An error occurred"}</Typography>;
  } 

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="pharmacist details table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Pharmacist Name</TableCell>
              <TableCell>Pharmacist Email</TableCell>
              <TableCell>Actions</TableCell> {/* Action column */}
            </TableRow>
          </TableHead>
          <TableBody>
            {pharmaDetail && pharmaDetail.length > 0 ? (
               pharmaDetail.map((pharmacist, index) => (
                <TableRow
                  key={pharmacist._id}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    "&:hover": { backgroundColor: "#f5f5f5" },
                  }}
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{pharmacist.pharmacistName}</TableCell>
                  <TableCell>{pharmacist.pharmacistEmail}</TableCell>
                  <TableCell>
                    {/* Action buttons */}
                    <IconButton
                      onClick={() => handleEdit(pharmacist)}
                      color="primary"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDelete(pharmacist._id)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No pharmacist details available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Pharmacist Modal */}
      <Dialog open={editModalOpen} onClose={() => setEditModalOpen(false)}>
        <DialogTitle>Edit Pharmacist</DialogTitle>
        <DialogContent>
          <TextField
            label="Pharmacist Name"
            fullWidth
            margin="dense"
            value={updatedPharmacistData.pharmacistName}
            onChange={(e) =>
              setUpdatedPharmacistData({
                ...updatedPharmacistData,
                pharmacistName: e.target.value,
              })
            }
          />
          <TextField
            label="Pharmacist Email"
            fullWidth
            margin="dense"
            value={updatedPharmacistData.pharmacistEmail}
            onChange={(e) =>
              setUpdatedPharmacistData({
                ...updatedPharmacistData,
                pharmacistEmail: e.target.value,
              })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditModalOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleUpdate} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PharmacistDetail;
