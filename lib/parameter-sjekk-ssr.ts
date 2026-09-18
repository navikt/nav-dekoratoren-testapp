import { fetchDecoratorReact } from "@navikt/nav-dekoratoren-moduler/ssr";
import { decoratorParams } from "./decorator-params";
import { breadcrumbTestCases } from "./parameter-testcases";
import type { TestRad } from "./test-rad";

function breadcrumbVerdi(testCase: (typeof breadcrumbTestCases)[number]): string {
  if (testCase.breadcrumbs.length === 0) return "(tom liste)";
  return testCase.breadcrumbs.map((b) => `"${b.title}" → ${b.url}`).join(" | ");
}

export async function kjorSsrBreadcrumbTester(): Promise<TestRad[]> {
  return Promise.all(
    breadcrumbTestCases.map(async (testCase): Promise<TestRad> => {
      const verdi = breadcrumbVerdi(testCase);
      try {
        await fetchDecoratorReact({
          env: "dev",
          params: { ...decoratorParams, breadcrumbs: testCase.breadcrumbs },
        });
        return {
          id: `ssr-breadcrumbs-${testCase.id}`,
          parameter: "breadcrumbs",
          testcase: testCase.navn,
          verdi,
          somForventet: true,
        };
      } catch (error) {
        return {
          id: `ssr-breadcrumbs-${testCase.id}`,
          parameter: "breadcrumbs",
          testcase: testCase.navn,
          verdi,
          somForventet: false,
          feilmelding: error instanceof Error ? error.message : "Ukjent feil",
        };
      }
    }),
  );
}
