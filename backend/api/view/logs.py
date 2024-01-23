from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from ..models import Log, Driver
from ..views import check_access
from ..serializers import DriversLogsSerializer, LogsSerializer


@api_view(["GET"])
def drivers_logs(request):
    if check_access(request.user, "logs", "v"):
        drivers = Driver.objects.select_related("user").filter(
            user__company_id=request.user.company_id, is_active=True
        )
        driver_serializer = DriversLogsSerializer(drivers, many=True)
        return Response({"data": driver_serializer.data}, status=status.HTTP_200_OK)
    return Response(
        {"detail": "you have no access to view driver logs"},
        status=status.HTTP_403_FORBIDDEN,
    )


@api_view(["GET", "POST", "PUT", "DELETE"])
@permission_classes([IsAuthenticated])
def driver_logs(request, id):
    if request.method == "GET":
        if check_access(request.user, "logs", "v"):
            logs = Log.objects.select_related("location").filter(driver_id=id)
            driver_logs_serializer = LogsSerializer(logs, many=True)
            return Response(
                {"data": driver_logs_serializer.data}, status=status.HTTP_200_OK
            )
        return Response(
            {"detail": "you have no access to view driver logs"},
            status=status.HTTP_403_FORBIDDEN,
        )

    if request.method == "POST":
        pass

    if request.method == "PUT":
        pass

    if request.method == "DELETE":
        pass
