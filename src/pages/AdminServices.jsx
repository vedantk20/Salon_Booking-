import React, { useState, useEffect } from "react";
import AdminSidebar from "../components/AdminSidebar";
import API from "../api/axios";

const emptyForm = {
  name: "", description: "", price: "", duration: "", category: "", icon: ""
};

const categories = ["Hair", "Skin", "Spa", "Nails", "Threading", "Other"];

const icons = ["✂️", "💇", "💧", "🌀", "✨", "🌸", "🌿", "🧖", "💅", "🦶", "🪡", "🧴", "💆", "🧘", "👁️", "💋"];

export default function AdminServices() {
  const [services, setServices] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    loadServices();
  }, []);

  function loadServices() {
    API.get("/services").then(res => setServices(res.data)).catch(() => {
      setServices([]);
    });
  }

  function openAdd() {
    setForm(emptyForm);
    setEditingService(null);
    setError("");
    setShowModal(true);
  }

  function openEdit(service) {
    setForm({
      name: service.name,
      description: service.description,
      price: service.price,
      duration: service.duration,
      category: service.category,
      icon: service.icon || "✂️"
    });
    setEditingService(service);
    setError("");
    setShowModal(true);
  }

  async function handleSubmit() {
    if (!form.name || !form.price || !form.duration || !form.category) {
      setError("Please fill all required fields.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      if (editingService) {
        await API.put(`/admin/services/${editingService.id}`, form);
        setSuccess("Service updated successfully!");
      } else {
        await API.post("/admin/services", form);
        setSuccess("Service added successfully!");
      }
      setShowModal(false);
      loadServices();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Are you sure you want to delete this service?")) return;
    try {
      await API.delete(`/admin/services/${id}`);
      setServices(services.filter(s => s.id !== id));
      setSuccess("Service deleted.");
      setTimeout(() => setSuccess(""), 3000);
    } catch {
      alert("Failed to delete service.");
    }
  }

  function toggleActive(id, current) {
    API.put(`/admin/services/${id}`, { active: !current })
      .then(() => loadServices())
      .catch(() => {});
    setServices(services.map(s => s.id === id ? { ...s, active: !current } : s));
  }

  const inputStyle = {
    width: "100%", padding: "10px 12px", background: "#0f0f0f",
    border: "1px solid #2a2a2a", borderRadius: "8px", color: "#fff",
    fontSize: "14px", fontFamily: "inherit", boxSizing: "border-box",
    marginTop: "6px"
  };

  const labelStyle = { color: "#888", fontSize: "12px", display: "block", marginBottom: "0px" };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#141414", fontFamily: "'Segoe UI', sans-serif" }}>
      <AdminSidebar />
      <div style={{ marginLeft: "220px", flex: 1, padding: "32px" }}>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
          <div>
            <h1 style={{ color: "#fff", fontSize: "22px", fontWeight: 700, marginBottom: "4px" }}>Services</h1>
            <p style={{ color: "#555", fontSize: "14px" }}>Manage your salon services</p>
          </div>
          <button onClick={openAdd} style={{
            padding: "10px 20px", background: "#c2476b", color: "#fff",
            border: "none", borderRadius: "8px", fontSize: "14px", fontWeight: 600,
            cursor: "pointer", fontFamily: "inherit"
          }}>
            + Add service
          </button>
        </div>

        {/* Success message */}
        {success && (
          <div style={{
            background: "#10b98122", border: "1px solid #10b98144", color: "#10b981",
            padding: "12px 16px", borderRadius: "8px", fontSize: "13px", marginBottom: "20px"
          }}>{success}</div>
        )}

        {/* Services grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px" }}>
          {services.length === 0 && (
            <div style={{ color: "#555", fontSize: "14px", padding: "40px 0" }}>
              No services yet. Click "Add service" to create one.
            </div>
          )}
          {services.map(s => (
            <div key={s.id} style={{
              background: "#1a1a1a", border: `1px solid ${s.active ? "#2a2a2a" : "#1e1e1e"}`,
              borderRadius: "12px", padding: "20px", opacity: s.active ? 1 : 0.5
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                <div style={{ fontSize: "28px" }}>{s.icon}</div>
                <div style={{ display: "flex", gap: "6px" }}>
                  {/* Active toggle */}
                  <button onClick={() => toggleActive(s.id, s.active)} style={{
                    padding: "4px 10px", fontSize: "11px", fontWeight: 600, cursor: "pointer",
                    border: "1px solid", borderRadius: "6px", fontFamily: "inherit",
                    background: s.active ? "#10b98122" : "#2a2a2a",
                    color: s.active ? "#10b981" : "#555",
                    borderColor: s.active ? "#10b98144" : "#2a2a2a",
                  }}>
                    {s.active ? "Active" : "Inactive"}
                  </button>
                </div>
              </div>

              <div style={{ fontSize: "15px", fontWeight: 600, color: "#fff", marginBottom: "4px" }}>{s.name}</div>
              <div style={{ fontSize: "12px", color: "#555", marginBottom: "8px" }}>{s.category} · {s.duration}</div>
              <div style={{ fontSize: "13px", color: "#666", marginBottom: "14px", lineHeight: 1.5 }}>{s.description}</div>
              <div style={{ fontSize: "18px", fontWeight: 700, color: "#c2476b", marginBottom: "14px" }}>₹{s.price}</div>

              <div style={{ display: "flex", gap: "8px" }}>
                <button onClick={() => openEdit(s)} style={{
                  flex: 1, padding: "8px", background: "#2a2a2a", color: "#ccc",
                  border: "1px solid #333", borderRadius: "6px", fontSize: "13px",
                  cursor: "pointer", fontFamily: "inherit"
                }}>✏️ Edit</button>
                <button onClick={() => handleDelete(s.id)} style={{
                  flex: 1, padding: "8px", background: "#ef444422", color: "#ef4444",
                  border: "1px solid #ef444444", borderRadius: "6px", fontSize: "13px",
                  cursor: "pointer", fontFamily: "inherit"
                }}>🗑️ Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)",
          display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200
        }}>
          <div style={{
            background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: "16px",
            padding: "32px", width: "100%", maxWidth: "500px", maxHeight: "90vh", overflowY: "auto"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
              <h2 style={{ color: "#fff", fontSize: "18px", fontWeight: 700 }}>
                {editingService ? "Edit service" : "Add new service"}
              </h2>
              <button onClick={() => setShowModal(false)} style={{
                background: "none", border: "none", color: "#666", fontSize: "22px", cursor: "pointer"
              }}>×</button>
            </div>

            {error && (
              <div style={{
                background: "#2d1a1a", border: "1px solid #5c2a2a", color: "#ff6b6b",
                padding: "10px 14px", borderRadius: "8px", fontSize: "13px", marginBottom: "16px"
              }}>{error}</div>
            )}

            {/* Icon picker */}
            <div style={{ marginBottom: "16px" }}>
              <label style={labelStyle}>Choose icon</label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "8px" }}>
                {icons.map(icon => (
                  <button key={icon} onClick={() => setForm({ ...form, icon })} style={{
                    width: "40px", height: "40px", fontSize: "20px", cursor: "pointer",
                    border: `2px solid ${form.icon === icon ? "#c2476b" : "#2a2a2a"}`,
                    borderRadius: "8px", background: form.icon === icon ? "#c2476b22" : "#0f0f0f"
                  }}>{icon}</button>
                ))}
              </div>
            </div>

            {/* Name */}
            <div style={{ marginBottom: "14px" }}>
              <label style={labelStyle}>Service name *</label>
              <input
                type="text"
                placeholder="e.g. Haircut & styling"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                style={inputStyle}
              />
            </div>

            {/* Description */}
            <div style={{ marginBottom: "14px" }}>
              <label style={labelStyle}>Description</label>
              <textarea
                placeholder="Brief description of the service..."
                value={form.description}
                onChange={e => setForm({ ...form, description: e.target.value })}
                rows={3}
                style={{ ...inputStyle, resize: "vertical" }}
              />
            </div>

            {/* Price and Duration side by side */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "14px" }}>
              <div>
                <label style={labelStyle}>Price (₹) *</label>
                <input
                  type="number"
                  placeholder="e.g. 500"
                  value={form.price}
                  onChange={e => setForm({ ...form, price: e.target.value })}
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>Duration *</label>
                <input
                  type="text"
                  placeholder="e.g. 45 min"
                  value={form.duration}
                  onChange={e => setForm({ ...form, duration: e.target.value })}
                  style={inputStyle}
                />
              </div>
            </div>

            {/* Category */}
            <div style={{ marginBottom: "24px" }}>
              <label style={labelStyle}>Category *</label>
              <select
                value={form.category}
                onChange={e => setForm({ ...form, category: e.target.value })}
                style={inputStyle}
              >
                <option value="">Select category</option>
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            {/* Buttons */}
            <div style={{ display: "flex", gap: "10px" }}>
              <button onClick={() => setShowModal(false)} style={{
                flex: 1, padding: "11px", background: "transparent", color: "#666",
                border: "1px solid #2a2a2a", borderRadius: "8px", fontSize: "14px",
                cursor: "pointer", fontFamily: "inherit"
              }}>Cancel</button>
              <button onClick={handleSubmit} disabled={loading} style={{
                flex: 2, padding: "11px", background: "#c2476b", color: "#fff",
                border: "none", borderRadius: "8px", fontSize: "14px", fontWeight: 600,
                cursor: "pointer", fontFamily: "inherit"
              }}>
                {loading ? "Saving..." : editingService ? "Update service" : "Add service"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
