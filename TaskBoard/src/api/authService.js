// src/api/authService.js
import API_BASE from "./api";

export async function signup(username, password) {
  const res = await fetch(`${API_BASE}/signup/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) throw new Error("Signup failed");
  const data = await res.json();
  localStorage.setItem("access", data.access);
  localStorage.setItem("refresh", data.refresh);
  localStorage.setItem("username", username);
  return data;
}

export async function login(username, password) {
  const res = await fetch(`${API_BASE}/login/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) throw new Error("Invalid credentials");
  const data = await res.json();
  localStorage.setItem("access", data.access);
  localStorage.setItem("refresh", data.refresh);
  localStorage.setItem("username", username);
  return data;
}

export async function logout() {
  const refresh = localStorage.getItem("refresh");
  await fetch(`${API_BASE}/logout/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh }),
  });
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
  localStorage.removeItem("username");
}

export function getAccessToken() {
  return localStorage.getItem("access");
}

export function isLoggedIn() {
  return !!localStorage.getItem("access");
}

export function getUsername() {
  return localStorage.getItem("username");
}
