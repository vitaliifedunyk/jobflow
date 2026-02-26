function createCell(text) {
  const cell = document.createElement("td");
  cell.className = "px-3 py-2";
  cell.textContent = text;
  return cell;
}

function createActionButton(action, id, label) {
  const button = document.createElement("button");
  button.type = "button";
  button.className =
    "rounded-md border border-gray-200 px-2 py-1 text-xs font-medium hover:bg-gray-50 cursor-pointer";
  button.dataset.action = action;
  button.dataset.id = id;
  button.textContent = label;
  return button;
}

function renderEmptyState(tbodyEl) {
  const row = document.createElement("tr");
  const cell = document.createElement("td");
  cell.colSpan = 6;
  cell.className = "px-3 py-3 text-gray-500";
  cell.textContent = "No applications yet.";

  row.appendChild(cell);
  tbodyEl.appendChild(row);
}

export function renderTable(tbodyEl, applications) {
  tbodyEl.textContent = "";

  if (applications.length === 0) {
    renderEmptyState(tbodyEl);
    return;
  }

  applications.forEach((app) => {
    const row = document.createElement("tr");
    row.className = "border-t border-gray-100";

    row.appendChild(createCell(app.company));
    row.appendChild(createCell(app.position));
    row.appendChild(createCell(app.status));
    row.appendChild(createCell(app.appliedDate));
    row.appendChild(createCell(String(app.salary ?? "-")));

    const actionsCell = document.createElement("td");
    actionsCell.className = "px-3 py-2";

    const actionsWrap = document.createElement("div");
    actionsWrap.className = "flex gap-2";

    const editBtn = createActionButton("edit", app.id, "Edit");
    const deleteBtn = createActionButton("delete", app.id, "Delete");
    actionsWrap.append(editBtn, deleteBtn);

    actionsCell.appendChild(actionsWrap);
    row.appendChild(actionsCell);

    tbodyEl.appendChild(row);
  });
}

export function openModal(modalEl) {
  modalEl.classList.remove("hidden");
  modalEl.classList.add("flex");
}

export function closeModal(modalEl) {
  modalEl.classList.add("hidden");
  modalEl.classList.remove("flex");
}

export function fillForm(formEl, application) {
  formEl.querySelector("#companyInput").value = application.company;
  formEl.querySelector("#positionInput").value = application.position;
  formEl.querySelector("#statusInput").value = application.status;
  formEl.querySelector("#dateInput").value = application.appliedDate;
  formEl.querySelector("#salaryInput").value = application.salary ?? "";
}

export function resetForm(formEl) {
  formEl.reset();
}
