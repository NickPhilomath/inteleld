from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from ..models import Log
from ..views import check_access
from ..serializers import (
    LogsSerializer,
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
