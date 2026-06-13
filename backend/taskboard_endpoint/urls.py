from django.urls import path
from . import views

urlpatterns = [
    path("create_task/", views.create_task, name="create_task"),
    path("all_tasks/", views.get_all_tasks, name="all_tasks"),
    path(
        "update_tasks/<int:id>/update_task/",
        views.update_tasks,
        name="update_tasks",
    ),
    path("delete_tasks/<int:id>/delete/", views.delete_tasks, name="delete_tasks"),
]
