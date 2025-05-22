import { useEffect, useState } from "react";
import { PGlite } from "@electric-sql/pglite";

const useDatabase = () => {
  const [database, setDatabase] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initDb = async () => {
      try {
        setIsLoading(true);

        const db = new PGlite("idb://patient_registration_db");

        
        await db.exec(`
          CREATE TABLE IF NOT EXISTS patients (
            id TEXT PRIMARY KEY,
            firstName TEXT NOT NULL,
            lastName TEXT NOT NULL,
            dateOfBirth TEXT NOT NULL,
            gender TEXT NOT NULL,
            contactNumber TEXT NOT NULL,
            email TEXT NOT NULL,
            address TEXT NOT NULL,
            medicalHistory TEXT,
            createdAt TEXT NOT NULL,
            updatedAt TEXT NOT NULL
          );
        `);

        
        try {
          
          const result = await db.exec("SELECT * FROM patients");

        } catch (error) {

        }

        setDatabase(db);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    initDb();

    const channel = new BroadcastChannel("db_changes");
    channel.onmessage = (event) => {
      if (event.data.type === "DB_UPDATED") {
      }
    };

    return () => channel.close();
  }, []);

  const executeQuery = async (query, params = []) => {
    if (!database) throw new Error("Database not initialized");

    try {
      const result = await database.exec(query, params);

      const channel = new BroadcastChannel("db_changes");
      channel.postMessage({ type: "DB_UPDATED" });

      return result;
    } catch (err) {
      throw err;
    }
  };

  return { database, isLoading, error, executeQuery };
};

export default useDatabase;
