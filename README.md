# Patient Registration System

A modern web application for healthcare providers to register and manage patient information. This application offers a clean, user-friendly interface for entering patient details and viewing patient records.

## Features

- **Patient Registration Form**: Collect comprehensive patient information including personal details, contact information, and medical history
- **Patient Records Display**: View all registered patients in an organized table format
- **Responsive Design**: Optimized for both desktop and mobile devices
- **Local Database Storage**: Patient data is stored locally using PgLite (IndexedDB)
- **Form Validation**: Ensures all required information is properly entered

## Technologies Used

- **React**: Frontend library for building the user interface
- **Material UI**: Component library for consistent and professional UI design
- **Formik & Yup**: Form handling and validation
- **PgLite**: SQL database that runs in the browser using IndexedDB
- **Zustand**: State management
- **Vite**: Build tool and development server

## Setup Instructions

### Prerequisites

- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/yourusername/patient-registration-app.git
   cd patient-registration-app
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Start the development server

   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory and can be deployed to any static hosting service.

## Usage Guide

### Registering a New Patient

1. Fill out the patient registration form with the required information:

   - Personal Information (name, date of birth, gender)
   - Contact Information (phone number, email, address)
   - Medical Information (medical history, allergies, etc.)

2. Click the "Register Patient" button to submit the form

3. A success notification will appear when the patient is successfully registered

### Viewing Patient Records

- All registered patients will appear in the Patient Records table below the registration form
- The table displays key information including name, date of birth, gender, and contact details
- Patient records are sorted with the most recently added patients at the top

## Data Storage

This application uses PgLite, which stores all data locally in your browser's IndexedDB storage. This means:

- No data is sent to external servers
- Data persists between browser sessions
- Data is isolated to the browser/device being used

## Troubleshooting

### Common Issues

- **Form submission errors**: Check that all required fields are filled out correctly
- **Data not appearing in patient list**: Try refreshing the page
- **Application not loading**: Clear browser cache and reload

### Data Reset

To clear all patient data and reset the application:

1. Open your browser's developer tools (F12 or right-click and select "Inspect")
2. Go to the "Application" tab
3. Select "IndexedDB" from the left sidebar
4. Delete the database named "patient-registration-app"

## License

MIT

## Contact

For support or questions, please contact [bagsariyaa@gmail.com](mailto:bagsariyaa@gmail.com)
