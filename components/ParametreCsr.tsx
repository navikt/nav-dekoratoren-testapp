"use client";

import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
} from "@navikt/ds-react/Accordion";
import {
  injectDecoratorClientSide,
  setAvailableLanguages,
  setBreadcrumbs,
} from "@navikt/nav-dekoratoren-moduler";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { decoratorParams } from "../lib/decorator-params";
import {
  availableLanguagesTestCases,
  breadcrumbTestCases,
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
      setRader([...breadcrumbResultater, ...sprakResultater]);

      await setBreadcrumbs([{ title: "Parametertester", url: "/parametre" }]);
      await setAvailableLanguages([]);
    })();
  }, []);

  if (!rader) return <p>⏳ Kjører CSR-tester …</p>;
  return (
    <>
      <ParameterBolker rader={rader} />
      <Accordion>
        <AccordionItem>
          <AccordionHeader>setParams/getParams</AccordionHeader>
          <AccordionContent>
            <p>
              Denne funksjonen testes i en egen visning, der Dekoratøren
              initialiseres med <code>simple: true</code> og verdien leses
              tilbake med <code>getParams()</code>.
            </p>
            <Link href="/parametre/simple">
              Åpne testen for simple: true
            </Link>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
}
