import { getRefs } from "./domRefs";
import { getVisibleApplications } from "./selectors";
import { closeModal, fillForm, openModal, renderTable, resetForm } from "./render";
import {
  addApplication,
  createState,
  loadState,
  normalizeApplication,
  persist,
  removeApplication,
  setEditing,
  setSearch,
  setSort,
  setStatus,
  updateApplication,
} from "./state";

export function renderApplicationsPage(rootEl) {
  rootEl.innerHTML = `
  <div class="min-h-screen bg-gray-50">
    <header class="border-b bg-white">
      <div class="mx-auto max-w-6xl px-4 py-4">
        <h1 class="text-2xl font-semibold">JobFlow</h1>
        <p class="mt-1 text-sm text-gray-600">Applications</p>
      </div>
    </header>

    <main class="mx-auto max-w-6xl px-4 py-6">
      <div class="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <!-- Toolbar -->
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

        <!-- Table -->
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

            <tbody id="tableBody">
              <tr>
                <td class="px-3 py-3 text-gray-500" colspan="6">
                  No applications yet.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>

    <!-- Modal -->
    <div
      id="appModal"
      class="fixed inset-0 hidden items-center justify-center bg-black/40 p-4"
    >
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

  const state = createState();
  loadState(state);

  const refs = getRefs(rootEl);
  refs.sortSelect.value = state.sortBy;

  function refreshTable() {
    const visibleApplications = getVisibleApplications(state.applications, {
      searchTerm: state.searchTerm,
      selectedStatus: state.selectedStatus,
      sortBy: state.sortBy,
    });

    renderTable(refs.tableBody, visibleApplications);
  }

  refs.tableBody.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-action]");
    if (!btn) return;

    const action = btn.dataset.action;
    const id = btn.dataset.id;

    if (action === "delete") {
      const ok = confirm("Delete this application?");
      if (!ok) return;

      removeApplication(state, id);
      persist(state);
      refreshTable();
    }

    if (action === "edit") {
      const app = state.applications.find((item) => item.id === id);
      if (!app) return;

      setEditing(state, id);
      fillForm(refs.form, app);
      refs.modalTitle.textContent = "Edit application";
      openModal(refs.modalEl);
    }
  });

  refs.addBtn.addEventListener("click", () => {
    setEditing(state, null);
    resetForm(refs.form);
    refs.modalTitle.textContent = "Add application";
    openModal(refs.modalEl);
  });

  refs.closeModalBtn.addEventListener("click", () => {
    closeModal(refs.modalEl);
  });

  refs.modalEl.addEventListener("click", (e) => {
    if (e.target === refs.modalEl) {
      closeModal(refs.modalEl);
    }
  });

  refs.form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (refs.companyInput.value.trim().length < 2) {
      alert("Company is required (min 2 chars)");
      refs.companyInput.focus();
      return;
    }

    if (refs.positionInput.value.trim().length < 2) {
      alert("Position is required (min 2 chars)");
      refs.positionInput.focus();
      return;
    }

    if (refs.dateInput.value === "") {
      alert("Applied date is required");
      refs.dateInput.focus();
      return;
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(refs.dateInput.value)) {
      alert("Applied date year must be 4 digits (YYYY-MM-DD)");
      refs.dateInput.focus();
      return;
    }

    const company = refs.companyInput.value.trim();
    const position = refs.positionInput.value.trim();
    const status = refs.statusInput.value;
    const appliedDate = refs.dateInput.value;
    const salary = refs.salaryInput.value === "" ? null : Number(refs.salaryInput.value);

    if (state.editingId === null) {
      addApplication(state, {
        id: crypto.randomUUID(),
        company,
        position,
        status,
        appliedDate,
        salary,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
    } else {
      updateApplication(state, state.editingId, {
        company,
        position,
        status,
        appliedDate,
        salary,
        updatedAt: Date.now(),
      });

      setEditing(state, null);
    }

    persist(state);
    refreshTable();

    resetForm(refs.form);
    closeModal(refs.modalEl);
  });

  refs.searchInput.addEventListener("input", (e) => {
    setSearch(state, e.target.value.trim());
    refreshTable();
  });

  refs.statusFilter.addEventListener("change", (e) => {
    setStatus(state, e.target.value);
    refreshTable();
  });

  refs.sortSelect.addEventListener("change", (e) => {
    setSort(state, e.target.value);
    refreshTable();
  });

  refs.exportBtn.addEventListener("click", () => {
    const dataStr = JSON.stringify(state.applications, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "jobflow-applications.json";
    a.click();

    URL.revokeObjectURL(url);
  });

  refs.importInput.addEventListener("change", async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const parsed = JSON.parse(text);

      if (!Array.isArray(parsed)) {
        alert("Invalid file: expected an array of applications.");
        return;
      }

      state.applications = parsed.map(normalizeApplication);
      persist(state);
      refreshTable();

      e.target.value = "";
      alert("Import successful ✅");
    } catch {
      alert("Import failed: invalid JSON file.");
    }
  });

  refreshTable();
}
