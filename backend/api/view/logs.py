from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated


@api_view(["GET", "POST", "PUT", "DELETE"])
@permission_classes([IsAuthenticated])
def logs(request):
    if request.method == "GET":
        pass

    if request.method == "POST":
        pass

    if request.method == "PUT":
        pass

    if request.method == "DELETE":
        pass
