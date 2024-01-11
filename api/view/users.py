from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from ..models import User
from ..serializers import UserSerializer, UserCreateSerializer
from ..views import check_access


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
