import { Trash2 } from "lucide-react";
import { formatDate, priorityClass, statusLabel } from "../utils/helpers";
import useAuth from "../hooks/useAuth";

export default function TaskCard({ task, onStatusChange, onDelete }) {
  const { canLeadWork, user } = useAuth();
  const canChange = canLeadWork || task.assignedTo?.id === user?.id;

  return (
    <article className="surface rounded-3xl p-5 transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-teal">{task.project?.name || "No project"}</p>
          <h3 className="mt-1 text-lg font-black text-ink">{task.title}</h3>
          <p className="mt-2 text-sm leading-6 text-stone-600">{task.description || "No description."}</p>
        </div>
        {(user?.role === "ADMIN" || task.creator?.id === user?.id) && (
          <button className="icon-button shrink-0 hover:border-ember/30 hover:bg-ember/10 hover:text-ember" onClick={() => onDelete?.(task.id)} aria-label="Delete task">
            <Trash2 size={17} />
          </button>
        )}
      </div>
      <div className="mt-5 flex flex-wrap gap-2 text-xs font-black">
        <span className={`rounded-full px-3 py-1 ${priorityClass(task.priority)}`}>{task.priority}</span>
        <span className="rounded-full bg-stone-100 px-3 py-1 text-stone-600 ring-1 ring-stone-200">{formatDate(task.dueDate)}</span>
      </div>
      <div className="mt-5 flex flex-col gap-3 border-t border-stone-200 pt-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-stone-600">Owner <span className="font-black text-ink">{task.assignedTo?.name || "Unassigned"}</span></p>
        <select
          className="field sm:w-44"
          value={task.status}
          disabled={!canChange}
          onChange={(event) => onStatusChange?.(task.id, event.target.value)}
        >
          <option value="TODO">{statusLabel("TODO")}</option>
          <option value="IN_PROGRESS">{statusLabel("IN_PROGRESS")}</option>
          <option value="DONE">{statusLabel("DONE")}</option>
        </select>
      </div>
    </article>
  );
}
