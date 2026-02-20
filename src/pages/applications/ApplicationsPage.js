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

  const STORAGE_KEY = "jobflow.applications.v1";

  function saveToStorage() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(applications));
  }

  function loadFromStorage() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    try {
      const data = JSON.parse(raw);
      return Array.isArray(data) ? data : [];
    } catch {
      return [];
    }
  }

  let applications = loadFromStorage();
  let editingId = null;
  let searchTerm = "";
  let selectedStatus = "";
  let sortBy = "date_desc";

  function addApplication(application) {
    applications.push(application);
    saveToStorage();
    renderTable();
  }

  function renderTable() {
    const tableBody = rootEl.querySelector("#tableBody");
    const q = searchTerm.toLowerCase();

    const filteredApplications = applications.filter((app) => {
      const matchesSearch =
        app.company.toLowerCase().includes(q) ||
        app.position.toLowerCase().includes(q);
      const matchesStatus =
        selectedStatus === "" || app.status === selectedStatus;

      return matchesSearch && matchesStatus;
    });

    if (filteredApplications.length === 0) {
      tableBody.innerHTML = `
      <tr>
        <td colspan="6" class="px-3 py-3 text-gray-500">
          No applications yet.
        </td>
      </tr>
      `;
      return;
    }

    const sortedApplications = [...filteredApplications];

    sortedApplications.sort((a, b) => {
      if (sortBy === "date_desc")
        return b.appliedDate.localeCompare(a.appliedDate);
      if (sortBy === "date_asc")
        return a.appliedDate.localeCompare(b.appliedDate);

      const sa = a.salary ?? -Infinity;
      const sb = b.salary ?? -Infinity;

      if (sortBy === "salary_desc") return sb - sa;
      if (sortBy === "salary_asc") return sa - sb;

      return 0;
    });

    let rowsHtml = "";
    sortedApplications.forEach(
      (app) =>
        (rowsHtml += `
          <tr class="border-t border-gray-100">
            <td class="px-3 py-2">${app.company}</td>
            <td class="px-3 py-2">${app.position}</td>
            <td class="px-3 py-2">${app.status}</td>
            <td class="px-3 py-2">${app.appliedDate}</td>
            <td class="px-3 py-2">${app.salary ?? "-"}</td>
            <td class="px-3 py-2">
              <div class="flex gap-2">
                <button
                  class="rounded-md border border-gray-200 px-2 py-1 text-xs font-medium hover:bg-gray-50 cursor-pointer"
                  data-action="edit"
                  data-id="${app.id}"
                >
                  Edit
                </button>
                <button
                  class="rounded-md border border-gray-200 px-2 py-1 text-xs font-medium hover:bg-gray-50 cursor-pointer"
                  data-action="delete"
                  data-id="${app.id}"
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        `),
    );
    tableBody.innerHTML = rowsHtml;
  }

  const addBtn = rootEl.querySelector("#addBtn");
  const modalEl = rootEl.querySelector("#appModal");
  const modalTitle = rootEl.querySelector("#modalTitle");
  const closeModalBtn = rootEl.querySelector("#closeModalBtn");
  const tableBody = rootEl.querySelector("#tableBody");
  const form = rootEl.querySelector("#applicationForm");
  const searchInput = rootEl.querySelector("#searchInput");
  const statusFilter = rootEl.querySelector("#statusFilter");
  const sortSelect = rootEl.querySelector("#sortSelect");
  sortSelect.value = sortBy;
  const exportBtn = rootEl.querySelector("#exportBtn");
  const importInput = rootEl.querySelector("#importInput");

  tableBody.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-action]");
    if (!btn) return;

    const action = btn.dataset.action;
    const id = btn.dataset.id;

    if (action === "delete") {
      const ok = confirm("Delete this application?");
      if (!ok) return;

      applications = applications.filter((app) => app.id !== id);
      saveToStorage();
      renderTable();
    }

    if (action === "edit") {
      const app = applications.find((a) => a.id === id);
      if (!app) return;
      editingId = id;

      form.querySelector("#companyInput").value = app.company;
      form.querySelector("#positionInput").value = app.position;
      form.querySelector("#statusInput").value = app.status;
      form.querySelector("#dateInput").value = app.appliedDate;
      form.querySelector("#salaryInput").value = app.salary ?? "";

      modalTitle.textContent = "Edit application";

      modalEl.classList.remove("hidden");
      modalEl.classList.add("flex");
    }
  });

  addBtn.addEventListener("click", () => {
    editingId = null;
    form.reset();
    modalTitle.textContent = "Add application";
    modalEl.classList.remove("hidden");
    modalEl.classList.add("flex");
  });

  closeModalBtn.addEventListener("click", () => {
    modalEl.classList.add("hidden");
    modalEl.classList.remove("flex");
  });

  modalEl.addEventListener("click", (e) => {
    if (e.target === modalEl) {
      modalEl.classList.add("hidden");
      modalEl.classList.remove("flex");
    }
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const companyEl = form.querySelector("#companyInput");
    const positionEl = form.querySelector("#positionInput");
    const statusEl = form.querySelector("#statusInput");
    const appliedDateEl = form.querySelector("#dateInput");
    const salaryEl = form.querySelector("#salaryInput");

    if (companyEl.value.trim().length < 2) {
      alert("Company is required (min 2 chars)");
      companyEl.focus();
      return;
    }

    if (positionEl.value.trim().length < 2) {
      alert("Position is required (min 2 chars)");
      positionEl.focus();
      return;
    }

    if (appliedDateEl.value === "") {
      alert("Applied date is required");
      appliedDateEl.focus();
      return;
    }

    const company = companyEl.value.trim();
    const position = positionEl.value.trim();
    const status = statusEl.value;
    const appliedDate = appliedDateEl.value;
    const salary = salaryEl.value === "" ? null : Number(salaryEl.value);

    if (editingId === null) {
      addApplication({
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
      const idx = applications.findIndex((a) => a.id === editingId);
      if (idx === -1) return;

      applications[idx] = {
        ...applications[idx],
        company,
        position,
        status,
        appliedDate,
        salary,
        updatedAt: Date.now(),
      };

      editingId = null;
      saveToStorage();
      renderTable();
    }

    form.reset();
    modalEl.classList.add("hidden");
    modalEl.classList.remove("flex");
  });

  searchInput.addEventListener("input", (e) => {
    searchTerm = e.target.value.trim();
    renderTable();
  });

  statusFilter.addEventListener("change", (e) => {
    selectedStatus = e.target.value;
    renderTable();
  });

  sortSelect.addEventListener("change", (e) => {
    sortBy = e.target.value;
    renderTable();
  });

  exportBtn.addEventListener("click", () => {
    const dataStr = JSON.stringify(applications, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "jobflow-applications.json";
    a.click();

    URL.revokeObjectURL(url);
  });

  renderTable();
}
