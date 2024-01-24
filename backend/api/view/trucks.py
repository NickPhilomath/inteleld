from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from ..models import Truck
from ..serializers import TrucksSerializer, TrucksUpdateSerializer, TruckCreateSerializer, TruckSerializer
from ..views import check_access


@api_view(["GET", "POST"])
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
            request.data["company"] = request.user.company_id
            trucks_serializer = TruckCreateSerializer(data=request.data)
            if trucks_serializer.is_valid():
                trucks_serializer.save()
                return Response(
                    {"success": "truck has been succesfully created"},
                    status=status.HTTP_201_CREATED,
                )
            return Response(
                trucks_serializer.errors, status=status.HTTP_400_BAD_REQUEST
            )
        return Response(
            {"detail": "you have no access to create trucks"},
            status=status.HTTP_403_FORBIDDEN,
        )


@api_view(["GET", "PUT", "DELETE"])
@permission_classes([IsAuthenticated])
def truck(request, id):
    if request.method == "GET":
        if check_access(request.user, "drivers", "v"):
            truck = get_object_or_404(Truck, pk=id)
            truck_serializer = TruckSerializer(truck)
            return Response(truck_serializer.data, status=status.HTTP_200_OK)
        return Response(
            {"detail": "you have no access to view drivers"},
            status=status.HTTP_403_FORBIDDEN,
        )
    if request.method == "PUT":
        if check_access(request.user, "trucks", "u"):
            truck = Truck.objects.get(pk=id)
            truck_serializer = TrucksUpdateSerializer(instance=truck, data=request.data)
            if truck_serializer.is_valid():
                truck_serializer.save()
                return Response(
                    {"success": "truck has been succesfully updated"},
                    status=status.HTTP_200_OK,
                )
            return Response(truck_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(
            {"detail": "you have no access to update trucks"},
            status=status.HTTP_403_FORBIDDEN,
        )

    if request.method == "DELETE":
         return Response(
            {"success": "this method is disabled by developers"},
            status=status.HTTP_400_BAD_REQUEST,
        )
    
        # TruckSerializer.delete(id)
    
        # return Response(
        #     {"success": "company has been succesfully deleted"},
        #     status=status.HTTP_200_OK,
        # )

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def driver_deactivate(request, id):
    if request.method == "POST":
        TruckSerializer.deactivate(id)

        return Response(
            {"success": "truck has been succesfully deactivated"},
            status=status.HTTP_200_OK,
        )
"""
example truck data for posting
    {
        "unit_number": "11111",
        "make": "abcd",
        "model": "defg"
    }
    
example truck data for updating
    {
        "id": 1,
        "unit_number": "asdf"
    }

"""
