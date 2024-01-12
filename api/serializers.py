# from django.contrib.auth.hashers import make_password
from rest_framework.serializers import (
    ModelSerializer,
    # Serializer,
    # SerializerMethodField,
)

# from rest_framework import serializers
from djoser.serializers import (
    UserSerializer as BaseUserSerializer,
    UserCreateSerializer as BaseUserCreateSerializer,
)
from .models import User, Access, Company, Truck, Driver


# company
class CompanySerializer(ModelSerializer):
    class Meta:
        model = Company
        fields = "__all__"


# access
class AccessSerializer(ModelSerializer):
    class Meta:
        model = Access
        fields = "__all__"


# user
class UserCreateSerializer(BaseUserCreateSerializer):
    access = AccessSerializer()

    class Meta(BaseUserCreateSerializer.Meta):
        model = User
        fields = "__all__"

    # def create(self, validated_data):
    #     return

    # def validate_password(self, value: str) -> str:
    #     """    Hash value passed by user.    :param value: password of a user    :return: a hashed version of the password    """
    #     return make_password(value)


class UserSerializer(BaseUserSerializer):
    access = AccessSerializer()

    # appuser = AppUserSerializer(read_only=True)
    class Meta(BaseUserSerializer.Meta):
        model = User
        fields = None
        exclude = ["password", "groups", "user_permissions", "is_staff", "company"]


# driver
class DriverUserSerializer(BaseUserSerializer):
    class Meta(BaseUserSerializer.Meta):
        fields = [
            "first_name",
            "last_name",
            "last_login",
            "username",
            "email",
            "is_active",
            "date_joined",
        ]
        # exclude = ["password", "groups", "user_permissions", "is_staff", "company"]


class DriverSerializer(ModelSerializer):
    user = DriverUserSerializer()

    class Meta:
        model = Driver
        fields = "__all__"
        # exclude = ["user.access"]


class DriverUserCreateSerializer(BaseUserCreateSerializer):
    class Meta(BaseUserCreateSerializer.Meta):
        model = User
        fields = "__all__"


class DriverCreateSerializer(ModelSerializer):
    user = DriverUserCreateSerializer()

    class Meta:
        model = Driver
        fields = "__all__"

    def create(self, validated_data):
        # default access object for driver
        access = Access.objects.create(logs="vc")
        # <
        user_data = validated_data.pop("user")
        print(user_data, validated_data)
        password = user_data.pop("password")
        user = User(access=access, **user_data)
        user.set_password(password)
        user.save()
        driver = Driver.objects.create(user=user, **validated_data)
        return driver


# truck
class TrucksSerializer(ModelSerializer):
    # appuser = AppUserSerializer(read_only=True)
    class Meta:
        model = Truck
        fields = "__all__"


class TrucksUpdateSerializer(ModelSerializer):
    # appuser = AppUserSerializer(read_only=True)
    class Meta:
        model = Truck
        exclude = ["company"]
        # fields = [
        #     "unit_number",
        #     "make",
        #     "model",
        #     "year",
        #     "license_state",
        #     "license_number",
        #     "vin_number",
        #     "fuel_type",
        #     "eld_device",
        #     "notes",
        #     "is_active",
        # ]
