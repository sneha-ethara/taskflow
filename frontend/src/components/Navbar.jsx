import { LogOut, Menu, Search } from "lucide-react";
import useAuth from "../hooks/useAuth";
import { roleLabel } from "../utils/helpers";

export default function Navbar({ onMenu }) {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-20 border-b border-stone-200/80 bg-paper/85 backdrop-blur-xl">
      <div className="flex h-20 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <button className="icon-button lg:hidden" onClick={onMenu} aria-label="Open navigation">
          <Menu size={20} />
        </button>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-teal">Taskflow workspace</p>
          <h1 className="truncate text-xl font-black text-ink">Plan, assign, ship</h1>
        </div>
        <label className="relative hidden w-full max-w-xs xl:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={17} />
          <input className="field w-full pl-10" placeholder="Quick scan" />
        </label>
        <div className="flex items-center gap-3 rounded-full border border-stone-200 bg-white/90 py-1 pl-3 pr-1 shadow-sm">
          <div className="hidden text-right sm:block">
            <p className="text-sm font-black text-ink">{user?.name}</p>
            <p className="text-xs uppercase tracking-wide text-stone-500">{roleLabel(user?.role)}</p>
          </div>
          <div className="grid h-10 w-10 place-items-center rounded-full bg-teal text-sm font-black text-white">
            {user?.name?.slice(0, 1) || "U"}
          </div>
          <button className="icon-button border-transparent bg-transparent" onClick={logout} aria-label="Log out">
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </header>
  );
}
