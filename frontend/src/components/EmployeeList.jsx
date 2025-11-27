import { useContext } from "react";
import api from "../api/apiClient";
import { AuthContext } from "../context/AuthContext";

export default function EmployeeList({ employees = [], onUpdated }) {
  const { user } = useContext(AuthContext);

  const remove = async (id) => {
    if (user.role !== "admin") return;
      
    if (!confirm("Delete this employee?")) return;

    try {
      await api.delete(`/employees/${id}`);
      onUpdated?.();
    } catch (err) {
      alert("Failed to delete employee");
    }
  };

  return (
    <div className="bg-white rounded shadow p-4">
      <h3 className="font-semibold mb-3">Employees</h3>

      {employees.length === 0 ? (
        <p className="text-sm text-gray-600">No employees found.</p>
      ) : (
        <ul className="space-y-3">
          {employees.map((emp) => (
            <li
              key={emp._id}
              className="p-3 border rounded flex justify-between items-center"
            >
              <div>
                <div className="font-medium">{emp.name}</div>
                <div className="text-sm text-gray-600">{emp.email}</div>
                <div className="text-sm text-gray-500">{emp.position}</div>
              </div>

              {user?.role === "admin" && (
                <button
                  onClick={() => remove(emp._id)}
                  className="px-3 py-1 bg-red-500 text-white rounded text-sm"
                >
                  Delete
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
