import { useEffect, useState } from "react";
import api from "../api/apiClient";
import EmployeeForm from "../components/EmployeeForm";
import EmployeeList from "../components/EmployeeList";

export default function Employees() {
  const [employees, setEmployees] = useState([]);

  const load = async () => {
    try {
      const res = await api.get("/employees");
      setEmployees(res.data || []);
    } catch {
      alert("Failed to load employees");
    }
  };

  useEffect(()=>{ load(); }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Employees</h1>
      <EmployeeForm onCreated={load} />
      <EmployeeList employees={employees} onUpdated={load} />
    </div>
  );
}
