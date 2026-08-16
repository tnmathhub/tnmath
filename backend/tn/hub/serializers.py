from django.contrib.auth.models import User
from django.db import transaction
from rest_framework import serializers

from .models import Student, Teacher


def normalize_indian_mobile(mobile):
    mobile = str(mobile).strip().replace(" ", "").replace("-", "")

    if mobile.startswith("+91") and len(mobile) == 13:
        return mobile

    if mobile.startswith("91") and len(mobile) == 12:
        return f"+{mobile}"

    if len(mobile) == 10 and mobile.isdigit():
        return f"+91{mobile}"

    raise serializers.ValidationError("Enter a valid Indian mobile number.")


class StudentRegisterSerializer(serializers.Serializer):
    fullname = serializers.CharField(max_length=150)
    username = serializers.CharField(max_length=150)
    school = serializers.CharField(max_length=255)
    district = serializers.CharField(max_length=100)
    medium = serializers.ChoiceField(choices=["ENGLISH", "TAMIL"])
    email = serializers.EmailField()
    parent_mobile = serializers.CharField(max_length=16)
    password = serializers.CharField(write_only=True, min_length=8)

    def validate_username(self, value):
        if User.objects.filter(username__iexact=value).exists():
            raise serializers.ValidationError("Username already exists.")
        return value

    def validate_email(self, value):
        value = value.lower().strip()

        if User.objects.filter(email__iexact=value).exists():
            raise serializers.ValidationError("Email already exists.")

        return value

    def validate_parent_mobile(self, value):
        value = normalize_indian_mobile(value)

        if Student.objects.filter(parent_mobile=value).exists():
            raise serializers.ValidationError("Parent mobile already registered.")

        return value

    @transaction.atomic
    def create(self, validated_data):
        password = validated_data.pop("password")
        email = validated_data.pop("email")
        username = validated_data.pop("username")

        user = User.objects.create_user(
            username=username,
            email=email,
            password=password,
        )

        student = Student.objects.create(
            user=user,
            parent_mobile_verified=False,
            **validated_data,
        )
        return student


class TeacherRegisterSerializer(serializers.Serializer):
    fullname = serializers.CharField(max_length=150)
    username = serializers.CharField(max_length=150)
    qualification = serializers.CharField(max_length=255)
    working_school = serializers.CharField(max_length=255)
    email = serializers.EmailField()
    mobile = serializers.CharField(max_length=16)
    password = serializers.CharField(write_only=True, min_length=8)

    def validate_username(self, value):
        if User.objects.filter(username__iexact=value).exists():
            raise serializers.ValidationError("Username already exists.")
        return value

    def validate_email(self, value):
        value = value.lower().strip()

        if User.objects.filter(email__iexact=value).exists():
            raise serializers.ValidationError("Email already exists.")

        return value

    def validate_mobile(self, value):
        value = normalize_indian_mobile(value)

        if Teacher.objects.filter(mobile=value).exists():
            raise serializers.ValidationError("Mobile already registered.")

        return value

    @transaction.atomic
    def create(self, validated_data):
        password = validated_data.pop("password")
        email = validated_data.pop("email")
        username = validated_data.pop("username")

        user = User.objects.create_user(
            username=username,
            email=email,
            password=password,
        )

        teacher = Teacher.objects.create(
            user=user,
            mobile_verified=False,
            **validated_data,
        )
        return teacher