from rest_framework import serializers

from .models import Appointment, Bill, ClinicSettings, Consultation, Patient


class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = '__all__'
        read_only_fields = ['patient_id', 'created_at']


class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = '__all__'
        read_only_fields = ['created_at']


class ConsultationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Consultation
        fields = '__all__'
        read_only_fields = ['created_at']


class BillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bill
        fields = '__all__'
        read_only_fields = ['created_at']


class ClinicSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClinicSettings
        fields = '__all__'
