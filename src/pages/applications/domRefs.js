export function getRefs(root) {
  const form = root.querySelector("#applicationForm");

  return {
    addBtn: root.querySelector("#addBtn"),
    modalEl: root.querySelector("#appModal"),
    modalTitle: root.querySelector("#modalTitle"),
    closeModalBtn: root.querySelector("#closeModalBtn"),
    tableBody: root.querySelector("#tableBody"),
    form,
    searchInput: root.querySelector("#searchInput"),
    statusFilter: root.querySelector("#statusFilter"),
    sortSelect: root.querySelector("#sortSelect"),
    exportBtn: root.querySelector("#exportBtn"),
    importInput: root.querySelector("#importInput"),
    companyInput: form.querySelector("#companyInput"),
    positionInput: form.querySelector("#positionInput"),
    statusInput: form.querySelector("#statusInput"),
    dateInput: form.querySelector("#dateInput"),
    salaryInput: form.querySelector("#salaryInput"),
  };
}
