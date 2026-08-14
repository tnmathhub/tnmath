from django.shortcuts import render

# Create your views here.
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import StudentRegisterSerializer, TeacherRegisterSerializer


class StudentRegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = StudentRegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        student = serializer.save()

        return Response(
            {
                "message": "Student registered successfully.",
                "user_id": student.user.id,
                "student_id": student.id,
                "username": student.user.username,
            },
            status=status.HTTP_201_CREATED,
        )


class TeacherRegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = TeacherRegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        teacher = serializer.save()

        return Response(
            {
                "message": "Teacher registered successfully.",
                "user_id": teacher.user.id,
                "teacher_id": teacher.id,
                "username": teacher.user.username,
            },
            status=status.HTTP_201_CREATED,
        )