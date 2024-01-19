from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from ..models import Driver
from ..serializers import (
    DriverSerializer,
    DriversSerializer,
    DriverCreateSerializer,
    DriverUpdateSerializer,
)
from ..views import check_access

import time


@api_view(["GET", "POST"])
@permission_classes([IsAuthenticated])
def drivers(request):
    if request.method == "GET":
        if check_access(request.user, "drivers", "v"):
            drivers = Driver.objects.filter(
                user__company_id=request.user.company_id, is_active=True
            )
            driver_serializer = DriversSerializer(drivers, many=True)
            return Response({"data": driver_serializer.data}, status=status.HTTP_200_OK)
        return Response(
            {"detail": "you have no access to view drivers"},
            status=status.HTTP_403_FORBIDDEN,
        )

    if request.method == "POST":
        if check_access(request.user, "drivers", "c"):
            request.data["user"]["company"] = request.user.company_id

            driver_serializer = DriverCreateSerializer(data=request.data)
            if driver_serializer.is_valid():
                driver_serializer.save()
                return Response(
                    {"success": "driver has been succesfully created"},
                    status=status.HTTP_201_CREATED,
                )
            return Response(
                driver_serializer.errors,
                status=status.HTTP_400_BAD_REQUEST,
            )
        return Response(
            {"detail": "you have no access to create a driver"},
            status=status.HTTP_403_FORBIDDEN,
        )


@api_view(["GET", "PUT", "DELETE"])
@permission_classes([IsAuthenticated])
def driver(request, id):
    time.sleep(1)
    if request.method == "GET":
        if check_access(request.user, "drivers", "v"):
            driver = Driver.objects.get(pk=id)
            driver_serializer = DriverSerializer(driver)
            return Response(driver_serializer.data, status=status.HTTP_200_OK)
        return Response(
            {"detail": "you have no access to view drivers"},
            status=status.HTTP_403_FORBIDDEN,
        )

    if request.method == "PUT":
        if check_access(request.user, "drivers", "u"):
            driver = Driver.objects.get(pk=id)
            driver_serializer = DriverUpdateSerializer(
                instance=driver, data=request.data
            )
            if driver_serializer.is_valid():
                driver_serializer.save()
                return Response(
                    {"success": "driver has been succesfully updated"},
                    status=status.HTTP_200_OK,
                )
            return Response(
                driver_serializer.errors,
                status=status.HTTP_400_BAD_REQUEST,
            )
        return Response(
            {"detail": "you have no access to update driver"},
            status=status.HTTP_403_FORBIDDEN,
        )

    if request.method == "DELETE":
        return Response(
            {"success": "this method is disabled by the server"},
            status=status.HTTP_400_BAD_REQUEST,
        )

        DriverSerializer.delete(id)

        return Response(
            {"success": "driver has been succesfully deleted"},
            status=status.HTTP_200_OK,
        )


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def driver_deactivate(request, id):
    if request.method == "POST":
        DriverSerializer.deactivate(id)

        return Response(
            {"success": "driver has been succesfully deactivated"},
            status=status.HTTP_200_OK,
        )


"""
example driver data for testing
    {
        "cdl_number": "v342eas3",
        "cdl_state":"AK",
        "user": {
            "username": "test",
            "password":"!2344321",
            "first_name": "fnffame",
            "last_name": "lnffffame",
            "email":"we@gmail.com"
        }
    }

update

    {
        "cdl_number": "updated",
        "cdl_state":"AK",
        "user": {
            "username": "updated",
            "password":"!2344321",
            "first_name": "fnffame",
            "last_name": "lnffffame",
            "email":"we@gmail.com"
        }
    }

"""
