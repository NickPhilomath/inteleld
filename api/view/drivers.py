from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from ..models import Driver
from ..serializers import DriverSerializer
from ..views import check_access


@api_view(["GET", "POST", "PUT", "DELETE"])
@permission_classes([IsAuthenticated])
def drivers(request):
    if request.method == "GET":
        if check_access(request.user, "drivers", "v"):
            drivers = Driver.objects.filter(company_id=request.user.company_id)
            driver_serializer = DriverSerializer(drivers, many=True)
            return Response({"data": driver_serializer.data}, status=status.HTTP_200_OK)
        return Response(
            {"detail": "you have no access to view drivers"},
            status=status.HTTP_403_FORBIDDEN,
        )

    if request.method == "POST":
        pass

    if request.method == "PUT":
        pass

    if request.method == "DELETE":
        pass
