import { IntegrationPage } from "../../components/IntegrationPage";
import { fetchDirectSsrFragments } from "../../lib/direct-ssr";
import { logTechnicalEvent } from "../../lib/technical-logger";

function Fragment({ value }: { value: string }) {
  return <div dangerouslySetInnerHTML={{ __html: value }} />;
}

export default async function DirectSsrPage() {
  logTechnicalEvent("decorator_integration_started", "ssr-direkte", "service-discovery");
  try {
    const fragments = await fetchDirectSsrFragments();
    logTechnicalEvent("decorator_ssr_rendered", "ssr-direkte", "service-discovery");
    return (
      <>
        <Fragment value={fragments.DECORATOR_HEAD_ASSETS} />
        <Fragment value={fragments.DECORATOR_HEADER} />
        <IntegrationPage
          title="SSR uten moduler"
          description="Dekoratøren er hentet direkte fra SSR-endepunktet."
          integrationVariant="ssr-direkte"
          rendering="server"
          transport="service discovery"
        >
          <p data-testid="app-content">Dekoratøren ble rendret i første HTML-respons.</p>
        </IntegrationPage>
        <Fragment value={fragments.DECORATOR_FOOTER} />
        <Fragment value={fragments.DECORATOR_SCRIPTS} />
      </>
    );
  } catch {
    logTechnicalEvent("decorator_integration_failed", "ssr-direkte", "service-discovery", "SSR_DIRECT_FETCH");
    return (
      <IntegrationPage
        title="SSR uten moduler"
        description="Dekoratøren kunne ikke hentes direkte."
        integrationVariant="ssr-direkte"
        rendering="server"
        transport="service discovery"
        initialStatus="error"
        errorMessage="Dekoratøren kunne ikke lastes"
      />
    );
  }
}
