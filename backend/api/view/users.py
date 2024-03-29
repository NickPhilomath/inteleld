from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from ..models import User, Access
from ..serializers import (
    UserSerializer,
    UserCreateSerializer,
    UserUpdateSerializer,
    AccessSerializer,
)
from ..views import check_access


@api_view(["GET", "POST"])
@permission_classes([IsAuthenticated])
def users(request):
    if request.method == "GET":
        if check_access(request.user, "users", "v"):
            users = User.objects.filter(company_id=request.user.company_id)
            serializer = UserSerializer(users, many=True)
            return Response({"data": serializer.data}, status=status.HTTP_200_OK)
        return Response(
            {"detail": "you have no access to view users"},
            status=status.HTTP_403_FORBIDDEN,
        )

    if request.method == "POST":
        if check_access(request.user, "users", "c"):
            request.data["company"] = request.user.company_id
            access_data = request.data.pop("access")
            access_serializer = AccessSerializer(data=access_data)
            user_serializer = UserCreateSerializer(data=request.data)
            valid_access = access_serializer.is_valid()
            valid_user = user_serializer.is_valid()

            if valid_access and valid_user:
                saved_access = access_serializer.save()
                saved_user = user_serializer.save()
                saved_user.access_id = saved_access.id
                saved_user.save()
                return Response(
                    {"success": "user has been succesfully created"},
                    status=status.HTTP_201_CREATED,
                )
            return Response(
                user_serializer.errors | access_serializer.errors,
                status=status.HTTP_400_BAD_REQUEST,
            )
        return Response(
            {"detail": "you have no access to create a user"},
            status=status.HTTP_403_FORBIDDEN,
        )


@api_view(["PUT", "DELETE"])
@permission_classes([IsAuthenticated])
def user(request, id):
    if request.method == "PUT":
        if check_access(request.user, "users", "u"):
            access_data = request.data.pop("access")
            user = User.objects.get(pk=id)
            access = Access.objects.get(pk=user.access_id)
            access_serializer = AccessSerializer(instance=access, data=access_data)
            user_serializer = UserUpdateSerializer(instance=user, data=request.data)
            valid_user = user_serializer.is_valid()
            valid_access = access_serializer.is_valid()
            if valid_user and valid_access:
                user_serializer.save()
                access_serializer.save()
                return Response(
                    {"success": "user has been succesfully updated"},
                    status=status.HTTP_200_OK,
                )
            return Response(
                user_serializer.errors | access_serializer.errors,
                status=status.HTTP_400_BAD_REQUEST,
            )

        return Response(
            {"detail": "you have no access to update user"},
            status=status.HTTP_403_FORBIDDEN,
        )

    if request.method == "DELETE":
        if check_access(request.user, "users", "d"):
            user = User.objects.get(pk=id)
            user_access = Access.objects.get(pk=user.access_id)
            user.delete()
            user_access.delete()
            return Response(
                {"success": "user has been succesfully deleted"},
                status=status.HTTP_200_OK,
            )
        return Response(
            {"detail": "you have no access to delete user"},
            status=status.HTTP_403_FORBIDDEN,
        )


"""
example user data for testing
    
    {
        "username": "test2",
        "role": "own",
        "password": "!2344321",
        "first_name": "fname",
        "last_name": "lname",
        "access": {
            "companies": "v",
            "logs": "v",
            "drivers": "v",
            "trucks": "v",
            "users": "v"
         }
    }

    {
        "username": "updated",
        "role": "own",
        "password": "!2344321",
        "first_name": "fname",
        "last_name": "lname",
        "access": {
            "companies": "vu",
            "logs": "",
            "drivers": "",
            "trucks": "",
            "users": ""
         }
    }

"""
