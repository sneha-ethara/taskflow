import { ArrowRight, Users } from "lucide-react";
import { Link } from "react-router-dom";

export default function ProjectCard({ project }) {
  const taskCount = project.tasks?.length || 0;
  const memberCount = project.members?.length || 0;

  return (
    <article className="surface group rounded-3xl p-5 transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-teal">Workstream</p>
          <h3 className="mt-1 text-xl font-black text-ink">{project.name}</h3>
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-stone-600">{project.description || "No description provided."}</p>
        </div>
        <Link to={`/projects/${project.slug || project.id}`} className="icon-button shrink-0 group-hover:border-teal/30 group-hover:bg-teal/10 group-hover:text-teal" aria-label={`Open ${project.name}`}>
          <ArrowRight size={18} />
        </Link>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-2xl bg-stone-100 p-3">
          <p className="text-xs uppercase tracking-wide text-stone-500">Tasks</p>
          <p className="mt-1 text-lg font-black text-ink">{taskCount}</p>
        </div>
        <div className="rounded-2xl bg-teal/10 p-3 text-teal">
          <p className="flex items-center gap-2 text-xs uppercase tracking-wide"><Users size={14} /> Crew</p>
          <p className="mt-1 text-lg font-black">{memberCount}</p>
        </div>
      </div>
    </article>
  );
}
