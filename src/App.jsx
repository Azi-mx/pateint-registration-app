import PatientForm from "./components/PatientForm/PatientForm";
import PatientList from "./components/PatientList/PatientList";
import useDatabase from "./hooks/useDatabase";
import usePatientStore from "./store/patientStore";
import { useEffect, useCallback } from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import {
  Alert,
  CircularProgress,
  Box,
  Container,
  Divider,
  Paper,
  Typography,
  CssBaseline,
} from "@mui/material";

const App = () => {
  const { database, isLoading, error, executeQuery } = useDatabase();
  const patientStore = usePatientStore();

  const loadPatients = useCallback(async () => {
    if (!database || isLoading) return;

    try {
      patientStore.setLoading(true);
      const result = await executeQuery(
        "SELECT * FROM patients ORDER BY createdAt DESC"
      );
      console.log(result, "result from fetching direct");

      if (result && result.rows) {
        patientStore.setPatients(result.rows);
      } else if (result && Array.isArray(result) && result.length > 0) {
        const patients = result.flatMap((row) => row.rows || []);
        patientStore.setPatients(patients);
      } else {
        patientStore.setPatients([]);
      }
    } catch (err) {
      console.error("Error loading patients:", err);
      patientStore.setError(err.message);
    } finally {
      patientStore.setLoading(false);
    }
  }, [database, isLoading, executeQuery, patientStore]);

  useEffect(() => {
    if (database && !isLoading) {
      loadPatients();
    }
  }, [database, isLoading]);

  useEffect(() => {
    if (!database) return;

    const channel = new BroadcastChannel("db_changes");

    const handleMessage = (event) => {
      if (event.data.type === "DB_UPDATED") {
        console.log("Received DB update notification, reloading patients");
        loadPatients();
      }
    };

    channel.addEventListener("message", handleMessage);

    return () => {
      channel.removeEventListener("message", handleMessage);
      channel.close();
    };
  }, [database, loadPatients]);

  if (isLoading) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
          sx={{ backgroundColor: theme.palette.background.default }}
        >
          <Paper
            elevation={3}
            sx={{ p: 4, borderRadius: 2, textAlign: "center", maxWidth: 400 }}
          >
            <Typography variant="h5" color="primary" gutterBottom>
              Welcome to Patient Registration
            </Typography>
            <CircularProgress size={60} thickness={4} sx={{ my: 3 }} />
            <Typography variant="body2" color="text.secondary">
              Loading your information, please wait a moment...
            </Typography>
          </Paper>
        </Box>
      </ThemeProvider>
    );
  }

  if (error) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
          sx={{ backgroundColor: theme.palette.background.default, p: 3 }}
        >
          <Paper elevation={3} sx={{ p: 4, borderRadius: 2, maxWidth: 500 }}>
            <Typography variant="h5" color="error" gutterBottom>
              Database Error
            </Typography>
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 3 }}>
              There was a problem connecting to the database. Please try again
              later or contact support.
            </Typography>
          </Paper>
        </Box>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          backgroundColor: theme.palette.background.default,
          minHeight: "100vh",
          py: 4,
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ mb: 4, textAlign: "center" }}>
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              color="primary"
              sx={{ fontWeight: 600 }}
            >
              Patient Registration System
            </Typography>
          </Box>

          <Paper
            elevation={1}
            sx={{ p: 3, mb: 4, borderRadius: 2, backgroundColor: "#fff" }}
          >
            <PatientForm />
          </Paper>

          <Divider sx={{ my: 4 }} />

          <Paper
            elevation={1}
            sx={{ p: 3, borderRadius: 2, backgroundColor: "#fff" }}
          >
            <PatientList
              patients={patientStore.patients}
              loading={patientStore.loading}
              error={patientStore.error}
            />
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
};
export default App;
