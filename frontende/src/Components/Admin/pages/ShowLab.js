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
  fetchLabDetail,
  LabhandleDelete,
  LabhandleUpdate,
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

const LabTechnicianDetail = () => {
  const dispatch = useDispatch();
  const { labDetail, loading, error, currentUser } = useSelector(
    (state) => state.user
  );

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedLabTechnician, setSelectedLabTechnician] = useState(null);
  const [updatedLabTechnicianData, setUpdatedLabTechnicianData] = useState({
    labTechnicianName: "",
    labTechnicianEmail: "",
  });

  useEffect(() => {
    if (currentUser) {
      dispatch(fetchLabDetail(currentUser)); // Fetch lab technician details when component mounts
    }
  }, [dispatch, currentUser]);

  const handleEdit = (labTechnician) => {
    setSelectedLabTechnician(labTechnician);
    setUpdatedLabTechnicianData({
      labTechnicianName: labTechnician.labTechnicianName,
      labTechnicianEmail: labTechnician.labTechnicianEmail,
    });
    setEditModalOpen(true);
  };

  const handleUpdate = async () => {
    if (selectedLabTechnician) {
      await dispatch(
        LabhandleUpdate(
          selectedLabTechnician._id,
          updatedLabTechnicianData,
          currentUser
        )
      );
      setEditModalOpen(false);
    }
  };

  const handleDelete = (labTechnicianId) => {
    dispatch(LabhandleDelete(labTechnicianId, currentUser)); // Dispatch delete action with labTechnicianId
  };

  if (loading) return <CircularProgress />; // Show a loader while fetching data

  if (error) {
    return (
      <Typography color="error">
        {error.message || error.error || "An error occurred"}
      </Typography>
    );
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="lab technician details table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Lab Technician Name</TableCell>
              <TableCell>Lab Technician Email</TableCell>
              <TableCell>Actions</TableCell> {/* Action column */}
            </TableRow>
          </TableHead>
          <TableBody>
            {labDetail && labDetail.length > 0 ? (
              labDetail.map((labTechnician, index) => (
                <TableRow
                  key={labTechnician._id}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    "&:hover": { backgroundColor: "#f5f5f5" },
                  }}
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{labTechnician.labTechnicianName}</TableCell>
                  <TableCell>{labTechnician.labTechnicianEmail}</TableCell>
                  <TableCell>
                    {/* Action buttons */}
                    <IconButton
                      onClick={() => handleEdit(labTechnician)}
                      color="primary"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDelete(labTechnician._id)}
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
                  No lab technician details available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Lab Technician Modal */}
      <Dialog open={editModalOpen} onClose={() => setEditModalOpen(false)}>
        <DialogTitle>Edit Lab Technician</DialogTitle>
        <DialogContent>
          <TextField
            label="Lab Technician Name"
            fullWidth
            margin="dense"
            value={updatedLabTechnicianData.labTechnicianName}
            onChange={(e) =>
              setUpdatedLabTechnicianData({
                ...updatedLabTechnicianData,
                labTechnicianName: e.target.value,
              })
            }
          />
          <TextField
            label="Lab Technician Email"
            fullWidth
            margin="dense"
            value={updatedLabTechnicianData.labTechnicianEmail}
            onChange={(e) =>
              setUpdatedLabTechnicianData({
                ...updatedLabTechnicianData,
                labTechnicianEmail: e.target.value,
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

export default LabTechnicianDetail;
