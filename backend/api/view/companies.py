from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from ..models import Company
from ..serializers import CompanySerializer, CompanyUpdateSerializer
from ..views import check_access


@api_view(["GET", "POST"])
@permission_classes([IsAuthenticated])
def companies(request):
    if request.method == "GET":
        if check_access(request.user, "companies", "v"):
            companies = Company.objects.all()
            serializer = CompanySerializer(companies, many=True)
            return Response({"data": serializer.data}, status=status.HTTP_200_OK)
        return Response(
            {"detail": "you have no access to view companies"},
            status=status.HTTP_403_FORBIDDEN,
        )

    if request.method == "POST":
        if check_access(request.user, "companies", "v"):
            serializer = CompanySerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(
                    {"success": "company has been succesfully created"},
                    status=status.HTTP_201_CREATED,
                )
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(
            {"detail": "you have no access to view users"},
            status=status.HTTP_403_FORBIDDEN,
        )
    
@api_view(["PUT", "DELETE"])
@permission_classes([IsAuthenticated])
def company(request, id):
    if request.method == "PUT":
        if check_access(request.user, "companies", "u"):
            company = Company.objects.get(pk=id)
            company_serializer = CompanyUpdateSerializer(
                instance=company, data=request.data
            )
            if company_serializer.is_valid():
                company_serializer.save()
                return Response(
                    {"success": "company has been succesfully updated"},
                    status=status.HTTP_200_OK,
                )
            return Response(
                company_serializer.errors, status=status.HTTP_400_BAD_REQUEST
            )
        return Response(
            {"detail": "you have no access to update companies"},
            status=status.HTTP_403_FORBIDDEN,
        )

    if request.method == "DELETE":
        CompanySerializer.delete(id)
        return Response(
            {"success": "company has been succesfully deleted"},
            status=status.HTTP_200_OK,
        )


"""
example company data for testing 
{
    "name": "samauto",
    "address": "address",
    "city": "new york",
    "zip_code": "19000"
}
"""
