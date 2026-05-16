export function formatDate(date) {
  if (!date) return "No due date";
  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(new Date(date));
}

export function statusLabel(status) {
  return {
    TODO: "To do",
    IN_PROGRESS: "In progress",
    DONE: "Done"
  }[status] || status;
}

export function roleLabel(role) {
  return {
    ADMIN: "Admin",
    MANAGER: "Manager",
    PROJECT_LEAD: "Project Lead",
    QA_LEAD: "QA Lead",
    DEVELOPER: "Developer",
    INTERN: "Intern",
    MEMBER: "Member"
  }[role] || role;
}

export function priorityClass(priority) {
  return {
    LOW: "bg-fern/15 text-fern ring-1 ring-fern/20",
    MEDIUM: "bg-amber/15 text-amber ring-1 ring-amber/25",
    HIGH: "bg-ember/15 text-ember ring-1 ring-ember/20"
  }[priority] || "bg-stone-100 text-stone-700 ring-1 ring-stone-200";
}

export function getErrorMessage(error) {
  return error?.response?.data?.message || error.message || "Something went wrong";
}
