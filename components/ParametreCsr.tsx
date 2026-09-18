"use client";

import {
  injectDecoratorClientSide,
  setBreadcrumbs,
} from "@navikt/nav-dekoratoren-moduler";
import { useEffect, useRef, useState } from "react";
import { decoratorParams } from "../lib/decorator-params";
import { breadcrumbTestCases } from "../lib/parameter-testcases";
import type { TestRad } from "../lib/test-rad";
import { TestTabell } from "./TestTabell";

function breadcrumbVerdi(
  testCase: (typeof breadcrumbTestCases)[number],
): string {
  if (testCase.breadcrumbs.length === 0) return "(tom liste)";
  return testCase.breadcrumbs.map((b) => `"${b.title}" → ${b.url}`).join(" | ");
}

export function ParametreCsr() {
  const [rader, setRader] = useState<TestRad[] | null>(null);
  const startet = useRef(false);

  useEffect(() => {
    if (startet.current) return;
    startet.current = true;

    void injectDecoratorClientSide({
      env: "dev",
      params: decoratorParams,
    }).then(async () => {
      const resultater = await Promise.all(
        breadcrumbTestCases.map(async (testCase): Promise<TestRad> => {
          const verdi = breadcrumbVerdi(testCase);
          try {
            await setBreadcrumbs(testCase.breadcrumbs);
            return {
              id: `csr-breadcrumbs-${testCase.id}`,
              parameter: "breadcrumbs",
              testcase: testCase.navn,
              verdi,
              somForventet: true,
            };
          } catch (error) {
            return {
              id: `csr-breadcrumbs-${testCase.id}`,
              parameter: "breadcrumbs",
              testcase: testCase.navn,
              verdi,
              somForventet: false,
              feilmelding:
                error instanceof Error ? error.message : "Ukjent feil",
            };
          }
        }),
      );
      setRader(resultater);

      await setBreadcrumbs([{ title: "Parametertester", url: "/parametre" }]);
    });
  }, []);

  if (!rader) return <p>⏳ Kjører CSR-tester …</p>;
  return <TestTabell rader={rader} />;
}
