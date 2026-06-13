import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CalendarIcon, SaveIcon } from "lucide-react";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { updateTask, getAllTasks } from "../api/taskService";

export default function EditTaskPage({ task, setTasks }) {
  const navigate = useNavigate();
  const [title, setTitle] = useState(task?.task_title || "");
  const [desc, setDesc] = useState(task?.task_description || "");
  const [dueDate, setDueDate] = useState(task?.task_due_date || "");

  async function handleUpdate() {
    const formData = {
      task_title: title,
      task_description: desc,
      task_due_date: dueDate,
    };

    await updateTask(task.id, formData);
    const updated = await getAllTasks();
    setTasks(updated);
    navigate("/tasks");
  }

  return (
    <>
      <Navbar />
      <div
        style={{
          padding: "32px",
          minHeight: "80vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div style={{ width: "100%", maxWidth: "540px" }}>
          <div
            style={{
              background: "#fff",
              borderRadius: "18px",
              padding: "36px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "28px",
              }}
            >
              <h2 style={{ fontSize: "24px", fontWeight: 800 }}>Edit Task</h2>
              <div style={{ color: "var(--blue)" }}>
                <SaveIcon />
              </div>
            </div>

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
                value={title}
                onChange={(e) => setTitle(e.target.value)}
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
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
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

            <label style={{ display: "block", marginBottom: "28px" }}>
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
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
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

            <div style={{ display: "flex", gap: "12px" }}>
              <button
                onClick={handleUpdate}
                style={{
                  flex: 1,
                  background: "var(--blue)",
                  color: "#fff",
                  padding: "13px",
                  borderRadius: "10px",
                  fontWeight: 600,
                  fontSize: "15px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  boxShadow: "0 2px 8px rgba(29,78,216,0.2)",
                }}
              >
                <SaveIcon /> Update Task
              </button>
              <button
                onClick={() => navigate("/tasks")}
                style={{
                  flex: "0 0 120px",
                  background: "#fff",
                  color: "var(--text)",
                  padding: "13px",
                  borderRadius: "10px",
                  fontWeight: 600,
                  fontSize: "15px",
                  border: "1.5px solid var(--border)",
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
