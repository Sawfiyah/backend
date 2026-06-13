import {
  PlusIcon,
  EyeIcon,
  TrashIcon,
  PencilIcon,
  CalendarIcon,
  CheckIcon,
} from "lucide-react";
import { StatusBadge } from "./Badges";

export function TaskCard({ task, onView, onEdit, onDelete, onMarkComplete }) {
  const isCompleted = task.task_status === "Completed";
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const isMissed =
    !isCompleted && task.task_due_date && new Date(task.task_due_date) < today;
  const statusLabel = isCompleted
    ? "Completed"
    : isMissed
      ? "Missed"
      : "Pending";
  if (task.isNew)
    return (
      <div
        onClick={onEdit}
        style={{
          background: "#fff",
          border: "2px dashed var(--border)",
          borderRadius: "14px",
          padding: "24px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
          cursor: "pointer",
          minHeight: "200px",
          transition: "border-color 0.2s",
        }}
      >
        <div
          style={{
            width: "42px",
            height: "42px",
            borderRadius: "50%",
            border: "2px solid var(--border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--muted)",
          }}
        >
          <PlusIcon />
        </div>
        <div
          style={{ fontWeight: 600, color: "var(--text)", fontSize: "15px" }}
        >
          Create New Task
        </div>
        <div style={{ color: "var(--muted)", fontSize: "13px" }}>
          Organize your study flow
        </div>
      </div>
    );

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "14px",
        padding: "20px 22px",
        boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
        transition: "box-shadow 0.2s",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <StatusBadge status={statusLabel} />
        <div style={{ display: "flex", gap: "10px", color: "var(--muted)" }}>
          <button
            onClick={() => onView(task)}
            style={{
              background: "transparent",
              color: "var(--muted)",
              padding: "2px",
            }}
          >
            <EyeIcon />
          </button>
          <button
            onClick={() => onEdit(task)}
            style={{
              background: "transparent",
              color: "var(--muted)",
              padding: "2px",
            }}
          >
            <PencilIcon />
          </button>
          <button
            onClick={() => onDelete(task.id)}
            style={{
              background: "transparent",
              color: "var(--muted)",
              padding: "2px",
            }}
          >
            <TrashIcon />
          </button>
        </div>
      </div>
      <div>
        <div
          style={{
            fontWeight: 700,
            fontSize: "15px",
            color: "var(--text)",
            marginBottom: "6px",
          }}
        >
          {task.task_title}
        </div>
        <div
          style={{ fontSize: "13px", color: "var(--muted)", lineHeight: 1.5 }}
        >
          {task.task_description}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: "4px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            color: "var(--muted)",
            fontSize: "13px",
          }}
        >
          <CalendarIcon />
          {isCompleted ? (
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: "4px",
                color: "var(--green)",
              }}
            >
              <CheckIcon /> Done
            </span>
          ) : (
            <>
              <span>
                {task.task_due_date
                  ? new Date(task.task_due_date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  : "No date"}
              </span>
              <button
                onClick={() => onMarkComplete?.(task.id)}
                style={{
                  background: "var(--blue)",
                  color: "#fff",
                  padding: "0 10px",
                  height: "20px",
                  borderRadius: "10px",
                  fontWeight: 600,
                  fontSize: "10px",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  boxShadow: "0 2px 8px rgba(29,78,216,0.25)",
                }}
              >
                Done
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
