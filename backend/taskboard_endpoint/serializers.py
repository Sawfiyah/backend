from rest_framework import serializers
from .models import TasksboardDetails


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = TasksboardDetails
        fields = [
            "id",
            "task_title",
            "task_description",
            "task_due_date",
            "task_priority",
            "task_status",
        ]
