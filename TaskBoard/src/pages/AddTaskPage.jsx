import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CalendarIcon,
  CheckIcon,
  LightbulbIcon,
  ArrowLeftIcon,
} from "lucide-react";
import { PriorityBadge } from "../components/Badges";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { createTask, getAllTasks } from "../api/taskService";

export default function AddTaskPage({ setTasks }) {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState("addtask");
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskDueDate, setTaskDueDate] = useState("");
  const [taskPriority, setTaskPriority] = useState("");

  async function handleSubmit() {
    const formData = {
      task_title: taskTitle,
      task_description: taskDescription,
      task_due_date: taskDueDate,
      task_priority: taskPriority,
    };

    await createTask(formData);
    const updated = await getAllTasks();
    setTasks(updated);
    navigate("/tasks");
  }

  return (
    <>
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <div style={{ padding: "24px 32px", minHeight: "80vh" }}>
        <button
          onClick={() => navigate("/tasks")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            color: "var(--muted)",
            fontSize: "14px",
            background: "transparent",
            marginBottom: "24px",
          }}
        >
          <ArrowLeftIcon /> Back to Tasks
        </button>

        <div style={{ maxWidth: "560px", margin: "0 auto" }}>
          <div
            style={{
              background: "#fff",
              borderRadius: "18px",
              padding: "36px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
              marginBottom: "20px",
            }}
          >
            <h2
              style={{ fontSize: "24px", fontWeight: 800, marginBottom: "6px" }}
            >
              Add New Task
            </h2>
            <p
              style={{
                color: "var(--muted)",
                fontSize: "14px",
                marginBottom: "28px",
              }}
            >
              Fill in the details below to organize your academic schedule.
            </p>

            <label style={{ display: "block", marginBottom: "18px" }}>
              <span
                style={{
                  fontWeight: 600,
                  fontSize: "14px",
                  display: "block",
                  marginBottom: "8px",
                }}
              >
                Task Title
              </span>
              <input
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                placeholder="Enter task title"
                style={{
                  width: "100%",
                  padding: "11px 16px",
                  border: "1.5px solid var(--border)",
                  borderRadius: "10px",
                  fontSize: "14px",
                  color: "var(--text)",
                  background: "#fff",
                }}
              />
            </label>

            <label style={{ display: "block", marginBottom: "18px" }}>
              <span
                style={{
                  fontWeight: 600,
                  fontSize: "14px",
                  display: "block",
                  marginBottom: "8px",
                }}
              >
                Description
              </span>
              <textarea
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
                placeholder="Write task details..."
                rows={5}
                style={{
                  width: "100%",
                  padding: "11px 16px",
                  border: "1.5px solid var(--border)",
                  borderRadius: "10px",
                  fontSize: "14px",
                  resize: "vertical",
                  color: "var(--text)",
                  background: "#fff",
                  lineHeight: 1.5,
                }}
              />
            </label>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "18px",
                marginBottom: "28px",
              }}
            >
              <label>
                <span
                  style={{
                    fontWeight: 600,
                    fontSize: "14px",
                    display: "block",
                    marginBottom: "8px",
                  }}
                >
                  Due Date
                </span>
                <div style={{ position: "relative" }}>
                  <span
                    style={{
                      position: "absolute",
                      left: "12px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "var(--muted)",
                    }}
                  >
                    <CalendarIcon />
                  </span>
                  <input
                    type="date"
                    value={taskDueDate}
                    onChange={(e) => setTaskDueDate(e.target.value)}
                    style={{
                      width: "100%",
                      paddingLeft: "38px",
                      paddingRight: "12px",
                      height: "44px",
                      border: "1.5px solid var(--border)",
                      borderRadius: "10px",
                      fontSize: "14px",
                      color: "var(--text)",
                      background: "#fff",
                    }}
                  />
                </div>
              </label>
              <div>
                <span
                  style={{
                    fontWeight: 600,
                    fontSize: "14px",
                    display: "block",
                    marginBottom: "8px",
                  }}
                >
                  Priority
                </span>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {["Low", "Medium", "High"].map((p) => (
                    <PriorityBadge
                      key={p}
                      priority={p}
                      selected={taskPriority === p}
                      onClick={() => setTaskPriority(p)}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <button
                onClick={() => navigate("/tasks")}
                style={{
                  background: "transparent",
                  color: "var(--blue)",
                  fontWeight: 600,
                  fontSize: "15px",
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                style={{
                  background: "var(--blue)",
                  color: "#fff",
                  padding: "12px 28px",
                  borderRadius: "10px",
                  fontWeight: 600,
                  fontSize: "15px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  boxShadow: "0 2px 8px rgba(29,78,216,0.25)",
                }}
              >
                <CheckIcon /> Save Task
              </button>
            </div>
          </div>

          {/* Pro-tip */}
          <div
            style={{
              background: "#eff6ff",
              borderRadius: "14px",
              padding: "18px 22px",
              display: "flex",
              gap: "12px",
              alignItems: "flex-start",
            }}
          >
            <LightbulbIcon />
            <p
              style={{
                fontSize: "13px",
                color: "var(--blue)",
                lineHeight: 1.5,
              }}
            >
              <strong>Pro-tip:</strong> Grouping your tasks with specific
              descriptions helps TaskBoard provide better focus-time
              recommendations later!
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
