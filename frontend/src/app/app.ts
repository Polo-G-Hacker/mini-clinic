import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

type Role = 'admin' | 'doctor' | 'receptionist' | 'patient';
type Page = 'dashboard' | 'patients' | 'appointments' | 'consultation' | 'billing' | 'patient-booking' | 'settings';

interface Patient {
  id: number;
  patient_id: string;
  name: string;
  age: number;
  gender: string;
  blood_type: string;
  phone: string;
  condition: string;
  status: string;
}

interface Appointment {
  id: number;
  patient_name: string;
  patient_code: string;
  doctor: string;
  appointment_type: string;
  date: string;
  time: string;
  status: string;
  notes: string;
}

interface Bill {
  id: number;
  patient_name: string;
  invoice_no: string;
  amount: number;
  status: string;
}

interface ClinicSettings {
  id?: number;
  clinic_name: string;
  address: string;
  contact_email: string;
  logo_url: string;
}

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private apiUrl = 'http://127.0.0.1:8000/api';

  loggedIn = false;
  role: Role = 'admin';
  activePage: Page = 'dashboard';
  searchText = '';

  login = {
    email: 'admin@clinic.com',
    password: 'password',
    role: 'admin' as Role
  };

  newPatient = {
    name: '',
    age: 0,
    gender: 'Female',
    blood_type: 'A+',
    phone: '',
    condition: '',
    status: 'Active'
  };

  booking = {
    patient_name: '',
    patient_code: '',
    doctor: 'Dr. Sarah Evans',
    appointment_type: 'General Checkup',
    date: new Date().toISOString().slice(0, 10),
    time: '09:00 AM',
    notes: ''
  };

  consultation = {
    diagnosis: 'Essential hypertension (I10) with elevated BP reading.',
    treatment_notes: 'Increase Amlodipine to 10mg. Follow up in 2 weeks.',
    prescription: 'Amlodipine 10mg, once daily for 30 days.'
  };

  clinicSettings: ClinicSettings = {
    clinic_name: 'Mini Clinic',
    address: '',
    contact_email: '',
    logo_url: ''
  };

  patients: Patient[] = [
    { id: 1, patient_id: 'PT-2408', name: 'Sarah Mitchell', age: 34, gender: 'Female', blood_type: 'A+', phone: '+1 555 0192', condition: 'Hypertension', status: 'Active' },
    { id: 2, patient_id: 'PT-2407', name: 'James Okonkwo', age: 27, gender: 'Male', blood_type: 'O+', phone: '+1 555 0284', condition: 'Follow-up', status: 'Active' },
    { id: 3, patient_id: 'PT-2406', name: 'Liu Wei', age: 22, gender: 'Male', blood_type: 'B+', phone: '+1 555 0371', condition: 'General Checkup', status: 'Active' },
    { id: 4, patient_id: 'PT-2405', name: 'Maria Santos', age: 45, gender: 'Female', blood_type: 'AB-', phone: '+1 555 0488', condition: 'Diabetes', status: 'Active' },
    { id: 5, patient_id: 'PT-2404', name: 'Ahmed Khalil', age: 58, gender: 'Male', blood_type: 'O-', phone: '+1 555 0563', condition: 'Respiratory Issue', status: 'Inactive' }
  ];

  appointments: Appointment[] = [
    { id: 1, patient_name: 'Sarah Mitchell', patient_code: 'PT-2408', doctor: 'Dr. Sarah Evans', appointment_type: 'General Checkup', date: '2026-05-26', time: '09:00 AM', status: 'Confirmed', notes: '' },
    { id: 2, patient_name: 'James Okonkwo', patient_code: 'PT-2407', doctor: 'Dr. Raj Patel', appointment_type: 'Follow-up', date: '2026-05-26', time: '09:45 AM', status: 'Confirmed', notes: '' },
    { id: 3, patient_name: 'Liu Wei', patient_code: 'PT-2406', doctor: 'Dr. Sarah Evans', appointment_type: 'Consultation', date: '2026-05-26', time: '10:30 AM', status: 'Waiting', notes: '' }
  ];

  bills: Bill[] = [
    { id: 1, patient_name: 'Sarah Mitchell', invoice_no: 'INV-0892', amount: 185, status: 'Paid' },
    { id: 2, patient_name: 'Liu Wei', invoice_no: 'INV-0893', amount: 75, status: 'Pending' }
  ];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadData();
  }

  signIn(): void {
    this.role = this.login.role;
    this.loggedIn = true;
    this.activePage = this.role === 'patient' ? 'patient-booking' : 'dashboard';
  }

  logout(): void {
    this.loggedIn = false;
  }

  go(page: Page): void {
    this.activePage = page;
  }

  loadData(): void {
    this.http.get<Patient[]>(`${this.apiUrl}/patients/`).subscribe({
      next: data => this.patients = data,
      error: () => {}
    });
    this.http.get<Appointment[]>(`${this.apiUrl}/appointments/`).subscribe({
      next: data => this.appointments = data,
      error: () => {}
    });
    this.http.get<Bill[]>(`${this.apiUrl}/bills/`).subscribe({
      next: data => this.bills = data,
      error: () => {}
    });
    this.http.get<ClinicSettings>(`${this.apiUrl}/settings/`).subscribe({
      next: data => this.clinicSettings = data,
      error: () => {}
    });
  }

  addPatient(): void {
    if (!this.newPatient.name || !this.newPatient.phone) {
      return console.log ("Patient must have a name or a phone number");
    }

    const patientData = { ...this.newPatient };
    this.http.post<Patient>(`${this.apiUrl}/patients/`, patientData).subscribe({
      next: patient => this.patients = [patient, ...this.patients],
      error: () => {
        const patient = {
          id: Date.now(),
          patient_id: `PT-${Math.floor(2500 + Math.random() * 9000)}`,
          ...patientData
        };
        this.patients = [patient, ...this.patients];
      }
    });
    this.newPatient = { name: '', age: 0, gender: 'Female', blood_type: 'A+', phone: '', condition: '', status: 'Active' };
  }

  bookAppointment(): void {
    if (!this.booking.patient_name || !this.booking.date) {
      return;
    }

    const request = { ...this.booking, status: 'Pending' };
    this.http.post<Appointment>(`${this.apiUrl}/appointments/`, request).subscribe({
      next: appointment => this.appointments = [appointment, ...this.appointments],
      error: () => {
        const appointment = { id: Date.now(), ...request };
        this.appointments = [appointment, ...this.appointments];
      }
    });
    this.booking = {
      patient_name: '',
      patient_code: '',
      doctor: 'Dr. Sarah Evans',
      appointment_type: 'General Checkup',
      date: new Date().toISOString().slice(0, 10),
      time: '09:00 AM',
      notes: ''
    };
    this.activePage = this.role === 'patient' ? 'patient-booking' : 'appointments';
  }

  saveConsultation(): void {
    const data = {
      patient_name: 'Sarah Mitchell',
      doctor: 'Dr. Sarah Evans',
      ...this.consultation
    };
    this.http.post(`${this.apiUrl}/consultations/`, data).subscribe({
      next: () => alert('Consultation saved successfully!'),
      error: () => alert('Consultation saved locally.')
    });
  }

  printSummary(): void {
    window.print();
  }

  saveSettings(): void {
    this.http.put(`${this.apiUrl}/settings/1/`, this.clinicSettings).subscribe({
      next: () => alert('Settings saved successfully!'),
      error: () => alert('Failed to save settings.')
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.clinicSettings.logo_url = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  filteredPatients(): Patient[] {
    const query = this.searchText.toLowerCase().trim();
    if (!query) return this.patients;

    return this.patients.filter(patient =>
      (patient.name?.toLowerCase() || '').includes(query) ||
      (patient.patient_id?.toLowerCase() || '').includes(query) ||
      (patient.condition?.toLowerCase() || '').includes(query) ||
      (patient.blood_type?.toLowerCase() || '').includes(query) ||
      (patient.gender?.toLowerCase() || '').includes(query) ||
      (patient.phone?.toLowerCase() || '').includes(query) ||
      (patient.status?.toLowerCase() || '').includes(query) ||
      patient.age.toString().includes(query)
    );
  }

  filteredAppointments(): Appointment[] {
    const query = this.searchText.toLowerCase().trim();
    if (!query) return this.appointments;

    return this.appointments.filter(app =>
      (app.patient_name?.toLowerCase() || '').includes(query) ||
      (app.patient_code?.toLowerCase() || '').includes(query) ||
      (app.doctor?.toLowerCase() || '').includes(query) ||
      (app.appointment_type?.toLowerCase() || '').includes(query) ||
      (app.status?.toLowerCase() || '').includes(query)
    );
  }

  get todaysAppointments(): Appointment[] {
    return this.filteredAppointments().slice(0, 6);
  }

  get revenue(): number {
    return this.bills.filter(bill => bill.status === 'Paid').reduce((sum, bill) => sum + Number(bill.amount), 0);
  }
}
