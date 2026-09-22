import { ParametreCsr } from "../../components/ParametreCsr";
import { ParameterBolker } from "../../components/ParameterBolker";
import { SsrForenkledeVisninger } from "../../components/SsrForenkledeVisninger";
import {
  kjorSsrAvailableLanguagesTester,
  kjorSsrBreadcrumbTester,
  kjorSsrContextTester,
  kjorSsrCspTester,
  kjorSsrDekoratorVersjonTester,
  kjorSsrForenkletVisningTester,
  kjorSsrRedirectToAppTester,
} from "../../lib/parameter-sjekk-ssr";

export const dynamic = "force-dynamic";

export default async function ParametrePage() {
  const [
    breadcrumbRader,
    availableLanguagesRader,
    contextRader,
    redirectToAppRader,
    forenkletVisningRader,
    cspRader,
    versjonsRader,
  ] = await Promise.all([
      kjorSsrBreadcrumbTester(),
      kjorSsrAvailableLanguagesTester(),
      kjorSsrContextTester(),
      kjorSsrRedirectToAppTester(),
      kjorSsrForenkletVisningTester(),
      kjorSsrCspTester(),
      kjorSsrDekoratorVersjonTester(),
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
        rader={[
          ...breadcrumbRader,
          ...availableLanguagesRader,
          ...contextRader,
          ...redirectToAppRader,
          ...cspRader,
          ...versjonsRader,
        ]}
      />
      <SsrForenkledeVisninger rader={forenkletVisningRader} />

      <h2>CSR</h2>
      <ParametreCsr />
    </main>
  );
}
