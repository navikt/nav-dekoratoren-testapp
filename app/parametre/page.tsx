import { ParametreCsr } from "../../components/ParametreCsr";
import { ParameterBolker } from "../../components/ParameterBolker";
import {
  kjorSsrAvailableLanguagesTester,
  kjorSsrBreadcrumbTester,
  kjorSsrCspTester,
} from "../../lib/parameter-sjekk-ssr";

export const dynamic = "force-dynamic";

export default async function ParametrePage() {
  const [breadcrumbRader, availableLanguagesRader, cspRader] =
    await Promise.all([
    kjorSsrBreadcrumbTester(),
    kjorSsrAvailableLanguagesTester(),
    kjorSsrCspTester(),
    ]);

  return (
    <main>
      <p>
        <a href="/">Tilbake til oversikten</a>
      </p>
      <h1>Parametertester</h1>
      <p>Tester hvordan Dekoratøren håndterer ulike hjelpefunksjoner og parametre.</p>
      <ul>
        <li>✅ utfallet var som forventet</li>
        <li>❌ avvik, se feilmelding-kolonnen</li>
      </ul>

      <h2>SSR</h2>
      <ParameterBolker
        rader={[...breadcrumbRader, ...availableLanguagesRader, ...cspRader]}
      />

      <h2>CSR</h2>
      <ParametreCsr />
    </main>
  );
}
