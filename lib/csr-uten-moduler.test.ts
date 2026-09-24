import { afterEach, describe, expect, it, vi } from "vitest";

describe("CSR uten moduler URL", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetModules();
  });

  it("includes encoded parameters but no teamName (Origin-header identifiserer automatisk)", async () => {
    const { buildDirectCsrEnvironmentUrl } = await import("./csr-uten-moduler");
    const url = new URL(buildDirectCsrEnvironmentUrl());
    expect(url.searchParams.get("teamName")).toBeNull();
    expect(url.searchParams.get("context")).toBe("privatperson");
    expect(url.searchParams.get("origin")).toBe("nav-dekoratoren-testapp");
  });

  it("preserves the Dekoratøren path prefix in prod", async () => {
    vi.stubEnv("DECORATOR_ENV", "prod");
    const { buildDirectCsrEnvironmentUrl } = await import("./csr-uten-moduler");
    expect(buildDirectCsrEnvironmentUrl()).toContain(
      "https://www.nav.no/dekoratoren/env?",
    );
  });
});
