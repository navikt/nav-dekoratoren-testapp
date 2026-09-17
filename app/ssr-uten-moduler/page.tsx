import { IntegrationPage } from "../../components/IntegrationPage";
import { directDecoratorParams } from "../../lib/decorator-params";
import { fetchDirectSsrFragments } from "../../lib/ssr-uten-moduler";
import { logTechnicalEvent } from "../../lib/technical-logger";

function Fragment({ value }: { value: string }) {
  return <div dangerouslySetInnerHTML={{ __html: value }} />;
}

export default async function DirectSsrPage() {
  logTechnicalEvent("decorator_integration_started", "ssr-uten-moduler", "service-discovery");
  try {
    const fragments = await fetchDirectSsrFragments();
    logTechnicalEvent("decorator_ssr_rendered", "ssr-uten-moduler", "service-discovery");
    return (
      <>
        <Fragment value={fragments.DECORATOR_HEAD_ASSETS} />
        <Fragment value={fragments.DECORATOR_HEADER} />
        <IntegrationPage
          title="SSR uten moduler"
          description="Dekoratøren er hentet direkte fra SSR-endepunktet."
          integrationVariant="ssr-uten-moduler"
          rendering="server"
          transport="service discovery"
          teamName={directDecoratorParams.teamName}
        >
          <p data-testid="app-content">Dekoratøren ble rendret i første HTML-respons.</p>
        </IntegrationPage>
        <Fragment value={fragments.DECORATOR_FOOTER} />
        <Fragment value={fragments.DECORATOR_SCRIPTS} />
      </>
    );
  } catch {
    logTechnicalEvent("decorator_integration_failed", "ssr-uten-moduler", "service-discovery", "SSR_DIRECT_FETCH");
    return (
      <IntegrationPage
        title="SSR uten moduler"
        description="Dekoratøren kunne ikke hentes direkte."
        integrationVariant="ssr-uten-moduler"
        rendering="server"
        transport="service discovery"
        teamName={directDecoratorParams.teamName}
        initialStatus="error"
        errorMessage="Dekoratøren kunne ikke lastes"
      />
    );
  }
}
