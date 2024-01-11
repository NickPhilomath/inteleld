from rest_framework.serializers import (
    ModelSerializer,
    Serializer,
    SerializerMethodField,
)
from rest_framework import serializers
from djoser.serializers import (
    UserSerializer as BaseUserSerializer,
    UserCreateSerializer as BaseUserCreateSerializer,
)
from .models import User, Company, Truck, Driver


# serializers here
class CompanySerializer(ModelSerializer):
    class Meta:
        model = Company
        fields = "__all__"


class UserCreateSerializer(BaseUserCreateSerializer):
    class Meta(BaseUserCreateSerializer.Meta):
        fields = [
            "id",
            "username",
            "role",
            "password",
            "email",
            "first_name",
            "last_name",
        ]

    # def validate_password(self, value: str) -> str:
    #     """    Hash value passed by user.    :param value: password of a user    :return: a hashed version of the password    """
    #     return make_password(value)


class UserSerializer(BaseUserSerializer):
    # appuser = AppUserSerializer(read_only=True)
    class Meta(BaseUserSerializer.Meta):
        fields = [
            "id",
            "username",
            "role",
            "email",
            "first_name",
            "last_name",
            "company_id",
        ]


class DriverSerializer(ModelSerializer):
    class Meta:
        model = Driver
        fields = "__all__"
        exclude = ["user"]


class TrucksSerializer(ModelSerializer):
    # appuser = AppUserSerializer(read_only=True)
    class Meta:
        model = Truck
        fields = "__all__"


class TrucksUpdateSerializer(ModelSerializer):
    # appuser = AppUserSerializer(read_only=True)
    class Meta:
        model = Truck
        fields = [
            "unit_number",
            "make",
            "model",
            "year",
            "license_state",
            "license_number",
            "vin_number",
            "fuel_type",
            "eld_device",
            "notes",
            "is_active",
        ]
