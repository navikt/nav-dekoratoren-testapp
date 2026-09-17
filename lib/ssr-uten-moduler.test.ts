import { describe, expect, it } from "vitest";
import { ssrUtenModulerUrl } from "./ssr-uten-moduler";

describe("SSR uten moduler configuration", () => {
  it("uses the service-discovery endpoint", () => {
    expect(ssrUtenModulerUrl).toBe("http://nav-dekoratoren.personbruker/ssr");
  });
});
