import Layout from "./components/Layout/Layout";
import PatientForm from "./components/PatientForm/PatientForm";
import PatientList from "./components/PatientList/PatientList";
import useDatabase from "./hooks/useDatabase";
import usePatientStore from "./store/patientStore";
import { useEffect } from "react";
import {
  Alert,
  CircularProgress,
  Box,
  Container,
  Divider,
} from "@mui/material";

const App = () => {
  const { database, isLoading, error, executeQuery } = useDatabase();
  const patientStore = usePatientStore();


  useEffect(() => {
    if (database && !isLoading) {
      const loadPatients = async () => {
        try {
          const result = await executeQuery(
            "SELECT * FROM patients ORDER BY createdAt DESC"
          );

          if (result.map((row) => row.rows)) {

            const patients = result.map((row) => row.rows);
            patientStore.setPatients(patients);
          } else {

          }
        } catch (err) {

        }
      };

      loadPatients();
    }
  }, [database, isLoading]);

  if (isLoading) {
    return (
      <Layout>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="50vh"
        >
          <CircularProgress />
        </Box>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <Alert severity="error">Database Error: {error}</Alert>
      </Layout>
    );
  }

  return (
    <Layout>
      <Container maxWidth="100%">
        <PatientForm />
        <Divider sx={{ my: 4 }} />
        <PatientList
          patients={patientStore.patients[0]}
          loading={patientStore.loading}
          error={patientStore.error}
        />
      </Container>
    </Layout>
  );
};
export default App;
