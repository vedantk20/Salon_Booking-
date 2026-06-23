import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";
import Navbar from "../components/Navbar";
import "../styles.css";

const allServices = [
  { id: 1, icon: "✂️", name: "Haircut & styling", category: "Hair", price: 300, duration: "45 min", desc: "Precision cuts, blowouts and styling for all hair types." },
  { id: 2, icon: "🧖🏼‍♀️🚿", name: "Hair wash & blow dry", category: "Hair", price: 200, duration: "30 min", desc: "Deep cleanse with premium shampoo and professional blow dry." },
  { id: 3, icon: "🤎❤︎💜", name: "Hair colour", category: "Hair", price: 800, duration: "90 min", desc: "Full colour, highlights, balayage or ombre with expert colourists." },
  { id: 4, icon: "💆‍♀️🪮🛁", name: "Hair smoothening", category: "Hair", price: 2000, duration: "120 min", desc: "Keratin treatment for frizz-free, silky smooth hair." },
  { id: 5, icon: "✨", name: "Facial & skin care", category: "Skin", price: 500, duration: "60 min", desc: "Deep cleansing facial with moisturizing and anti-aging treatment." },
  { id: 6, icon: "🌸", name: "Clean-up facial", category: "Skin", price: 300, duration: "40 min", desc: "Quick refresh facial for glowing, clear skin." },
  { id: 7, icon: "💆‍♀️🌿🛁", name: "Spa & body massage", category: "Spa", price: 1200, duration: "75 min", desc: "Full body relaxation massage with aromatic oils." },
  { id: 8, icon: "💆🏻‍♀️", name: "Head massage", category: "Spa", price: 400, duration: "30 min", desc: "Stress-relief scalp and head massage with herbal oils." },

  { id: 13, icon: "💐👰🏻‍♀️💌", name: "Bridal Makeup", category: "Makeup", price: 2000, duration: "95 min", desc: "Full glam with traditional touches, Heavy Makup." },
  { id: 14, icon: "🌷͙֒🩷🎀", name: "Party Makup", category: "Makeup", price: 2000, duration: "60 min", desc: "ofter glam, shimmer eyeshadows, glossy lips, and light contouring." },
  { id: 15, icon: " 🪷🪞", name: "Traditional Makup", category: "Makeup", price: 2000, duration: "60 min", desc: "Styles that complement sarees or lehengas, with kohl-rimmed eyes and bold bindis." },
  { id: 16, icon: "🥻👗 ", name: "Saree Draping", category: "Makeup", price: 2000, duration: "40 min", desc: "Classic Indian style, often paired with traditional bridal or festive makeup." },


  { id: 9, icon: "💅", name: "Manicure", category: "Nails", price: 300, duration: "40 min", desc: "Complete nail care with filing, buffing, cuticle care and polish." },
  { id: 10, icon: "🦶", name: "Pedicure", category: "Nails", price: 400, duration: "50 min", desc: "Foot soak, scrub, nail shaping and moisturizing treatment." },
  { id: 11, icon: " ⏜  ⏜", name: "Eyebrow threading", category: "Threading", price: 50, duration: "10 min", desc: "Precise eyebrow shaping with thread for a clean arch." },
  { id: 12, icon: "🧴", name: "Full face waxing", category: "Threading", price: 250, duration: "25 min", desc: "Smooth, hair-free skin with gentle wax on full face." },
  ];

const categories = ["All", "Hair", "Skin", "Spa", "Nails", "Threading"];

export default function Services() {
 // const navigate = useNavigate();
  //const [activeCategory, setActiveCategory] = useState("All");
  //const [selectedService, setSelectedService] = useState(null);
  //   changes

  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedService, setSelectedService] = useState(null);
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("10:00 AM");
  const [bookingNotes, setBookingNotes] = useState("");
  const [bookingLoading, setBookingLoading] = useState(false);

  async function handleConfirmBooking() {
  if (!bookingDate) {
    alert("Please select a date.");
    return;
  }
  setBookingLoading(true);
  try {
    await API.post("/bookings", {
      serviceId: selectedService.id,
      date: bookingDate,
      time: bookingTime,
      notes: bookingNotes,
    });
    alert("Booking confirmed!");
    setSelectedService(null);
    setBookingDate("");
    setBookingNotes("");
  } catch (err) {
    alert(err.response?.data?.message || "Booking failed.");
  } finally {
    setBookingLoading(false);
  }
}

  // changes 
  const filtered = activeCategory === "All"
    ? allServices
    : allServices.filter(s => s.category === activeCategory);

  function handleBook(service) {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      setSelectedService(service);
    }
  }

  return (
    <div className="page">
      <Navbar />

      {/* Header */}
      <div style={{ background: "#fff", padding: "48px 40px 32px", borderBottom: "1px solid #ede9e3" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div className="badge">All services</div>
          <h1 className="section-title">Our salon services</h1>
          <p style={{ fontSize: "15px", color: "#777", marginBottom: "28px" }}>
            Choose from our wide range of professional services tailored to you.
          </p>
          {/* Category filter */}
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="btn"
                style={{
                  padding: "8px 18px",
                  fontSize: "13px",
                  background: activeCategory === cat ? "#c2476b" : "#fff",
                  color: activeCategory === cat ? "#fff" : "#555",
                  borderColor: activeCategory === cat ? "#c2476b" : "#ddd",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Services grid */}
      <section className="section" style={{ background: "#faf9f7" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div className="grid-4">
            {filtered.map(s => (
              <div key={s.id} className="card" style={{ display: "flex", flexDirection: "column" }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "#c2476b"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "#ede9e3"}>
                <div style={{ fontSize: "36px", marginBottom: "12px" }}>{s.icon}</div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                  <div style={{ fontSize: "15px", fontWeight: 600 }}>{s.name}</div>
                  <span style={{ background: "#fbeaf0", color: "#a33659", fontSize: "11px", padding: "3px 8px", borderRadius: "6px", whiteSpace: "nowrap", marginLeft: "8px" }}>
                    {s.category}
                  </span>
                </div>
                <p style={{ fontSize: "13px", color: "#777", lineHeight: 1.5, marginBottom: "16px", flex: 1 }}>{s.desc}</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
                  <span style={{ fontSize: "18px", fontWeight: 700, color: "#c2476b" }}>₹{s.price}</span>
                  <span style={{ fontSize: "12px", color: "#aaa" }}>⏱ {s.duration}</span>
                </div>
                <button
                  className="btn btn-primary"
                  style={{ width: "100%", padding: "10px" }}
                  onClick={() => handleBook(s)}
                >
                  Book now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking modal (simple) */}
      {selectedService && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)",
          display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200
        }}>
          <div className="card" style={{ width: "420px", padding: "32px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h2 style={{ fontSize: "18px", fontWeight: 700 }}>Book: {selectedService.name}</h2>
              <button onClick={() => setSelectedService(null)}
                style={{ background: "none", border: "none", fontSize: "20px", cursor: "pointer", color: "#777" }}>×</button>
            </div>
            <div style={{ background: "#fbeaf0", borderRadius: "8px", padding: "12px 16px", marginBottom: "20px", fontSize: "13px", color: "#a33659" }}>
              {selectedService.icon} {selectedService.name} — ₹{selectedService.price} · {selectedService.duration}
            </div>
            <div className="form-group">
              <label>Preferred date</label>
              <input type="date" min={new Date().toISOString().split("T")[0]} value={bookingDate} onChange={e => setBookingDate(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Preferred time</label>
              <select>
                {["10:00 AM","11:00 AM","12:00 PM","2:00 PM","3:00 PM","4:00 PM","5:00 PM"].map(t => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Notes (optional)</label>
              <input type="text" placeholder="Any special requests..." />
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              <button className="btn" style={{ flex: 1 }} onClick={() => setSelectedService(null)}>Cancel</button>
             
             <button className="btn btn-primary" style={{ flex: 2 }}
             onClick={handleConfirmBooking}disabled={bookingLoading}>
              {bookingLoading ? "Booking..." : "Confirm booking"}
              </button>


             
            </div>
          </div>
        </div>
      )}

      <footer className="footer">
        <div>© 2026 Anita`s Hair & Beauty Care. All rights reserved.</div>
        <Link to="/" style={{ color: "#c2476b" }}>Back to home</Link>
      </footer>
    </div>
  );
}
