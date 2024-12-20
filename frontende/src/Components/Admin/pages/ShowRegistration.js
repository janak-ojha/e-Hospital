import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { fetchRegisterUsers, RegistrationhandleDelete, RegistrationhandleUpdate } from "../../../redux/userHandle"; // Import actions
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

const BasicTable = () => {
  const dispatch = useDispatch();
  const { tempRegisterDetail, loading, currentUser, error } = useSelector((state) => state.user);
  const [editableUserId, setEditableUserId] = useState(null);
  const [editedUserData, setEditedUserData] = useState({});

  useEffect(() => {
    dispatch(fetchRegisterUsers(currentUser));
  }, [dispatch, currentUser]);

  if (loading) return <p>Loading...</p>;

  // Handle error properly
  if (error) return <p>{error.message || 'An unexpected error occurred.'}</p>;

  const handleDelete = (id) => {
    dispatch(RegistrationhandleDelete(id, currentUser));
  };

  const handleEdit = (user) => {
    setEditableUserId(user._id);
    setEditedUserData({
      name: user.name,
      email: user.email,
      officerLevel: user.officerLevel,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdate = (id) => {
    dispatch(RegistrationhandleUpdate(id, editedUserData, currentUser));
    setEditableUserId(null);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Office Level</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tempRegisterDetail && tempRegisterDetail.length > 0 ? (
            tempRegisterDetail.map((row, index) => (
              <TableRow
                key={row._id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  "&:hover": { backgroundColor: "#f5f5f5" },
                }}
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  {editableUserId === row._id ? (
                    <input
                      type="text"
                      name="name"
                      value={editedUserData.name}
                      onChange={handleChange}
                    />
                  ) : (
                    row.name
                  )}
                </TableCell>
                <TableCell>
                  {editableUserId === row._id ? (
                    <input
                      type="email"
                      name="email"
                      value={editedUserData.email}
                      onChange={handleChange}
                    />
                  ) : (
                    row.email
                  )}
                </TableCell>
                <TableCell>
                  {editableUserId === row._id ? (
                    <input
                      type="text"
                      name="officerLevel"
                      value={editedUserData.officerLevel}
                      onChange={handleChange}
                    />
                  ) : (
                    row.officerLevel
                  )}
                </TableCell>
                <TableCell>
                  {editableUserId === row._id ? (
                    <button onClick={() => handleUpdate(row._id)}>Update</button>
                  ) : (
                    <>
                      <Tooltip title="Edit" arrow>
                        <IconButton onClick={() => handleEdit(row)} color="primary">
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete" arrow>
                        <IconButton onClick={() => handleDelete(row._id)} color="secondary">
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} align="center">
                <Typography variant="body1" color="textSecondary">
                  No data available
                </Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BasicTable;
