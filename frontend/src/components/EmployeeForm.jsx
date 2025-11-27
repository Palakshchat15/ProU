import { useState } from "react";
import api from "../api/apiClient";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function EmployeeForm({ onCreated }) {
  const [form, setForm] = useState({ name: "", email: "", position: "" });
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);
  if (!user || user.role !== "admin") return null;
  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/employees", form);
      setForm({ name: "", email: "", position: "" });
      onCreated?.();
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to create employee");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="bg-white rounded shadow p-4 mb-4">
      <h3 className="font-semibold mb-2">Add Employee</h3>
      <div className="grid sm:grid-cols-3 gap-2">
        <input required placeholder="Name" value={form.name}
          onChange={(e)=>setForm({...form,name:e.target.value})}
          className="border rounded px-2 py-1" />
        <input required type="email" placeholder="Email" value={form.email}
          onChange={(e)=>setForm({...form,email:e.target.value})}
          className="border rounded px-2 py-1" />
        <input placeholder="Position" value={form.position}
          onChange={(e)=>setForm({...form,position:e.target.value})}
          className="border rounded px-2 py-1" />
      </div>
      <div className="mt-3">
        <button type="submit" disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-60">
          {loading ? "Adding..." : "Add Employee"}
        </button>
      </div>
    </form>
  );
}
