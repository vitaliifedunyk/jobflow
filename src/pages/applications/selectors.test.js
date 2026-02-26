import { describe, expect, it } from "vitest";
import { getVisibleApplications } from "./selectors";

const applications = [
  {
    id: "1",
    company: "Acme",
    position: "Frontend",
    status: "Applied",
    appliedDate: "2026-02-01",
    salary: 5000,
  },
  {
    id: "2",
    company: "Beta",
    position: "Backend",
    status: "Interview",
    appliedDate: "2026-02-03",
    salary: null,
  },
  {
    id: "3",
    company: "Gamma",
    position: "Designer",
    status: "Applied",
    appliedDate: "2026-01-15",
    salary: 3000,
  },
];

describe("getVisibleApplications", () => {
  it("filters by search and status", () => {
    const result = getVisibleApplications(applications, {
      searchTerm: "ac",
      selectedStatus: "Applied",
      sortBy: "date_desc",
    });

    expect(result.map((item) => item.id)).toEqual(["1"]);
  });

  it("sorts by date descending", () => {
    const result = getVisibleApplications(applications, {
      searchTerm: "",
      selectedStatus: "",
      sortBy: "date_desc",
    });

    expect(result.map((item) => item.id)).toEqual(["2", "1", "3"]);
  });

  it("sorts by salary with null values last", () => {
    const asc = getVisibleApplications(applications, {
      searchTerm: "",
      selectedStatus: "",
      sortBy: "salary_asc",
    });
    const desc = getVisibleApplications(applications, {
      searchTerm: "",
      selectedStatus: "",
      sortBy: "salary_desc",
    });

    expect(asc.map((item) => item.id)).toEqual(["3", "1", "2"]);
    expect(desc.map((item) => item.id)).toEqual(["1", "3", "2"]);
  });
});
