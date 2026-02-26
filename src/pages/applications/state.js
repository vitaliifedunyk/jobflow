import { loadJSON, saveJSON } from "../../shared/storage";

const STORAGE_KEY = "jobflow.applications.v1";
const VALID_STATUSES = ["Applied", "Interview", "Offer", "Rejected"];

export function createState() {
  return {
    applications: [],
    editingId: null,
    searchTerm: "",
    selectedStatus: "",
    sortBy: "date_desc",
  };
}

export function loadState(state) {
  const saved = loadJSON(STORAGE_KEY, []);
  state.applications = Array.isArray(saved)
    ? saved.map(normalizeApplication)
    : [];

  return state;
}

export function persist(state) {
  saveJSON(STORAGE_KEY, state.applications);
}

export function normalizeApplication(raw) {
  const item = raw ?? {};

  return {
    id: item.id ?? crypto.randomUUID(),
    company: String(item.company ?? ""),
    position: String(item.position ?? ""),
    status: VALID_STATUSES.includes(item.status) ? item.status : "Applied",
    appliedDate: String(item.appliedDate ?? ""),
    salary:
      item.salary === null || item.salary === undefined || item.salary === ""
        ? null
        : Number(item.salary),
    createdAt: Number(item.createdAt ?? Date.now()),
    updatedAt: Number(item.updatedAt ?? Date.now()),
  };
}

export function addApplication(state, application) {
  const next = normalizeApplication(application);
  state.applications.push(next);
  return next;
}

export function updateApplication(state, id, patch) {
  const index = state.applications.findIndex((app) => app.id === id);
  if (index === -1) return null;

  const current = state.applications[index];
  const next = normalizeApplication({
    ...current,
    ...patch,
    id: current.id,
    createdAt: current.createdAt,
  });

  state.applications[index] = next;
  return next;
}

export function removeApplication(state, id) {
  state.applications = state.applications.filter((app) => app.id !== id);
}

export function setEditing(state, id) {
  state.editingId = id;
}

export function setSearch(state, searchTerm) {
  state.searchTerm = searchTerm;
}

export function setStatus(state, selectedStatus) {
  state.selectedStatus = selectedStatus;
}

export function setSort(state, sortBy) {
  state.sortBy = sortBy;
}
