import { useState } from "react";
import { CodeIcon, ShieldIcon, SparklesIcon } from "lucide-react";
import { Navbar } from "../components/Navbar";

export default function AboutPage() {
  const [currentPage, setCurrentPage] = useState("about");
  return (
    <div>
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      {/* Hero image placeholder */}
      <div
        style={{
          margin: "24px 32px",
          borderRadius: "18px",
          overflow: "hidden",
          backgroundImage: "url('/girl.jpg')",
          backgroundPosition: "center",
          backgroundSize: "cover",
          height: "260px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      ></div>

      {/* Content */}
      <div
        style={{
          maxWidth: "700px",
          margin: "0 auto",
          padding: "0 32px 48px",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: "36px",
            fontWeight: 400,
            marginBottom: "10px",
          }}
        >
          About This App
        </h2>
        <div
          style={{
            width: "48px",
            height: "3px",
            background: "var(--blue)",
            borderRadius: "2px",
            margin: "0 auto 28px",
          }}
        />

        <p
          style={{
            color: "var(--muted)",
            lineHeight: 1.8,
            fontSize: "15px",
            marginBottom: "18px",
          }}
        >
          This is a simple task management application built to help students
          organize their daily activities and improve productivity. It is
          designed as a learning project for React and Django beginners.
        </p>
        <p
          style={{
            color: "var(--muted)",
            lineHeight: 1.8,
            fontSize: "15px",
            marginBottom: "40px",
          }}
        >
          TaskBoard focuses on the essentials: capturing tasks, tracking
          progress, and maintaining a clear mind. By removing the clutter found
          in typical enterprise project managers, we provide a streamlined
          interface that respects the student's cognitive load and encourages
          focused study sessions.
        </p>

        {/* Feature cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "18px",
            textAlign: "left",
          }}
        >
          {[
            {
              icon: <SparklesIcon />,
              color: "var(--blue)",
              title: "Focused UI",
              desc: "Minimalist design intended to reduce distraction and maximize focus on the task at hand.",
            },
            {
              icon: <CodeIcon />,
              color: "var(--blue)",
              title: "Modern Tech",
              desc: "Leveraging React and Django to demonstrate modern full-stack web development practices.",
            },
            {
              icon: <ShieldIcon />,
              color: "#b45309",
              title: "Academic Tool",
              desc: "Designed specifically for the academic journey, from daily lectures to long-term research.",
            },
          ].map((f) => (
            <div
              key={f.title}
              style={{
                background: "#fff",
                borderRadius: "16px",
                padding: "24px",
                boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
              }}
            >
              <div style={{ color: f.color, marginBottom: "12px" }}>
                {f.icon}
              </div>
              <div
                style={{
                  fontWeight: 700,
                  fontSize: "15px",
                  marginBottom: "8px",
                }}
              >
                {f.title}
              </div>
              <p
                style={{
                  color: "var(--muted)",
                  fontSize: "13px",
                  lineHeight: 1.6,
                }}
              >
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

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
            alignItems: "center",
            gap: "8px",
            color: "var(--blue)",
          }}
        ></div>
        <span style={{ fontSize: "13px", color: "var(--muted)" }}>
          © 2026 TaskBoard. All rights reserved.
        </span>
        <div
          style={{
            display: "flex",
            gap: "20px",
            fontSize: "13px",
            color: "var(--muted)",
          }}
        >
          <span style={{ cursor: "pointer" }}>Privacy Policy</span>
          <span style={{ cursor: "pointer" }}>Terms of Service</span>
        </div>
      </footer>
    </div>
  );
}
