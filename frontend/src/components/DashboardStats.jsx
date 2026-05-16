import { AlertTriangle, CheckCircle2, Clock, FolderKanban, ListTodo, Percent } from "lucide-react";

const icons = {
  totalTasks: ListTodo,
  completedTasks: CheckCircle2,
  pendingTasks: Clock,
  overdueTasks: AlertTriangle,
  totalProjects: FolderKanban,
  progress: Percent
};

const accents = {
  totalTasks: "bg-teal/10 text-teal",
  completedTasks: "bg-fern/15 text-fern",
  pendingTasks: "bg-amber/15 text-amber",
  overdueTasks: "bg-ember/15 text-ember",
  totalProjects: "bg-night/10 text-night",
  progress: "bg-teal/10 text-teal"
};

export default function DashboardStats({ stats }) {
  const cards = [
    ["totalTasks", "Total tasks", stats?.totalTasks ?? 0],
    ["completedTasks", "Completed", stats?.completedTasks ?? 0],
    ["pendingTasks", "Pending", stats?.pendingTasks ?? 0],
    ["overdueTasks", "Overdue", stats?.overdueTasks ?? 0],
    ["totalProjects", "Projects", stats?.totalProjects ?? 0],
    ["progress", "Progress", `${stats?.progress ?? 0}%`]
  ];

  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {cards.map(([key, label, value]) => {
        const Icon = icons[key];
        return (
          <div key={key} className="surface rounded-3xl p-5 transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="flex items-center justify-between">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-stone-500">{label}</p>
              <span className={`grid h-10 w-10 place-items-center rounded-2xl ${accents[key]}`}>
                <Icon size={20} />
              </span>
            </div>
            <p className="mt-4 text-4xl font-black tracking-tight text-ink">{value}</p>
          </div>
        );
      })}
    </section>
  );
}
