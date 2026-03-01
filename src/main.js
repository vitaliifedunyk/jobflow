import "./css/style.css";
import {
  addApp,
  deleteApp,
  normalizeApp,
  setState,
  state,
  updateApp,
} from "./js/state.js";
import { loadApps, saveApps } from "./js/storage.js";
import { closeModal, openModal, renderTable, resetForm } from "./js/ui.js";

const app = document.querySelector("#app");

app.innerHTML = `
  <div class="min-h-screen bg-gray-50">
    <header class="border-b bg-white">
      <div class="mx-auto max-w-6xl px-4 py-4">
        <h1 class="text-2xl font-semibold">JobFlow</h1>
        <p class="mt-1 text-sm text-gray-600">Applications</p>
      </div>
    </header>

    <main class="mx-auto max-w-6xl px-4 py-6">
      <div class="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <div class="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div class="flex flex-col gap-3 sm:flex-row sm:items-center">
            <input
              id="searchInput"
              class="w-full sm:w-64 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-gray-300"
              placeholder="Search company or position..."
            />

            <select
              id="statusFilter"
              class="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm"
            >
              <option value="">All statuses</option>
              <option value="Applied">Applied</option>
              <option value="Interview">Interview</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
            </select>

            <select
              id="sortSelect"
              class="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm"
            >
              <option value="date_desc">Date: newest</option>
              <option value="date_asc">Date: oldest</option>
              <option value="salary_desc">Salary: high → low</option>
              <option value="salary_asc">Salary: low → high</option>
            </select>
          </div>

          <div class="flex flex-wrap items-center gap-2">
            <button
              id="addBtn"
              class="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:opacity-90 cursor-pointer"
            >
              Add application
            </button>

            <button
              id="exportBtn"
              class="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50 cursor-pointer"
            >
              Export JSON
            </button>

            <label
              class="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50 cursor-pointer"
            >
              Import JSON
              <input type="file" id="importInput" accept="application/json" class="hidden" />
            </label>
          </div>
        </div>

        <div class="mt-4 overflow-x-auto">
          <table class="w-full text-left text-sm">
            <thead class="text-xs uppercase text-gray-500">
              <tr class="border-b border-gray-200">
                <th class="px-3 py-2">Company</th>
                <th class="px-3 py-2">Position</th>
                <th class="px-3 py-2">Status</th>
                <th class="px-3 py-2">Applied</th>
                <th class="px-3 py-2">Salary</th>
                <th class="px-3 py-2">Actions</th>
              </tr>
            </thead>
            <tbody id="tableBody"></tbody>
          </table>
        </div>
      </div>
    </main>

    <div id="appModal" class="fixed inset-0 hidden items-center justify-center bg-black/40 p-4">
      <div class="w-full max-w-lg rounded-xl bg-white p-4 shadow">
        <div class="flex items-center justify-between">
          <h2 id="modalTitle" class="text-lg font-semibold">Add application</h2>
          <button
            id="closeModalBtn"
            class="rounded-lg border border-gray-200 px-3 py-1 text-sm hover:bg-gray-50"
          >
            Close
          </button>
        </div>

        <div class="mt-4 text-sm text-gray-700">
          <form id="applicationForm">
            <div class="mt-4">
              <label class="block text-sm font-medium mb-1">Company</label>
              <input
                type="text"
                id="companyInput"
                class="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-300"
              />
            </div>

            <div class="mt-4">
              <label class="block text-sm font-medium mb-1">Position</label>
              <input
                type="text"
                id="positionInput"
                class="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-300"
              />
            </div>

            <div class="mt-4">
              <label class="block text-sm font-medium mb-1">Status</label>
              <select
                id="statusInput"
                class="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
              >
                <option value="Applied">Applied</option>
                <option value="Interview">Interview</option>
                <option value="Offer">Offer</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

            <div class="mt-4">
              <label class="block text-sm font-medium mb-1">Applied Date</label>
              <input
                type="date"
                id="dateInput"
                min="1000-01-01"
                max="9999-12-31"
                class="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-300"
              />
            </div>

            <div class="mt-4">
              <label class="block text-sm font-medium mb-1">Salary</label>
              <input
                type="number"
                id="salaryInput"
                class="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-300"
              />
            </div>

            <div class="mt-6 flex justify-end gap-2">
              <button
                type="submit"
                class="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:opacity-90"
              >
                Save application
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
`;

const tableBody = document.getElementById("tableBody");
const addBtn = document.getElementById("addBtn");
const closeModalBtn = document.getElementById("closeModalBtn");
const modal = document.getElementById("appModal");
const form = document.getElementById("applicationForm");
const companyInput = document.getElementById("companyInput");
const positionInput = document.getElementById("positionInput");
const dateInput = document.getElementById("dateInput");
const statusInput = document.getElementById("statusInput");
const salaryInput = document.getElementById("salaryInput");
const searchInput = document.getElementById("searchInput");
const statusFilter = document.getElementById("statusFilter");
const sortSelect = document.getElementById("sortSelect");
const exportBtn = document.getElementById("exportBtn");
const importInput = document.getElementById("importInput");

setState({ apps: loadApps().map(normalizeApp) });
sortSelect.value = state.sortBy;

function sortBySalary(a, b, direction) {
  const aIsNull = a.salary === null || a.salary === undefined;
  const bIsNull = b.salary === null || b.salary === undefined;

  if (aIsNull && bIsNull) return 0;
  if (aIsNull) return 1;
  if (bIsNull) return -1;

  return direction === "desc" ? b.salary - a.salary : a.salary - b.salary;
}

function getVisibleApps() {
  const query = state.searchTerm.toLowerCase();

  const filtered = state.apps.filter((appItem) => {
    const matchesSearch =
      appItem.company.toLowerCase().includes(query) ||
      appItem.position.toLowerCase().includes(query);
    const matchesStatus =
      state.selectedStatus === "" || appItem.status === state.selectedStatus;

    return matchesSearch && matchesStatus;
  });

  const sorted = [...filtered];
  sorted.sort((a, b) => {
    if (state.sortBy === "date_desc") return b.appliedDate.localeCompare(a.appliedDate);
    if (state.sortBy === "date_asc") return a.appliedDate.localeCompare(b.appliedDate);
    if (state.sortBy === "salary_desc") return sortBySalary(a, b, "desc");
    if (state.sortBy === "salary_asc") return sortBySalary(a, b, "asc");
    return 0;
  });

  return sorted;
}

function refresh() {
  renderTable(getVisibleApps());
}

tableBody.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-action]");
  if (!button) return;

  const { action, id } = button.dataset;

  if (action === "delete") {
    if (!confirm("Delete this application?")) return;
    deleteApp(id);
    saveApps(state.apps);
    refresh();
    return;
  }

  if (action === "edit") {
    const appToEdit = state.apps.find((item) => item.id === id);
    if (!appToEdit) return;

    setState({ editingId: id });
    openModal(appToEdit);
  }
});

addBtn.addEventListener("click", () => {
  setState({ editingId: null });
  openModal();
});

closeModalBtn.addEventListener("click", closeModal);

modal.addEventListener("click", (event) => {
  if (event.target === modal) closeModal();
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const company = companyInput.value.trim();
  const position = positionInput.value.trim();
  const appliedDate = dateInput.value;

  if (company.length < 2) {
    alert("Company is required (min 2 chars)");
    companyInput.focus();
    return;
  }

  if (position.length < 2) {
    alert("Position is required (min 2 chars)");
    positionInput.focus();
    return;
  }

  if (!appliedDate) {
    alert("Applied date is required");
    dateInput.focus();
    return;
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(appliedDate)) {
    alert("Applied date year must be 4 digits (YYYY-MM-DD)");
    dateInput.focus();
    return;
  }

  const nextData = {
    company,
    position,
    status: statusInput.value,
    appliedDate,
    salary: salaryInput.value === "" ? null : Number(salaryInput.value),
  };

  if (state.editingId) {
    updateApp(state.editingId, nextData);
    setState({ editingId: null });
  } else {
    addApp(nextData);
  }

  saveApps(state.apps);
  refresh();
  resetForm();
  closeModal();
});

searchInput.addEventListener("input", (event) => {
  setState({ searchTerm: event.target.value.trim() });
  refresh();
});

statusFilter.addEventListener("change", (event) => {
  setState({ selectedStatus: event.target.value });
  refresh();
});

sortSelect.addEventListener("change", (event) => {
  setState({ sortBy: event.target.value });
  refresh();
});

exportBtn.addEventListener("click", () => {
  const json = JSON.stringify(state.apps, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "jobflow-applications.json";
  link.click();

  URL.revokeObjectURL(url);
});

importInput.addEventListener("change", async (event) => {
  const file = event.target.files?.[0];
  if (!file) return;

  try {
    const text = await file.text();
    const parsed = JSON.parse(text);

    if (!Array.isArray(parsed)) {
      alert("Invalid file: expected an array of applications.");
      return;
    }

    setState({ apps: parsed.map(normalizeApp), editingId: null });
    saveApps(state.apps);
    refresh();

    event.target.value = "";
    alert("Import successful ✅");
  } catch {
    alert("Import failed: invalid JSON file.");
  }
});

refresh();
