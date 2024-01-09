from rest_framework.serializers import (
    ModelSerializer,
    Serializer,
    SerializerMethodField,
)
from rest_framework import serializers
from .models import User, Company


# serializers here
class CompanySerializer(ModelSerializer):
    class Meta:
        model = Company
        fields = "__all__"
