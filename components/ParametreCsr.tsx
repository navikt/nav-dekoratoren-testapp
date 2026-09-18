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
  breadcrumbTestCases,
  sprakTestCases,
} from "../lib/parameter-testcases";
import type { ParameterTestResultat } from "../lib/parameter-sjekk-ssr";

function evaluer(
  id: string,
  label: string,
  beskrivelse: string,
  forventetGyldig: boolean,
  faktiskGyldig: boolean,
  detalj?: string,
): ParameterTestResultat {
  return {
    id,
    label,
    beskrivelse,
    forventetGyldig,
    faktiskGyldig,
    somForventet: forventetGyldig === faktiskGyldig,
    detalj,
  };
}

export function ParametreCsr() {
  const [klar, setKlar] = useState(false);
  const [breadcrumbResultater, setBreadcrumbResultater] = useState<
    ParameterTestResultat[] | null
  >(null);
  const [sprakResultater, setSprakResultater] = useState<
    ParameterTestResultat[] | null
  >(null);
  const [roundtripResultat, setRoundtripResultat] =
    useState<ParameterTestResultat | null>(null);
  const startet = useRef(false);

  useEffect(() => {
    if (startet.current) return;
    startet.current = true;

    void injectDecoratorClientSide({
      env: "dev",
      params: decoratorParams,
    }).then(async () => {
      setKlar(true);

      const breadcrumbResultat = await Promise.all(
        breadcrumbTestCases.map(async (testCase) => {
          try {
            await setBreadcrumbs(testCase.breadcrumbs);
            return evaluer(
              testCase.id,
              testCase.label,
              testCase.beskrivelse,
              testCase.forventetGyldig,
              true,
            );
          } catch (error) {
            return evaluer(
              testCase.id,
              testCase.label,
              testCase.beskrivelse,
              testCase.forventetGyldig,
              false,
              error instanceof Error ? error.message : "Ukjent feil",
            );
          }
        }),
      );
      setBreadcrumbResultater(breadcrumbResultat);

      const sprakResultat = await Promise.all(
        sprakTestCases.map(async (testCase) => {
          try {
            await setAvailableLanguages(testCase.availableLanguages);
            return evaluer(
              testCase.id,
              testCase.label,
              testCase.beskrivelse,
              testCase.forventetGyldig,
              true,
            );
          } catch (error) {
            return evaluer(
              testCase.id,
              testCase.label,
              testCase.beskrivelse,
              testCase.forventetGyldig,
              false,
              error instanceof Error ? error.message : "Ukjent feil",
            );
          }
        }),
      );
      setSprakResultater(sprakResultat);

      try {
        await setParams({ simple: true, breadcrumbs: [] });
        const params = await getParams();
        const riktig = params.simple === true;
        setRoundtripResultat(
          evaluer(
            "setparams-roundtrip",
            "setParams/getParams roundtrip",
            "Setter simple=true via setParams, henter så params på nytt via getParams og sjekker at verdien faktisk ble lagret. Tester at klientens lokale tilstand og Dekoratørens tilstand holdes i sync.",
            true,
            riktig,
            riktig ? undefined : "getParams returnerte ikke satt verdi",
          ),
        );
      } catch (error) {
        setRoundtripResultat(
          evaluer(
            "setparams-roundtrip",
            "setParams/getParams roundtrip",
            "Setter simple=true via setParams, henter så params på nytt via getParams og sjekker at verdien faktisk ble lagret. Tester at klientens lokale tilstand og Dekoratørens tilstand holdes i sync.",
            true,
            false,
            error instanceof Error ? error.message : "Ukjent feil",
          ),
        );
      }
    });
  }, []);

  return (
    <section aria-label="CSR-parametertester">
      <h2>CSR (klient)</h2>
      <p>
        Samme testtilfeller som i SSR-seksjonen over, men kjørt via de
        klientside-funksjonene appen selv ville brukt etter at Dekoratøren
        allerede er lastet i nettleseren (<code>setBreadcrumbs</code>,{" "}
        <code>setAvailableLanguages</code>). I tillegg testes en roundtrip med{" "}
        <code>setParams</code>/<code>getParams</code>.
      </p>
      {!klar ? (
        <p>⏳ Initialiserer Dekoratøren …</p>
      ) : (
        <>
          <Resultatliste
            tittel="Breadcrumbs"
            resultater={breadcrumbResultater}
          />
          <Resultatliste tittel="Språkvelger" resultater={sprakResultater} />
          {roundtripResultat ? (
            <Resultatliste
              tittel="setParams/getParams"
              resultater={[roundtripResultat]}
            />
          ) : null}
        </>
      )}
    </section>
  );
}

function Resultatliste({
  tittel,
  resultater,
}: {
  tittel: string;
  resultater: ParameterTestResultat[] | null;
}) {
  if (!resultater) return <p>⏳ Kjører {tittel.toLowerCase()} …</p>;
  return (
    <div>
      <h3>{tittel}</h3>
      <ul>
        {resultater.map((r) => (
          <li
            key={r.id}
            data-testid={`csr-test-${r.id}`}
            data-som-forventet={r.somForventet}
          >
            <p>
              {r.somForventet ? "✅" : "❌"} <strong>{r.label}</strong>
              {r.detalj ? ` – ${r.detalj}` : ""}
            </p>
            <p className="test-beskrivelse">{r.beskrivelse}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
