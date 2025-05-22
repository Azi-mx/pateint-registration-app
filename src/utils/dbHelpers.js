export const addPatient = async (db, patient) => {
  const {
    id,
    firstName,
    lastName,
    dateOfBirth,
    gender,
    contactNumber,
    email,
    address,
    medicalHistory,
    createdAt,
    updatedAt,
  } = patient;


  const query = `
  INSERT INTO patients (id, firstName, lastName, dateOfBirth, gender, contactNumber, email, address, medicalHistory, createdAt, updatedAt)
  VALUES (
    '${id}', '${firstName}', '${lastName}', '${dateOfBirth}', '${gender}',
    '${contactNumber}', '${email}', '${address}', '${medicalHistory || ""}',
    '${createdAt}', '${updatedAt}'
  )
  RETURNING *
`;

  try {

    const result = await db.exec(query);

    const verify = await db.exec("SELECT * FROM patients");

    return { success: true, data: patient };
  } catch (error) {

    return { success: false, error: error.message };
  }
};


export const getAllPatients = async (db) => {
  const query = "SELECT * FROM patients ORDER BY createdAt DESC";

  try {
    const result = await db.exec(query);

    return { success: true, data: result.rows };
  } catch (error) {

    return { success: false, error: error.message };
  }
};

export const getPatientById = async (db, id) => {
  const query = "SELECT * FROM patients WHERE id = ?";

  try {
    const result = await db.exec(query, [id]);
    if (result.rows.length === 0) {
      return { success: false, error: "Patient not found" };
    }
    return { success: true, data: result.rows[0] };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
