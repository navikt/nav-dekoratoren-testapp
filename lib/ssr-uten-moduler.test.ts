import { afterEach, describe, expect, it, vi } from "vitest";

describe("SSR uten moduler configuration", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetModules();
  });

  it("uses the service-discovery endpoint when running in Nais dev-gcp", async () => {
    vi.stubEnv("NAIS_CLUSTER_NAME", "dev-gcp");
    const { ssrUtenModulerUrl } = await import("./ssr-uten-moduler");
    expect(ssrUtenModulerUrl).toBe("http://nav-dekoratoren.personbruker/ssr");
  });

  it("falls back to the public dev-ingress when not running in Nais (e.g. localhost)", async () => {
    vi.stubEnv("NAIS_CLUSTER_NAME", "");
    const { ssrUtenModulerUrl } = await import("./ssr-uten-moduler");
    expect(ssrUtenModulerUrl).toBe("https://dekoratoren.ekstern.dev.nav.no/ssr");
  });
});
