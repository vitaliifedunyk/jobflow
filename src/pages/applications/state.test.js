import { describe, expect, it } from "vitest";
import { normalizeApplication } from "./state";

describe("normalizeApplication", () => {
  it("normalizes basic string and numeric fields", () => {
    const result = normalizeApplication({
      id: "app-1",
      company: "Acme",
      position: "Frontend Dev",
      status: "Interview",
      appliedDate: "2026-02-20",
      salary: "5000",
      createdAt: "100",
      updatedAt: "200",
    });

    expect(result).toEqual({
      id: "app-1",
      company: "Acme",
      position: "Frontend Dev",
      status: "Interview",
      appliedDate: "2026-02-20",
      salary: 5000,
      createdAt: 100,
      updatedAt: 200,
    });
  });

  it("falls back to defaults for invalid values", () => {
    const result = normalizeApplication({
      id: "app-2",
      company: null,
      position: undefined,
      status: "Unknown",
      appliedDate: null,
      salary: "",
      createdAt: null,
      updatedAt: undefined,
    });

    expect(result.id).toBe("app-2");
    expect(result.company).toBe("");
    expect(result.position).toBe("");
    expect(result.status).toBe("Applied");
    expect(result.appliedDate).toBe("");
    expect(result.salary).toBeNull();
    expect(typeof result.createdAt).toBe("number");
    expect(typeof result.updatedAt).toBe("number");
  });
});
