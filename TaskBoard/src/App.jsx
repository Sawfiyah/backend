import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import HomePage from "./pages/HomePage";
import AddTaskPage from "./pages/AddTaskPage";
import AboutPage from "./pages/AboutPage";
import EditTaskPage from "./pages/EditTaskPage";
import TasksPage from "./pages/TasksPage";
import ViewTaskPage from "./pages/ViewTaskPage";
import { getAllTasks } from "./api/taskService";
import { isLoggedIn } from "./api/authService";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

export default function App() {
  const [tasks, setTasks] = useState([]); // start with empty array
  const [editTask, setEditTask] = useState(null);
  const [viewTask, setViewTask] = useState(null);

  useEffect(() => {
    if (isLoggedIn()) {
      // only fetch if logged in
      getAllTasks()
        .then((data) => setTasks(data))
        .catch((err) => console.error(err));
    }
  }, []);

  return (
    <Routes>
      <Route path="/login" element={<LoginPage setTasks={setTasks} />} />
      <Route path="/signup" element={<SignupPage setTasks={setTasks} />} />
      <Route
        path="/"
        element={<HomePage tasks={tasks} setTasks={setTasks} />}
      />
      <Route
        path="/addtask"
        element={
          <ProtectedRoute>
            <AddTaskPage setTasks={setTasks} />
          </ProtectedRoute>
        }
      />
      <Route path="/about" element={<AboutPage />} />
      <Route
        path="/edittask"
        element={
          <ProtectedRoute>
            <EditTaskPage task={editTask} setTasks={setTasks} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/tasks"
        element={
          <ProtectedRoute>
            <TasksPage
              tasks={tasks}
              setTasks={setTasks}
              setEditTask={setEditTask}
              setViewTask={setViewTask}
            />
          </ProtectedRoute>
        }
      />
      <Route
        path="/viewtask"
        element={
          <ProtectedRoute>
            <ViewTaskPage task={viewTask} setEditTask={setEditTask} />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
