import { useEffect, useState } from "react";
import api from "../api/apiClient";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [empError, setEmpError] = useState(null);
  const [taskError, setTaskError] = useState(null);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      setLoading(true);
      setEmpError(null);
      setTaskError(null);

      try {
        const [tasksRes, employeesRes] = await Promise.allSettled([
          api.get("/tasks"),
          api.get("/employees"),
        ]);

        if (!mounted) return;

        if (tasksRes.status === "fulfilled") {
          setTasks(Array.isArray(tasksRes.value.data) ? tasksRes.value.data : []);
        } else {
          setTaskError(
            tasksRes.reason?.response?.data?.message ||
            tasksRes.reason?.message ||
            "Failed to load tasks"
          );
          setTasks([]);
        }

        if (employeesRes.status === "fulfilled") {
          setEmployees(Array.isArray(employeesRes.value.data) ? employeesRes.value.data : []);
        } else {
          const r = employeesRes.reason;
          if (r?.response?.status === 403) {
            setEmpError("Employees list is admin-only.");
          } else {
            setEmpError(r?.response?.data?.message || r?.message || "Failed to load employees");
          }
          setEmployees([]);
        }
      } catch (err) {
        if (!mounted) return;
        setTaskError("Failed to load data");
        setEmployees([]);
        setTasks([]);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    load();
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) return <div className="p-4">Loading dashboard...</div>;

  return (
    <div className="grid gap-6">
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <div className="text-sm text-gray-600">Employees</div>
          <div className="text-2xl font-semibold">{employees.length}</div>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <div className="text-sm text-gray-600">Tasks</div>
          <div className="text-2xl font-semibold">{tasks.length}</div>
        </div>
          <div className="bg-white p-4 rounded shadow">
            <div className="text-sm text-gray-600">Task Completion</div>

              {(() => {
                const total = tasks.length;
                const completed = tasks.filter(t => t.status === "done").length;

                return (
                  <div className="text-2xl font-semibold">
                    {completed} / {total} Completed
                  </div>
                );
              })()}
            </div>
          </div>

      <section className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-3">Employees</h2>

        {empError ? (
          <div className="text-sm text-red-600">{empError}</div>
        ) : employees.length === 0 ? (
          <p className="text-sm text-gray-600">No employees found.</p>
        ) : (
          <ul className="space-y-2">
            {employees.map((e) => (
              <li key={e._id} className="p-2 border rounded flex justify-between items-center">
                <div>
                  <div className="font-medium">{e.name}</div>
                  <div className="text-sm text-gray-600">{e.email}</div>
                </div>
                <div className="text-sm text-gray-500">{e.position}</div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-3">Tasks</h2>

        {taskError ? (
          <div className="text-sm text-red-600">{taskError}</div>
        ) : tasks.length === 0 ? (
          <p className="text-sm text-gray-600">No tasks found.</p>
        ) : (
          <ul className="space-y-2">
            {tasks.map((t) => (
              <li key={t._id} className="p-2 border rounded">
                <div className="font-medium">{t.title}</div>
                <div className="text-sm text-gray-600">{t.description}</div>
                <div className="text-sm text-gray-500">
                  Assigned to: {t.employee?.name || "None"} • Status: {t.status}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
