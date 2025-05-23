import React, { useState } from "react";
import "./PatientForm.css";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import { Alert, Snackbar } from "@mui/material";
import useDatabase from "../../hooks/useDatabase";
import { addPatient } from "../../utils/dbHelpers";
import usePatientStore from "../../store/patientStore";
import Divider from "@mui/material/Divider";
const PatientSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("First name is required"),
  lastName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Last name is required"),
  dateOfBirth: Yup.string().required("Date of birth is required"),
  gender: Yup.string()
    .oneOf(["male", "female", "other"], "Invalid gender")
    .required("Gender is required"),
  contactNumber: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
    .required("Contact number is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  address: Yup.string().required("Address is required"),
  medicalHistory: Yup.string(),
});

const PatientForm = ({ onSuccessfulSubmit }) => {
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const pateintStore = usePatientStore();
  const initialValues = {
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    contactNumber: "",
    email: "",
    address: "",
    medicalHistory: "",
  };
  const { database } = useDatabase();

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    if (!database) return;

    try {
      pateintStore.setLoading(true);
      const newPateint = pateintStore.addPatient(values);
      console.log(newPateint, "newPateint");
      const result = await addPatient(database, newPateint);

      console.log(result, "result");
      pateintStore.setLoading(false);
      resetForm();
      setNotification({
        open: true,
        message: "Patient added successfully",
        severity: "success",
      });

      if (onSuccessfulSubmit && typeof onSuccessfulSubmit === "function") {
        onSuccessfulSubmit();
      }
    } catch (error) {
      pateintStore.setLoading(false);
      setNotification({
        open: true,
        message: error.message,
        severity: "error",
      });
    } finally {
      setTimeout(() => {
        setNotification({ open: false, message: "", severity: "" });
      }, 3000);
      setSubmitting(false);
    }
  };
  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };
  return (
    <Paper elevation={0} sx={{ p: 0 }}>
      <Box sx={{ mb: 3, textAlign: "center" }}>
        <Typography
          variant="h5"
          component="h2"
          gutterBottom
          sx={{ fontWeight: 600, color: "primary.main" }}
        >
          Patient Registration Form
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Fill in the details below to register a new patient in the system.
        </Typography>
      </Box>

      <Formik
        initialValues={initialValues}
        validationSchema={PatientSchema}
        onSubmit={handleSubmit}
      >
        {({
          errors,
          touched,
          isSubmitting,
          handleChange,
          handleBlur,
          values,
        }) => (
          <Form>
            <Box sx={{ maxWidth: 800, mx: "auto", p: 2 }}>
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 500,
                  mb: 3,
                  color: "text.primary",
                  textAlign: "left",
                }}
              >
                Personal Information
              </Typography>

              <Grid container spacing={3} flexDirection={"column"}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="firstName"
                    name="firstName"
                    label="First Name"
                    value={values.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.firstName && Boolean(errors.firstName)}
                    helperText={touched.firstName && errors.firstName}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="lastName"
                    name="lastName"
                    label="Last Name"
                    value={values.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.lastName && Boolean(errors.lastName)}
                    helperText={touched.lastName && errors.lastName}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="dateOfBirth"
                    name="dateOfBirth"
                    label="Date of Birth"
                    type="date"
                    value={values.dateOfBirth}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.dateOfBirth && Boolean(errors.dateOfBirth)}
                    helperText={touched.dateOfBirth && errors.dateOfBirth}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl
                    fullWidth
                    error={touched.gender && Boolean(errors.gender)}
                  >
                    <InputLabel id="gender-label">Gender</InputLabel>
                    <Select
                      labelId="gender-label"
                      id="gender"
                      name="gender"
                      value={values.gender}
                      label="Gender"
                      sx={{ textAlign: "left" }}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <MenuItem value="male">Male</MenuItem>
                      <MenuItem value="female">Female</MenuItem>
                      <MenuItem value="other">Other</MenuItem>
                    </Select>
                    {touched.gender && errors.gender && (
                      <FormHelperText>{errors.gender}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>
              </Grid>

              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 500,
                  mt: 4,
                  mb: 3,
                  color: "text.primary",
                  textAlign: "left",
                }}
              >
                Contact Information
              </Typography>

              <Grid container spacing={3} flexDirection={"column"}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="contactNumber"
                    name="contactNumber"
                    label="Contact Number"
                    value={values.contactNumber}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={
                      touched.contactNumber && Boolean(errors.contactNumber)
                    }
                    helperText={touched.contactNumber && errors.contactNumber}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="email"
                    name="email"
                    label="Email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="address"
                    name="address"
                    label="Address"
                    value={values.address}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.address && Boolean(errors.address)}
                    helperText={touched.address && errors.address}
                  />
                </Grid>
              </Grid>

              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 500,
                  mt: 4,
                  mb: 3,
                  color: "text.primary",
                  textAlign: "left",
                }}
              >
                Medical Information
              </Typography>

              <Grid container spacing={3} flexDirection={"column"}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="medicalHistory"
                    name="medicalHistory"
                    label="Medical History"
                    multiline
                    rows={4}
                    value={values.medicalHistory}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={
                      touched.medicalHistory && Boolean(errors.medicalHistory)
                    }
                    helperText={touched.medicalHistory && errors.medicalHistory}
                  />
                </Grid>
              </Grid>

              <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
                <Button
                  type="reset"
                  variant="outlined"
                  color="primary"
                  disabled={isSubmitting}
                  sx={{ mx: 1, minWidth: 120 }}
                >
                  Clear Form
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                  sx={{ mx: 1, minWidth: 180, py: 1 }}
                >
                  {isSubmitting ? (
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <span style={{ marginRight: "8px" }}>Registering</span>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <span className="dot-flashing"></span>
                      </Box>
                    </Box>
                  ) : (
                    "Register Patient"
                  )}
                </Button>
              </Box>
            </Box>
          </Form>
        )}
      </Formik>
      <Snackbar
        open={notification.open}
        autoHideDuration={3000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseNotification}
          severity={notification.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default PatientForm;
