import { fetchDecoratorReact } from "@navikt/nav-dekoratoren-moduler/ssr";
import { decoratorParams } from "./decorator-params";
import {
  availableLanguagesTestCases,
  breadcrumbTestCases,
} from "./parameter-testcases";
import type { TestRad } from "./test-rad";

function breadcrumbVerdi(
  testCase: (typeof breadcrumbTestCases)[number],
): string {
  if (testCase.breadcrumbs.length === 0) return "(tom liste)";
  return testCase.breadcrumbs.map((b) => `"${b.title}" → ${b.url}`).join(" | ");
}

function sprakVerdi(
  testCase: (typeof availableLanguagesTestCases)[number],
): string {
  if (testCase.availableLanguages.length === 0) return "(tom liste)";
  return testCase.availableLanguages
    .map((sprak) => `${sprak.locale} → ${sprak.url}`)
    .join(" | ");
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
          beskrivelse: testCase.beskrivelse,
          verdi,
          somForventet: true,
        };
      } catch (error) {
        return {
          id: `ssr-breadcrumbs-${testCase.id}`,
          parameter: "breadcrumbs",
          testcase: testCase.navn,
          beskrivelse: testCase.beskrivelse,
          verdi,
          somForventet: false,
          feilmelding: error instanceof Error ? error.message : "Ukjent feil",
        };
      }
    }),
  );
}

export async function kjorSsrAvailableLanguagesTester(): Promise<TestRad[]> {
  return Promise.all(
    availableLanguagesTestCases.map(
      async (testCase): Promise<TestRad> => {
        const verdi = sprakVerdi(testCase);
        try {
          await fetchDecoratorReact({
            env: "dev",
            params: {
              ...decoratorParams,
              availableLanguages: testCase.availableLanguages,
            },
          });
          return {
            id: `ssr-available-languages-${testCase.id}`,
            parameter: "availableLanguages",
            testcase: testCase.navn,
            beskrivelse: testCase.beskrivelse,
            verdi,
            somForventet: true,
          };
        } catch (error) {
          return {
            id: `ssr-available-languages-${testCase.id}`,
            parameter: "availableLanguages",
            testcase: testCase.navn,
            beskrivelse: testCase.beskrivelse,
            verdi,
            somForventet: false,
            feilmelding: error instanceof Error ? error.message : "Ukjent feil",
          };
        }
      },
    ),
  );
}
