import { ParametreCsr } from "../../components/ParametreCsr";
import {
  kjorCspTest,
  kjorSsrBreadcrumbTester,
  kjorSsrSprakTester,
  hentDekoratorVersjon,
} from "../../lib/parameter-sjekk-ssr";
import type { ParameterTestResultat } from "../../lib/parameter-sjekk-ssr";

export const dynamic = "force-dynamic";

export default async function ParametrePage() {
  const [breadcrumbResultater, sprakResultater, cspResultat, versjonResultat] =
    await Promise.all([
      kjorSsrBreadcrumbTester(),
      kjorSsrSprakTester(),
      kjorCspTest(),
      hentDekoratorVersjon(),
    ]);

  return (
    <main>
      <p>
        <a href="/">Tilbake til oversikten</a>
      </p>
      <h1>Parametertester</h1>
      <p>
        Denne siden tester hvordan Dekoratøren håndterer breadcrumbs,
        språkvelger og andre hjelpefunksjoner – med både normale, gyldige
        verdier og bevisst kantete eller ugyldige verdier. Bakgrunnen er en
        tidligere regresjon der Dekoratørens validering av breadcrumb-path kunne
        krasje hele siden for enkelte team. Testene her skal gjøre det raskt
        synlig hvis noe tilsvarende skjer igjen.
      </p>
      <p>
        <strong>Slik leser du resultatene:</strong> ✅ betyr at utfallet var som
        forventet – enten at en gyldig verdi ble godtatt, eller at en bevisst
        ugyldig verdi ble avvist på en trygg måte (uten å krasje siden). ❌
        betyr et avvik fra det forventede, for eksempel at en gyldig verdi ble
        avvist, eller at en ugyldig verdi enten krasjet siden eller ble stille
        godtatt uten varsel. Hver test viser også en kort beskrivelse av hva den
        prøver å avdekke.
      </p>

      <section aria-label="SSR-parametertester">
        <h2>SSR (server)</h2>
        <p>
          Disse testene kjører på serveren, via <code>fetchDecoratorReact</code>{" "}
          – samme funksjon som <code>/ssr-med-moduler</code> bruker i vanlig
          drift. Parameterne sendes altså slik en ekte SSR-forespørsel ville
          gjort det.
        </p>
        <Resultatliste tittel="Breadcrumbs" resultater={breadcrumbResultater} />
        <Resultatliste tittel="Språkvelger" resultater={sprakResultater} />

        <h3>buildCspHeader</h3>
        <p>
          Bygger en Content-Security-Policy-header basert på appens egne
          CSP-behov, slått sammen med Dekoratørens egne krav. Dette brukes
          normalt til å sette
          <code> Content-Security-Policy</code>-headeren i responsen, slik at
          dekoratørens skript/stiler fungerer uten at appen må åpne CSP-en
          unødvendig mye.
        </p>
        <p data-testid="csp-status" data-status={cspResultat.status}>
          {cspResultat.status === "ok"
            ? `✅ OK: ${cspResultat.header}`
            : `❌ Feil: ${cspResultat.detalj}`}
        </p>

        <h3>getDecoratorVersionId</h3>
        <p>
          Henter Dekoratørens gjeldende versjons-id. Brukes typisk til å oppdage
          når Dekoratøren har fått en ny versjon, slik at man kan invalidere
          egen HTML-cache (se også
          <code> addDecoratorUpdateListener</code> i{" "}
          <code>instrumentation.ts</code>, som gjør dette automatisk ved
          serveroppstart).
        </p>
        <p data-testid="versjon-status" data-status={versjonResultat.status}>
          {versjonResultat.status === "ok"
            ? `✅ OK: ${versjonResultat.versionId}`
            : `❌ Feil: ${versjonResultat.detalj}`}
        </p>
      </section>

      <ParametreCsr />
    </main>
  );
}

function Resultatliste({
  tittel,
  resultater,
}: {
  tittel: string;
  resultater: ParameterTestResultat[];
}) {
  return (
    <div>
      <h3>{tittel}</h3>
      <ul>
        {resultater.map((r) => (
          <li
            key={r.id}
            data-testid={`ssr-test-${r.id}`}
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
