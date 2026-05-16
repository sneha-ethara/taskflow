import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus, Search } from "lucide-react";
import { useMemo, useState } from "react";
import api from "../api/axios";
import ProjectCard from "../components/ProjectCard";
import useAuth from "../hooks/useAuth";
import { getErrorMessage } from "../utils/helpers";

export default function Projects() {
  const { canManageProjects } = useAuth();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({ name: "", description: "" });
  const [error, setError] = useState("");
  const projects = useQuery({ queryKey: ["projects"], queryFn: async () => (await api.get("/projects")).data });

  const createProject = useMutation({
    mutationFn: async () => (await api.post("/projects", form)).data,
    onSuccess: () => {
      setForm({ name: "", description: "" });
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
    onError: (err) => setError(getErrorMessage(err))
  });

  const filtered = useMemo(() => {
    return (projects.data || []).filter((project) => project.name.toLowerCase().includes(search.toLowerCase()));
  }, [projects.data, search]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-teal">Portfolio</p>
          <h2 className="text-3xl font-black text-ink">Workstreams</h2>
          <p className="mt-2 text-sm text-stone-600">Shape project rooms, crew membership, and delivery focus.</p>
        </div>
        <label className="relative block md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
          <input className="field w-full pl-10" placeholder="Search projects" value={search} onChange={(e) => setSearch(e.target.value)} />
        </label>
      </div>

      {canManageProjects && (
        <form className="surface rounded-3xl p-5" onSubmit={(event) => { event.preventDefault(); createProject.mutate(); }}>
          <div className="grid gap-4 md:grid-cols-[1fr_2fr_auto]">
            <input className="field" placeholder="Project name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            <input className="field" placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            <button className="focus-ring inline-flex items-center justify-center gap-2 rounded-lg bg-amber px-4 py-2 font-black text-white shadow-sm transition hover:bg-amber/90" disabled={createProject.isPending}>
              <Plus size={18} />
              Create
            </button>
          </div>
          {error && <p className="mt-3 rounded-xl bg-ember/10 p-3 text-sm text-ember">{error}</p>}
        </form>
      )}

      {projects.isLoading ? (
        <p className="text-sm text-stone-500">Loading projects...</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((project) => <ProjectCard key={project.id} project={project} />)}
        </div>
      )}
    </div>
  );
}
