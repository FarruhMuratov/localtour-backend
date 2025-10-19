# Project Context

## Purpose
This project, `localtour-backend`, is a full-stack cross-platform web application for short term local tours focused on "from-to-go" instead of "where-to-go". The goal of the project is to finish developing four main parts: a customer-facing interface adaptive feed for browsing and booking tours with mobile-first development and design approach; a partner-facing interface for creating, managing and selling tours with AI first development approach meaning AI helps create and edit tours to sell; an admin-facing interface for mananging everything, tours, clients, partners, payments, fees, bans, etc. and a backend powered by serverless functions to handle business logic. Additionally, Google's GenAI should be core feature helping clients choose tours fit to them and partners create tours needed to their actual customers and managing tours efficiently.

## Tech Stack
- **Frontend:**
  - **Framework:** React (using Create React App)
  - **Routing:** React Router (`react-router-dom`)
  - **Styling:** Tailwind CSS
- **Backend (Serverless):**
  - **Provider:** Google Firebase
  - **Services:**
    - Firebase Hosting (for the React frontend)
    - Firebase Functions (for backend logic)
    - Cloud Firestore (as the primary database)
    - Firebase Storage (for file/media storage)
    - Firebase Authentication
  - **Function Runtimes:**
    - Node.js (v18) [[memory:9492022]]
    - Python (v3.13)
- **Development:**
  - Firebase Local Emulator Suite is used for local development and testing.

## Project Conventions

### Code Style
- **Frontend:** Follows standard Create React App conventions and ESLint rules (`react-app`, `react-app/jest`).
- **Styling:** Utility-first CSS using Tailwind CSS.

### Architecture Patterns
- **Monorepo-like Structure:** The repository contains the frontend (`src/`), Node.js cloud functions (`functions/`), and Python cloud functions (`python_real_functions/`) in a single repository.
- **Serverless Backend:** Business logic is encapsulated in Firebase Functions, separating concerns between different runtimes (Node.js and Python).
- **Multi-Page Application (MPA):** The frontend is hosted on Firebase Hosting.

### Testing Strategy
- **Frontend:** Uses React Testing Library (`@testing-library/react`) for component testing.
- **Backend:** `firebase-functions-test` is included for testing Node.js functions.

### Git Workflow
- Creating branches for every main step of development with pull requests to the main branch after testing.

## Domain Context
- The application revolves around "tours," which are created and manager by "partners" and are purchased/booked by "users/clients" via "bookings".
- Multilingual support of Uzbek, Russian and English.
- From-to-go concept of developing interface for fast decisions, where the main data of user is its' city and where he can travel from this city today or in the upcoming holidays (nearby mountain hiking, forest hiking, neighbor city sightseeing, cave and canyons tours, etc.).
- For faster deployment, current "From" is Central Asia: Uzbekistan, Kazakhstan, Kyrgyzsta and it's capital or big cities: Tashkent, Samarkand, Astana, Almaty, Bishkek, etc. 
- the proccess of partner creation: a company/freelancer registers to a partner portal with his main data: name, phone, "ИНН"; enters his partner portal and enters addititonal data about himself like type of tours, cities, goals, team, resources, starts creating tours.
- the proccess of creation of a Tour by a partner: It tells/writes to AI information about any tour, provides pictures and/or videos and ranging pricing from min to normal to max; AI creates a draft, which can be edited; tour is sent to publishing; tour is checked by AI for anti-fraud and correct data filling and if it is okay it is published to main customer-facing app.
- partners can be rated by users, users can be rated by partners and block them to visit their tours (users stop seeing their tours in the feed).
- the feed of a customer-facing app is preference based, meaning the backend should gather all actions done in the app and based on this infromation automaticaly create the feed to achieve maximum coversion to sales. 
- platform is free for users and partners to use. PLatform charges partners based on comission from sales from 10% to 20%.
- every partner has a right to create it's own rules for his tours: age, gender, refund, cancel of booking, discounts and etc. 

## Important Constraints
- The project must use Node.js version 18 for its Firebase Functions. [[memory:9492022]]
- The `firebase-functions` package must be kept at version 5.1.1. [[memory:9492022]]
- at this stage, we are not developing actual payment method. Only the interface and the logic for backend.
- main auth method is phone number SMS-verification without recaptcha

## External Dependencies
- **Google Firebase:** The core backend infrastructure.
- **Google Generative AI:** The Python functions use the `google-genai` library integration with AI/ML features (e.g., Gemini).
