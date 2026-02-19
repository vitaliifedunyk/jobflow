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
      <div class="rounded-xl border bg-white p-4">
        <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div class="flex flex-1 gap-3">
            <input id="searchInput" class="w-full rounded-lg border px-3 py-2 text-sm"
              placeholder="Search company or position..." />
            <select id="statusFilter" class="rounded-lg border px-3 py-2 text-sm">
              <option value="">All statuses</option>
              <option value="Applied">Applied</option>
              <option value="Interview">Interview</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          <button id="addBtn" class="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:opacity-90">
            Add application
          </button>
        </div>

        <div class="mt-4 overflow-x-auto">
          <table class="w-full text-left text-sm">
            <thead class="text-xs uppercase text-gray-500">
              <tr>
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
  </div>

  <div id="appModal" class="fixed inset-0 hidden items-center justify-center bg-black/40 p-4">
    <div class="w-full max-w-lg rounded-xl bg-white p-4 shadow">
      <div class="flex items-center justify-between">
        <h2 class="text-lg font-semibold">Add application</h2>
        <button id="closeModalBtn" class="rounded-lg border px-3 py-1 text-sm">
          Close
        </button>
      </div>

      <div class="mt-4 text-sm text-gray-600">
        <form id="applicationForm">

          <div class="mt-4">
            <label class="block text-sm font-medium mb-1">Company</label>
            <input type="text" id="companyInput" class="w-full rounded border px-3 py-2 text-sm" />
          </div>

          <div class="mt-4">
            <label class="block text-sm font-medium mb-1">Position</label>
            <input type="text" id="positionInput" class="w-full rounded border px-3 py-2 text-sm" />
          </div>

          <div class="mt-4">
            <label class="block text-sm font-medium mb-1">Status</label>
            <select id="statusInput" class="w-full rounded border px-3 py-2 text-sm">
              <option value="Applied">Applied</option>
              <option value="Interview">Interview</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          <div class="mt-4">
            <label class="block text-sm font-medium mb-1">Applied Date</label>
            <input type="date" id="dateInput" class="w-full rounded border px-3 py-2 text-sm" />
          </div>

          <div class="mt-4">
            <label class="block text-sm font-medium mb-1">Salary</label>
            <input type="number" id="salaryInput" class="w-full rounded border px-3 py-2 text-sm" />
          </div>

          <div class="mt-6 flex justify-end">
            <button type="submit" class="rounded bg-black px-4 py-2 text-white text-sm">
              Save application
            </button>
          </div>

        </form>
      </div>
    </div>
  </div>
  `;

  let applications = [];

  function addApplication(application) {
    applications.push(application);
    renderTable();
  }
  function renderTable() {
    const tableBody = rootEl.querySelector("#tableBody");
    if (applications.length === 0) {
      tableBody.innerHTML = `
      <tr>
        <td colspan="6" class="px-3 py-3 text-gray-500">
          No applications yet.
        </td>
      </tr>
      `;
      return;
    }

    let rowsHtml = "";
    applications.forEach(
      (app) =>
        (rowsHtml += `
      <tr>
        <td class="px-3 py-2">${app.company}</td>
        <td class="px-3 py-2">${app.position}</td>
        <td class="px-3 py-2">${app.status}</td>
        <td class="px-3 py-2">${app.appliedDate}</td>
        <td class="px-3 py-2">${app.salary ?? "-"}</td>
        <td class="px-3 py-2">...</td>
      </tr>
    `),
    );
    tableBody.innerHTML = rowsHtml;
  }

  addApplication({
    company: "Google",
    position: "Frontend Dev",
    status: "Applied",
    appliedDate: "2026-02-19",
    salary: 5000,
  });
  renderTable();

  const addBtn = rootEl.querySelector("#addBtn");
  const modalEl = rootEl.querySelector("#appModal");
  const closeModalBtn = rootEl.querySelector("#closeModalBtn");

  addBtn.addEventListener("click", () => {
    modalEl.classList.remove("hidden");
    modalEl.classList.add("flex");
  });

  closeModalBtn.addEventListener("click", () => {
    modalEl.classList.add("hidden");
    modalEl.classList.remove("flex");
  });

  // Optional: close modal when clicking on backdrop
  modalEl.addEventListener("click", (e) => {
    if (e.target === modalEl) {
      modalEl.classList.add("hidden");
      modalEl.classList.remove("flex");
    }
  });

  const form = rootEl.querySelector("#applicationForm");
  // console.log(form);

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

    const newApplication = {
      company: companyEl.value,
      position: positionEl.value,
      status: statusEl.value,
      appliedDate: appliedDateEl.value,
      salary: salaryEl.value === "" ? null : Number(salaryEl.value),
    };

    addApplication(newApplication);
    form.reset();
    modalEl.classList.add("hidden");
    modalEl.classList.remove("flex");
  });
}
