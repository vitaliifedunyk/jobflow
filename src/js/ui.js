function get(id) {
  return document.getElementById(id);
}

function createCell(text) {
  const cell = document.createElement("td");
  cell.className = "px-3 py-2";
  cell.textContent = text;
  return cell;
}

export function renderTable(apps) {
  const tbody = get("tableBody");
  tbody.textContent = "";

  if (apps.length === 0) {
    const row = document.createElement("tr");
    const cell = document.createElement("td");
    cell.colSpan = 6;
    cell.className = "px-3 py-3 text-gray-500";
    cell.textContent = "No applications yet.";
    row.appendChild(cell);
    tbody.appendChild(row);
    return;
  }

  apps.forEach((app) => {
    const row = document.createElement("tr");
    row.className = "border-t border-gray-100";

    row.appendChild(createCell(app.company));
    row.appendChild(createCell(app.position));
    row.appendChild(createCell(app.status));
    row.appendChild(createCell(app.appliedDate));
    row.appendChild(createCell(String(app.salary ?? "-")));

    const actions = document.createElement("td");
    actions.className = "px-3 py-2";
    actions.innerHTML = `
      <div class="flex gap-2">
        <button
          type="button"
          data-action="edit"
          data-id="${app.id}"
          class="rounded-md border border-gray-200 px-2 py-1 text-xs font-medium hover:bg-gray-50 cursor-pointer"
        >Edit</button>
        <button
          type="button"
          data-action="delete"
          data-id="${app.id}"
          class="rounded-md border border-gray-200 px-2 py-1 text-xs font-medium hover:bg-gray-50 cursor-pointer"
        >Delete</button>
      </div>
    `;

    row.appendChild(actions);
    tbody.appendChild(row);
  });
}

export function fillForm(app) {
  get("companyInput").value = app.company ?? "";
  get("positionInput").value = app.position ?? "";
  get("statusInput").value = app.status ?? "Applied";
  get("dateInput").value = app.appliedDate ?? "";
  get("salaryInput").value = app.salary ?? "";
}

export function resetForm() {
  get("applicationForm").reset();
}

export function openModal(app) {
  const modal = get("appModal");
  const title = get("modalTitle");

  if (app) {
    title.textContent = "Edit application";
    fillForm(app);
  } else {
    title.textContent = "Add application";
    resetForm();
  }

  modal.classList.remove("hidden");
  modal.classList.add("flex");
}

export function closeModal() {
  const modal = get("appModal");
  modal.classList.add("hidden");
  modal.classList.remove("flex");
}
