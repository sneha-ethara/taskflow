import { Activity, BarChart3, FolderKanban, ListTodo } from "lucide-react";
import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Command", icon: BarChart3 },
  { to: "/projects", label: "Workstreams", icon: FolderKanban },
  { to: "/tasks", label: "Queue", icon: ListTodo }
];

export default function Sidebar({ open, onClose }) {
  return (
    <aside className={`${open ? "translate-x-0" : "-translate-x-full"} fixed inset-y-0 left-0 z-30 w-72 bg-night text-white shadow-2xl shadow-night/30 transition-transform lg:fixed lg:translate-x-0`}>
      <div className="flex h-20 items-center gap-3 border-b border-white/10 px-6">
        <span className="grid h-12 w-12 place-items-center rounded-2xl bg-amber text-white shadow-lg shadow-amber/25">
          <Activity size={25} />
        </span>
        <div>
          <span className="block text-xl font-black tracking-wide">Taskflow</span>
          <span className="text-xs uppercase tracking-[0.24em] text-white/45">Delivery OS</span>
        </div>
      </div>
      <nav className="space-y-2 p-4">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold transition ${isActive ? "bg-white text-night shadow-xl shadow-black/20" : "text-white/65 hover:bg-white/10 hover:text-white"}`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>
      <div className="absolute bottom-0 left-0 right-0 border-t border-white/10 p-5">
        <p className="text-xs uppercase tracking-[0.2em] text-white/35">Sprint signal</p>
        <div className="mt-3 h-2 rounded-full bg-white/10">
          <div className="h-2 w-3/4 rounded-full bg-amber" />
        </div>
      </div>
    </aside>
  );
}
