export function Footer({ variant = "full" }) {
  if (variant === "minimal")
    return (
      <footer
        style={{
          textAlign: "center",
          padding: "32px",
          color: "var(--muted)",
          fontSize: "13px",
        }}
      >
        2026 TaskBoard. All rights reserved.
      </footer>
    );
  return (
    <footer
      style={{
        background: "#fff",
        borderTop: "1px solid var(--border)",
        padding: "24px 32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "12px",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "24px",
          fontSize: "13px",
          color: "var(--muted)",
        }}
      >
        <span style={{ cursor: "pointer" }}>Privacy Policy</span>
        <span style={{ cursor: "pointer" }}>Terms of Service</span>
        <span style={{ cursor: "pointer" }}>Contact Us</span>
      </div>
      <span style={{ fontSize: "13px", color: "var(--muted)" }}>
        © 2026 TaskBoard. All rights reserved.
      </span>
    </footer>
  );
}
