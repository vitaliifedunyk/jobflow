const VALID_STATUSES = ["Applied", "Interview", "Offer", "Rejected"];

export const state = {
  apps: [],
  editingId: null,
  searchTerm: "",
  selectedStatus: "",
  sortBy: "date_desc",
};

export function normalizeApp(raw = {}) {
  const salaryValue =
    raw.salary === "" || raw.salary === null || raw.salary === undefined
      ? null
      : Number(raw.salary);

  return {
    id: raw.id || crypto.randomUUID(),
    company: String(raw.company || "").trim(),
    position: String(raw.position || "").trim(),
    status: VALID_STATUSES.includes(raw.status) ? raw.status : "Applied",
    appliedDate: String(raw.appliedDate || ""),
    salary: Number.isFinite(salaryValue) ? salaryValue : null,
  };
}

export function setState(patch) {
  Object.assign(state, patch);
  return state;
}

export function addApp(app) {
  const next = normalizeApp(app);
  state.apps.push(next);
  return next;
}

export function updateApp(id, patch) {
  const app = state.apps.find((item) => item.id === id);
  if (!app) return null;

  Object.assign(app, normalizeApp({ ...app, ...patch, id: app.id }));
  return app;
}

export function deleteApp(id) {
  state.apps = state.apps.filter((app) => app.id !== id);
}
