from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Appointment, Bill, ClinicSettings, Consultation, Patient
from .serializers import (
    AppointmentSerializer,
    BillSerializer,
    ClinicSettingsSerializer,
    ConsultationSerializer,
    PatientSerializer,
)


class PatientViewSet(viewsets.ModelViewSet):
    queryset = Patient.objects.order_by('-created_at')
    serializer_class = PatientSerializer


class AppointmentViewSet(viewsets.ModelViewSet):
    queryset = Appointment.objects.order_by('-created_at')
    serializer_class = AppointmentSerializer


class ConsultationViewSet(viewsets.ModelViewSet):
    queryset = Consultation.objects.order_by('-created_at')
    serializer_class = ConsultationSerializer


class BillViewSet(viewsets.ModelViewSet):
    queryset = Bill.objects.order_by('-created_at')
    serializer_class = BillSerializer


class ClinicSettingsViewSet(viewsets.ModelViewSet):
    queryset = ClinicSettings.objects.all()
    serializer_class = ClinicSettingsSerializer

    def list(self, request, *args, **kwargs):
        # Always return the first settings object or create one
        settings, created = ClinicSettings.objects.get_or_create(id=1)
        serializer = self.get_serializer(settings)
        return Response(serializer.data)


@api_view(['GET'])
def dashboard_summary(request):
    paid_bills = Bill.objects.filter(status='Paid')
    revenue = sum(bill.amount for bill in paid_bills)
    return Response({
        'total_patients': Patient.objects.count(),
        'todays_appointments': Appointment.objects.count(),
        'monthly_revenue': revenue,
        'pending_invoices': Bill.objects.filter(status='Pending').count(),
    })
