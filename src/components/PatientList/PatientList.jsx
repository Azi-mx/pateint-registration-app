import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import { format } from "date-fns";

const PatientList = ({ patients, loading, error }) => {

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" my={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box my={4}>
        <Typography color="error" variant="body1">
          Error loading patients: {error}
        </Typography>
      </Box>
    );
  }

  if (!patients || patients.length === 0) {
    return (
      <Box my={4}>
        <Typography variant="body1">No patients found.</Typography>
      </Box>
    );
  }

  return (
    <Box mt={4}>
      <Typography variant="h5" component="h2" gutterBottom>
        Patient Records
      </Typography>
      <TableContainer component={Paper}>
        <Table aria-label="patient table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Date of Birth</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Contact</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Address</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {patients.map((patient, index) => (
              <TableRow key={index}>
                <TableCell>
                  {patient.firstname} {patient.lastname}
                </TableCell>
                <TableCell>
                  {patient.dateofbirth
                    ? format(new Date(patient.dateofbirth), "MMM dd, yyyy")
                    : "N/A"}
                </TableCell>
                <TableCell>
                  {patient.gender.charAt(0).toUpperCase() +
                    patient.gender.slice(1)}
                </TableCell>
                <TableCell>{patient.contactnumber}</TableCell>
                <TableCell>{patient.email}</TableCell>
                <TableCell>{patient.address}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default PatientList;
