from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse, JsonResponse
from .models import *
import json

# Create your views here.


def create_task(request):
    if request.method == "POST":
        data = json.loads(request.body)
        create_tasks = TasksboardDetails.objects.create(
            task_title=data["task_title"],
            task_description=data["task_description"],
            task_due_date=data["task_due_date"],
            task_priority=data["task_priority"],
        )

        return JsonResponse({"message": "Task created succesfully"})

    else:
        print("Invalid API Requesst")
        return HttpResponse("Invalid API Request")


def get_all_tasks(request):
    if request.method == "GET":
        all_tasks = TasksboardDetails.objects.values(
            "id",
            "task_title",
            "task_description",
            "task_due_date",
            "task_priority",
            "task_status",
        )

        return JsonResponse(list(all_tasks), safe=False)

    return JsonResponse({"message": "invalid request"}, status=405)


def update_tasks(request, id):
    if request.method == "PATCH":
        tasks = get_object_or_404(TasksboardDetails, pk=id)
        data = json.loads(request.body)

        if "task_title" in data:
            tasks.task_title = data["task_title"]

        if "task_description" in data:
            tasks.task_description = data["task_description"]

        if "task_due_date" in data:
            tasks.task_due_date = data["task_due_date"]

        if "task_status" in data:
            tasks.task_status = data["task_status"]

        tasks.save()
        return JsonResponse({"message": "Task updated successfully"})

    else:
        return JsonResponse({"message": "You make an invalid request"})


def delete_tasks(request, id):
    if request.method == "DELETE":
        tasks = get_object_or_404(TasksboardDetails, pk=id)
        tasks.delete()

        return JsonResponse({"message": "Task deleted successfully"})

    else:
        return JsonResponse({"message": "Invalid request"}, status=405)
