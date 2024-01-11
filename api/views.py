from django.shortcuts import render

# from djoser.serializers import UserSerializer, UserCreateSerializer
from django.core.cache import cache
from django.http import JsonResponse
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from .tasks import notify_customers, update_trucks
from .models import User, Access, Company, Log, Truck
from .serializers import CompanySerializer, UserSerializer, UserCreateSerializer, TrucksSerializer


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
def ping_pong(request):
    # update_trucks()
    return Response("pong", status=status.HTTP_200_OK)


@api_view(["GET", "POST", "PUT", "DELETE"])
@permission_classes([IsAuthenticated])
def companies(request):
    # allow only dev users
    if not request.user.role == "dev":
        return Response(
            {"detail": "you have no access to this endpoint"},
            status=status.HTTP_403_FORBIDDEN,
        )

    if request.method == "GET":
        companies = Company.objects.all()
        serializer = CompanySerializer(companies, many=True)
        return Response({"data": serializer.data}, status=status.HTTP_200_OK)

    if request.method == "POST":
        serializer = CompanySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"success": "company has been succesfully created"},
                status=status.HTTP_201_CREATED,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    """
    {
        "name": "samauto",
        "address": "address",
        "city": "new york",
        "zip_code": "19000"
    }
    """

    return Response(status=status.HTTP_200_OK)


@api_view(["GET", "POST", "PUT", "DELETE"])
@permission_classes([IsAuthenticated])
def users(request):
    if request.method == "GET":
        if check_access(request.user, "users", "v"):
            if request.user.role == "dev":
                users = User.objects.all()
            else:
                users = User.objects.filter(company_id=request.user.company_id)
            serializer = UserSerializer(users, many=True)
            return Response({"data": serializer.data}, status=status.HTTP_200_OK)
        return Response(
            {"detail": "you have no access to view users"},
            status=status.HTTP_403_FORBIDDEN,
        )

    if request.method == "POST":
        # check for allowed users
        if check_access(request.user, "users", "c"):
            user_serializer = UserCreateSerializer(data=request.data)
            if user_serializer.is_valid():
                user_serializer.save()
                return Response(
                    {"success": "user has been succesfully created"},
                    status=status.HTTP_201_CREATED,
                )
            return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(
            {"detail": "you have no access to create a user"},
            status=status.HTTP_403_FORBIDDEN,
        )


"""
    {
        "username": "test",
        "role": "own",
        "password": "!2344321",
        "first_name": "fname",
        "last_name": "lname",
    }

"""
# if request.method == "PUT":
#     user = User.objects.get(pk=request.data["id"])
#     if not request.user == user:
#         user_serializer = UserSerializer(instance=user, data=request.data)
#         valid_user = user_serializer.is_valid()
#         if valid_user:
#             updated_user = user_serializer.save()
#             return Response(
#                 {"success": "user has been succesfully updated"},
#                 status=status.HTTP_200_OK,
#             )
#         return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#     return Response(
#         {"detail": "you cannot update yourself"}, status=status.HTTP_403_FORBIDDEN
#     )


@api_view(["GET", "POST", "PUT", "DELETE"])
@permission_classes([IsAuthenticated])
def drivers(request):
    if request.method == "GET":
        pass

    if request.method == "POST":
        pass

    if request.method == "PUT":
        pass

    if request.method == "DELETE":
        pass


@api_view(["GET", "POST", "PUT", "DELETE"])
@permission_classes([IsAuthenticated])
def trucks(request):
    if request.method == "GET":
        if check_access(request.user, "trucks", "v"):
            trucks = Truck.objects.filter(company_id=request.user.company_id)
            serializer = TrucksSerializer(trucks, many=True)
            return Response({"data": serializer.data}, status=status.HTTP_200_OK)
        return Response(
            {"detail": "you have no access to view trucks"},
            status=status.HTTP_403_FORBIDDEN,
        )

    if request.method == "POST":
        if check_access(request.user, "trucks", "c"):
            return Response("you are rak - authorized", status=status.HTTP_200_OK)
        return Response(
            {"detail": "you have no access to create trucks"},
            status=status.HTTP_403_FORBIDDEN,
        )

    if request.method == "PUT":
        pass

    if request.method == "DELETE":
        pass


@api_view(["GET", "POST", "PUT", "DELETE"])
@permission_classes([IsAuthenticated])
def logs(request):
    if request.method == "GET":
        pass

    if request.method == "POST":
        request.data

        log = Log(request.data)
        log.create()

    if request.method == "PUT":
        pass

    if request.method == "DELETE":
        pass
