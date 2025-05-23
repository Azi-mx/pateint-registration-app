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
  Chip,
  Card,
  CardContent,
  Divider,
  IconButton,
  Tooltip,
} from "@mui/material";
import { format } from "date-fns";
import PersonIcon from "@mui/icons-material/Person";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const PatientList = ({ patients, loading, error }) => {
  console.log(patients, "patients");
  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        my={4}
        py={6}
      >
        <CircularProgress size={50} thickness={4} />
        <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
          Loading patient records...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Card
        variant="outlined"
        sx={{
          my: 4,
          borderColor: "error.light",
          backgroundColor: "error.lightest",
        }}
      >
        <CardContent>
          <Box display="flex" alignItems="center">
            <Typography color="error" variant="h6" sx={{ fontWeight: 500 }}>
              Error Loading Data
            </Typography>
          </Box>
          <Typography color="error.dark" variant="body2" sx={{ mt: 1 }}>
            {error}
          </Typography>
        </CardContent>
      </Card>
    );
  }

  if (!patients || patients.length === 0) {
    return (
      <Card
        variant="outlined"
        sx={{ my: 4, borderStyle: "dashed", borderColor: "divider" }}
      >
        <CardContent sx={{ textAlign: "center", py: 6 }}>
          <PersonIcon sx={{ fontSize: 48, color: "text.disabled", mb: 2 }} />
          <Typography variant="h6" color="text.secondary">
            No Patient Records Found
          </Typography>
          <Typography variant="body2" color="text.disabled" sx={{ mt: 1 }}>
            Register a new patient using the form above
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Box>
          <Typography
            variant="h5"
            component="h2"
            sx={{ fontWeight: 600, color: "primary.main" }}
          >
            Patient Records
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {patients.length} {patients.length === 1 ? "patient" : "patients"}{" "}
            registered in the system
          </Typography>
        </Box>
      </Box>

      <TableContainer
        component={Paper}
        sx={{
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <Table aria-label="patient table">
          <TableHead>
            <TableRow>
              <TableCell
                sx={{ fontWeight: 600, backgroundColor: "primary.lightest" }}
              >
                Name
              </TableCell>
              <TableCell
                sx={{ fontWeight: 600, backgroundColor: "primary.lightest" }}
              >
                Date of Birth
              </TableCell>
              <TableCell
                sx={{ fontWeight: 600, backgroundColor: "primary.lightest" }}
              >
                Gender
              </TableCell>
              <TableCell
                sx={{ fontWeight: 600, backgroundColor: "primary.lightest" }}
              >
                Contact
              </TableCell>
              <TableCell
                sx={{ fontWeight: 600, backgroundColor: "primary.lightest" }}
              >
                Email
              </TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {patients.map((patient, index) => (
              <TableRow
                key={index}
                sx={{ "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.02)" } }}
              >
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Box
                      sx={{
                        width: 32,
                        height: 32,
                        borderRadius: "50%",
                        backgroundColor: "primary.light",
                        color: "white",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mr: 1.5,
                        fontSize: "0.75rem",
                        fontWeight: "bold",
                      }}
                    >
                      {patient.firstname?.charAt(0)}
                      {patient.lastname?.charAt(0)}
                    </Box>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {patient.firstname} {patient.lastname}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        ID: {patient.id?.substring(0, 8)}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  {patient.dateofbirth
                    ? format(new Date(patient.dateofbirth), "MMM dd, yyyy")
                    : "N/A"}
                </TableCell>
                <TableCell>
                  <Chip
                    label={
                      patient.gender?.charAt(0).toUpperCase() +
                      patient.gender?.slice(1)
                    }
                    size="small"
                    sx={{
                      backgroundColor:
                        patient.gender === "male"
                          ? "info.lightest"
                          : patient.gender === "female"
                          ? "secondary.lightest"
                          : "grey.100",
                      color:
                        patient.gender === "male"
                          ? "info.dark"
                          : patient.gender === "female"
                          ? "secondary.dark"
                          : "text.primary",
                      fontWeight: 500,
                      fontSize: "0.75rem",
                    }}
                  />
                </TableCell>
                <TableCell>{patient.contactnumber}</TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{ color: "primary.main" }}>
                    {patient.email}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default PatientList;
