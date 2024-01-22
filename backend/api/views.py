# from django.core.cache import cache
from django.http import JsonResponse
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Access


def custom404(request, exception=None):
    return JsonResponse(
        {"status_code": 404, "detail": "The resourse was not found"}, status=404
    )


def check_access(user, source: str, type):
    # if superuser always pass him :)
    if user.is_superuser:
        return True

    access = Access.objects.filter(pk=user.access_id).values(source)
    # print(str(access.query))
    if access:
        return type in access[0][source]
    return False


@api_view(["GET"])
@permission_classes([AllowAny])
def api(request):
    return Response("hello world", status=status.HTTP_200_OK)


@api_view(["GET"])
@permission_classes([AllowAny])
def ping_pong(request):
    # update_trucks()
    return Response("pong", status=status.HTTP_200_OK)
