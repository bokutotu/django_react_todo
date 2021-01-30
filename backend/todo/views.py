from django.shortcuts import render
from rest_framework import viewsets
from .serializers import TodoSerializer
from .models import ToDo

# Create your views here.
class ToDoView(viewsets.ModelViewSet):
    serializer_class = TodoSerializer
    queryset = ToDo.objects.all()
