from django.shortcuts import render
from rest_framework import viewsets
from .serializers import DomainSerializer
from .models import Domain

# Create your views here.

class DomainView(viewsets.ModelViewSet):
    serializer_class = DomainSerializer
    queryset = Domain.objects.all()