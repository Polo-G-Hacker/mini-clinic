from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import (
    AppointmentViewSet,
    BillViewSet,
    ClinicSettingsViewSet,
    ConsultationViewSet,
    PatientViewSet,
    dashboard_summary,
)

router = DefaultRouter()
router.register('patients', PatientViewSet)
router.register('appointments', AppointmentViewSet)
router.register('consultations', ConsultationViewSet)
router.register('bills', BillViewSet)
router.register('settings', ClinicSettingsViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('dashboard/', dashboard_summary),
]
