import { Activity } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { getErrorMessage } from "../utils/helpers";

export default function Signup() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await signup({ name: form.name, email: form.email, password: form.password });
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
          <p className="text-xs font-black uppercase tracking-[0.24em] text-amber">Join the command center</p>
          <h1 className="mt-4 max-w-xl text-5xl font-black tracking-tight">Make team execution easier to read.</h1>
          <p className="mt-5 max-w-lg text-sm leading-7 text-white/65">Create your workspace profile and start moving projects through a sharper operating layer.</p>
        </div>
      </section>
      <section className="grid place-items-center">
        <form className="surface w-full max-w-md rounded-[2rem] p-6" onSubmit={handleSubmit}>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-teal">Taskflow</p>
          <h1 className="mt-2 text-3xl font-black text-ink">Create account</h1>
          {error && <p className="mt-4 rounded-xl bg-ember/10 p-3 text-sm text-ember">{error}</p>}
          <label className="mt-5 block text-sm font-black text-stone-700">
            Name
            <input className="field mt-1 w-full" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          </label>
          <label className="mt-4 block text-sm font-black text-stone-700">
            Email
            <input className="field mt-1 w-full" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          </label>
          <label className="mt-4 block text-sm font-black text-stone-700">
            Password
            <input className="field mt-1 w-full" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
          </label>
          <label className="mt-4 block text-sm font-black text-stone-700">
            Confirm password
            <input className="field mt-1 w-full" type="password" value={form.confirmPassword} onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })} required />
          </label>
          <button className="focus-ring mt-6 w-full rounded-lg bg-amber px-4 py-3 font-black text-white transition hover:bg-amber/90" disabled={loading}>
            {loading ? "Creating..." : "Create account"}
          </button>
          <p className="mt-4 text-center text-sm text-stone-500">
            Already have an account? <Link className="font-black text-teal" to="/login">Sign in</Link>
          </p>
        </form>
      </section>
    </main>
  );
}
