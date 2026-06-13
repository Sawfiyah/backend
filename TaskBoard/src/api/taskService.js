// src/api/taskService.js
import API_BASE from "./api";

export async function getAllTasks() {
  const res = await fetch(`${API_BASE}/all_tasks/`);
  if (!res.ok) throw new Error("Failed to fetch tasks");
  return res.json();
}

export async function createTask(formData) {
  const res = await fetch(`${API_BASE}/create_task/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
  if (!res.ok) throw new Error("Failed to create task");
  return res.json();
}

export async function updateTask(id, formData) {
  const res = await fetch(`${API_BASE}/update_tasks/${id}/update_task/`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
  if (!res.ok) throw new Error("Failed to update task");
  return res.json();
}

export async function deleteTask(id) {
  const res = await fetch(`${API_BASE}/delete_tasks/${id}/delete/`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete task");
  return res.json();
}
