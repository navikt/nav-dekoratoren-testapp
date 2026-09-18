import { ParametreCsr } from "../../components/ParametreCsr";
import { kjorCspTest, kjorSsrBreadcrumbTester, kjorSsrSprakTester, hentDekoratorVersjon } from "../../lib/parameter-sjekk-ssr";
import type { ParameterTestResultat } from "../../lib/parameter-sjekk-ssr";

export const dynamic = "force-dynamic";

export default async function ParametrePage() {
  const [breadcrumbResultater, sprakResultater, cspResultat, versjonResultat] = await Promise.all([
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
        Tester breadcrumbs, språkvelger og andre hjelpefunksjoner med både gyldige og bevisst
        kantete/ugyldige verdier, for å oppdage regresjoner i Dekoratørens parametervalidering.
      </p>

      <section aria-label="SSR-parametertester">
        <h2>SSR (server)</h2>
        <Resultatliste tittel="Breadcrumbs" resultater={breadcrumbResultater} />
        <Resultatliste tittel="Språkvelger" resultater={sprakResultater} />

        <h3>buildCspHeader</h3>
        <p data-testid="csp-status" data-status={cspResultat.status}>
          {cspResultat.status === "ok" ? `✅ OK: ${cspResultat.header}` : `❌ Feil: ${cspResultat.detalj}`}
        </p>

        <h3>getDecoratorVersionId</h3>
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

function Resultatliste({ tittel, resultater }: { tittel: string; resultater: ParameterTestResultat[] }) {
  return (
    <div>
      <h3>{tittel}</h3>
      <ul>
        {resultater.map((r) => (
          <li key={r.id} data-testid={`ssr-test-${r.id}`} data-som-forventet={r.somForventet}>
            {r.somForventet ? "✅" : "❌"} {r.label}
            {r.detalj ? ` – ${r.detalj}` : ""}
          </li>
        ))}
      </ul>
    </div>
  );
}
