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
  chatbotTestCases,
  chatbotVisibleTestCases,
  contextTestCases,
  feedbackTestCases,
  languageTestCases,
  logoutUrlTestCases,
  logoutWarningTestCases,
  originTestCases,
  redirectOnUserChangeTestCases,
  redirectToAppTestCases,
  redirectToUrlTestCases,
  redirectToUrlLogoutTestCases,
  shareScreenTestCases,
  utilsBackgroundTestCases,
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

export async function kjorSsrChatbotTester(): Promise<TestRad[]> {
  return Promise.all(
    chatbotTestCases.map(async (testCase): Promise<TestRad> => {
      try {
        await fetchDecoratorReact({
          env: "dev",
          params: { ...decoratorParams, chatbot: testCase.chatbot },
        });
        return {
          id: `ssr-chatbot-${testCase.id}`,
          parameter: "chatbot",
          testcase: testCase.navn,
          beskrivelse: testCase.beskrivelse,
          verdi: String(testCase.chatbot),
          somForventet: true,
        };
      } catch (error) {
        return {
          id: `ssr-chatbot-${testCase.id}`,
          parameter: "chatbot",
          testcase: testCase.navn,
          beskrivelse: testCase.beskrivelse,
          verdi: String(testCase.chatbot),
          somForventet: false,
          feilmelding: error instanceof Error ? error.message : "Ukjent feil",
        };
      }
    }),
  );
}

export async function kjorSsrChatbotVisibleTester(): Promise<TestRad[]> {
  return Promise.all(
    chatbotVisibleTestCases.map(async (testCase): Promise<TestRad> => {
      try {
        await fetchDecoratorReact({
          env: "dev",
          params: {
            ...decoratorParams,
            chatbotVisible: testCase.chatbotVisible,
          },
        });
        return {
          id: `ssr-chatbot-visible-${testCase.id}`,
          parameter: "chatbotVisible",
          testcase: testCase.navn,
          beskrivelse: testCase.beskrivelse,
          verdi: String(testCase.chatbotVisible),
          somForventet: true,
        };
      } catch (error) {
        return {
          id: `ssr-chatbot-visible-${testCase.id}`,
          parameter: "chatbotVisible",
          testcase: testCase.navn,
          beskrivelse: testCase.beskrivelse,
          verdi: String(testCase.chatbotVisible),
          somForventet: false,
          feilmelding: error instanceof Error ? error.message : "Ukjent feil",
        };
      }
    }),
  );
}

export async function kjorSsrFeedbackTester(): Promise<TestRad[]> {
  return Promise.all(
    feedbackTestCases.map(async (testCase): Promise<TestRad> => {
      try {
        await fetchDecoratorReact({
          env: "dev",
          params: { ...decoratorParams, feedback: testCase.feedback },
        });
        return {
          id: `ssr-feedback-${testCase.id}`,
          parameter: "feedback",
          testcase: testCase.navn,
          beskrivelse: testCase.beskrivelse,
          verdi: String(testCase.feedback),
          somForventet: true,
        };
      } catch (error) {
        return {
          id: `ssr-feedback-${testCase.id}`,
          parameter: "feedback",
          testcase: testCase.navn,
          beskrivelse: testCase.beskrivelse,
          verdi: String(testCase.feedback),
          somForventet: false,
          feilmelding: error instanceof Error ? error.message : "Ukjent feil",
        };
      }
    }),
  );
}

export async function kjorSsrLanguageTester(): Promise<TestRad[]> {
  return Promise.all(
    languageTestCases.map(async (testCase): Promise<TestRad> => {
      try {
        await fetchDecoratorReact({
          env: "dev",
          params: { ...decoratorParams, language: testCase.language },
        });
        return {
          id: `ssr-language-${testCase.id}`,
          parameter: "language",
          testcase: testCase.navn,
          beskrivelse: testCase.beskrivelse,
          verdi: testCase.language,
          somForventet: true,
        };
      } catch (error) {
        return {
          id: `ssr-language-${testCase.id}`,
          parameter: "language",
          testcase: testCase.navn,
          beskrivelse: testCase.beskrivelse,
          verdi: testCase.language,
          somForventet: false,
          feilmelding: error instanceof Error ? error.message : "Ukjent feil",
        };
      }
    }),
  );
}

export async function kjorSsrLogoutUrlTester(): Promise<TestRad[]> {
  return Promise.all(
    logoutUrlTestCases.map(async (testCase): Promise<TestRad> => {
      try {
        await fetchDecoratorReact({
          env: "dev",
          params: { ...decoratorParams, logoutUrl: testCase.logoutUrl },
        });
        return {
          id: `ssr-logout-url-${testCase.id}`,
          parameter: "logoutUrl",
          testcase: testCase.navn,
          beskrivelse: testCase.beskrivelse,
          verdi: testCase.logoutUrl,
          somForventet: true,
        };
      } catch (error) {
        return {
          id: `ssr-logout-url-${testCase.id}`,
          parameter: "logoutUrl",
          testcase: testCase.navn,
          beskrivelse: testCase.beskrivelse,
          verdi: testCase.logoutUrl,
          somForventet: false,
          feilmelding: error instanceof Error ? error.message : "Ukjent feil",
        };
      }
    }),
  );
}

export async function kjorSsrLogoutWarningTester(): Promise<TestRad[]> {
  return Promise.all(
    logoutWarningTestCases.map(async (testCase): Promise<TestRad> => {
      try {
        await fetchDecoratorReact({
          env: "dev",
          params: {
            ...decoratorParams,
            logoutWarning: testCase.logoutWarning,
          },
        });
        return {
          id: `ssr-logout-warning-${testCase.id}`,
          parameter: "logoutWarning",
          testcase: testCase.navn,
          beskrivelse: testCase.beskrivelse,
          verdi: String(testCase.logoutWarning),
          somForventet: true,
        };
      } catch (error) {
        return {
          id: `ssr-logout-warning-${testCase.id}`,
          parameter: "logoutWarning",
          testcase: testCase.navn,
          beskrivelse: testCase.beskrivelse,
          verdi: String(testCase.logoutWarning),
          somForventet: false,
          feilmelding: error instanceof Error ? error.message : "Ukjent feil",
        };
      }
    }),
  );
}

export async function kjorSsrShareScreenTester(): Promise<TestRad[]> {
  return Promise.all(
    shareScreenTestCases.map(async (testCase): Promise<TestRad> => {
      try {
        await fetchDecoratorReact({
          env: "dev",
          params: {
            ...decoratorParams,
            shareScreen: testCase.shareScreen,
          },
        });
        return {
          id: `ssr-share-screen-${testCase.id}`,
          parameter: "shareScreen",
          testcase: testCase.navn,
          beskrivelse: testCase.beskrivelse,
          verdi: String(testCase.shareScreen),
          somForventet: true,
        };
      } catch (error) {
        return {
          id: `ssr-share-screen-${testCase.id}`,
          parameter: "shareScreen",
          testcase: testCase.navn,
          beskrivelse: testCase.beskrivelse,
          verdi: String(testCase.shareScreen),
          somForventet: false,
          feilmelding: error instanceof Error ? error.message : "Ukjent feil",
        };
      }
    }),
  );
}

export async function kjorSsrUtilsBackgroundTester(): Promise<TestRad[]> {
  return Promise.all(
    utilsBackgroundTestCases.map(async (testCase): Promise<TestRad> => {
      try {
        await fetchDecoratorReact({
          env: "dev",
          params: {
            ...decoratorParams,
            utilsBackground: testCase.utilsBackground,
          },
        });
        return {
          id: `ssr-utils-background-${testCase.id}`,
          parameter: "utilsBackground",
          testcase: testCase.navn,
          beskrivelse: testCase.beskrivelse,
          verdi: testCase.utilsBackground,
          somForventet: true,
        };
      } catch (error) {
        return {
          id: `ssr-utils-background-${testCase.id}`,
          parameter: "utilsBackground",
          testcase: testCase.navn,
          beskrivelse: testCase.beskrivelse,
          verdi: testCase.utilsBackground,
          somForventet: false,
          feilmelding: error instanceof Error ? error.message : "Ukjent feil",
        };
      }
    }),
  );
}

export async function kjorSsrContextTester(): Promise<TestRad[]> {
  return Promise.all(
    contextTestCases.map(
      async (testCase: {
        context: any;
        id: any;
        navn: any;
        beskrivelse: any;
      }): Promise<TestRad> => {
        try {
          await fetchDecoratorReact({
            env: "dev",
            params: { ...decoratorParams, context: testCase.context },
          });
          return {
            id: `ssr-context-${testCase.id}`,
            parameter: "context",
            testcase: testCase.navn,
            beskrivelse: testCase.beskrivelse,
            verdi: testCase.context,
            somForventet: true,
          };
        } catch (error) {
          return {
            id: `ssr-context-${testCase.id}`,
            parameter: "context",
            testcase: testCase.navn,
            beskrivelse: testCase.beskrivelse,
            verdi: testCase.context,
            somForventet: false,
            feilmelding: error instanceof Error ? error.message : "Ukjent feil",
          };
        }
      },
    ),
  );
}

export async function kjorSsrOriginTester(): Promise<TestRad[]> {
  return Promise.all(
    originTestCases.map(async (testCase): Promise<TestRad> => {
      try {
        await fetchDecoratorReact({
          env: "dev",
          params: { ...decoratorParams, origin: testCase.origin },
        });
        return {
          id: `ssr-origin-${testCase.id}`,
          parameter: "origin",
          testcase: testCase.navn,
          beskrivelse: testCase.beskrivelse,
          verdi: testCase.origin,
          somForventet: true,
        };
      } catch (error) {
        return {
          id: `ssr-origin-${testCase.id}`,
          parameter: "origin",
          testcase: testCase.navn,
          beskrivelse: testCase.beskrivelse,
          verdi: testCase.origin,
          somForventet: false,
          feilmelding: error instanceof Error ? error.message : "Ukjent feil",
        };
      }
    }),
  );
}

export async function kjorSsrRedirectOnUserChangeTester(): Promise<
  TestRad[]
> {
  return Promise.all(
    redirectOnUserChangeTestCases.map(async (testCase): Promise<TestRad> => {
      try {
        await fetchDecoratorReact({
          env: "dev",
          params: {
            ...decoratorParams,
            redirectOnUserChange: testCase.redirectOnUserChange,
          },
        });
        return {
          id: `ssr-redirect-on-user-change-${testCase.id}`,
          parameter: "redirectOnUserChange",
          testcase: testCase.navn,
          beskrivelse: testCase.beskrivelse,
          verdi: String(testCase.redirectOnUserChange),
          somForventet: true,
        };
      } catch (error) {
        return {
          id: `ssr-redirect-on-user-change-${testCase.id}`,
          parameter: "redirectOnUserChange",
          testcase: testCase.navn,
          beskrivelse: testCase.beskrivelse,
          verdi: String(testCase.redirectOnUserChange),
          somForventet: false,
          feilmelding: error instanceof Error ? error.message : "Ukjent feil",
        };
      }
    }),
  );
}

export async function kjorSsrRedirectToAppTester(): Promise<TestRad[]> {
  return Promise.all(
    redirectToAppTestCases.map(async (testCase): Promise<TestRad> => {
      try {
        await fetchDecoratorReact({
          env: "dev",
          params: {
            ...decoratorParams,
            redirectToApp: testCase.redirectToApp,
          },
        });
        return {
          id: `ssr-redirect-to-app-${testCase.id}`,
          parameter: "redirectToApp",
          testcase: testCase.navn,
          beskrivelse: testCase.beskrivelse,
          verdi: String(testCase.redirectToApp),
          somForventet: true,
        };
      } catch (error) {
        return {
          id: `ssr-redirect-to-app-${testCase.id}`,
          parameter: "redirectToApp",
          testcase: testCase.navn,
          beskrivelse: testCase.beskrivelse,
          verdi: String(testCase.redirectToApp),
          somForventet: false,
          feilmelding: error instanceof Error ? error.message : "Ukjent feil",
        };
      }
    }),
  );
}

export async function kjorSsrRedirectToUrlTester(): Promise<TestRad[]> {
  return Promise.all(
    redirectToUrlTestCases.map(async (testCase): Promise<TestRad> => {
      try {
        await fetchDecoratorReact({
          env: "dev",
          params: {
            ...decoratorParams,
            redirectToUrl: testCase.redirectToUrl,
          },
        });
        return {
          id: `ssr-redirect-to-url-${testCase.id}`,
          parameter: "redirectToUrl",
          testcase: testCase.navn,
          beskrivelse: testCase.beskrivelse,
          verdi: testCase.redirectToUrl,
          somForventet: true,
        };
      } catch (error) {
        return {
          id: `ssr-redirect-to-url-${testCase.id}`,
          parameter: "redirectToUrl",
          testcase: testCase.navn,
          beskrivelse: testCase.beskrivelse,
          verdi: testCase.redirectToUrl,
          somForventet: false,
          feilmelding: error instanceof Error ? error.message : "Ukjent feil",
        };
      }
    }),
  );
}

export async function kjorSsrRedirectToUrlLogoutTester(): Promise<TestRad[]> {
  return Promise.all(
    redirectToUrlLogoutTestCases.map(async (testCase): Promise<TestRad> => {
      try {
        await fetchDecoratorReact({
          env: "dev",
          params: {
            ...decoratorParams,
            redirectToUrlLogout: testCase.redirectToUrlLogout,
          },
        });
        return {
          id: `ssr-redirect-to-url-logout-${testCase.id}`,
          parameter: "redirectToUrlLogout",
          testcase: testCase.navn,
          beskrivelse: testCase.beskrivelse,
          verdi: testCase.redirectToUrlLogout,
          somForventet: true,
        };
      } catch (error) {
        return {
          id: `ssr-redirect-to-url-logout-${testCase.id}`,
          parameter: "redirectToUrlLogout",
          testcase: testCase.navn,
          beskrivelse: testCase.beskrivelse,
          verdi: testCase.redirectToUrlLogout,
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
