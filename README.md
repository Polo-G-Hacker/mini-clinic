# Mini Clinic Management System

A simple web-based clinic app using Angular for the frontend and Django REST Framework for the backend.

## Features

- Role login screen for administrator, doctor, receptionist, and patient
- Dashboard with patients, appointments, revenue, and activity summaries
- Patient registration and searchable patient table
- Appointment list and patient-facing appointment booking
- Doctor consultation screen with vitals, diagnosis, notes, and prescription
- Billing list and revenue summary

## Backend Setup

Python is required for the Django backend.

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py seed_clinic
python manage.py runserver
```

The API runs at `http://127.0.0.1:8000/api/`.

Useful endpoints:

- `GET/POST /api/patients/`
- `GET/POST /api/appointments/`
- `GET/POST /api/consultations/`
- `GET/POST /api/bills/`
- `GET /api/dashboard/`

## Frontend Setup

```bash
cd frontend
npm install
npm start
```

Open `http://localhost:4200/`.

The Angular app uses sample data if the backend is not running. When Django is running, patient registration and appointment booking use the REST API.
