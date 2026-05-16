import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../api/axios";
import DashboardStats from "../components/DashboardStats";
import TaskCard from "../components/TaskCard";

export default function Dashboard() {
  const queryClient = useQueryClient();
  const stats = useQuery({ queryKey: ["dashboard-stats"], queryFn: async () => (await api.get("/dashboard/stats")).data });
  const recent = useQuery({ queryKey: ["recent-tasks"], queryFn: async () => (await api.get("/dashboard/recent")).data });

  const updateStatus = useMutation({
    mutationFn: async ({ taskId, status }) => (await api.patch(`/tasks/${taskId}/status`, { status })).data,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] });
      queryClient.invalidateQueries({ queryKey: ["recent-tasks"] });
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["project"] });
    },
    onError: (err) => console.error("Status update failed:", err)
  });

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-[2rem] bg-night p-6 text-white shadow-xl shadow-night/15 sm:p-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-amber">Taskflow command</p>
            <h2 className="mt-3 max-w-2xl text-3xl font-black tracking-tight sm:text-4xl">Every project signal in one calm workspace.</h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/65">Track ownership, surface overdue work, and keep delivery moving without the old task-board noise.</p>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm sm:min-w-72">
            <div className="rounded-3xl bg-white/10 p-4">
              <p className="text-white/50">Completion</p>
              <p className="mt-1 text-2xl font-black">{stats.data?.progress ?? 0}%</p>
            </div>
            <div className="rounded-3xl bg-ember p-4">
              <p className="text-white/70">Overdue</p>
              <p className="mt-1 text-2xl font-black">{stats.data?.overdueTasks ?? 0}</p>
            </div>
          </div>
        </div>
      </section>

      <DashboardStats stats={stats.data} />

      <section>
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-teal">Live queue</p>
            <h3 className="text-2xl font-black text-ink">Recent tasks</h3>
          </div>
        </div>
        {recent.isLoading && <p className="text-sm text-stone-500">Loading recent tasks...</p>}
        <div className="grid gap-4 lg:grid-cols-2">
          {recent.data?.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onStatusChange={(taskId, status) => updateStatus.mutate({ taskId, status })}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
