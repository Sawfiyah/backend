from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class TasksboardDetails(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="tasks")
    task_title = models.CharField(max_length=1000)
    task_description = models.TextField()
    task_due_date = models.DateField()
    task_priority = models.CharField(max_length=100, default="Medium")
    task_status = models.CharField(max_length=100, default="Pending")
    task_created_date = models.DateTimeField(auto_now_add=True)
    task_updated_date = models.DateTimeField(auto_now=True)
