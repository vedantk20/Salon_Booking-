import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";
import "../styles.css";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await API.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page" style={{ display: "flex", minHeight: "100vh" }}>
      {/* Left panel */}
      <div style={{
        flex: 1,
        background: "#c2476b",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "60px 40px",
        color: "#fff",
      }}>
        <Link to="/" style={{ fontSize: "28px", fontWeight: 800, color: "#fff", textDecoration: "none", marginBottom: "40px" }}>
          ✦ Anita`s Hair & Beauty Care.
        </Link>
        <h2 style={{ fontSize: "26px", fontWeight: 700, marginBottom: "14px", textAlign: "center" }}>
          Welcome back!
        </h2>
        <p style={{ fontSize: "15px", opacity: 0.85, textAlign: "center", lineHeight: 1.6, maxWidth: "300px" }}>
          Login to manage your bookings, view upcoming appointments, and explore our services.
        </p>
        <div style={{ marginTop: "48px", display: "flex", flexDirection: "column", gap: "16px", width: "100%", maxWidth: "280px" }}>
          {["✂️ Haircut & styling", "✨ Facial & skin care", "💅 Manicure & pedicure", "🌿 Spa & massage"].map((s, i) => (
            <div key={i} style={{ background: "rgba(255,255,255,0.15)", borderRadius: "10px", padding: "12px 16px", fontSize: "14px" }}>
              {s}
            </div>
          ))}
        </div>
      </div>

      {/* Right panel — form */}
      <div style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "60px 40px",
        background: "#faf9f7",
      }}>
        <div style={{ width: "100%", maxWidth: "400px" }}>
          <h1 style={{ fontSize: "26px", fontWeight: 700, marginBottom: "6px" }}>Sign in</h1>
          <p style={{ fontSize: "14px", color: "#777", marginBottom: "28px" }}>
            Don't have an account?{" "}
            <Link to="/register" style={{ color: "#c2476b", fontWeight: 600, textDecoration: "none" }}>
              Register here
            </Link>
          </p>

          {error && <div className="alert alert-error">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email address</label>
              <input
                type="email"
                name="email"
                placeholder="you@email.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>
            <div style={{ textAlign: "right", marginBottom: "20px" }}>
              <a href="#" style={{ fontSize: "13px", color: "#c2476b", textDecoration: "none" }}>
                Forgot password?
              </a>
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: "100%", padding: "12px", fontSize: "15px" }}
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign in →"}
            </button>
          </form>

          <div style={{ margin: "24px 0", textAlign: "center", color: "#bbb", fontSize: "13px" }}>or continue with</div>
          <button className="btn" style={{ width: "100%", padding: "12px", fontSize: "14px" }}>
            🔵 Continue with Google
          </button>

          <p style={{ marginTop: "28px", fontSize: "12px", color: "#aaa", textAlign: "center" }}>
            By signing in, you agree to our{" "}
            <a href="#" style={{ color: "#c2476b" }}>Terms</a> and{" "}
            <a href="#" style={{ color: "#c2476b" }}>Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
