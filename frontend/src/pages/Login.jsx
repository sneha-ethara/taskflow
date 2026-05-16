import { Activity } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { getErrorMessage } from "../utils/helpers";

const testAccounts = [
  ["Admin", "admin@example.com"],
  ["Manager", "manager@example.com"],
  ["Project Lead", "pl@example.com"],
  ["QA Lead", "ql@example.com"],
  ["Developer", "developer@example.com"],
  ["Intern", "intern@example.com"],
  ["Member", "member@example.com"]
];

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      await login(form);
      navigate("/");
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="grid min-h-screen bg-paper px-4 py-8 lg:grid-cols-[1fr_480px] lg:p-6">
      <section className="hidden rounded-[2rem] bg-night p-10 text-white shadow-2xl shadow-night/20 lg:flex lg:flex-col lg:justify-between">
        <div className="flex items-center gap-3">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-amber"><Activity /></span>
          <div>
            <p className="text-2xl font-black">Taskflow</p>
            <p className="text-xs uppercase tracking-[0.24em] text-white/45">Delivery OS</p>
          </div>
        </div>
        <div>
          <p className="text-xs font-black uppercase tracking-[0.24em] text-amber">Control the workday</p>
          <h1 className="mt-4 max-w-xl text-5xl font-black tracking-tight">A calmer command center for project teams.</h1>
          <p className="mt-5 max-w-lg text-sm leading-7 text-white/65">Coordinate projects, owners, and deadlines from a workspace that feels built for execution.</p>
        </div>
      </section>
      <section className="grid place-items-center">
        <form className="surface w-full max-w-md rounded-[2rem] p-6" onSubmit={handleSubmit}>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-teal">Taskflow</p>
          <h1 className="mt-2 text-3xl font-black text-ink">Sign in</h1>
          <div className="mt-5 rounded-3xl bg-stone-100 p-4 text-xs text-stone-600">
            <p className="font-black text-ink">Test credentials, password: Password123</p>
            <div className="mt-2 grid gap-1 sm:grid-cols-2">
              {testAccounts.map(([role, email]) => (
                <p key={email}>{role}: <span className="font-mono">{email}</span></p>
              ))}
            </div>
          </div>
          {error && <p className="mt-4 rounded-xl bg-ember/10 p-3 text-sm text-ember">{error}</p>}
          <label className="mt-5 block text-sm font-black text-stone-700">
            Email
            <input className="field mt-1 w-full" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          </label>
          <label className="mt-4 block text-sm font-black text-stone-700">
            Password
            <input className="field mt-1 w-full" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
          </label>
          <button className="focus-ring mt-6 w-full rounded-lg bg-amber px-4 py-3 font-black text-white transition hover:bg-amber/90" disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </button>
          <p className="mt-4 text-center text-sm text-stone-500">
            New here? <Link className="font-black text-teal" to="/signup">Create an account</Link>
          </p>
        </form>
      </section>
    </main>
  );
}
