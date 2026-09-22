import { ParametreCsr } from "../../components/ParametreCsr";
import { ParameterBolker } from "../../components/ParameterBolker";
import { TestTabell } from "../../components/TestTabell";
import {
  kjorSsrAvailableLanguagesTester,
  kjorSsrBreadcrumbTester,
  kjorSsrChatbotTester,
  kjorSsrChatbotVisibleTester,
  kjorSsrContextTester,
  kjorSsrCspTester,
  kjorSsrDekoratorVersjonTester,
  kjorSsrFeedbackTester,
  kjorSsrForenkletVisningTester,
  kjorSsrLogoutWarningTester,
  kjorSsrRedirectToAppTester,
  kjorSsrRedirectToUrlTester,
  kjorSsrRedirectToUrlLogoutTester,
  kjorSsrShareScreenTester,
} from "../../lib/parameter-sjekk-ssr";

export const dynamic = "force-dynamic";

export default async function ParametrePage() {
  const [
    breadcrumbRader,
    availableLanguagesRader,
    chatbotRader,
    chatbotVisibleRader,
    feedbackRader,
    logoutWarningRader,
    shareScreenRader,
    contextRader,
    redirectToAppRader,
    redirectToUrlRader,
    redirectToUrlLogoutRader,
    forenkletVisningRader,
    cspRader,
    versjonsRader,
  ] = await Promise.all([
    kjorSsrBreadcrumbTester(),
    kjorSsrAvailableLanguagesTester(),
    kjorSsrChatbotTester(),
    kjorSsrChatbotVisibleTester(),
    kjorSsrFeedbackTester(),
    kjorSsrLogoutWarningTester(),
    kjorSsrShareScreenTester(),
    kjorSsrContextTester(),
    kjorSsrRedirectToAppTester(),
    kjorSsrRedirectToUrlTester(),
    kjorSsrRedirectToUrlLogoutTester(),
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
      <p>
        Tester hvordan Dekoratøren håndterer ulike hjelpefunksjoner og
        parametre.
      </p>
      <ul>
        <li>✅ utfallet var som forventet</li>
        <li>❌ avvik, se feilmelding-kolonnen</li>
      </ul>

      <h2>SSR</h2>
      <ParameterBolker
        rader={[
          ...breadcrumbRader,
          ...availableLanguagesRader,
          ...chatbotRader,
          ...chatbotVisibleRader,
          ...feedbackRader,
          ...logoutWarningRader,
          ...shareScreenRader,
          ...contextRader,
          ...redirectToAppRader,
          ...redirectToUrlRader,
          ...redirectToUrlLogoutRader,
          ...cspRader,
          ...versjonsRader,
        ]}
        ekstraBolker={[
          {
            id: "forenklede-visninger",
            tittel: "Forenklede visninger (simple)",
            somForventet: forenkletVisningRader.every(
              (rad: { somForventet: any }) => rad.somForventet,
            ),
            innhold: <TestTabell rader={forenkletVisningRader} />,
          },
        ]}
      />

      <h2>CSR</h2>
      <ParametreCsr />
    </main>
  );
}
