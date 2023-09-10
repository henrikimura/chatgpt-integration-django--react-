from django.shortcuts import render
from rest_framework import viewsets
from .serializers import CitySerializer
from .models import City

# Create your views here.

class CityView(viewsets.ModelViewSet):
    serializer_class = CitySerializer
    queryset = City.objects.all()