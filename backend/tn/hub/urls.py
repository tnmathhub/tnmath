from django.urls import path

from .views import StudentRegisterView, TeacherRegisterView

urlpatterns = [
    path("register/student/", StudentRegisterView.as_view(), name="register-student"),
    path("register/teacher/", TeacherRegisterView.as_view(), name="register-teacher"),
]