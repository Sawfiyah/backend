import {
  ArrowLeftIcon,
  PencilIcon,
  ListIcon,
  CalendarIcon,
  SparklesIcon,
} from "lucide-react";
import { PriorityBadge } from "../components/Badges";
import { useNavigate } from "react-router-dom";

export default function ViewTaskPage({ task, setEditTask }) {
  const navigate = useNavigate();

  if (!task) {
    navigate("/tasks");
    return null;
  }
  return (
    <div style={{ padding: "24px 32px", minHeight: "80vh" }}>
      <button
        onClick={() => navigate("/tasks")}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          color: "var(--text)",
          fontSize: "16px",
          fontWeight: 700,
          background: "transparent",
          marginBottom: "24px",
        }}
      >
        <ArrowLeftIcon /> View Task
      </button>

      <div style={{ maxWidth: "760px", margin: "0 auto" }}>
        <div
          style={{
            background: "#fff",
            borderRadius: "18px",
            padding: "36px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: "20px",
            }}
          >
            <div>
              <h2 style={{ fontSize: "26px", fontWeight: 800 }}>
                {task.task_title}
              </h2>
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              <span
                style={{
                  padding: "5px 14px",
                  borderRadius: "999px",
                  fontSize: "13px",
                  fontWeight: 500,
                  background: "#f0fdf4",
                  color: "#15803d",
                  border: "1px solid #86efac",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                <span
                  style={{
                    width: "7px",
                    height: "7px",
                    borderRadius: "50%",
                    background: "#15803d",
                    display: "inline-block",
                  }}
                />
                {task.task_status}
              </span>
              <PriorityBadge priority={task.task_priority} selected />
            </div>
          </div>

          <div
            style={{
              borderTop: "1px solid var(--border)",
              paddingTop: "20px",
              marginBottom: "24px",
            }}
          >
            <div
              style={{
                fontWeight: 600,
                fontSize: "14px",
                marginBottom: "10px",
                color: "var(--text)",
              }}
            >
              Description
            </div>
            <p
              style={{
                color: "var(--muted)",
                lineHeight: 1.7,
                fontSize: "15px",
              }}
            >
              {task.task_description}
            </p>
          </div>

          <div
            style={{
              borderTop: "1px solid var(--border)",
              paddingTop: "24px",
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "16px",
              marginBottom: "28px",
            }}
          >
            <div
              style={{
                background: "var(--bg)",
                borderRadius: "12px",
                padding: "18px",
                display: "flex",
                gap: "14px",
                alignItems: "center",
              }}
            >
              <div style={{ color: "var(--blue)" }}>
                <CalendarIcon />
              </div>
              <div>
                <div
                  style={{
                    fontSize: "12px",
                    color: "var(--muted)",
                    marginBottom: "4px",
                  }}
                >
                  Due Date
                </div>
                <div style={{ fontWeight: 700, fontSize: "15px" }}>
                  {task.task_due_date
                    ? new Date(task.task_due_date).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })
                    : "No date set"}
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", gap: "12px" }}>
            <button
              onClick={() => {
                setEditTask(task);
                navigate("/edittask");
              }}
              style={{
                background: "var(--blue)",
                color: "#fff",
                padding: "12px 24px",
                borderRadius: "10px",
                fontWeight: 600,
                fontSize: "15px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                boxShadow: "0 2px 8px rgba(29,78,216,0.2)",
              }}
            >
              <PencilIcon /> Edit Task
            </button>
            <button
              onClick={() => navigate("/tasks")}
              style={{
                background: "#fff",
                color: "var(--blue)",
                padding: "12px 24px",
                borderRadius: "10px",
                fontWeight: 600,
                fontSize: "15px",
                border: "1.5px solid var(--blue)",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <ListIcon /> Back to Tasks
            </button>
          </div>
        </div>

        {/* Motivational footer */}
        <div
          style={{
            textAlign: "center",
            padding: "32px 0",
            color: "var(--muted)",
          }}
        >
          <SparklesIcon style={{ margin: "0 auto 8px", display: "block" }} />
          <p style={{ fontSize: "13px", fontStyle: "italic" }}>
            Stay focused. Consistent small steps lead to academic mastery.
          </p>
        </div>
      </div>
    </div>
  );
}
