export function PriorityBadge({ priority, selected, onClick }) {
  const colors = {
    Low: {
      bg: selected ? "#f1f5f9" : "#f8fafc",
      border: "#cbd5e1",
      text: "#475569",
    },
    Medium: {
      bg: selected ? "#fef3c7" : "#fffbeb",
      border: "#fcd34d",
      text: "#92400e",
    },
    High: {
      bg: selected ? "#fee2e2" : "#fff5f5",
      border: "#fca5a5",
      text: "#991b1b",
    },
  };
  const c = colors[priority] || colors.Med;
  return (
    <button
      onClick={onClick}
      style={{
        padding: "5px 14px",
        borderRadius: "999px",
        fontSize: "13px",
        fontWeight: 500,
        background: c.bg,
        border: `1.5px solid ${selected ? c.border : "#e2e8f0"}`,
        color: c.text,
        transition: "all 0.15s",
      }}
    >
      {priority}
    </button>
  );
}

// ── Status badge ────────────────────────────────────────────────────────────
export function StatusBadge({ status }) {
  const palette = {
    Pending: {
      background: "var(--amber-bg)",
      color: "var(--amber)",
    },
    Missed: {
      background: "#fee2e2",
      color: "#b91c1c",
    },
    Completed: {
      background: "var(--green-bg)",
      color: "var(--green)",
    },
  };

  const style = palette[status] || palette.Pending;

  return (
    <span
      style={{
        padding: "3px 10px",
        borderRadius: "999px",
        fontSize: "12px",
        fontWeight: 600,
        background: style.background,
        color: style.color,
      }}
    >
      {status}
    </span>
  );
}
