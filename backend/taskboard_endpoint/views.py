from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse, JsonResponse
from . import models
from .serializers import TaskSerializer
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
import json


def signup(request):
    if request.method == "POST":
        data = json.loads(request.body)
        username = data["username"]
        password = data["password"]

        if User.objects.filter(username=username).exists():
            return JsonResponse({"error": "Username already exists"}, status=400)

        user = User.objects.create_user(username=username, password=password)
        token = RefreshToken.for_user(user)

        return JsonResponse(
            {
                "access": str(token.access_token),
                "refresh": str(token),
            }
        )

    return JsonResponse({"error": "Invalid request"}, status=405)


def login(request):
    if request.method == "POST":
        data = json.loads(request.body)
        user = authenticate(username=data["username"], password=data["password"])

        if user is None:
            return JsonResponse({"error": "Invalid credentials"}, status=401)

        token = RefreshToken.for_user(user)

        return JsonResponse(
            {
                "access": str(token.access_token),
                "refresh": str(token),
            }
        )

    return JsonResponse({"error": "Invalid request"}, status=405)


def logout(request):
    if request.method == "POST":
        data = json.loads(request.body)
        token = RefreshToken(data["refresh"])
        token.blacklist()
        return JsonResponse({"message": "Logged out successfully"})

    return JsonResponse({"error": "Invalid request"}, status=405)


# Create your views here.


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_task(request):
    serializer = TaskSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save(user=request.user)
        return Response({"message": "Task created successfully"})

    return Response(serializer.errors, status=400)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_all_tasks(request):
    tasks = models.TasksboardDetails.objects.filter(user=request.user)

    serializer = TaskSerializer(tasks, many=True)

    return Response(serializer.data)


@api_view(["PATCH"])
@permission_classes([IsAuthenticated])
def update_tasks(request, id):
    task = get_object_or_404(models.TasksboardDetails, pk=id, user=request.user)

    serializer = TaskSerializer(task, data=request.data, partial=True)

    if serializer.is_valid():
        serializer.save()
        return Response({"message": "Task updated successfully"})

    return Response(serializer.errors, status=400)


@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete_tasks(request, id):
    task = get_object_or_404(models.TasksboardDetails, pk=id, user=request.user)

    task.delete()

    return JsonResponse({"message": "Task deleted successfully"})
