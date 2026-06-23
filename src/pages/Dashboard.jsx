import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";
import Navbar from "../components/Navbar";
import "../styles.css";

const statusColors = {
  CONFIRMED: { bg: "#eafaf1", color: "#1e8449" },
  PENDING:   { bg: "#fef9e7", color: "#b7950b" },
  COMPLETED: { bg: "#f0f0f0", color: "#555" },
  CANCELLED: { bg: "#ffeaea", color: "#c0392b" },
};

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user") || '{"name":"User","email":""}'));
  const [bookings, setBookings] = useState([]);
  const [tab, setTab] = useState("upcoming");
  const [loadingBookings, setLoadingBookings] = useState(true);
  const [profileForm, setProfileForm] = useState({ name: user.name, email: user.email, phone: user.phone || "" });
  const [profileMsg, setProfileMsg] = useState("");
  const [profileError, setProfileError] = useState("");
  const [savingProfile, setSavingProfile] = useState(false);

  useEffect(() => { fetchBookings(); }, []);

  async function fetchBookings() {
    setLoadingBookings(true);
    try {
      const res = await API.get("/bookings/my");
      setBookings(res.data);
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
      }
    } finally {
      setLoadingBookings(false);
    }
  }

  async function handleCancelBooking(id) {
    if (!window.confirm("Cancel this booking?")) return;
    try {
      await API.delete("/bookings/" + id);
      setBookings(bookings.map(b => b.id === id ? { ...b, status: "CANCELLED" } : b));
    } catch { alert("Failed to cancel booking."); }
  }

  async function handleProfileSave() {
    setProfileMsg(""); setProfileError(""); setSavingProfile(true);
    try {
      await API.put("/users/profile", profileForm);
      const updatedUser = { ...user, ...profileForm };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setProfileMsg("Profile updated successfully!");
      setTimeout(() => setProfileMsg(""), 3000);
    } catch (err) {
      setProfileError(err.response?.data?.message || "Failed to update profile.");
    } finally { setSavingProfile(false); }
  }

  const upcoming = bookings.filter(b => b.status !== "COMPLETED" && b.status !== "CANCELLED");
  const past     = bookings.filter(b => b.status === "COMPLETED"  || b.status === "CANCELLED");

  function getIcon(name) {
    const map = { "Haircut":"✂️","Hair":"💇","Facial":"✨","Skin":"🌸","Spa":"🌿",
      "Massage":"🧖","Manicure":"💅","Pedicure":"🦶","Threading":"🪡","Waxing":"🧴","Colour":"💧" };
    const key = Object.keys(map).find(k => name?.includes(k));
    return key ? map[key] : "💇";
  }

  return (
    <div className="page">
      <Navbar />
      <div style={{ background:"#fff", padding:"32px 40px", borderBottom:"1px solid #ede9e3" }}>
        <div style={{ maxWidth:"1000px", margin:"0 auto", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <div>
            <h1 style={{ fontSize:"24px", fontWeight:700, marginBottom:"4px" }}>Welcome back, {user.name?.split(" ")[0]} 👋</h1>
            <p style={{ color:"#777", fontSize:"14px" }}>{user.email}</p>
          </div>
          <Link to="/services" className="btn btn-primary">+ New booking</Link>
        </div>
      </div>

      <div style={{ maxWidth:"1000px", margin:"0 auto", padding:"32px 40px" }}>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"16px", marginBottom:"32px" }}>
          {[
            { label:"Total bookings", value:bookings.length },
            { label:"Upcoming",       value:upcoming.length },
            { label:"Completed",      value:bookings.filter(b=>b.status==="COMPLETED").length },
          ].map((s,i) => (
            <div key={i} style={{ background:"#fff", border:"1px solid #ede9e3", borderRadius:"12px", padding:"20px 24px" }}>
              <div style={{ fontSize:"13px", color:"#777", marginBottom:"6px" }}>{s.label}</div>
              <div style={{ fontSize:"28px", fontWeight:700 }}>{s.value}</div>
            </div>
          ))}
        </div>

        <div style={{ display:"flex", borderBottom:"1px solid #ede9e3", marginBottom:"24px" }}>
          {[["upcoming","Upcoming"],["past","Past bookings"],["profile","My profile"]].map(([key,label]) => (
            <button key={key} onClick={() => setTab(key)} style={{
              padding:"10px 20px", fontSize:"14px", fontWeight:tab===key?600:400,
              background:"none", border:"none", cursor:"pointer", fontFamily:"inherit",
              color:tab===key?"#c2476b":"#777",
              borderBottom:tab===key?"2px solid #c2476b":"2px solid transparent",
            }}>{label}</button>
          ))}
        </div>

        {(tab==="upcoming"||tab==="past") && (
          <div style={{ display:"flex", flexDirection:"column", gap:"12px" }}>
            {loadingBookings && <div style={{ textAlign:"center", padding:"40px", color:"#aaa" }}>Loading bookings...</div>}
            {!loadingBookings && (tab==="upcoming"?upcoming:past).length===0 && (
              <div style={{ textAlign:"center", padding:"48px", color:"#aaa" }}>
                <div style={{ fontSize:"36px", marginBottom:"12px" }}>📅</div>
                <div style={{ fontSize:"15px" }}>No {tab} bookings</div>
                <Link to="/services" className="btn btn-primary" style={{ display:"inline-block", marginTop:"16px" }}>Book a service</Link>
              </div>
            )}
            {!loadingBookings && (tab==="upcoming"?upcoming:past).map(b => (
              <div key={b.id} className="card" style={{ display:"flex", alignItems:"center", gap:"20px" }}>
                <div style={{ fontSize:"32px" }}>{getIcon(b.service)}</div>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:"15px", fontWeight:600, marginBottom:"4px" }}>{b.service}</div>
                  <div style={{ fontSize:"13px", color:"#777" }}>📅 {b.date} &nbsp; 🕐 {b.time}{b.notes && <span> &nbsp; 📝 {b.notes}</span>}</div>
                </div>
                <div style={{ fontSize:"16px", fontWeight:700, color:"#c2476b" }}>₹{b.price}</div>
                <span style={{ padding:"4px 12px", borderRadius:"20px", fontSize:"12px", fontWeight:600, background:statusColors[b.status]?.bg, color:statusColors[b.status]?.color }}>{b.status}</span>
                {(b.status==="CONFIRMED"||b.status==="PENDING") && (
                  <button className="btn" style={{ fontSize:"13px", padding:"6px 14px", color:"#c0392b", borderColor:"#f5c6cb" }} onClick={() => handleCancelBooking(b.id)}>Cancel</button>
                )}
              </div>
            ))}
          </div>
        )}

        {tab==="profile" && (
          <div className="card">
            <h3 style={{ fontSize:"16px", fontWeight:600, marginBottom:"6px" }}>My profile</h3>
            <p style={{ fontSize:"13px", color:"#777", marginBottom:"20px" }}>Update your personal information</p>
            {profileMsg   && <div style={{ background:"#eafaf1", border:"1px solid #b7e4c7", color:"#1e8449", padding:"10px 14px", borderRadius:"8px", fontSize:"13px", marginBottom:"16px" }}>✅ {profileMsg}</div>}
            {profileError && <div style={{ background:"#ffeaea", border:"1px solid #f5c6cb", color:"#c0392b", padding:"10px 14px", borderRadius:"8px", fontSize:"13px", marginBottom:"16px" }}>❌ {profileError}</div>}
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"16px" }}>
              <div className="form-group" style={{ marginBottom:0 }}>
                <label>Full name</label>
                <input type="text" value={profileForm.name} onChange={e => setProfileForm({...profileForm, name:e.target.value})} />
              </div>
              <div className="form-group" style={{ marginBottom:0 }}>
                <label>Email address</label>
                <input type="email" value={profileForm.email} onChange={e => setProfileForm({...profileForm, email:e.target.value})} />
              </div>
              <div className="form-group" style={{ marginBottom:0 }}>
                <label>Phone number</label>
                <input type="tel" value={profileForm.phone} onChange={e => setProfileForm({...profileForm, phone:e.target.value})} placeholder="+91 98765 43210" />
              </div>
            </div>
            <button className="btn btn-primary" style={{ marginTop:"20px" }} onClick={handleProfileSave} disabled={savingProfile}>
              {savingProfile ? "Saving..." : "Save changes"}
            </button>
          </div>
        )}
      </div>

      <footer className="footer">
        <div>© 2026 Anita`s Hair & Beauty Care. All rights reserved.</div>
        <Link to="/" style={{ color:"#c2476b" }}>Back to home</Link>
      </footer>
    </div>
  );
}
