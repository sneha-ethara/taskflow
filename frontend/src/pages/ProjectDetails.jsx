import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import TaskCard from "../components/TaskCard";
import useAuth from "../hooks/useAuth";
import { getErrorMessage, roleLabel } from "../utils/helpers";

export default function ProjectDetails() {
  const { key } = useParams();
  const { canManageProjects } = useAuth();
  const queryClient = useQueryClient();
  const [userId, setUserId] = useState("");
  const [error, setError] = useState("");

  const project = useQuery({ queryKey: ["project", key], queryFn: async () => (await api.get(`/projects/${key}`)).data });
  const users = useQuery({ queryKey: ["users"], queryFn: async () => (await api.get("/users")).data, enabled: canManageProjects });

  const addMember = useMutation({
    mutationFn: async () => (await api.post(`/projects/${project.data.id}/members`, { userId })).data,
    onSuccess: () => {
      setUserId("");
      setError("");
      queryClient.invalidateQueries({ queryKey: ["project", key] });
    },
    onError: (err) => setError(getErrorMessage(err))
  });

  const removeMember = useMutation({
    mutationFn: async (memberId) => (await api.delete(`/projects/${key}/members/${memberId}`)).data,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["project", key] })
  });

  const updateStatus = useMutation({
    mutationFn: async ({ taskId, status }) => (await api.patch(`/tasks/${taskId}/status`, { status })).data,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["project", key] });
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] });
      queryClient.invalidateQueries({ queryKey: ["recent-tasks"] });
    },
    onError: (err) => setError(getErrorMessage(err))
  });

  const deleteTask = useMutation({
    mutationFn: async (taskId) => (await api.delete(`/tasks/${taskId}`)).data,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["project", key] }),
    onError: (err) => setError(getErrorMessage(err))
  });

  if (project.isLoading) return <p className="text-sm text-stone-500">Loading project...</p>;

  const data = project.data;

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] bg-night p-6 text-white shadow-xl shadow-night/15 sm:p-8">
        <p className="text-xs font-black uppercase tracking-[0.24em] text-amber">Project room</p>
        <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">{data.name}</h2>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-white/65">{data.description || "No description provided."}</p>
      </section>

      {error && <p className="rounded-xl bg-ember/10 p-3 text-sm text-ember">{error}</p>}

      <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div>
          <div className="mb-3">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-teal">Scope</p>
            <h3 className="text-2xl font-black text-ink">Tasks</h3>
          </div>
          <div className="grid gap-4">
            {data.tasks?.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onStatusChange={(taskId, status) => updateStatus.mutate({ taskId, status })}
                onDelete={(taskId) => deleteTask.mutate(taskId)}
              />
            ))}
            {!data.tasks?.length && <p className="surface rounded-3xl p-5 text-sm text-stone-600">No tasks yet.</p>}
          </div>
        </div>

        <aside className="space-y-4">
          {canManageProjects && (
            <form className="surface rounded-3xl p-5" onSubmit={(event) => { event.preventDefault(); addMember.mutate(); }}>
              <h3 className="font-black text-ink">Add member</h3>
              <select className="field mt-3 w-full" value={userId} onChange={(e) => setUserId(e.target.value)} required>
                <option value="">Select user</option>
                {users.data?.map((user) => <option key={user.id} value={user.id}>{user.name} ({roleLabel(user.role)})</option>)}
              </select>
              <button className="focus-ring mt-3 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-amber px-4 py-2 font-black text-white transition hover:bg-amber/90">
                <Plus size={18} />
                Add
              </button>
            </form>
          )}

          <div className="surface rounded-3xl p-5">
            <h3 className="font-black text-ink">Members</h3>
            <div className="mt-3 space-y-3">
              {data.members?.map((member) => (
                <div className="flex items-center justify-between gap-3 rounded-2xl bg-stone-100 p-3" key={member.id}>
                  <div className="min-w-0">
                    <p className="text-sm font-black text-ink">{member.user.name}</p>
                    <p className="truncate text-xs text-stone-500">{member.user.email} - {roleLabel(member.user.role)}</p>
                  </div>
                  {canManageProjects && (
                    <button className="icon-button shrink-0 hover:border-ember/30 hover:bg-ember/10 hover:text-ember" onClick={() => removeMember.mutate(member.id)} aria-label="Remove member">
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}
