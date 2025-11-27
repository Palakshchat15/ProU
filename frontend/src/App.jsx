import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Tasks from "./pages/Tasks";
import RequireAuth from "./components/RequireAuth";
import Login from "./pages/Login";

export default function App() {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="max-w-5xl mx-auto p-4">
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route
            path="/"
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          />

          <Route
            path="/tasks"
            element={
              <RequireAuth>
                <Tasks />
              </RequireAuth>
            }
          />

          <Route
            path="/employees"
            element={
              <RequireAuth allowedRoles={["admin"]}>
                <Employees />
              </RequireAuth>
            }
          />

          <Route
            path="*"
            element={<RequireAuth><Navigate to="/" replace /></RequireAuth>}
          />
        </Routes>
      </main>
    </div>
  );
}
