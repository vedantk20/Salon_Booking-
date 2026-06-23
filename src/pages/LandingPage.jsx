import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles.css";

const highlights = [
  { icon: "✂️", title: "Expert stylists", desc: "Certified professionals with 15+ years experience" },
  { icon: "📅", title: "Easy booking", desc: "Book your slot online anytime," },
  { icon: "🔔", title: "Reminders", desc: "SMS & email reminders before your appointment" },
  { icon: "🛡️", title: "Hygienic & safe", desc: "Tools sterilized, salon sanitized daily" },
];

const services = [
  { icon: "✂️", name: "Haircut & styling", price: "starting at ₹300", time: "45 min" },
  { icon: "✨", name: "Facial & skin care", price: "starting at ₹500", time: "60 min" },
  { icon: "💧", name: "Hair colour", price: "starting at ₹800", time: "90 min" },
  { icon: "💅", name: "Manicure & pedicure", price: "starting at ₹400", time: "50 min" },
  { icon: "🌿", name: "Spa & massage", price: "starting at ₹1000", time: "75 min" },
  { icon: "🪡", name: "Threading & waxing", price: "starting at ₹150", time: "20 min" },
];

export default function LandingPage() {
  return (
    <div className="page">
      <Navbar />

      {/* Hero */}
      <section style={{ padding: "80px 40px 60px", textAlign: "center", background: "#fff", borderBottom: "1px solid #ede9e3" }}>
        <div className="badge">Professional salon experience</div>
        <h1 style={{ fontSize: "48px", fontWeight: 800, lineHeight: 1.1, marginBottom: "16px", color: "#1a1a1a" }}>
          Look your best,<br />
          <span style={{ color: "#c2476b" }}>every single day</span>
        </h1>
        <p style={{ fontSize: "16px", color: "#777", maxWidth: "480px", margin: "0 auto 32px", lineHeight: 1.7 }}>
          Book your salon appointment in seconds. Choose from haircuts, facials, spa treatments and more — all in one place.
        </p>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <Link to="/register" className="btn btn-primary" style={{ fontSize: "15px", padding: "12px 28px" }}>
            Book appointment →
          </Link>
          <Link to="/services" className="btn" style={{ fontSize: "15px", padding: "12px 28px" }}>
            View all services
          </Link>
        </div>
      </section>

      {/* Why us */}
      <section className="section-sm" style={{ background: "#faf9f7" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div className="grid-4">
            {highlights.map((h, i) => (
              <div key={i} style={{ textAlign: "center", padding: "24px 16px", background: "#fff", borderRadius: "12px", border: "1px solid #ede9e3" }}>
                <div style={{ fontSize: "28px", marginBottom: "10px" }}>{h.icon}</div>
                <div style={{ fontSize: "14px", fontWeight: 600, marginBottom: "6px" }}>{h.title}</div>
                <div style={{ fontSize: "13px", color: "#777", lineHeight: 1.5 }}>{h.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services preview */}
      <section className="section" style={{ background: "#fff", borderTop: "1px solid #ede9e3" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "32px" }}>
            <div>
              <div className="section-title">Our services</div>
              <div className="section-sub" style={{ marginBottom: 0 }}>Everything you need, all in one salon</div>
            </div>
            <Link to="/services" className="btn btn-outline">View all →</Link>
          </div>
          <div className="grid-4">
            {services.map((s, i) => (
              <div key={i} className="card" style={{ textAlign: "center", cursor: "pointer", transition: "transform 0.15s, border-color 0.15s" }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "#c2476b"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "#ede9e3"}>
                <div style={{ fontSize: "32px", marginBottom: "12px" }}>{s.icon}</div>
                <div style={{ fontSize: "15px", fontWeight: 600, marginBottom: "4px" }}>{s.name}</div>
                <div style={{ fontSize: "16px", color: "#c2476b", fontWeight: 700, marginBottom: "4px" }}>{s.price}</div>
                <div style={{ fontSize: "12px", color: "#aaa" }}>⏱ {s.time}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "60px 40px", background: "#c2476b", textAlign: "center" }}>
        <h2 style={{ fontSize: "32px", fontWeight: 700, color: "#fff", marginBottom: "12px" }}>Ready to book?</h2>
        <p style={{ color: "rgba(255,255,255,0.8)", marginBottom: "28px", fontSize: "15px" }}>
          Create a free account and book your first appointment today.
        </p>
        <Link to="/register" className="btn" style={{ background: "#fff", color: "#c2476b", fontWeight: 600, padding: "12px 32px", fontSize: "15px" }}>
          Get started — it's free
        </Link>
      </section>

      <footer className="footer">
        <div>© 2026 Anita`s Hair & Beauty Care. All rights reserved.</div>
        
      </footer>
    </div>
  );
}
