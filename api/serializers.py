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


###### company
class CompanySerializer(ModelSerializer):
    class Meta:
        model = Company
        fields = "__all__"

    def delete(id):
        company = Company.objects.get(pk=id)
        company.delete()


class CompanyUpdateSerializer(ModelSerializer):
    class Meta:
        model = Company
        fields = "__all__"

    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance


###### access
class AccessSerializer(ModelSerializer):
    class Meta:
        model = Access
        fields = "__all__"


###### user
class UserSerializer(BaseUserSerializer):
    access = AccessSerializer()

    # appuser = AppUserSerializer(read_only=True)
    class Meta(BaseUserSerializer.Meta):
        model = User
        fields = None
        exclude = ["password", "groups", "user_permissions", "is_staff", "company"]


class UserCreateSerializer(BaseUserCreateSerializer):
    access = AccessSerializer

    class Meta(BaseUserCreateSerializer.Meta):
        model = User
        fields = "__all__"

    # def create(self, validated_data):
    #     return

    # def validate_password(self, value: str) -> str:
    #     """    Hash value passed by user.    :param value: password of a user    :return: a hashed version of the password    """
    #     return make_password(value)


class UserUpdateSerializer(BaseUserCreateSerializer):
    class Meta(BaseUserCreateSerializer.Meta):
        model = User
        fields = None
        exclude = ["access"]


###### driver
# view single
class DriverUserSerializer(BaseUserSerializer):
    class Meta(BaseUserSerializer.Meta):
        model = User
        fields = [
            "first_name",
            "last_name",
            "username",
            "email",
        ]


class DriverSerializer(ModelSerializer):
    user = DriverUserSerializer()

    class Meta:
        model = Driver
        fields = [
            "user",
            "truck",
            "phone",
            "address",
            "cdl_number",
            "cdl_state",
            "co_driver",
            "allow_pc",
            "allow_ym",
            "notes",
        ]

    def deactivate(id):
        driver = Driver.objects.get(pk=id)
        driver.is_active = False
        driver.save()

    def delete(id):
        driver = Driver.objects.get(pk=id)
        user = User.objects.get(pk=driver.user_id)
        driver.delete()
        user.delete()


# view all
class DriversUserSerializer(BaseUserSerializer):
    class Meta(BaseUserSerializer.Meta):
        model = User
        fields = [
            "first_name",
            "last_name",
            "username",
            "date_joined",
        ]


class DriversSerializer(ModelSerializer):
    user = DriversUserSerializer()

    class Meta:
        model = Driver
        fields = ["id", "user", "co_driver", "truck", "app_version"]


# create
class DriverUserCreateSerializer(BaseUserCreateSerializer):
    class Meta(BaseUserCreateSerializer.Meta):
        model = User
        fields = [
            "company",
            "first_name",
            "last_name",
            "username",
            # "date_joined",
            "email",
            "password",
        ]


class DriverCreateSerializer(ModelSerializer):
    user = DriverUserCreateSerializer()

    class Meta:
        model = Driver
        fields = [
            "user",
            "truck",
            "phone",
            "address",
            "cdl_number",
            "cdl_state",
            "co_driver",
            "allow_pc",
            "allow_ym",
            "notes",
        ]

    def create(self, validated_data):
        # default access object for driver
        access = Access.objects.create(logs="vc")
        # <
        user_data = validated_data.pop("user")
        password = user_data.pop("password")
        user = User(access=access, **user_data)
        user.set_password(password)
        user.save()
        driver = Driver.objects.create(user=user, **validated_data)
        return driver


# update
class DriverUserUpdateSerializer(ModelSerializer):
    class Meta():
        model = User
        fields = [
            "first_name",
            "last_name",
            # "username",
            "email",
        ]


class DriverUpdateSerializer(ModelSerializer):
    user = DriverUserUpdateSerializer()

    class Meta:
        model = Driver
        fields = [
            "user",
            "truck",
            "phone",
            "address",
            "cdl_number",
            "cdl_state",
            "co_driver",
            "allow_pc",
            "allow_ym",
            "notes",
        ]
        # exclude = ["user.access"]

    def update(self, instance, validated_data):
        user_data = validated_data.pop("user")
        user_instance = User.objects.get(pk=instance.user_id)
        # # if requested data has password set, remove it
        # if user_data["password"]:
        #     user_data.pop("password")

        #  update driver object
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        #  update user object
        for attr, value in user_data.items():
            setattr(user_instance, attr, value)
        user_instance.save()

        return instance


###### truck
class TrucksSerializer(ModelSerializer):
    # appuser = AppUserSerializer(read_only=True)
    class Meta:
        model = Truck
        fields = "__all__"

    def delete(id):
        truck = Truck.objects.get(pk=id)
        truck.delete()


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
