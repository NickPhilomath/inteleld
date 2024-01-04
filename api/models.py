from django.db import models
from .const import LOG_STATUS, DEFAULT_LOG_STATUS


class Location(models.Model):
    adress = models.CharField(max_length=255)
    latitude = models.DecimalField(max_digits=11, decimal_places=8)
    longitude = models.DecimalField(max_digits=11, decimal_places=8)


class Truck(models.Model):
    name = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)


class Log(models.Model):
    status = models.CharField(max_length=2, choices=LOG_STATUS)
    time = models.TimeField()
    location = models.ForeignKey(Location, on_delete=models.CASCADE)
