from django.contrib import admin

from .models import Appointment, Bill, Consultation, Patient

admin.site.register(Patient)
admin.site.register(Appointment)
admin.site.register(Consultation)
admin.site.register(Bill)
