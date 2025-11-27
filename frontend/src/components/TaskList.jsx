import { useContext } from "react";
import api from "../api/apiClient";
import { AuthContext } from "../context/AuthContext";

export default function TaskList({ tasks = [], onUpdated }) {
  const { user } = useContext(AuthContext);

 
  const remove = async (id) => {
    if (!user || user.role !== "admin") return;
    if (!confirm("Delete this task?")) return;

    try {
      await api.delete(`/tasks/${id}`);
      onUpdated?.();
    } catch {
      alert("Failed to delete task");
    }
  };

  const toggleStatus = async (task) => {
    if (!user || user.role !== "admin") return;

    const nextStatus = task.status === "Done" ? "Pending" : "Done";

    try {
      await api.put(`/tasks/${task._id}`, { status: nextStatus });
      onUpdated?.();
    } catch {
      alert("Failed to update task status");
    }
  };

  return (
    <div className="bg-white rounded shadow p-4">
      <h3 className="font-semibold mb-3">Tasks</h3>

      {tasks.length === 0 ? (
        <p className="text-sm text-gray-600">No tasks found.</p>
      ) : (
        <ul className="space-y-3">
          {tasks.map((t) => (
            <li
              key={t._id}
              className="p-3 border rounded flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
            >

              <div>
                <div className="font-medium">{t.title}</div>
                <div className="text-sm text-gray-700">{t.description}</div>
                <div className="text-sm text-gray-500">
                  Due:{" "}
                  {t.dueDate
                    ? new Date(t.dueDate).toLocaleDateString()
                    : "—"}
                </div>
                <div className="text-sm">
                  Assigned to:{" "}
                  <span className="text-blue-600">
                    {t.employee?.name || "None"}
                  </span>
                </div>

                <div className="text-sm">
                  Status:{" "}
                  <span className="font-medium">
                    {t.status}
                  </span>
                </div>
              </div>

              {user?.role === "admin" && (
                <div className="flex gap-2 items-center">
                  <button
                    onClick={() => toggleStatus(t)}
                    className="px-3 py-1 rounded bg-green-600 text-white text-sm"
                  >
                    {t.status === "done" ? "Mark pending" : "Mark done"}
                  </button>

                  <button
                    onClick={() => remove(t._id)}
                    className="px-3 py-1 rounded bg-red-500 text-white text-sm"
                  >
                    Delete
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
