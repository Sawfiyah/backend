import { useState } from "react";
import { SearchIcon, PlusIcon } from "lucide-react";
import { Footer } from "../components/Footer";
import { TaskCard } from "../components/TaskCard";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { deleteTask, getAllTasks, updateTask } from "../api/taskService";

export default function TasksPage({
  tasks,
  setTasks,
  setEditTask,
  setViewTask,
}) {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState("tasks");

  const getTaskCategory = (task) => {
    if (task.task_status === "Completed") return "Completed";

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (task.task_due_date && new Date(task.task_due_date) < today)
      return "Missed";

    return "Pending";
  };

  const filtered = tasks.filter((task) => {
    const matchesSearch =
      task.task_title.toLowerCase().includes(search.toLowerCase()) ||
      task.task_description.toLowerCase().includes(search.toLowerCase());

    const matchesFilter = filter === "All" || getTaskCategory(task) === filter;

    return matchesSearch && matchesFilter;
  });

  async function handleDelete(id) {
    await deleteTask(id);
    const updated = await getAllTasks();
    setTasks(updated);
  }

  async function handleMarkComplete(id) {
    const formData = {
      task_status: "Completed",
    };

    await updateTask(id, formData);
    const updated = await getAllTasks();
    setTasks(updated);
  }

  const handleEdit = (task) => {
    setEditTask(task);
    navigate("/edittask");
  };

  const handleView = (task) => {
    setViewTask(task);
    navigate("/viewtask");
  };

  return (
    <>
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <div style={{ padding: "32px", minHeight: "80vh" }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            marginBottom: "28px",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <div>
            <h1
              style={{ fontSize: "28px", fontWeight: 800, marginBottom: "4px" }}
            >
              My Tasks
            </h1>
            <p style={{ color: "var(--muted)", fontSize: "14px" }}>
              Stay focused and track your academic progress.
            </p>
          </div>
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <div style={{ position: "relative" }}>
              <span
                style={{
                  position: "absolute",
                  left: "14px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--muted)",
                }}
              >
                <SearchIcon />
              </span>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search tasks..."
                style={{
                  paddingLeft: "42px",
                  paddingRight: "16px",
                  height: "44px",
                  borderRadius: "999px",
                  border: "1.5px solid var(--border)",
                  background: "#fff",
                  fontSize: "14px",
                  width: "240px",
                  color: "var(--text)",
                }}
              />
            </div>
            <button
              onClick={() => navigate("/addtask")}
              style={{
                background: "var(--blue)",
                color: "#fff",
                padding: "0 20px",
                height: "44px",
                borderRadius: "10px",
                fontWeight: 600,
                fontSize: "14px",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                boxShadow: "0 2px 8px rgba(29,78,216,0.25)",
              }}
            >
              <PlusIcon /> New Task
            </button>
          </div>
        </div>

        {/* Filters */}
        <div
          style={{
            marginBottom: "24px",
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
          }}
        >
          {["All", "Pending", "Completed", "Missed"].map((option) => {
            const selected = filter === option;

            return (
              <button
                key={option}
                type="button"
                onClick={() => setFilter(option)}
                style={{
                  border: `1.5px solid ${selected ? "var(--blue)" : "var(--border)"}`,
                  background: selected ? "var(--blue)" : "#fff",
                  color: selected ? "#fff" : "var(--text)",
                  padding: "6px 14px",
                  borderRadius: "999px",
                  fontSize: "13px",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                {option}
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "20px",
          }}
        >
          {filtered.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onView={handleView}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onMarkComplete={handleMarkComplete}
            />
          ))}
          <TaskCard
            task={{ isNew: true }}
            onEdit={() => navigate("/addtask")}
          />
        </div>
      </div>
      <Footer variant="minimal" />
    </>
  );
}
