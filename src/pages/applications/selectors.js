function compareSalaryWithNullLast(a, b, direction) {
  const aIsNull = a.salary === null || a.salary === undefined;
  const bIsNull = b.salary === null || b.salary === undefined;

  if (aIsNull && bIsNull) return 0;
  if (aIsNull) return 1;
  if (bIsNull) return -1;

  return direction === "desc" ? b.salary - a.salary : a.salary - b.salary;
}

export function getVisibleApplications(
  apps,
  { searchTerm, selectedStatus, sortBy },
) {
  const query = searchTerm.toLowerCase();

  const filtered = apps.filter((app) => {
    const matchesSearch =
      app.company.toLowerCase().includes(query) ||
      app.position.toLowerCase().includes(query);
    const matchesStatus =
      selectedStatus === "" || app.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  const sorted = [...filtered];
  sorted.sort((a, b) => {
    if (sortBy === "date_desc") {
      return b.appliedDate.localeCompare(a.appliedDate);
    }

    if (sortBy === "date_asc") {
      return a.appliedDate.localeCompare(b.appliedDate);
    }

    if (sortBy === "salary_desc") {
      return compareSalaryWithNullLast(a, b, "desc");
    }

    if (sortBy === "salary_asc") {
      return compareSalaryWithNullLast(a, b, "asc");
    }

    return 0;
  });

  return sorted;
}
