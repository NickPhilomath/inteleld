from django.shortcuts import render
from djoser.serializers import UserSerializer, UserCreateSerializer
from django.core.cache import cache
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from .tasks import notify_customers, update_trucks


@api_view(["GET"])
@permission_classes([AllowAny])
def ping_pong(request):
    # update_trucks()
    return Response("pong", status=status.HTTP_200_OK)


@api_view(["GET"])
@permission_classes([AllowAny])
def trucks(request):
    data = []
    if cache.get("trucks"):
        data = cache.get("trucks")
    return Response({"result": data}, status=status.HTTP_200_OK)
