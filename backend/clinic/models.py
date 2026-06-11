from django.db import models


class Patient(models.Model):
    patient_id = models.CharField(max_length=20, unique=True, blank=True)
    name = models.CharField(max_length=120)
    age = models.PositiveIntegerField(default=0)
    gender = models.CharField(max_length=20)
    blood_type = models.CharField(max_length=5, blank=True)
    phone = models.CharField(max_length=30)
    condition = models.CharField(max_length=120, blank=True)
    status = models.CharField(max_length=20, default='Active')
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if not self.patient_id:
            last_patient = Patient.objects.order_by('-id').first()
            if last_patient:
                # Extract number from PT-XXXX
                try:
                    last_num = int(last_patient.patient_id.split('-')[1])
                    new_num = last_num + 1
                except (IndexError, ValueError):
                    new_num = Patient.objects.count() + 2401
            else:
                new_num = 2401
            
            self.patient_id = f'PT-{new_num}'
            
            # Final safety check for uniqueness
            while Patient.objects.filter(patient_id=self.patient_id).exists():
                new_num += 1
                self.patient_id = f'PT-{new_num}'
                
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class Appointment(models.Model):
    patient_name = models.CharField(max_length=120)
    patient_code = models.CharField(max_length=20, blank=True)
    doctor = models.CharField(max_length=120)
    appointment_type = models.CharField(max_length=80)
    date = models.DateField()
    time = models.CharField(max_length=20)
    status = models.CharField(max_length=20, default='Pending')
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.patient_name} with {self.doctor}'


class Consultation(models.Model):
    patient_name = models.CharField(max_length=120)
    doctor = models.CharField(max_length=120)
    symptoms = models.TextField(blank=True)
    diagnosis = models.TextField()
    treatment_notes = models.TextField(blank=True)
    prescription = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Consultation for {self.patient_name}'


class Bill(models.Model):
    patient_name = models.CharField(max_length=120)
    invoice_no = models.CharField(max_length=30, unique=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=20, default='Pending')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.invoice_no


class ClinicSettings(models.Model):
    clinic_name = models.CharField(max_length=120, default='Mini Clinic')
    address = models.TextField(blank=True)
    contact_email = models.EmailField(blank=True)
    logo_url = models.TextField(blank=True)  # Store as base64 or URL

    def __str__(self):
        return self.clinic_name
