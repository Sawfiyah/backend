import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { TrendingUpIcon, BookIcon } from "lucide-react";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { getAllTasks, updateTask } from "../api/taskService";
import { getUsername } from "../api/authService";

export default function HomePage({ tasks, setTasks }) {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState("home");
  const username = getUsername();
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayTasks = tasks.filter(
    (t) =>
      t.task_due_date &&
      new Date(t.task_due_date).toDateString() === today.toDateString(),
  );
  const total = todayTasks.length;
  const completed = todayTasks.filter((t) => t.task_status === "Completed");
  const progress = total > 0 ? Math.round((completed.length / total) * 100) : 0;

  async function toggleTask(id) {
    const task = tasks.find((t) => t.id === id);
    const formData = {
      task_status: task.task_status === "Completed" ? "Pending" : "Completed",
    };

    await updateTask(id, formData);
    const updated = await getAllTasks();
    setTasks(updated);
  }

  return (
    <div>
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      {/* Hero */}
      <div
        style={{
          margin: "24px 32px",
          borderRadius: "18px",
          background:
            "linear-gradient(135deg, #e8f0fe 0%, #f0f7ff 60%, #e0f2fe 100%)",
          padding: "56px 32px",
          textAlign: "center",
        }}
      >
        {username && (
          <p
            style={{
              fontSize: "14px",
              fontWeight: 600,
              color: "var(--blue)",
              marginBottom: "8px",
            }}
          >
            Welcome, {username}
          </p>
        )}

        <h1
          style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: "clamp(28px,4vw,42px)",
            fontWeight: 400,
            color: "var(--text)",
            marginBottom: "14px",
          }}
        >
          Simple Task Manager for Students
        </h1>
        <p
          style={{
            color: "var(--muted)",
            fontSize: "16px",
            marginBottom: "28px",
            maxWidth: "420px",
            margin: "0 auto 28px",
          }}
        >
          Organize your tasks, stay productive, and track your daily progress
          easily.
        </p>
        <button
          onClick={() => navigate("/tasks")}
          style={{
            background: "var(--blue)",
            color: "#fff",
            padding: "12px 28px",
            borderRadius: "10px",
            fontWeight: 600,
            fontSize: "15px",
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            boxShadow: "0 4px 14px rgba(29,78,216,0.3)",
            transition: "transform 0.15s",
          }}
        >
          View Tasks →
        </button>
      </div>

      {/* Cards row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
          margin: "0 32px 24px",
        }}
      >
        {/* Progress */}
        <div
          style={{
            background: "#fff",
            borderRadius: "16px",
            padding: "28px",
            boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "14px",
            }}
          >
            <span
              style={{
                fontWeight: 700,
                fontSize: "16px",
                color: "var(--blue)",
              }}
            >
              Today's Progress
            </span>
            <span style={{ fontWeight: 600, fontSize: "15px" }}>
              {progress}%
            </span>
          </div>
          <div
            style={{
              height: "8px",
              background: "#e2e8f0",
              borderRadius: "999px",
              marginBottom: "20px",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${progress}%`,
                background: "var(--blue)",
                borderRadius: "999px",
                transition: "width 0.5s",
              }}
            />
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            {tasks
              .filter(
                (t) =>
                  t.task_due_date &&
                  new Date(t.task_due_date).toDateString() ===
                    today.toDateString(),
              )
              .map((t) => (
                <div
                  key={t.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    fontSize: "14px",
                    color:
                      t.task_status === "Completed"
                        ? "var(--muted)"
                        : "var(--text)",
                  }}
                >
                  <label htmlFor={t.id}>
                    <input
                      type="checkbox"
                      name="completed"
                      id={t.id}
                      checked={t.task_status === "Completed"}
                      onChange={() => toggleTask(t.id)}
                    />
                    <span
                      style={{
                        paddingLeft: "10px",
                        textDecoration:
                          t.task_status === "Completed"
                            ? "line-through"
                            : "none",
                      }}
                    >
                      {t.task_title}
                    </span>
                  </label>
                </div>
              ))}
          </div>
        </div>

        {/* Right column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div
            style={{
              background: "#fff",
              borderRadius: "16px",
              padding: "24px",
              boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
              flex: 1,
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                background: "var(--blue-light)",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "14px",
              }}
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#1d4ed8"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <div
              style={{ fontWeight: 700, fontSize: "16px", marginBottom: "6px" }}
            >
              Smart Reminders
            </div>
            <div
              style={{
                color: "var(--muted)",
                fontSize: "13px",
                lineHeight: 1.5,
              }}
            >
              Never miss a deadline with personalized notifications for every
              lecture and exam.
            </div>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "14px",
            }}
          >
            <div
              style={{
                background: "#dcfce7",
                borderRadius: "14px",
                padding: "18px",
              }}
            >
              <TrendingUpIcon style={{ color: "#15803d" }} />
              <div
                style={{
                  fontWeight: 600,
                  fontSize: "13px",
                  color: "#15803d",
                  marginTop: "8px",
                }}
              >
                Progress Tracking
              </div>
            </div>
            <div
              style={{
                background: "#fef9c3",
                borderRadius: "14px",
                padding: "18px",
              }}
            >
              <BookIcon />
              <div
                style={{
                  fontWeight: 600,
                  fontSize: "13px",
                  color: "#92400e",
                  marginTop: "8px",
                }}
              >
                Study Focus
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Banner */}
      <div
        style={{
          margin: "0 32px 32px",
          borderRadius: "18px",
          overflow: "hidden",
          position: "relative",
          minHeight: "300px",
          backgroundImage: "url('/student.jpg')",
          backgroundPosition: "center",
          backgroundSize: "cover",
          display: "flex",
          alignItems: "flex-end",
          padding: "28px 32px",
        }}
      >
        <div>
          <div
            style={{
              fontWeight: 800,
              fontSize: "22px",
              color: "#fff",
              marginBottom: "6px",
            }}
          >
            Built by students, for students.
          </div>
          <div style={{ color: "#fff", fontSize: "14px" }}>
            Designed specifically for the unique challenges of academic life.
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
