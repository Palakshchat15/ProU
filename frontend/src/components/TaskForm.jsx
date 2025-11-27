import { useState, useContext } from "react";
import api from "../api/apiClient";
import { AuthContext } from "../context/AuthContext";

export default function TaskForm({ employees = [], onCreated }) {
  const { user } = useContext(AuthContext);

  if (!user || user.role !== "admin") return null;

  const [form, setForm] = useState({
    title: "",
    description: "",
    dueDate: "",
    employee: "",
    status: "pending",
  });

  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("/tasks", {
        title: form.title,
        description: form.description,
        dueDate: form.dueDate || null,
        employee: form.employee || undefined,
        status: form.status,
      });

      setForm({
        title: "",
        description: "",
        dueDate: "",
        employee: "",
        status: "pending",
      });

      onCreated?.();

    } catch (err) {
      alert(err?.response?.data?.message || "Failed to create task");

    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="bg-white rounded shadow p-4 mb-4">
      <h3 className="font-semibold mb-2">Add Task</h3>

      <input
        required
        placeholder="Title"
        className="border rounded px-2 py-1 w-full mb-2"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />

      <textarea
        placeholder="Description"
        className="border rounded px-2 py-1 w-full mb-2"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      ></textarea>

      <div className="grid sm:grid-cols-3 gap-2 mb-2">
        <input
          type="date"
          className="border rounded px-2 py-1"
          value={form.dueDate}
          onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
        />

        <select
          className="border rounded px-2 py-1"
          value={form.employee}
          onChange={(e) => setForm({ ...form, employee: e.target.value })}
        >
          <option value="">Unassigned</option>
          {employees.map((emp) => (
            <option key={emp._id} value={emp._id}>
              {emp.name}
            </option>
          ))}
        </select>

        <select
          className="border rounded px-2 py-1"
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>

      <button
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {loading ? "Adding..." : "Add Task"}
      </button>
    </form>
  );
}
