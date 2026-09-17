import { describe, expect, it } from "vitest";
import { directSsrUrl } from "./direct-ssr";

describe("direct SSR configuration", () => {
  it("uses the service-discovery endpoint", () => {
    expect(directSsrUrl).toBe("http://nav-dekoratoren.personbruker/ssr");
  });
});
