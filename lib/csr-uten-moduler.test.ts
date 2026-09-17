import { describe, expect, it } from "vitest";
import { buildDirectCsrEnvironmentUrl } from "./csr-uten-moduler";

describe("CSR uten moduler URL", () => {
  it("includes the technical team name and encoded parameters", () => {
    const url = new URL(buildDirectCsrEnvironmentUrl());
    expect(url.searchParams.get("teamName")).toBe("navno.navno");
    expect(url.searchParams.get("context")).toBe("privatperson");
    expect(url.searchParams.get("origin")).toBe("nav-dekoratoren-testapp");
  });
});
