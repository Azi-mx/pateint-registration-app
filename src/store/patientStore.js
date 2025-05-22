import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";

const usePatientStore = create((set) => ({
  patients: [],
  loading: false,
  error: null,

  setPatients: (patients) => set({ patients }),

  addPatient: (patient) => {
    const newPatient = {
      ...patient,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    set((state) => ({
      patients: [...state.patients, newPatient],
    }));

    return newPatient;
  },

  setLoading: (loading) => set({ loading }),

  setError: (error) => set({ error }),
}));

export default usePatientStore;
