import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import HomePage from "./pages/HomePage";
import AddTaskPage from "./pages/AddTaskPage";
import AboutPage from "./pages/AboutPage";
import EditTaskPage from "./pages/EditTaskPage";
import TasksPage from "./pages/TasksPage";
import ViewTaskPage from "./pages/ViewTaskPage";
import { getAllTasks } from "./api/taskService";

export default function App() {
  const [tasks, setTasks] = useState([]); // start with empty array
  const [editTask, setEditTask] = useState(null);
  const [viewTask, setViewTask] = useState(null);

  useEffect(() => {
    getAllTasks()
      .then((data) => setTasks(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={<HomePage tasks={tasks} setTasks={setTasks} />}
      />
      <Route path="/addtask" element={<AddTaskPage setTasks={setTasks} />} />
      <Route path="/about" element={<AboutPage />} />
      <Route
        path="/edittask"
        element={<EditTaskPage task={editTask} setTasks={setTasks} />}
      />
      <Route
        path="/tasks"
        element={
          <TasksPage
            tasks={tasks}
            setTasks={setTasks}
            setEditTask={setEditTask}
            setViewTask={setViewTask}
          />
        }
      />
      <Route
        path="/viewtask"
        element={<ViewTaskPage task={viewTask} setEditTask={setEditTask} />}
      />
    </Routes>
  );
}
