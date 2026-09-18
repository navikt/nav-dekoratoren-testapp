import { ParametreCsr } from "../../components/ParametreCsr";
import { TestTabell } from "../../components/TestTabell";
import { kjorSsrBreadcrumbTester } from "../../lib/parameter-sjekk-ssr";

export const dynamic = "force-dynamic";

export default async function ParametrePage() {
  const ssrRader = await kjorSsrBreadcrumbTester();

  return (
    <main>
      <p>
        <a href="/">Tilbake til oversikten</a>
      </p>
      <h1>Parametertester</h1>
      <p>
        Tester hvordan Dekoratøren håndterer ulike hjelpefunksjoner og
        parametre.
        <ul>
          <li>✅ utfallet var som forventet</li>
          <li>❌ avvik, se feilmelding-kolonnen</li>
        </ul>
      </p>

      <h2>SSR</h2>
      <TestTabell rader={ssrRader} />

      <h2>CSR</h2>
      <ParametreCsr />
    </main>
  );
}
