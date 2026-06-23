import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";
import "../styles.css";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "", email: "", phone: "", password: "", confirmPassword: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      await API.post("/auth/register", {
        name: form.name,
        email: form.email,
        phone: form.phone,
        password: form.password,
      });
      setSuccess("Account created! Redirecting to login...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page" style={{ display: "flex", minHeight: "100vh" }}>
      {/* Left panel */}
      <div style={{
        flex: 1,
        background: "#1a1a1a",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "60px 40px",
        color: "#fff",
      }}>
        <Link to="/" style={{ fontSize: "28px", fontWeight: 800, color: "#fff", textDecoration: "none", marginBottom: "40px" }}>
          ✦ <span style={{ color: "#c2476b" }}>Anita`s </span>Hair & Beauty Care.
        </Link>
        <h2 style={{ fontSize: "24px", fontWeight: 700, marginBottom: "14px", textAlign: "center" }}>
          "Get your appointment now; most people have already joined."
        </h2>
        <p style={{ fontSize: "14px", opacity: 0.7, textAlign: "center", lineHeight: 1.7, maxWidth: "280px" }}>
          Create your account and enjoy hassle-free salon bookings, reminders and exclusive offers.
        </p>
        <div style={{ marginTop: "48px", width: "100%", maxWidth: "300px" }}>
          {[
            { step: "1", text: "Create your free account" },
            { step: "2", text: "Choose a service & date" },
            { step: "3", text: "Confirm your booking" },
            { step: "4", text: "Enjoy your salon visit" },
          ].map((s, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "20px" }}>
              <div style={{
                width: "32px", height: "32px", borderRadius: "50%",
                background: "#c2476b", display: "flex", alignItems: "center",
                justifyContent: "center", fontSize: "13px", fontWeight: 700, flexShrink: 0
              }}>{s.step}</div>
              <div style={{ fontSize: "14px", opacity: 0.85 }}>{s.text}</div>
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
        overflowY: "auto",
      }}>
        <div style={{ width: "100%", maxWidth: "420px" }}>
          <h1 style={{ fontSize: "26px", fontWeight: 700, marginBottom: "6px" }}>Create account</h1>
          <p style={{ fontSize: "14px", color: "#777", marginBottom: "28px" }}>
            Already have an account?{" "}
            <Link to="/login" style={{ color: "#c2476b", fontWeight: 600, textDecoration: "none" }}>
              Sign in
            </Link>
          </p>

          {error && <div className="alert alert-error">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Full name</label>
              <input
                type="text"
                name="name"
                placeholder="Your full name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
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
              <label>Phone number</label>
              <input
                type="tel"
                name="phone"
                placeholder="+91 98765 43210"
                value={form.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Create a strong password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Confirm password</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Re-enter your password"
                value={form.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: "100%", padding: "12px", fontSize: "15px", marginTop: "4px" }}
              disabled={loading}
            >
              {loading ? "Creating account..." : "Create account →"}
            </button>
          </form>

          <p style={{ marginTop: "20px", fontSize: "12px", color: "#aaa", textAlign: "center" }}>
            By registering, you agree to our{" "}
            <a href="#" style={{ color: "#c2476b" }}>Terms</a> and{" "}
            <a href="#" style={{ color: "#c2476b" }}>Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
