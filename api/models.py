from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings
from .const import (
    LOG_STATUS,
    DEFAULT_LOG_STATUS,
    USER_ROLES,
    COUNTRIES,
    STATES,
    TIME_ZONES,
    YEARS,
    DEFAULT_YEAR,
    FUEL_TYPE,
)


class Company(models.Model):
    name = models.CharField(max_length=63)
    address = models.CharField(max_length=255)
    country = models.CharField(max_length=2, choices=COUNTRIES, default="US")
    region = models.CharField(max_length=2, choices=STATES, default="AK")
    city = models.CharField(max_length=127)
    zip_code = models.CharField(max_length=15)
    time_zone = models.CharField(max_length=7, choices=TIME_ZONES, default="US/East")


class Access(models.Model):
    companies = models.CharField(max_length=4, blank=True)
    users = models.CharField(max_length=4, blank=True)
    drivers = models.CharField(max_length=4, blank=True)
    trucks = models.CharField(max_length=4, blank=True)
    logs = models.CharField(max_length=4, blank=True)


class User(AbstractUser):
    # email = models.EmailField(unique=True)
    company = models.ForeignKey(Company, null=True, on_delete=models.CASCADE)
    access = models.OneToOneField(Access, null=True, on_delete=models.SET_NULL)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    role = models.CharField(max_length=3, null=True, choices=USER_ROLES)


class Location(models.Model):
    adress = models.CharField(max_length=255)
    latitude = models.DecimalField(max_digits=11, decimal_places=8)
    longitude = models.DecimalField(max_digits=11, decimal_places=8)


class Driver(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    truck = models.ForeignKey("Truck", null=True, on_delete=models.SET_NULL)
    cdl_number = models.CharField(max_length=20, unique=True)
    cdl_state = models.CharField(max_length=2, choices=STATES, default="AK")
    co_driver = models.OneToOneField("self", null=True, on_delete=models.SET_NULL)
    phone = models.CharField(max_length=13, null=True)
    address = models.CharField(max_length=127, null=True)
    app_version = models.CharField(max_length=5, null=True)
    notes = models.CharField(max_length=255, null=True)
    is_active = models.BooleanField(default=True)


class Truck(models.Model):
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    unit_number = models.CharField(max_length=10, unique=True)
    make = models.CharField(max_length=15, null=True)
    model = models.CharField(max_length=20, null=True)
    year = models.CharField(max_length=3, choices=YEARS, default=DEFAULT_YEAR)
    license_state = models.CharField(max_length=2, choices=STATES, default="AK")
    license_number = models.CharField(max_length=20, null=True)
    vin_number = models.CharField(max_length=20, null=True)
    fuel_type = models.CharField(max_length=2, choices=FUEL_TYPE, default="di")
    eld_device = models.CharField(max_length=16, null=True)
    notes = models.CharField(max_length=255, null=True)
    is_active = models.BooleanField(default=True)


class Log(models.Model):
    driver = models.ForeignKey(Driver, on_delete=models.CASCADE)
    truck = models.ForeignKey(Truck, on_delete=models.SET_NULL, null=True)
    status = models.CharField(
        max_length=3, choices=LOG_STATUS, default=DEFAULT_LOG_STATUS
    )
    datetime = models.DateTimeField()
    location = models.CharField(max_length=50, null=True)
    lat = models.DecimalField(max_digits=12, decimal_places=9, null=True)
    lng = models.DecimalField(max_digits=12, decimal_places=9, null=True)
    odometer = models.IntegerField(null=True)
    eng_hours = models.DecimalField(max_digits=6, decimal_places=1, null=True)
    notes = models.CharField(max_length=20, null=True)
    document = models.CharField(max_length=20, null=True)
    trailer = models.CharField(max_length=20, null=True)
