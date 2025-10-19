<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# LocalTour Backend & Frontend

This repository contains the complete source code for the LocalTour platform, including the Firebase backend and the React/Vite-based frontend.

## Running the Project Locally

**Prerequisites:**
*   Node.js (v20 or higher recommended)
*   Firebase CLI (`npm install -g firebase-tools`)

### 1. Initial Setup

First, install all the necessary dependencies for both the frontend and the backend functions:
```bash
# Install root (frontend) dependencies
npm install

# Install Cloud Functions dependencies
cd functions
npm install
cd ..
```

### 2. Environment Variables

Create a `.env` file in the root of the project and add your Firebase project configuration. The keys MUST be prefixed with `VITE_`:
```
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
# ... and so on for all keys
```

### 3. Running the Emulators and Frontend

You will need two separate terminals to run the project.

**In Terminal 1 - Start the Firebase Emulators:**
This will launch a local version of Firestore, Auth, Storage, and your Cloud Functions.
```bash
firebase emulators:start --import=./emulator-data
```
The Emulator Suite UI will be available at `http://localhost:4000`.

**In Terminal 2 - Start the Frontend Dev Server:**
This will launch the React application.
```bash
npm run dev
```
The application will be available at `http://localhost:3000` (or the next available port).
