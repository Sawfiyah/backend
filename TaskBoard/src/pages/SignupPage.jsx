// src/pages/SignupPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../api/authService";
import { getAllTasks } from "../api/taskService";

export default function SignupPage({ setTasks }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSignup() {
    try {
      await signup(username, password);
      const tasks = await getAllTasks();
      setTasks(tasks);
      navigate("/");
    } catch (err) {
      console.log(err);
      setError("Username already taken");
    }
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "80px 32px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          background: "#fff",
          borderRadius: "18px",
          padding: "36px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
        }}
      >
        <h2 style={{ fontSize: "24px", fontWeight: 800, marginBottom: "24px" }}>
          Sign Up
        </h2>
        {error && <p style={{ color: "red", marginBottom: "16px" }}>{error}</p>}
        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            width: "100%",
            padding: "11px 16px",
            border: "1.5px solid var(--border)",
            borderRadius: "10px",
            fontSize: "14px",
            marginBottom: "12px",
          }}
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "11px 16px",
            border: "1.5px solid var(--border)",
            borderRadius: "10px",
            fontSize: "14px",
            marginBottom: "20px",
          }}
        />
        <button
          onClick={handleSignup}
          style={{
            width: "100%",
            background: "var(--blue)",
            color: "#fff",
            padding: "13px",
            borderRadius: "10px",
            fontWeight: 600,
            fontSize: "15px",
          }}
        >
          Sign Up
        </button>
        <p style={{ textAlign: "center", marginTop: "16px", fontSize: "14px" }}>
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            style={{ color: "var(--blue)", cursor: "pointer", fontWeight: 600 }}
          >
            Log in
          </span>
        </p>
      </div>
    </div>
  );
}
