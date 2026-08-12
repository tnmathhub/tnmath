from django.contrib.auth.models import User
from django.db import models


class Student(models.Model):
    MEDIUM_CHOICES = (
        ("ENGLISH", "English"),
        ("TAMIL", "Tamil"),
    )

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="student_profile")
    fullname = models.CharField(max_length=150)
    school = models.CharField(max_length=255)
    district = models.CharField(max_length=100)
    medium = models.CharField(max_length=10, choices=MEDIUM_CHOICES)
    parent_mobile = models.CharField(max_length=16, unique=True)
    parent_mobile_verified = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user.username


class Teacher(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="teacher_profile")
    fullname = models.CharField(max_length=150)
    qualification = models.CharField(max_length=255)
    working_school = models.CharField(max_length=255)
    mobile = models.CharField(max_length=16, unique=True)
    mobile_verified = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user.username