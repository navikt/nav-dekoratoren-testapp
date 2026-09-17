import { describe, expect, it } from "vitest";
import { buildDirectCsrEnvironmentUrl } from "./csr-uten-moduler";

describe("CSR uten moduler URL", () => {
  it("includes encoded parameters but no teamName (Origin-header identifiserer automatisk)", () => {
    const url = new URL(buildDirectCsrEnvironmentUrl());
    expect(url.searchParams.get("teamName")).toBeNull();
    expect(url.searchParams.get("context")).toBe("privatperson");
    expect(url.searchParams.get("origin")).toBe("nav-dekoratoren-testapp");
  });
});
