from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from ..models import Driver, User, Access
from ..serializers import (
    DriverSerializer,
    DriverCreateSerializer,
    DriverUpdateSerializer,
    UserSerializer,
    AccessSerializer,
)
from ..views import check_access


@api_view(["GET", "POST"])
@permission_classes([IsAuthenticated])
def drivers(request):
    if request.method == "GET":
        if check_access(request.user, "drivers", "v"):
            drivers = Driver.objects.filter(user__company_id=request.user.company_id)
            driver_serializer = DriverSerializer(drivers, many=True)
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


@api_view(["PUT", "DELETE"])
@permission_classes([IsAuthenticated])
def driver(request, id):
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
        DriverSerializer.delete(id)

        return Response(
            {"success": "driver has been succesfully deleted"},
            status=status.HTTP_200_OK,
        )


"""
example driver data for testing
    {
        "cdl_number": "v342eas3",
        "cdl_state":"AK",
        "user": {
            "username": "testfuck",
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
