"use client";

import {
  getParams,
  injectDecoratorClientSide,
  setAvailableLanguages,
  setBreadcrumbs,
  setParams,
} from "@navikt/nav-dekoratoren-moduler";
import { useEffect, useRef, useState } from "react";
import { decoratorParams } from "../lib/decorator-params";
import {
  availableLanguagesTestCases,
  breadcrumbTestCases,
  chatbotTestCases,
  contextTestCases,
  logoutWarningTestCases,
  redirectToAppTestCases,
  redirectToUrlTestCases,
  redirectToUrlLogoutTestCases,
  shareScreenTestCases,
} from "../lib/parameter-testcases";
import type { TestRad } from "../lib/test-rad";
import { ParameterBolker } from "./ParameterBolker";

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

export function ParametreCsr() {
  const [rader, setRader] = useState<TestRad[] | null>(null);
  const startet = useRef(false);

  useEffect(() => {
    if (startet.current) return;
    startet.current = true;

    void (async () => {
      try {
        await injectDecoratorClientSide({
          env: "dev",
          params: decoratorParams,
        });
      } catch (error) {
        setRader([
          {
            id: "csr-initialisering",
            parameter: "Dekoratøren",
            testcase: "Initialisering",
            beskrivelse:
              "Dekoratøren kan lastes i nettleseren før de øvrige CSR-testene kjøres.",
            verdi: "–",
            somForventet: false,
            feilmelding: `Kunne ikke laste Dekoratøren: ${
              error instanceof Error ? error.message : "Ukjent feil"
            }`,
          },
        ]);
        return;
      }

      const breadcrumbResultater = await Promise.all(
        breadcrumbTestCases.map(async (testCase): Promise<TestRad> => {
          const verdi = breadcrumbVerdi(testCase);
          try {
            await setBreadcrumbs(testCase.breadcrumbs);
            return {
              id: `csr-breadcrumbs-${testCase.id}`,
              parameter: "breadcrumbs",
              testcase: testCase.navn,
              beskrivelse: testCase.beskrivelse,
              verdi,
              somForventet: true,
            };
          } catch (error) {
            return {
              id: `csr-breadcrumbs-${testCase.id}`,
              parameter: "breadcrumbs",
              testcase: testCase.navn,
              beskrivelse: testCase.beskrivelse,
              verdi,
              somForventet: false,
              feilmelding:
                error instanceof Error ? error.message : "Ukjent feil",
            };
          }
        }),
      );
      const sprakResultater = await Promise.all(
        availableLanguagesTestCases.map(async (testCase): Promise<TestRad> => {
          const verdi = sprakVerdi(testCase);
          try {
            await setAvailableLanguages(testCase.availableLanguages);
            return {
              id: `csr-available-languages-${testCase.id}`,
              parameter: "availableLanguages",
              testcase: testCase.navn,
              beskrivelse: testCase.beskrivelse,
              verdi,
              somForventet: true,
            };
          } catch (error) {
            return {
              id: `csr-available-languages-${testCase.id}`,
              parameter: "availableLanguages",
              testcase: testCase.navn,
              beskrivelse: testCase.beskrivelse,
              verdi,
              somForventet: false,
              feilmelding:
                error instanceof Error ? error.message : "Ukjent feil",
            };
          }
        }),
      );
      const contextResultater: TestRad[] = [];
      for (const testCase of contextTestCases) {
        try {
          await setParams({ context: testCase.context });
          await ventPaContext(testCase.context);
          contextResultater.push({
            id: `csr-context-${testCase.id}`,
            parameter: "context",
            testcase: testCase.navn,
            beskrivelse: testCase.beskrivelse,
            verdi: testCase.context,
            somForventet: true,
          });
        } catch (error) {
          contextResultater.push({
            id: `csr-context-${testCase.id}`,
            parameter: "context",
            testcase: testCase.navn,
            beskrivelse: testCase.beskrivelse,
            verdi: testCase.context,
            somForventet: false,
            feilmelding: error instanceof Error ? error.message : "Ukjent feil",
          });
        }
      }
      const chatbotResultater: TestRad[] = [];
      for (const testCase of chatbotTestCases) {
        try {
          await setParams({ chatbot: testCase.chatbot });
          await ventPaParameter("chatbot", testCase.chatbot);
          chatbotResultater.push({
            id: `csr-chatbot-${testCase.id}`,
            parameter: "chatbot",
            testcase: testCase.navn,
            beskrivelse: testCase.beskrivelse,
            verdi: String(testCase.chatbot),
            somForventet: true,
          });
        } catch (error) {
          chatbotResultater.push({
            id: `csr-chatbot-${testCase.id}`,
            parameter: "chatbot",
            testcase: testCase.navn,
            beskrivelse: testCase.beskrivelse,
            verdi: String(testCase.chatbot),
            somForventet: false,
            feilmelding: error instanceof Error ? error.message : "Ukjent feil",
          });
        }
      }
      const logoutWarningResultater: TestRad[] = [];
      for (const testCase of logoutWarningTestCases) {
        try {
          await setParams({ logoutWarning: testCase.logoutWarning });
          await ventPaParameter("logoutWarning", testCase.logoutWarning);
          logoutWarningResultater.push({
            id: `csr-logout-warning-${testCase.id}`,
            parameter: "logoutWarning",
            testcase: testCase.navn,
            beskrivelse: testCase.beskrivelse,
            verdi: String(testCase.logoutWarning),
            somForventet: true,
          });
        } catch (error) {
          logoutWarningResultater.push({
            id: `csr-logout-warning-${testCase.id}`,
            parameter: "logoutWarning",
            testcase: testCase.navn,
            beskrivelse: testCase.beskrivelse,
            verdi: String(testCase.logoutWarning),
            somForventet: false,
            feilmelding: error instanceof Error ? error.message : "Ukjent feil",
          });
        }
      }
      const shareScreenResultater: TestRad[] = [];
      for (const testCase of shareScreenTestCases) {
        try {
          await setParams({ shareScreen: testCase.shareScreen });
          await ventPaParameter("shareScreen", testCase.shareScreen);
          shareScreenResultater.push({
            id: `csr-share-screen-${testCase.id}`,
            parameter: "shareScreen",
            testcase: testCase.navn,
            beskrivelse: testCase.beskrivelse,
            verdi: String(testCase.shareScreen),
            somForventet: true,
          });
        } catch (error) {
          shareScreenResultater.push({
            id: `csr-share-screen-${testCase.id}`,
            parameter: "shareScreen",
            testcase: testCase.navn,
            beskrivelse: testCase.beskrivelse,
            verdi: String(testCase.shareScreen),
            somForventet: false,
            feilmelding: error instanceof Error ? error.message : "Ukjent feil",
          });
        }
      }
      const redirectToAppResultater: TestRad[] = [];
      for (const testCase of redirectToAppTestCases) {
        try {
          await setParams({ redirectToApp: testCase.redirectToApp });
          await ventPaParameter("redirectToApp", testCase.redirectToApp);
          redirectToAppResultater.push({
            id: `csr-redirect-to-app-${testCase.id}`,
            parameter: "redirectToApp",
            testcase: testCase.navn,
            beskrivelse: testCase.beskrivelse,
            verdi: String(testCase.redirectToApp),
            somForventet: true,
          });
        } catch (error) {
          redirectToAppResultater.push({
            id: `csr-redirect-to-app-${testCase.id}`,
            parameter: "redirectToApp",
            testcase: testCase.navn,
            beskrivelse: testCase.beskrivelse,
            verdi: String(testCase.redirectToApp),
            somForventet: false,
            feilmelding: error instanceof Error ? error.message : "Ukjent feil",
          });
        }
      }
      const redirectToUrlResultater: TestRad[] = [];
      for (const testCase of redirectToUrlTestCases) {
        try {
          await setParams({ redirectToUrl: testCase.redirectToUrl });
          await ventPaParameter("redirectToUrl", testCase.redirectToUrl);
          redirectToUrlResultater.push({
            id: `csr-redirect-to-url-${testCase.id}`,
            parameter: "redirectToUrl",
            testcase: testCase.navn,
            beskrivelse: testCase.beskrivelse,
            verdi: testCase.redirectToUrl,
            somForventet: true,
          });
        } catch (error) {
          redirectToUrlResultater.push({
            id: `csr-redirect-to-url-${testCase.id}`,
            parameter: "redirectToUrl",
            testcase: testCase.navn,
            beskrivelse: testCase.beskrivelse,
            verdi: testCase.redirectToUrl,
            somForventet: false,
            feilmelding: error instanceof Error ? error.message : "Ukjent feil",
          });
        }
      }
      const redirectToUrlLogoutResultater: TestRad[] = [];
      for (const testCase of redirectToUrlLogoutTestCases) {
        try {
          await setParams({
            redirectToUrlLogout: testCase.redirectToUrlLogout,
          });
          await ventPaParameter(
            "redirectToUrlLogout",
            testCase.redirectToUrlLogout,
          );
          redirectToUrlLogoutResultater.push({
            id: `csr-redirect-to-url-logout-${testCase.id}`,
            parameter: "redirectToUrlLogout",
            testcase: testCase.navn,
            beskrivelse: testCase.beskrivelse,
            verdi: testCase.redirectToUrlLogout,
            somForventet: true,
          });
        } catch (error) {
          redirectToUrlLogoutResultater.push({
            id: `csr-redirect-to-url-logout-${testCase.id}`,
            parameter: "redirectToUrlLogout",
            testcase: testCase.navn,
            beskrivelse: testCase.beskrivelse,
            verdi: testCase.redirectToUrlLogout,
            somForventet: false,
            feilmelding: error instanceof Error ? error.message : "Ukjent feil",
          });
        }
      }
      setRader([
        ...breadcrumbResultater,
        ...sprakResultater,
        ...contextResultater,
        ...chatbotResultater,
        ...logoutWarningResultater,
        ...shareScreenResultater,
        ...redirectToAppResultater,
        ...redirectToUrlResultater,
        ...redirectToUrlLogoutResultater,
      ]);

      await setBreadcrumbs([{ title: "Parametertester", url: "/parametre" }]);
      await setAvailableLanguages([]);
      await setParams({ context: "privatperson" });
      await setParams({ chatbot: true });
      await setParams({ logoutWarning: true });
      await setParams({ shareScreen: true });
      await setParams({ redirectToApp: false });
    })();
  }, []);

  if (!rader) return <p>⏳ Kjører CSR-tester …</p>;
  return (
    <ParameterBolker
      rader={rader}
      ekstraBolker={[
        {
          id: "forenklede-visninger",
          tittel: "Forenklede visninger (simple)",
          innhold: (
            <>
            <p>
              Disse parameterne testes i egne visninger fordi de endrer hvilke
              deler av Dekoratøren som rendres.
            </p>
            <p>
              <a href="/parametre/simple-header">
                Åpne testen for simpleHeader: true
              </a>
            </p>
            <p>
              <a href="/parametre/simple-footer">
                Åpne testen for simpleFooter: true
              </a>
            </p>
            </>
          ),
        },
        {
          id: "set-params-get-params",
          tittel: "setParams/getParams",
          innhold: (
            <>
            <p>
              Denne funksjonen testes i en egen visning, der Dekoratøren
              initialiseres med <code>simple: true</code> og verdien leses
              tilbake med <code>getParams()</code>.
            </p>
            <a href="/parametre/simple">Åpne testen for simple: true</a>
            </>
          ),
        },
      ]}
    />
  );
}

async function ventPaContext(
  forventetContext: (typeof contextTestCases)[number]["context"],
) {
  return ventPaParameter("context", forventetContext);
}

async function ventPaParameter(
  parameter:
    | "context"
    | "chatbot"
    | "logoutWarning"
    | "shareScreen"
    | "redirectToApp"
    | "redirectToUrl"
    | "redirectToUrlLogout",
  forventetVerdi: string | boolean,
) {
  const deadline = Date.now() + 10_000;
  while (Date.now() < deadline) {
    const params = await getParams();

    if (params?.[parameter] === forventetVerdi) return;
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  throw new Error(
    `CSR_${parameter.toUpperCase()}_NOT_SET: ${String(forventetVerdi)}`,
  );
}
