import { GraduationCap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

export function Navbar({ currentPage, setCurrentPage }) {
  const navigate = useNavigate();
  return (
    <header
      style={{
        background: "#fff",
        borderBottom: "1px solid var(--border)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 32px",
        height: "56px",
        position: "sticky",
        top: 0,
        zIndex: 100,
        boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          color: "var(--blue)",
          fontWeight: 700,
          fontSize: "17px",
          cursor: "pointer",
        }}
        onClick={() => navigate("/")}
      >
        <GraduationCap />
        <span>TaskBoard</span>
      </div>

      {/* Desktop links */}
      <nav className="navLinks">
        <a
          href="/"
          className={currentPage === "home" ? "active" : ""}
          onClick={() => setCurrentPage("home")}
        >
          Home
        </a>
        <a
          href="/tasks"
          className={currentPage === "tasks" ? "active" : ""}
          onClick={() => setCurrentPage("tasks")}
        >
          Tasks
        </a>
        <a
          href="/addtask"
          className={currentPage === "addtask" ? "active" : ""}
          onClick={() => setCurrentPage("addtask")}
        >
          Add Task
        </a>
        <a
          href="/about"
          className={currentPage === "about" ? "active" : ""}
          onClick={() => setCurrentPage("about")}
        >
          About
        </a>
      </nav>
    </header>
  );
}
