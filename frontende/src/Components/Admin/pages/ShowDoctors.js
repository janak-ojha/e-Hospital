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
  fetchDoctorDetail,
  DoctorhandleDelete,
  DeletehandleUpdate,
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

const DoctorDetail = () => {
  const dispatch = useDispatch();
  const { DoctorDetail, loading, error, currentUser } = useSelector(
    (state) => state.user
  );

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [updatedDoctorData, setUpdatedDoctorData] = useState({
    doctorName: "",
    doctorEmail: "",
    doctorType: "",
  });

  useEffect(() => {
    if (currentUser) {
      dispatch(fetchDoctorDetail(currentUser)); // Fetch doctor details when component mounts
    }
  }, [dispatch, currentUser]);

  const handleEdit = (doctor) => {
    setSelectedDoctor(doctor);
    setUpdatedDoctorData({
      doctorName: doctor.doctorName,
      doctorEmail: doctor.doctorEmail,
      doctorType: doctor.doctorType,
    });
    setEditModalOpen(true);
  };

  const handleUpdate = async () => {
    if (selectedDoctor) {
      await dispatch(DeletehandleUpdate(selectedDoctor._id, updatedDoctorData, currentUser));
      setEditModalOpen(false);
    }
  };

  const handleDelete = (doctorId) => {
    dispatch(DoctorhandleDelete(doctorId, currentUser)); // Dispatch delete action with doctorId
  };

  if (loading) return <CircularProgress />; // Show a loader while fetching data

  if (error) return <Typography color="error">{error}</Typography>; // Show error if any

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="doctor details table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Doctor Name</TableCell>
              <TableCell>Doctor Email</TableCell>
              <TableCell>Doctor Type</TableCell>
              <TableCell>Actions</TableCell> {/* Added actions column */}
            </TableRow>
          </TableHead>
          <TableBody>
            {DoctorDetail && DoctorDetail.length > 0 ? (
              DoctorDetail.map((doctor, index) => (
                <TableRow
                  key={doctor._id}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    "&:hover": { backgroundColor: "#f5f5f5" },
                  }}
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{doctor.doctorName}</TableCell>
                  <TableCell>{doctor.doctorEmail}</TableCell>
                  <TableCell>{doctor.doctorType}</TableCell>
                  <TableCell>
                    {/* Action buttons */}
                    <IconButton
                      onClick={() => handleEdit(doctor)}
                      color="primary"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDelete(doctor._id)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No doctor details available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Doctor Modal */}
      <Dialog open={editModalOpen} onClose={() => setEditModalOpen(false)}>
        <DialogTitle>Edit Doctor</DialogTitle>
        <DialogContent>
          <TextField
            label="Doctor Name"
            fullWidth
            margin="dense"
            value={updatedDoctorData.doctorName}
            onChange={(e) =>
              setUpdatedDoctorData({ ...updatedDoctorData, doctorName: e.target.value })
            }
          />
          <TextField
            label="Doctor Email"
            fullWidth
            margin="dense"
            value={updatedDoctorData.doctorEmail}
            onChange={(e) =>
              setUpdatedDoctorData({ ...updatedDoctorData, doctorEmail: e.target.value })
            }
          />
          <TextField
            label="Doctor Type"
            fullWidth
            margin="dense"
            value={updatedDoctorData.doctorType}
            onChange={(e) =>
              setUpdatedDoctorData({ ...updatedDoctorData, doctorType: e.target.value })
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

export default DoctorDetail;
