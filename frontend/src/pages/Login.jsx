import { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const { login } = useContext(AuthContext);
  const nav = useNavigate();
  const loc = useLocation();
  const from = loc.state?.from?.pathname || "/";

  const submit = async (e) => {
    e.preventDefault();
    try {
      await login(form.email, form.password);
      nav(from, { replace: true });
    } catch (err) {
      alert(err?.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16">
      <form onSubmit={submit} className="bg-white rounded p-6 shadow">
        <h2 className="text-xl font-semibold mb-4">Sign in</h2>
        <input className="w-full mb-2 border p-2" placeholder="Email" value={form.email} onChange={(e)=>setForm({...form, email:e.target.value})}/>
        <input type="password" className="w-full mb-4 border p-2" placeholder="Password" value={form.password} onChange={(e)=>setForm({...form, password:e.target.value})}/>
        <button className="w-full bg-blue-600 text-white py-2 rounded">Login</button>
      </form>
    </div>
  );
}
