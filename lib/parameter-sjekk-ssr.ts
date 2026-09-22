import {
  buildCspHeader,
  fetchDecoratorHtml,
  fetchDecoratorReact,
  getDecoratorVersionId,
} from "@navikt/nav-dekoratoren-moduler/ssr";
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
    availableLanguagesTestCases.map(async (testCase): Promise<TestRad> => {
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
    }),
  );
}

const forenkletVisningTestCases = [
  {
    id: "simple",
    parameter: "simple",
    navn: "Forenklet Dekoratør",
    beskrivelse:
      "simple: true skal gi både forenklet header og forenklet footer i server-renderingen.",
    verdi: "simple: true",
    params: { simple: true },
    forventet: { header: true, footer: true },
  },
  {
    id: "simple-header",
    parameter: "simpleHeader",
    navn: "Forenklet header",
    beskrivelse:
      "simpleHeader: true skal gi forenklet header og vanlig footer.",
    verdi: "simpleHeader: true",
    params: { simpleHeader: true },
    forventet: { header: true, footer: true },
  },
  {
    id: "simple-footer",
    parameter: "simpleFooter",
    navn: "Forenklet footer",
    beskrivelse:
      "simpleFooter: true skal gi vanlig header og forenklet footer.",
    verdi: "simpleFooter: true",
    params: { simpleFooter: true },
    forventet: { header: true, footer: true },
  },
] as const;

export async function kjorSsrForenkletVisningTester(): Promise<TestRad[]> {
  return Promise.all(
    forenkletVisningTestCases.map(async (testCase): Promise<TestRad> => {
      try {
        const dekorator = await fetchDecoratorHtml({
          env: "dev",
          params: { ...decoratorParams, ...testCase.params },
        });
        const harHeader = dekorator.DECORATOR_HEADER.includes("<header");
        const harFooter = dekorator.DECORATOR_FOOTER.includes("<footer");
        const somForventet =
          harHeader === testCase.forventet.header &&
          harFooter === testCase.forventet.footer;

        return {
          id: `ssr-${testCase.parameter}-${testCase.id}`,
          parameter: testCase.parameter,
          testcase: testCase.navn,
          beskrivelse: testCase.beskrivelse,
          verdi: testCase.verdi,
          somForventet,
          feilmelding: somForventet
            ? undefined
            : `Forventet header=${testCase.forventet.header}, footer=${testCase.forventet.footer}; fikk header=${harHeader}, footer=${harFooter}`,
        };
      } catch (error) {
        return {
          id: `ssr-${testCase.parameter}-${testCase.id}`,
          parameter: testCase.parameter,
          testcase: testCase.navn,
          beskrivelse: testCase.beskrivelse,
          verdi: testCase.verdi,
          somForventet: false,
          feilmelding: error instanceof Error ? error.message : "Ukjent feil",
        };
      }
    }),
  );
}

export async function kjorSsrCspTester(): Promise<TestRad[]> {
  const appDirectives = {
    "default-src": ["'self'"],
    "connect-src": ["nav-dekoratoren-testapp.dev.nav.no"],
  };

  try {
    const cspHeader = await buildCspHeader(appDirectives, { env: "dev" });
    const inneholderAppensDirektiver =
      cspHeader.includes("default-src 'self'") &&
      cspHeader.includes("connect-src nav-dekoratoren-testapp.dev.nav.no");

    return [
      {
        id: "ssr-build-csp-header-app-direktiver",
        parameter: "buildCspHeader",
        testcase: "Appens CSP-direktiver",
        beskrivelse:
          "Dekoratørens CSP kan slås sammen med appens default-src og connect-src uten at appens direktiver forsvinner.",
        verdi:
          "default-src: 'self' | connect-src: nav-dekoratoren-testapp.dev.nav.no",
        somForventet: inneholderAppensDirektiver,
        feilmelding: inneholderAppensDirektiver
          ? undefined
          : `CSP-headeren mangler ett eller flere app-direktiver: ${cspHeader}`,
      },
    ];
  } catch (error) {
    return [
      {
        id: "ssr-build-csp-header-app-direktiver",
        parameter: "buildCspHeader",
        testcase: "Appens CSP-direktiver",
        beskrivelse:
          "Dekoratørens CSP kan slås sammen med appens default-src og connect-src uten at appens direktiver forsvinner.",
        verdi:
          "default-src: 'self' | connect-src: nav-dekoratoren-testapp.dev.nav.no",
        somForventet: false,
        feilmelding: error instanceof Error ? error.message : "Ukjent feil",
      },
    ];
  }
}

export async function kjorSsrDekoratorVersjonTester(): Promise<TestRad[]> {
  try {
    const versjonsId = await getDecoratorVersionId({ env: "dev" });

    return [
      {
        id: "ssr-decorator-version-id",
        parameter: "getDecoratorVersionId",
        testcase: "Gjeldende versjon",
        beskrivelse:
          "Dekoratøren returnerer en versjons-id som kan brukes til å oppdage oppdateringer og invalidere en eventuell HTML-cache.",
        verdi: versjonsId || "(tom versjons-id)",
        somForventet: versjonsId.length > 0,
        feilmelding:
          versjonsId.length > 0
            ? undefined
            : "Dekoratøren returnerte en tom versjons-id",
      },
    ];
  } catch (error) {
    return [
      {
        id: "ssr-decorator-version-id",
        parameter: "getDecoratorVersionId",
        testcase: "Gjeldende versjon",
        beskrivelse:
          "Dekoratøren returnerer en versjons-id som kan brukes til å oppdage oppdateringer og invalidere en eventuell HTML-cache.",
        verdi: "–",
        somForventet: false,
        feilmelding: error instanceof Error ? error.message : "Ukjent feil",
      },
    ];
  }
}
