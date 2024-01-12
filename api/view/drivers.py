from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from ..models import Driver, User, Access
from ..serializers import (
    DriverSerializer,
    DriverCreateSerializer,
    UserCreateSerializer,
    UserSerializer,
    AccessSerializer,
)
from ..views import check_access


@api_view(["GET", "POST", "PUT", "DELETE"])
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

            # driver_data = request.data.get("driver")
            # user_serializer = UserCreateSerializer(data=request.data)
            # driver_serializer = DriverSerializer(data=driver_data)
            # valid_user = user_serializer.is_valid()
            # valid_driver = driver_serializer.is_valid()
            # if valid_user and valid_driver:
            #     # create access object for driver's user
            #     access_serializer = AccessSerializer(
            #         data={
            #             "companies": "",
            #             "users": "",
            #             "drivers": "",
            #             "trucks": "",
            #             "logs": "vc",
            #         }
            #     )
            #     if not access_serializer.is_valid():
            #         print(access_serializer.errors)
            #         return Response(
            #             {
            #                 "detail": "unexpected error happened while creating default access object for driver"
            #             },
            #             status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            #         )
            #     saved_access = access_serializer.save()
            #     saved_user = user_serializer.save(access_id=saved_access.id)
            #     driver_serializer.save(user_id=saved_user.id)
            #     return Response(
            #         {"success": "driver has been succesfully created"},
            #         status=status.HTTP_201_CREATED,
            #     )
            # return Response(
            #     user_serializer.errors | driver_serializer.errors,
            #     status=status.HTTP_400_BAD_REQUEST,
            # )
        return Response(
            {"detail": "you have no access to create a driver"},
            status=status.HTTP_403_FORBIDDEN,
        )

    if request.method == "PUT":
        if check_access(request.user, "drivers", "u"):
            if request.data.get("id"):
                driver_data = request.data.get("driver")
                driver = Driver.objects.get(pk=request.data["id"])
                user = User.objects.get(pk=driver.user_id)
                user_serializer = UserSerializer(instance=user, data=request.data)
                driver_serializer = DriverSerializer(instance=driver, data=driver_data)
                valid_user = user_serializer.is_valid()
                valid_driver = driver_serializer.is_valid()
                if valid_user and valid_driver:
                    user_serializer.save()
                    driver_serializer.save()
                    return Response(
                        {"success": "driver has been succesfully updated"},
                        status=status.HTTP_200_OK,
                    )
                return Response(
                    user_serializer.errors | driver_serializer.errors,
                    status=status.HTTP_400_BAD_REQUEST,
                )
            return Response(
                {"detail": "id is required to update driver"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        return Response(
            {"detail": "you have no access to update driver"},
            status=status.HTTP_403_FORBIDDEN,
        )

    if request.method == "DELETE":
        pass


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
        "id":1,
        "username": "updated",
        "role": "own",
        "first_name": "fname",
        "last_name": "lname",
        "driver": {
            "cdl_number": "v3423",
            "cdl_state": "AK"
         }
    }

"""
