import { useEffect, useState } from "react";
import api from "../api/apiClient";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [employees, setEmployees] = useState([]);

  const load = async () => {
    try {
      const [tRes, eRes] = await Promise.all([api.get("/tasks"), api.get("/employees")]);
      setTasks(tRes.data || []);
      setEmployees(eRes.data || []);
    } catch {
      alert("Failed to load tasks or employees");
    }
  };

  useEffect(()=>{ load(); }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Tasks</h1>
      <TaskForm employees={employees} onCreated={load} />
      <TaskList tasks={tasks} onUpdated={load} />
    </div>
  );
}
