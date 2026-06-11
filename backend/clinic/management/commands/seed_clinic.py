from django.core.management.base import BaseCommand

from clinic.models import Appointment, Bill, Patient


class Command(BaseCommand):
    help = 'Create sample clinic records for development.'

    def handle(self, *args, **options):
        patients = [
            ('PT-2408', 'Sarah Mitchell', 34, 'Female', 'A+', '+1 555 0192', 'Hypertension', 'Active'),
            ('PT-2407', 'James Okonkwo', 27, 'Male', 'O+', '+1 555 0284', 'Follow-up', 'Active'),
            ('PT-2406', 'Liu Wei', 22, 'Male', 'B+', '+1 555 0371', 'General Checkup', 'Active'),
            ('PT-2405', 'Maria Santos', 45, 'Female', 'AB-', '+1 555 0488', 'Diabetes', 'Active'),
            ('PT-2404', 'Ahmed Khalil', 58, 'Male', 'O-', '+1 555 0563', 'Respiratory Issue', 'Inactive'),
        ]

        for row in patients:
            Patient.objects.update_or_create(
                patient_id=row[0],
                defaults={
                    'name': row[1],
                    'age': row[2],
                    'gender': row[3],
                    'blood_type': row[4],
                    'phone': row[5],
                    'condition': row[6],
                    'status': row[7],
                },
            )

        appointments = [
            ('Sarah Mitchell', 'PT-2408', 'Dr. Sarah Evans', 'General Checkup', '2026-05-26', '09:00 AM', 'Confirmed'),
            ('James Okonkwo', 'PT-2407', 'Dr. Raj Patel', 'Follow-up', '2026-05-26', '09:45 AM', 'Confirmed'),
            ('Liu Wei', 'PT-2406', 'Dr. Sarah Evans', 'Consultation', '2026-05-26', '10:30 AM', 'Waiting'),
        ]

        for row in appointments:
            Appointment.objects.update_or_create(
                patient_name=row[0],
                time=row[5],
                defaults={
                    'patient_code': row[1],
                    'doctor': row[2],
                    'appointment_type': row[3],
                    'date': row[4],
                    'status': row[6],
                    'notes': '',
                },
            )

        bills = [
            ('INV-0892', 'Sarah Mitchell', 185, 'Paid'),
            ('INV-0893', 'Liu Wei', 75, 'Pending'),
        ]

        for invoice_no, patient_name, amount, status in bills:
            Bill.objects.update_or_create(
                invoice_no=invoice_no,
                defaults={'patient_name': patient_name, 'amount': amount, 'status': status},
            )

        self.stdout.write(self.style.SUCCESS('Sample clinic data is ready.'))
