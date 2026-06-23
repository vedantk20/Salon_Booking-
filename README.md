# GlamBook — Salon Booking System
## React Frontend (Spring Boot + MySQL Backend)

---

## Pages in this project

| Page        | Route        | File                        |
|-------------|--------------|------------------------------|
| Landing     | /            | src/pages/LandingPage.jsx    |
| Login       | /login       | src/pages/Login.jsx          |
| Register    | /register    | src/pages/Register.jsx       |
| Services    | /services    | src/pages/Services.jsx       |
| Dashboard   | /dashboard   | src/pages/Dashboard.jsx      |

---

## HOW TO RUN ON YOUR PC

### STEP 1 — Install Node.js
Download from: https://nodejs.org (choose LTS version)
After install, verify:
  node --version
  npm --version

### STEP 2 — Copy this folder to your PC
Put the salon-booking folder anywhere, e.g. C:\Projects\salon-booking

### STEP 3 — Open terminal in the folder
  cd C:\Projects\salon-booking

### STEP 4 — Install dependencies
  npm install

### STEP 5 — Start the app
  npm start

Browser will open automatically at: http://localhost:3000

---

## Pages you can visit right now (frontend only)
- http://localhost:3000            → Landing page
- http://localhost:3000/login      → Login page
- http://localhost:3000/register   → Register page
- http://localhost:3000/services   → All services with booking modal
- http://localhost:3000/dashboard  → Dashboard (needs login)

---

## To connect the Spring Boot backend

1. Run your Spring Boot app on port 8080
2. Edit src/api/axios.js — baseURL is already set to http://localhost:8080/api
3. The login/register forms will call your real API automatically

---

## Backend API endpoints needed

POST /api/auth/login      { email, password } → { token, user }
POST /api/auth/register   { name, email, phone, password }
GET  /api/services        → list of services
POST /api/bookings        { serviceId, date, time, notes }
GET  /api/bookings/my     → user's bookings
DELETE /api/bookings/{id} → cancel booking
